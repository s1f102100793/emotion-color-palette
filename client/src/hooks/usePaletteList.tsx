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
    赤: { hue: [0, 30], saturation: [33, 100], value: [33, 100] },
    橙: { hue: [30, 60], saturation: [33, 100], value: [33, 100] },
    黄: { hue: [60, 90], saturation: [33, 100], value: [33, 100] },
    黄緑: { hue: [90, 150], saturation: [33, 100], value: [33, 100] },
    緑: { hue: [150, 210], saturation: [33, 100], value: [33, 100] },
    青緑: { hue: [210, 240], saturation: [33, 100], value: [33, 100] },
    青: { hue: [240, 270], saturation: [33, 100], value: [33, 100] },
    紫: { hue: [270, 300], saturation: [33, 100], value: [33, 100] },
    ピンク: { hue: [300, 330], saturation: [33, 100], value: [33, 100] },
    紅: { hue: [330, 360], saturation: [33, 100], value: [33, 100] },
    茶: { hue: [0, 30], saturation: [33, 66], value: [33, 66] },
    黒: { hue: [0, 360], saturation: [0, 100], value: [0, 33] },
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
