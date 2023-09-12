import type { HSVModel, RGBModel, ReturnColorModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

// eslint-disable-next-line complexity
export const getItems = async (
  type: string,
  numberlist: number[],
  colorlist: RGBModel[][]
): Promise<ReturnColorModel[]> => {
  switch (type) {
    case 'number':
      if (Array.isArray(numberlist)) {
        const results = await Promise.all(numberlist.map((num) => getItemsFromNumber(num)));
        return results.flatMap((item) => item);
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
    default:
      throw new Error('Invalid type provided.');
  }
  return [];
};

// eslint-disable-next-line complexity
const hsvToRGB = (h: number, s: number, v: number): RGBModel => {
  // 新しい変数に0-1の範囲で値を保持
  const sNorm = s / 100;
  const vNorm = v / 100;

  const i = Math.floor(h / 60);
  const f = h / 60 - i;
  const p = vNorm * (1 - sNorm);
  const q = vNorm * (1 - sNorm * f);
  const t = vNorm * (1 - sNorm * (1 - f));

  const round = (num: number) => Math.round(num * 255);

  switch (i % 6) {
    case 0:
      return { rStr: round(vNorm), gStr: round(t), bStr: round(p) };
    case 1:
      return { rStr: round(q), gStr: round(vNorm), bStr: round(p) };
    case 2:
      return { rStr: round(p), gStr: round(vNorm), bStr: round(t) };
    case 3:
      return { rStr: round(p), gStr: round(q), bStr: round(vNorm) };
    case 4:
      return { rStr: round(t), gStr: round(p), bStr: round(vNorm) };
    case 5:
      return { rStr: round(vNorm), gStr: round(p), bStr: round(q) };
    default:
      throw new Error('Unexpected value in hsvToRGB conversion.');
  }
};

const toHex = (value: number) => {
  const hex = value.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hsvToHex = (hsv: HSVModel): string => {
  const rgb = hsvToRGB(hsv.h, hsv.s, hsv.v);
  console.log('rgb:', rgb);
  return rgbToHex(rgb.rStr, rgb.gStr, rgb.bStr);
};

export const getItemsFromNumber = async (paletteSize: number) => {
  const prismaColor = await prismaClient.color.findMany({
    where: { paletteSize },
    select: { id: true, createdAt: true, text: true, paletteSize: true, color: true, like: true },
  });

  return prismaColor.map((colorItem) => {
    const parsedColors = JSON.parse(colorItem.color as string) as HSVModel[];
    console.log('Before:', parsedColors);
    const hexColors = parsedColors.map(hsvToHex);
    console.log('After:', hexColors);
    return {
      ...colorItem,
      color: hexColors,
    };
  });
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
