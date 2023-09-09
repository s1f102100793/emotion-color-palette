import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

type ColorKey = 'ブルー' | 'レッド' | 'グリーン';

const PaletteListPage = () => {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('ブルー');

  const hexToDecimal = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16).toString().padStart(3, '0');
    const g = parseInt(hex.slice(3, 5), 16).toString().padStart(3, '0');
    const b = parseInt(hex.slice(5, 7), 16).toString().padStart(3, '0');
    return parseInt(r + g + b);
  };

  const BLUE_START = hexToDecimal('#0000FF');
  const BLUE_END = hexToDecimal('#87CEFA');

  const RED_START = hexToDecimal('#FF0000');
  const RED_END = hexToDecimal('#FF4500');

  const GREEN_START = hexToDecimal('#008000');
  const GREEN_END = hexToDecimal('#00FF00');

  const COLOR_RANGES: Record<ColorKey, number[]> = {
    ブルー: [BLUE_START, BLUE_END],
    レッド: [RED_START, RED_END],
    グリーン: [GREEN_START, GREEN_END],
  };

  const fetchPalettes = async (colorRange: number[]) => {
    const fetchPalettes = await apiClient.item.$post({ body: { type: 'color', list: colorRange } });
    console.log(fetchPalettes);
    return fetchPalettes;
  };

  const handleFetch = () => {
    const colorRange = COLOR_RANGES[selectedColor];
    fetchPalettes(colorRange);
  };

  return (
    <div className={styles.container}>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value as ColorKey)}>
        {Object.keys(COLOR_RANGES).map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <button onClick={handleFetch}>パレットを取得</button>
    </div>
  );
};

export default PaletteListPage;
