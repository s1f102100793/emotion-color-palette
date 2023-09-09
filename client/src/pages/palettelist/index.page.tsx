import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

type ColorKey = 'ブルー' | 'レッド' | 'グリーン';
const COLOR_RANGES: Record<ColorKey, string[]> = {
  ブルー: ['#0000FF', '#87CEFA'],
  レッド: ['#FF0000', '#FF4500'],
  グリーン: ['#008000', '#00FF00'],
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
