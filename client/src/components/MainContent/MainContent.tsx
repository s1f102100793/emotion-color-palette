import type { ReturnColorModel } from 'commonTypesWithClient/models';
import React from 'react';
import styles from 'src/pages/palettelist/palettelist.module.css';

type MainContentProps = {
  palettes: ReturnColorModel[];
  getTextColor: (hex: string) => '#000' | '#777' | '#fff';
  handleColorBoxClick: (color: string, paletteId: number) => void;
  setHoveredColor: (color: { color: string; paletteId: number } | null) => void;
  copiedColor: { color: string; paletteId: number } | null;
  hoveredColor: { color: string; paletteId: number } | null;
  handleLikeClick: (palette: ReturnColorModel) => void;
  timeSince: (date: Date) => string;
};

const MainContent: React.FC<MainContentProps> = ({
  palettes,
  getTextColor,
  handleColorBoxClick,
  setHoveredColor,
  copiedColor,
  hoveredColor,
  handleLikeClick,
  timeSince,
}) => {
  return (
    <div className={styles.mainContent}>
      {palettes.map((palette) => (
        <div key={palette.id} className={styles.paletteItem}>
          <div className={styles.colorBox}>
            {palette.color.map((color: string, idx: number) => (
              <div
                key={idx}
                className={styles.color}
                style={{ background: color, color: getTextColor(color) }}
                onClick={() => handleColorBoxClick(color, palette.id)}
                onMouseEnter={() => setHoveredColor({ color, paletteId: palette.id })}
                onMouseLeave={() => setHoveredColor(null)}
              >
                {copiedColor?.color === color && copiedColor?.paletteId === palette.id
                  ? '✔'
                  : hoveredColor?.color === color && hoveredColor?.paletteId === palette.id
                  ? color
                  : ''}
              </div>
            ))}
          </div>
          <h3>{palette.text}</h3>
          <div className={styles.info}>
            <div className={styles.likeContainer}>
              <span onClick={() => handleLikeClick(palette)}>❤️ {palette.like}</span>
            </div>
            <div className={styles.timeContainer}>{timeSince(new Date(palette.createdAt))}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
