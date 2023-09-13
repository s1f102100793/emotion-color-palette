import type {
  ColorKey,
  ColorRanges,
  HSVModel,
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
  // eslint-disable-next-line complexity
  const rgbToHSV = (rInput: number, gInput: number, bInput: number): HSVModel => {
    const r = rInput / 255;
    const g = gInput / 255;
    const b = bInput / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    const v = max;

    return { h: h * 360, s: s * 100, v: v * 100 };
  };

  const hexToHSVModel = (hex: string): HSVModel => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return rgbToHSV(r, g, b);
  };

  const handleLikeClick = async (palette: ReturnColorModel) => {
    const newLike = palette.like + 1;

    const newColors = palette.color.map((color) => hexToHSVModel(color));

    await apiClient.like.$post({
      body: {
        id: palette.id,
        text: palette.text,
        paletteSize: palette.paletteSize,
        color: newColors,
        like: newLike,
      },
    });

    setPalettes((prev) =>
      prev.map((p) => {
        if (p.id === palette.id) {
          return { ...p, like: newLike };
        }
        return p;
      })
    );
  };

  // eslint-disable-next-line complexity
  const timeSince = (date: Date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
      return 'Just now';
    }

    if (secondsPast < 3600) {
      return `${Math.round(secondsPast / 60)} minutes ago`;
    }

    if (secondsPast <= 86400) {
      return 'Today';
    }

    const daysPast = Math.round(secondsPast / 86400);
    if (daysPast === 1) {
      return '1 day ago';
    }
    if (daysPast < 30) {
      return `${daysPast} days ago`;
    }

    const monthsPast = Math.round(daysPast / 30);
    if (monthsPast === 1) {
      return '1 month ago';
    }
    if (monthsPast < 12) {
      return `${monthsPast} months ago`;
    }

    const yearsPast = Math.round(monthsPast / 12);
    if (yearsPast === 1) {
      return '1 year ago';
    }
    return `${yearsPast} years ago`;
  };

  const getTextColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (luminance > 0.7) {
      return '#000'; // 黒
    } else if (luminance > 0.4) {
      return '#777'; // 灰色
    } else {
      return '#fff'; // 白
    }
  };

  const [copiedColor, setCopiedColor] = useState<{ color: string; paletteId: number } | null>(null);
  const [hoveredColor, setHoveredColor] = useState<{ color: string; paletteId: number } | null>(
    null
  );

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  };

  const handleColorBoxClick = (color: string, paletteId: number) => {
    copyToClipboard(color);
    setCopiedColor({ color, paletteId });
    setTimeout(() => {
      setCopiedColor(null);
    }, 3000);
  };

  return {
    selectedColors,
    selectedNumbers,
    palettes,
    setPalettes,
    currentCount,
    setCurrentCount,
    colorRanges,
    fetchPalettes,
    handleColorChange,
    handleNumberChange,
    handleFetch,
    rangesToSend,
    currentType,
    handleLikeClick,
    timeSince,
    getTextColor,
    copiedColor,
    hoveredColor,
    setHoveredColor,
    handleColorBoxClick,
  };
};
