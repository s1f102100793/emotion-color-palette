import type { ColorModel } from '$/commonTypesWithClient/models';
import { OPENAIAPI } from '$/service/envValues';
import { prismaClient } from '$/service/prismaClient';
import type { Color } from '@prisma/client';
import { OpenAI, PromptTemplate } from 'langchain';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

type ColorProperties = {
  [key: `color${number}`]: z.ZodType<any, any>;
};

export const makeColor = async (txet: string, number: number, id: number | undefined) => {
  try {
    console.log(txet);
    const properties: ColorProperties = {};

    for (let i = 0; i < number; i++) {
      properties[`color${i + 1}`] = z.string().describe(`color${i + 1}`);
    }

    const parser = StructuredOutputParser.fromZodSchema(z.object(properties));

    const formatInstructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
      template: 'ユーザーの質問に答えてください。\n{format_instructions}\n{question}',
      inputVariables: ['question'],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({
      question: `${txet}から連想される${number}色のカラーパレットを16進数のカラーコードで答えてください。JSONで他とはかぶらないユニークな原色ではないカラーコードだけを出力してください。ex.#0A0A0A`,
    });

    const llm = new OpenAI({
      openAIApiKey: OPENAIAPI,
      temperature: 0.9,
      modelName: 'gpt-4',
    });

    const res = await llm.call(input);
    console.log(res);
    const anser = await parser.parse(res);

    let colorsArray: string[] = [];

    const extractColors = (inputObj: { [key: string]: any }) => {
      const colors: string[] = [];
      for (const key in inputObj) {
        if (
          Object.prototype.hasOwnProperty.call(inputObj, key) &&
          typeof inputObj[key] === 'string'
        ) {
          colors.push(inputObj[key]);
        }
      }
      return colors;
    };

    if (anser !== null) {
      colorsArray = extractColors(anser);
    }

    createColordb(id, txet, number, colorsArray, 0);
    return anser;
  } catch (e) {
    console.log(e);
  }
};

export const toColorModel = (prismaColor: Color): ColorModel => ({
  id: prismaColor.id,
  createdAt: prismaColor.createdAt,
  txet: prismaColor.txet,
  paletteSize: prismaColor.paletteSize,
  color: prismaColor.color,
  like: prismaColor.like,
});

export const createColordb = async (
  id: ColorModel['id'] | undefined,
  txet: ColorModel['txet'],
  paletteSize: ColorModel['paletteSize'],
  color: ColorModel['color'],
  like: ColorModel['like']
) => {
  console.log('aaa');
  const prismaColor = await prismaClient.color.upsert({
    where: { id },
    update: { like },
    create: {
      txet,
      paletteSize,
      color,
      like,
    },
  });
  return toColorModel(prismaColor);
};
