import type {
  ColorGroups,
  ColorKey,
  ColorRanges,
  RGBModel,
  ReturnColorModel,
} from 'commonTypesWithClient/models';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const usePaletteList = () => {
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [palettes, setPalettes] = useState<ReturnColorModel[]>([]);
  const [currentCount, setCurrentCount] = useState(0);

  const hexToRGB = (hex: string): RGBModel => {
    return {
      rStr: parseInt(hex.slice(1, 3), 16),
      gStr: parseInt(hex.slice(3, 5), 16),
      bStr: parseInt(hex.slice(5, 7), 16),
    };
  };

  const colorRanges: ColorRanges = {
    R1G1B1: [hexToRGB('#000000'), hexToRGB('#555555')],
    R1G1B2: [hexToRGB('#000056'), hexToRGB('#5555AA')],
    R1G1B3: [hexToRGB('#0000AB'), hexToRGB('#5555FF')],

    R1G2B1: [hexToRGB('#005500'), hexToRGB('#55AA55')],
    R1G2B2: [hexToRGB('#005556'), hexToRGB('#55AAAA')],
    R1G2B3: [hexToRGB('#0055AB'), hexToRGB('#55AAFF')],

    R1G3B1: [hexToRGB('#00AA00'), hexToRGB('#00FF55')],
    R1G3B2: [hexToRGB('#00AA56'), hexToRGB('#00FFAA')],
    R1G3B3: [hexToRGB('#00AAAB'), hexToRGB('#00FFFF')],

    R2G1B1: [hexToRGB('#550000'), hexToRGB('#AA5555')],
    R2G1B2: [hexToRGB('#550056'), hexToRGB('#AA55AA')],
    R2G1B3: [hexToRGB('#5500AB'), hexToRGB('#AA55FF')],

    R2G2B1: [hexToRGB('#555500'), hexToRGB('#AAAA55')],
    R2G2B2: [hexToRGB('#555556'), hexToRGB('#AAAAAA')],
    R2G2B3: [hexToRGB('#5555AB'), hexToRGB('#AAAAFF')],

    R2G3B1: [hexToRGB('#55AA00'), hexToRGB('#55FF55')],
    R2G3B2: [hexToRGB('#55AA56'), hexToRGB('#55FFAA')],
    R2G3B3: [hexToRGB('#55AAAB'), hexToRGB('#55FFFF')],

    R3G1B1: [hexToRGB('#AA0000'), hexToRGB('#FF5555')],
    R3G1B2: [hexToRGB('#AA0056'), hexToRGB('#FF55AA')],
    R3G1B3: [hexToRGB('#AA00AB'), hexToRGB('#FF55FF')],

    R3G2B1: [hexToRGB('#AA5500'), hexToRGB('#AAAA55')],
    R3G2B2: [hexToRGB('#AA5556'), hexToRGB('#AAAAAA')],
    R3G2B3: [hexToRGB('#AA55AB'), hexToRGB('#AAAAFF')],

    R3G3B1: [hexToRGB('#AAAA00'), hexToRGB('#FFFF55')],
    R3G3B2: [hexToRGB('#AAAA56'), hexToRGB('#FFFFAA')],
    R3G3B3: [hexToRGB('#AAAAAB'), hexToRGB('#FFFFFF')],
  };

  const colorGroups: ColorGroups = {
    黒: ['R1G1B1', 'R1G1B2'],
    青: ['R1G1B3', 'R1G1B2', 'R1G2B3', 'R1G3B3', 'R2G3B3'],
    緑: ['R1G2B1', 'R1G2B2', 'R1G3B1', 'R1G3B2', 'R2G3B1', 'R2G3B2'],
    紫: ['R2G1B1', 'R2G1B2', 'R2G1B3', 'R3G1B3', 'R3G2B3', 'R2G2B3'],
    灰色: ['R2G2B1', 'R2G2B2'],
    赤: ['R3G1B1', 'R3G1B2', 'R2G1B1', 'R2G1B2'],
    オレンジ: ['R3G2B1', 'R3G2B2'],
    黄色: ['R3G3B1', 'R3G3B2'],
    白: ['R3G3B2', 'R3G3B3'],
  };

  const fetchPalettes = async (colorGroups: RGBModel[][], type: 'color' | 'number' | 'with') => {
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

  const handleFetch = () => {
    const rangesToSend = selectedColors.flatMap((colorKey) =>
      colorGroups[colorKey].map((key) => colorRanges[key])
    );

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
    colorGroups,
    handleColorChange,
    handleNumberChange,
    handleFetch,
  };
};
