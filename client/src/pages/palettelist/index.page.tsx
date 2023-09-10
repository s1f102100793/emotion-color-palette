import type { ColorModel } from 'commonTypesWithClient/models';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

type ColorKey = 'ブルー' | 'レッド' | 'グリーン';

const PaletteListPage = () => {
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [palettes, setPalettes] = useState<ColorModel[]>([]);

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
    const fetchedPalettes = await apiClient.item.$post({
      body: { type, numberlist: selectedNumbers, colorlist: colorRanges },
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

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
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
      <div className={styles.mainContent}>
        {palettes.map((palette) => (
          <div key={palette.id} className={styles.paletteItem}>
            <div className={styles.colorBox}>
              {palette.color.map((color: string, idx: number) => (
                <div key={idx} className={styles.color} style={{ background: color }} />
              ))}
            </div>
            <h3>{palette.txet}</h3>
            <div className={styles.info}>
              <div>Like: {/* ここにlike数を入れる */}</div>
              <div>Created At: {new Date(palette.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteListPage;
