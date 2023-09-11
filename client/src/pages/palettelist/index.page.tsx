import type { ColorModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';
type ColorKey = '黒' | '青' | '緑' | '紫' | '灰色' | '赤' | 'オレンジ' | '黄色' | '白';

const PaletteListPage = () => {
  const [selectedColors, setSelectedColors] = useState<ColorKey[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [palettes, setPalettes] = useState<ColorModel[]>([]);
  const [currentCount, setCurrentCount] = useState(0);

  const hexToDecimal = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16).toString().padStart(3, '0');
    const g = parseInt(hex.slice(3, 5), 16).toString().padStart(3, '0');
    const b = parseInt(hex.slice(5, 7), 16).toString().padStart(3, '0');
    return parseInt(r + g + b);
  };

  type ColorRangeKeys =
    | 'R1G1B1'
    | 'R1G1B2'
    | 'R1G1B3'
    | 'R1G2B1'
    | 'R1G2B2'
    | 'R1G2B3'
    | 'R1G3B1'
    | 'R1G3B2'
    | 'R1G3B3'
    | 'R2G1B1'
    | 'R2G1B2'
    | 'R2G1B3'
    | 'R2G2B1'
    | 'R2G2B2'
    | 'R2G2B3'
    | 'R2G3B1'
    | 'R2G3B2'
    | 'R2G3B3'
    | 'R3G1B1'
    | 'R3G1B2'
    | 'R3G1B3'
    | 'R3G2B1'
    | 'R3G2B2'
    | 'R3G2B3'
    | 'R3G3B1'
    | 'R3G3B2'
    | 'R3G3B3';

  type ColorRanges = {
    [key in ColorRangeKeys]: number[];
  };

  const colorRanges: ColorRanges = {
    R1G1B1: [hexToDecimal('#000000'), hexToDecimal('#555555')],
    R1G1B2: [hexToDecimal('#000056'), hexToDecimal('#5555AA')],
    R1G1B3: [hexToDecimal('#0000AB'), hexToDecimal('#5555FF')],

    R1G2B1: [hexToDecimal('#005500'), hexToDecimal('#55AA55')],
    R1G2B2: [hexToDecimal('#005556'), hexToDecimal('#55AAAA')],
    R1G2B3: [hexToDecimal('#0055AB'), hexToDecimal('#55AAFF')],

    R1G3B1: [hexToDecimal('#00AA00'), hexToDecimal('#00FF55')],
    R1G3B2: [hexToDecimal('#00AA56'), hexToDecimal('#00FFAA')],
    R1G3B3: [hexToDecimal('#00AAAB'), hexToDecimal('#00FFFF')],

    R2G1B1: [hexToDecimal('#550000'), hexToDecimal('#AA5555')],
    R2G1B2: [hexToDecimal('#550056'), hexToDecimal('#AA55AA')],
    R2G1B3: [hexToDecimal('#5500AB'), hexToDecimal('#AA55FF')],

    R2G2B1: [hexToDecimal('#555500'), hexToDecimal('#AAAA55')],
    R2G2B2: [hexToDecimal('#555556'), hexToDecimal('#AAAAAA')],
    R2G2B3: [hexToDecimal('#5555AB'), hexToDecimal('#AAAAFF')],

    R2G3B1: [hexToDecimal('#55AA00'), hexToDecimal('#55FF55')],
    R2G3B2: [hexToDecimal('#55AA56'), hexToDecimal('#55FFAA')],
    R2G3B3: [hexToDecimal('#55AAAB'), hexToDecimal('#55FFFF')],

    R3G1B1: [hexToDecimal('#AA0000'), hexToDecimal('#FF5555')],
    R3G1B2: [hexToDecimal('#AA0056'), hexToDecimal('#FF55AA')],
    R3G1B3: [hexToDecimal('#AA00AB'), hexToDecimal('#FF55FF')],

    R3G2B1: [hexToDecimal('#AA5500'), hexToDecimal('#AAAA55')],
    R3G2B2: [hexToDecimal('#AA5556'), hexToDecimal('#AAAAAA')],
    R3G2B3: [hexToDecimal('#AA55AB'), hexToDecimal('#AAAAFF')],

    R3G3B1: [hexToDecimal('#AAAA00'), hexToDecimal('#FFFF55')],
    R3G3B2: [hexToDecimal('#AAAA56'), hexToDecimal('#FFFFAA')],
    R3G3B3: [hexToDecimal('#AAAAAB'), hexToDecimal('#FFFFFF')],
  };

  type ColorGroups = {
    黒: ColorRangeKeys[];
    青: ColorRangeKeys[];
    緑: ColorRangeKeys[];
    紫: ColorRangeKeys[];
    灰色: ColorRangeKeys[];
    赤: ColorRangeKeys[];
    オレンジ: ColorRangeKeys[];
    黄色: ColorRangeKeys[];
    白: ColorRangeKeys[];
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

  const fetchPalettes = async (colorGroups: number[][], type: 'color' | 'number' | 'with') => {
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

  useEffect(() => {
    const start = Date.now();

    const duration = 2000;

    const animateCount = () => {
      const now = Date.now();
      let elapsed = now - start;

      if (elapsed > duration) elapsed = duration;

      const progress = elapsed / duration;

      setCurrentCount(Math.round(progress * palettes.length));

      if (elapsed < duration) {
        requestAnimationFrame(animateCount);
      }
    };

    animateCount();
  }, [palettes.length]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.targetCount}>
          <span>対象パレット</span>
          <span>{currentCount}件</span>
        </div>

        <div className={styles.paletteNumbers}>
          <div className={styles.subtitle}>パレット数</div>

          {[4, 5, 6].map((num) => (
            <div key={num} className={styles.option}>
              <input
                type="checkbox"
                checked={selectedNumbers.includes(num)}
                onChange={() => handleNumberChange(num)}
              />
              <label>{num}色</label>
            </div>
          ))}
        </div>

        <div className={styles.paletteColors}>
          <div className={styles.subtitle}>カラー</div>

          {Object.keys(colorGroups).map((color) => (
            <div key={color} className={styles.option}>
              <input
                type="checkbox"
                checked={selectedColors.includes(color as ColorKey)}
                onChange={() => handleColorChange(color as ColorKey)}
              />
              <label>{color}</label>
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
            <h3>{palette.text}</h3>
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
