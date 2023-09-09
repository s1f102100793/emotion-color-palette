import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

type ColorKey = 'ブルー' | 'レッド' | 'グリーン';

const PaletteListPage = () => {
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);

  const hexToDecimal = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16).toString().padStart(3, '0');
    const g = parseInt(hex.slice(3, 5), 16).toString().padStart(3, '0');
    const b = parseInt(hex.slice(5, 7), 16).toString().padStart(3, '0');
    return parseInt(r + g + b);
  };

  const colorRanges = {
    ブルー: [hexToDecimal('#0000FF'), hexToDecimal('#87CEFA')],
    レッド: [hexToDecimal('#FF0000'), hexToDecimal('#FF4500')],
    グリーン: [hexToDecimal('#008000'), hexToDecimal('#00FF00')],
  };

  const fetchPalettes = async (colorRanges: number[][]) => {
    const fetchPalettes = await apiClient.item.$post({
      body: { type: 'color', list: colorRanges },
    });
    console.log(fetchPalettes);
    return fetchPalettes;
  };

  const handleFetch = () => {
    const rangesToSend = selectedColors.map((colorKey) => colorRanges[colorKey]);
    fetchPalettes(rangesToSend);
  };

  const handleColorChange = (color: ColorKey) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className={styles.container}>
      {Object.keys(colorRanges).map((color) => (
        <div key={color}>
          <input
            type="checkbox"
            checked={selectedColors.includes(color as ColorKey)}
            onChange={() => handleColorChange(color as ColorKey)}
          />
          <label>{color}</label>
        </div>
      ))}
      <button onClick={handleFetch}>パレットを取得</button>
    </div>
  );
};

export default PaletteListPage;
