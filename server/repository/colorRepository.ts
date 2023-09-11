import type { RGBModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

// eslint-disable-next-line complexity
export const getItems = async (type: string, numberlist: number[], colorlist: RGBModel[][]) => {
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
        return await getItemsFromColor(colorlist as RGBModel[][]);
      }
      break;
    case 'with':
      if (Array.isArray(numberlist) && Array.isArray(colorlist) && Array.isArray(colorlist[0])) {
        const numberItems = await Promise.all(numberlist.map((num) => getItemsFromNumber(num)));

        const colorItems = await getItemsFromColor(colorlist as RGBModel[][]);

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
      const parsedColors = JSON.parse(colorItem.color as string);
      return {
        ...colorItem,
        color: parsedColors.map(rgbToHex),
      };
    });
  } catch (e) {
    console.log(e);
    return [];
  }
};

// eslint-disable-next-line complexity
const isColorInRange = (color: RGBModel, startRange: RGBModel, endRange: RGBModel): boolean => {
  return (
    color.rStr >= startRange.rStr &&
    color.rStr <= endRange.rStr &&
    color.gStr >= startRange.gStr &&
    color.gStr <= endRange.gStr &&
    color.bStr >= startRange.bStr &&
    color.bStr <= endRange.bStr
  );
};

export const getItemsFromColor = async (ranges: RGBModel[][]) => {
  const allColors = await prismaClient.color.findMany({
    select: { id: true, createdAt: true, text: true, paletteSize: true, color: true, like: true },
  });

  const result = allColors.filter((item) => {
    const parsedColors = JSON.parse(item.color as string) as RGBModel[];
    return parsedColors.some((colorValue) =>
      ranges.some(([startRange, endRange]) => isColorInRange(colorValue, startRange, endRange))
    );
  });

  return result.map((colorItem) => {
    const parsedColors = JSON.parse(colorItem.color as string) as RGBModel[];
    return {
      ...colorItem,
      color: parsedColors.map(rgbToHex),
    };
  });
};
