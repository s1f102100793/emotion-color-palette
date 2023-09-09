import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

type ColorKey = 'ブルー' | 'レッド' | 'グリーン';

const PaletteListPage = () => {
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

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

  const fetchPalettes = async (colorRanges: number[][], type: 'color' | 'number' | 'with') => {
    const fetchPalettes = await apiClient.item.$post({
      body: { type, numberlist: selectedNumbers, colorlist: colorRanges },
    });
    console.log(fetchPalettes);
    return fetchPalettes;
  };

  const handleFetch = () => {
    const rangesToSend = selectedColors.map((colorKey) => colorRanges[colorKey]);

    let type: 'color' | 'number' | 'with' = 'color';

    if (selectedNumbers.length === 0 && selectedColors.length > 0) {
      type = 'color';
    } else if (selectedNumbers.length > 0 && selectedColors.length === 0) {
      type = 'number';
    } else if (selectedNumbers.length > 0 && selectedColors.length > 0) {
      type = 'with';
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
      <div>
        {[4, 5, 6].map((num) => (
          <div key={num}>
            <input
              type="checkbox"
              checked={selectedNumbers.includes(num)}
              onChange={() => handleNumberChange(num)}
            />
            <label>{num}</label>
          </div>
        ))}
      </div>

      <button onClick={handleFetch}>パレットを取得</button>
    </div>
  );
};

export default PaletteListPage;
