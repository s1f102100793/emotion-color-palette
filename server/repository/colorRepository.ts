import { prismaClient } from '$/service/prismaClient';
import { toColorModel } from '$/useCase/colorUseCase';

export const getItems = async (type: string, list: string[] | number) => {
  switch (type) {
    case 'number':
      if (typeof list === 'number') {
        await getItemsFromNumber(list);
      }
      break;
    case 'color':
      if (Array.isArray(list)) {
        await getItemsFromColor(list);
      }
      break;
  }
};

export const getItemsFromNumber = async (paletteSize: number) => {
  const prismaColor = await prismaClient.color.findMany({
    where: { paletteSize },
    select: { id: true, createdAt: true, txet: true, paletteSize: true, color: true, like: true },
  });
  return prismaColor.map(toColorModel);
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
  return prismaColor.map(toColorModel);
};
