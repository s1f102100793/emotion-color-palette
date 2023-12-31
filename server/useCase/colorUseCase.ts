import type { ColorModel, HSVModel } from '$/commonTypesWithClient/models';
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
      question: `${txet}から連想される${number}色のカラーパレットを16進数のカラーコードで答えてください。JSONで他とはかぶらないユニークな原色ではないカラーコードだけを出力してください。
      
      条件1: #FFFFFFは出力しないでください。
      条件2: 色に対する感情表現のイメージは以下の通りです。これはあくまでも具体例です。
      赤 (Red): 愛、情熱、活力、危険、怒り、冒険
      黄色 (Yellow):喜び、楽観、注意、新しいアイデア、好奇心、ジャンビー
      緑 (Green):自然、平和、成長、安定、リフレッシュ、健康
      青 (Blue):贅沢、神秘、スピリチュアル、王室、創造性
      オレンジ (Orange):エネルギー、活力、楽観、冒険、友情
      ピンク (Pink):愛、やさしさ、無邪気、女性らしさ、安心
      茶色 (Brown):地上、安定、信頼、伝統、堅実
      黒 (Black):強さ、権威、神秘、エレガンス、深遠、死
      白 (White): 純粋、無邪気、新しい始まり、シンプル、真実`,
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
    let colorsArray: HSVModel[] = [];

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
      colorsArray = hexColorsArray.map((color) => hexToHSVModel(color)); // 16進カラーコードを RGBModel に変換
    }

    createColordb(id, txet, number, colorsArray, 0); // 更新された colorsArray を渡す
    return anser; // anser の型は変わりません
  } catch (e) {
    console.log(e);
  }
};

const HSVModelSchema = z.object({
  h: z.number(),
  s: z.number(),
  v: z.number(),
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
    color: z.array(HSVModelSchema).parse(parsedColor),
    like: prismaColor.like,
  };
};

// eslint-disable-next-line complexity
const rgbToHSV = (rInput: number, gInput: number, bInput: number): HSVModel => {
  const r = rInput / 255;
  const g = gInput / 255;
  const b = bInput / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const v = max;

  return { h: h * 360, s: s * 100, v: v * 100 };
};

const hexToHSVModel = (hex: string): HSVModel => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return rgbToHSV(r, g, b);
};

export const createColordb = async (
  id: ColorModel['id'] | undefined,
  text: ColorModel['text'],
  paletteSize: ColorModel['paletteSize'],
  color: HSVModel[],
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
