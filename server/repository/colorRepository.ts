import { prismaClient } from '$/service/prismaClient';
import { toColorModel } from '$/useCase/colorUseCase';

export const getItems = async (type: string, list: string[] | number) => {
  console.log(type, list);
  console.log('aaaa');
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
  const prismaColor = await prismaClient.color.findMany({
    where: {
      color: {
        hasSome: color,
      },
    },
    select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
  });

  prismaColor.forEach((item) => {
    item.color = item.color.map(decimalToHex.toString);
  });

  return prismaColor.map(toColorModel);
};
