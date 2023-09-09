import { prismaClient } from '$/service/prismaClient';

export const getItems = async (type: string) => {
  switch (type) {
    case 'number':
      await getItemsFromNumber();
      break;
    case 'color':
      await getItemsFromColor();
      break;
  }
};

export const getItemsFromNumber = async () => {
  const prismaColor = await prismaClient.color.findMany({});
};

export const getItemsFromColor = async () => {
  const prismaColor = await prismaClient.color.findMany({});
};
