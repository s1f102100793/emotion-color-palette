import { prismaClient } from '$/service/prismaClient';
import { toColorModel } from '$/useCase/colorUseCase';

export const getItems = async (type: string, list: number[][] | number) => {
  try {
    switch (type) {
      case 'number':
        if (typeof list === 'number') {
          return await getItemsFromNumber(list);
        }
        break;
      case 'color':
        if (Array.isArray(list) && Array.isArray(list[0])) {
          return await getItemsFromColor(list as number[][]);
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

export const getItemsFromColor = async (ranges: number[][]) => {
  const allColors = await prismaClient.color.findMany({
    select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
  });

  const filteredColors = allColors.filter((item) =>
    item.color.some((colorValue) =>
      ranges.some(([startRange, endRange]) => colorValue >= startRange && colorValue <= endRange)
    )
  );

  return filteredColors.map(toColorModel);
};
