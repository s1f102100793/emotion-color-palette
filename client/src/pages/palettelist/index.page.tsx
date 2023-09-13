import { useEffect } from 'react';
import LeftSidebar from 'src/components/LeftSidebar/LeftSidebar';
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
      <LeftSidebar
        selectedNumbers={selectedNumbers}
        selectedColors={selectedColors}
        handleNumberChange={handleNumberChange}
        colorRanges={colorRanges}
        handleColorChange={handleColorChange}
        handleFetch={handleFetch}
        currentCount={currentCount}
      />
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
