import type { ColorModel, RGBModel } from '$/commonTypesWithClient/models';
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

    let hexColorsArray: string[] = [];
    let colorsArray: RGBModel[] = [];

    const extractColors = (inputObj: { [key: string]: string }): string[] => {
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
      hexColorsArray = extractColors(anser);
      colorsArray = hexColorsArray.map((color) => hexToRGBModel(color)); // 16進カラーコードを RGBModel に変換
    }

    createColordb(id, txet, number, colorsArray, 0); // 更新された colorsArray を渡す
    return anser; // anser の型は変わりません
  } catch (e) {
    console.log(e);
  }
};

const RGBModelSchema = z.object({
  rStr: z.number(),
  gStr: z.number(),
  bStr: z.number(),
});

export const toColorModel = (prismaColor: Color): ColorModel => {
  let parsedColor;

  if (typeof prismaColor.color === 'string') {
    parsedColor = JSON.parse(prismaColor.color);
  } else {
    parsedColor = prismaColor.color;
  }

  return {
    id: prismaColor.id,
    createdAt: prismaColor.createdAt,
    text: prismaColor.text,
    paletteSize: prismaColor.paletteSize,
    color: z.array(RGBModelSchema).parse(parsedColor),
    like: prismaColor.like,
  };
};

const hexToDecimal = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // 各色の値を3桁の10進数の文字列に変換
  const rStr = r.toString().padStart(3, '0');
  const gStr = g.toString().padStart(3, '0');
  const bStr = b.toString().padStart(3, '0');

  // 3桁の10進数の文字列を結合
  const decimalValueStr = rStr + gStr + bStr;

  // 9桁の10進数の数値に変換
  return parseInt(decimalValueStr);
};

const hexToRGBModel = (hex: string): RGBModel => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // 各色の値を3桁の10進数に変換
  const rNum = Number(r.toString().padStart(3, '0'));
  const gNum = Number(g.toString().padStart(3, '0'));
  const bNum = Number(b.toString().padStart(3, '0'));

  return {
    rStr: rNum,
    gStr: gNum,
    bStr: bNum,
  };
};

const rgbModelToDecimal = (rgb: RGBModel): number => {
  const combinedStr = `${rgb.rStr}${rgb.gStr}${rgb.bStr}`;
  return Number(combinedStr);
};

export const createColordb = async (
  id: ColorModel['id'] | undefined,
  text: ColorModel['text'],
  paletteSize: ColorModel['paletteSize'],
  color: RGBModel[],
  like: ColorModel['like']
) => {
  console.log('aaa');

  const colorJson = JSON.stringify(color);

  let prismaColor;
  if (id !== undefined && id !== null) {
    prismaColor = await prismaClient.color.update({
      where: { id },
      data: {
        like,
        text,
        paletteSize,
        color: colorJson,
      },
    });
  } else {
    prismaColor = await prismaClient.color.create({
      data: {
        text,
        paletteSize,
        color: colorJson,
        like,
      },
    });
  }

  return toColorModel(prismaColor);
};
