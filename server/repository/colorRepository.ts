import { prismaClient } from '$/service/prismaClient';
import { toColorModel } from '$/useCase/colorUseCase';

export const getItems = async (type: string, list: number[] | number) => {
  try {
    switch (type) {
      case 'number':
        if (typeof list === 'number') {
          return await getItemsFromNumber(list);
        }
        break;
      case 'color':
        if (Array.isArray(list)) {
          return await getItemsFromColor(list[0], list[1]);
        }
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

export const decimalToHex = (decimal: number): string => {
  const r = (decimal >> 16) & 255;
  const g = (decimal >> 8) & 255;
  const b = decimal & 255;

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
};

export const getItemsFromNumber = async (paletteSize: number) => {
  try {
    console.log(paletteSize);
    const prismaColor = await prismaClient.color.findMany({
      where: { paletteSize },
      select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
    });

    return prismaColor.map(toColorModel);
  } catch (e) {
    console.log(e);
  }
};

export const getItemsFromColor = async (startRange: number, endRange: number) => {
  console.log(startRange, endRange);
  const allColors = await prismaClient.color.findMany({
    select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
  });

  const filteredColors = allColors.filter((item) =>
    item.color.some((value) => value >= startRange && value <= endRange)
  );

  return filteredColors.map(toColorModel);
};
