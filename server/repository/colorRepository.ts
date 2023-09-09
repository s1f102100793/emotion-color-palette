import { prismaClient } from '$/service/prismaClient';
import { toColorModel } from '$/useCase/colorUseCase';

export const getItems = async (type: string, list: string[] | number) => {
  try {
    switch (type) {
      case 'number':
        if (typeof list === 'number') {
          return await getItemsFromNumber(list);
        }
        break;
      case 'color':
        if (Array.isArray(list)) {
          return await getItemsFromColor(list);
        }
        break;
    }
  } catch (e) {
    console.log(e);
  }
};
const decimalToHex = (decimal: number): string => {
  const r = (decimal >> 16) & 255;
  const g = (decimal >> 8) & 255;
  const b = decimal & 255;

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
};

export const getItemsFromNumber = async (paletteSize: number) => {
  try {
    console.log(paletteSize);
    const prismaColor = await prismaClient.color.findMany({
      where: { paletteSize },
      select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
    });

    prismaColor.forEach((item) => {
      item.color = item.color.map(decimalToHex.toString);
    });

    return prismaColor.map(toColorModel);
  } catch (e) {
    console.log(e);
  }
};

export const getItemsFromColor = async (color: string[]) => {
  console.log(color);
  interface ColorData {
    id: number;
    createdAt: Date;
    txet: string;
    paletteSize: number;
    color: string[];
    like: number;
  }

  let results: ColorData[] = [];

  if (color.length !== 2) {
    throw new Error('Expected an array of 2 numbers for the color range.');
  }

  const startRange = parseInt(color[0], 10);
  const endRange = parseInt(color[1], 10);

  for (let i = startRange; i <= endRange; i++) {
    const prismaColor = (await prismaClient.color.findMany({
      where: {
        color: {
          has: i.toString(),
        },
      },
      select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
    })) as ColorData[];

    prismaColor.forEach((item: ColorData) => {
      item.color = item.color.map((val: string) => decimalToHex(parseInt(val, 10)));
    });

    results = [...results, ...prismaColor];
    console.log(results);
  }
  console.log(results);

  return results.map(toColorModel);
};
