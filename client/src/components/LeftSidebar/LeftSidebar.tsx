import type { ColorKey, ColorRanges } from 'commonTypesWithClient/models';
import React from 'react';
import styles from 'src/pages/palettelist/palettelist.module.css';

type LeftSidebarProps = {
  selectedNumbers: number[];
  selectedColors: ColorKey[];
  handleNumberChange: (num: number) => void;
  colorRanges: ColorRanges;
  handleColorChange: (color: ColorKey) => void;
  handleFetch: () => void;
  currentCount: number;
};

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedNumbers,
  selectedColors,
  handleNumberChange,
  colorRanges,
  handleColorChange,
  handleFetch,
  currentCount,
}) => {
  return (
    <div className={styles.leftsidebar}>
      <div className={styles.targetCount}>
        <span>対象パレット</span>
        <div>
          <span className={styles.currentCount}>{currentCount}</span>
          <span className={styles.countLabel}>件</span>
        </div>
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
        {Object.keys(colorRanges).map((color) => (
          <div key={color} className={styles.option}>
            <input
              type="checkbox"
              checked={selectedColors.includes(color as ColorKey)}
              onChange={() => handleColorChange(color as ColorKey)}
            />
            <span className={styles.colorDisplay} style={{ backgroundColor: color }} />
            <label>{color}</label>
          </div>
        ))}
      </div>
      <button className={styles.fetchbutton} onClick={handleFetch}>
        パレットを取得
      </button>
    </div>
  );
};

export default LeftSidebar;
