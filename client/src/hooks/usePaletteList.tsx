import type {
  ColorKey,
  ColorRanges,
  HSVRange,
  ReturnColorModel,
} from 'commonTypesWithClient/models';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const usePaletteList = () => {
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([4, 5, 6]);
  const [palettes, setPalettes] = useState<ReturnColorModel[]>([]);
  const [currentCount, setCurrentCount] = useState(0);

  const colorRanges: ColorRanges = {
    赤: { hue: [330, 30], saturation: [33, 100], value: [33, 100] },
    橙: { hue: [0, 60], saturation: [33, 100], value: [33, 100] },
    黄: { hue: [45, 75], saturation: [33, 100], value: [33, 100] },
    緑: { hue: [75, 165], saturation: [33, 100], value: [33, 100] },
    水色: { hue: [165, 195], saturation: [33, 100], value: [33, 100] },
    青: { hue: [195, 255], saturation: [33, 100], value: [33, 100] },
    紫: { hue: [250, 290], saturation: [33, 100], value: [33, 100] },
    ピンク: { hue: [285, 315], saturation: [33, 100], value: [33, 100] },
    茶: { hue: [0, 30], saturation: [33, 66], value: [33, 66] },
    黒: { hue: [330, 360], saturation: [0, 100], value: [0, 33] },
    白: { hue: [0, 360], saturation: [0, 33], value: [66, 100] },
  };

  const fetchPalettes = async (colorGroups: HSVRange[], type: 'color' | 'number' | 'with') => {
    console.log(type);
    const fetchedPalettes = await apiClient.item.$post({
      body: { type, numberlist: selectedNumbers, colorlist: colorGroups },
    });
    console.log(fetchedPalettes);

    if (Array.isArray(fetchedPalettes)) {
      setPalettes(fetchedPalettes);
    } else {
      setPalettes([]);
    }

    return fetchedPalettes;
  };

  const [rangesToSend, setRangesToSend] = useState<HSVRange[]>([]);
  const [currentType, setCurrentType] = useState<'color' | 'number' | 'with'>('with');

  const handleFetch = () => {
    const rangesToSend = selectedColors.map((colorKey) => colorRanges[colorKey]);

    const hasNumbers = selectedNumbers.length > 0;
    const hasColors = selectedColors.length > 0;

    let type: 'color' | 'number' | 'with';

    if (hasNumbers && hasColors) {
      type = 'with';
    } else if (hasNumbers) {
      type = 'number';
    } else {
      type = 'color';
    }

    fetchPalettes(rangesToSend, type);
  };

  const handleColorChange = (color: ColorKey) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleNumberChange = (num: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  return {
    selectedColors,
    selectedNumbers,
    palettes,
    currentCount,
    setCurrentCount,
    colorRanges,
    fetchPalettes,
    handleColorChange,
    handleNumberChange,
    handleFetch,
    rangesToSend,
    currentType,
  };
};
