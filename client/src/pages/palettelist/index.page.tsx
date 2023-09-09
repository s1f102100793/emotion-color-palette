import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

type ColorKey = 'ブルー' | 'レッド' | 'グリーン';

const BLUE_START = (0 << 16) + (0 << 8) + 255; // #0000FF
const BLUE_END = (135 << 16) + (206 << 8) + 250; // #87CEFA

const RED_START = (255 << 16) + (0 << 8) + 0; // #FF0000
const RED_END = (255 << 16) + (69 << 8) + 0; // #FF4500

const GREEN_START = (0 << 16) + (128 << 8) + 0; // #008000
const GREEN_END = (0 << 16) + (255 << 8) + 0; // #00FF00

const COLOR_RANGES: Record<ColorKey, string[]> = {
  ブルー: [BLUE_START.toString(), BLUE_END.toString()],
  レッド: [RED_START.toString(), RED_END.toString()],
  グリーン: [GREEN_START.toString(), GREEN_END.toString()],
};

const PaletteListPage = () => {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('ブルー');

  const fetchPalettes = async (colorRange: string[]) => {
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
