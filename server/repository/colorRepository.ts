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
