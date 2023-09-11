import { prismaClient } from '$/service/prismaClient';
import { toColorModel } from '$/useCase/colorUseCase';

// eslint-disable-next-line complexity
export const getItems = async (type: string, numberlist: number[], colorlist: number[][]) => {
  switch (type) {
    case 'number':
      if (Array.isArray(numberlist)) {
        return (await Promise.all(numberlist.map((num) => getItemsFromNumber(num)))).flatMap(
          (item) => item
        );
      }
      break;
    case 'color':
      if (Array.isArray(colorlist) && Array.isArray(colorlist[0])) {
        return await getItemsFromColor(colorlist as number[][]);
      }
      break;
    case 'with':
      if (Array.isArray(numberlist) && Array.isArray(colorlist) && Array.isArray(colorlist[0])) {
        const numberItems = await Promise.all(numberlist.map((num) => getItemsFromNumber(num)));

        const colorItems = await getItemsFromColor(colorlist as number[][]);

        const flattenedNumberItems = numberItems.flatMap((item) => item);

        return flattenedNumberItems.filter(
          (numberItem) =>
            numberItem !== undefined &&
            colorItems.some((colorItem) => colorItem.id === numberItem.id)
        );
      }
      break;
  }
};

const rgbToHex = (rgb: { rStr: number; gStr: number; bStr: number }): string => {
  const r = rgb.rStr.toString(16).padStart(2, '0');
  const g = rgb.gStr.toString(16).padStart(2, '0');
  const b = rgb.bStr.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

export const getItemsFromNumber = async (paletteSize: number) => {
  try {
    console.log(paletteSize);
    const prismaColor = await prismaClient.color.findMany({
      where: { paletteSize },
      select: { id: true, createdAt: true, text: true, paletteSize: true, color: true, like: true },
    });

    return prismaColor.map((colorItem) => {
      const parsedColors = JSON.parse(colorItem.color as string); // JSON文字列をオブジェクトに変換
      return {
        ...colorItem,
        color: parsedColors.map(rgbToHex), // RGBを16進数に変換
      };
    });
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getItemsFromColor = async (ranges: number[][]) => {
  const allColors = await prismaClient.color.findMany({
    select: { id: true, createdAt: true, text: true, paletteSize: true, color: true, like: true },
  });

  const filteredColors = allColors.filter((item) =>
    item.color.some((colorValue) =>
      ranges.some(([startRange, endRange]) => colorValue >= startRange && colorValue <= endRange)
    )
  );

  return filteredColors.map(toColorModel);
};
