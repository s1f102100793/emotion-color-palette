import type { ColorKey } from 'commonTypesWithClient/models';
import { useEffect } from 'react';
import { usePaletteList } from 'src/hooks/usePaletteList';
import styles from './palettelist.module.css';

const PaletteListPage = () => {
  const {
    selectedColors,
    selectedNumbers,
    palettes,
    currentCount,
    setCurrentCount,
    colorRanges,
    handleColorChange,
    handleNumberChange,
    handleFetch,
    handleLikeClick,
    timeSince,
    getTextColor,
    copiedColor,
    hoveredColor,
    setHoveredColor,
    handleColorBoxClick,
  } = usePaletteList();

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
  }, [palettes.length, setCurrentCount]);

  return (
    <div className={styles.container}>
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
              <div>
                <span onClick={() => handleLikeClick(palette)}>❤️ {palette.like}</span>
              </div>
              <div>{timeSince(new Date(palette.createdAt))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteListPage;
