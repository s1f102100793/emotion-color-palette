import { useEffect } from 'react';
import LeftSidebar from 'src/components/LeftSidebar/LeftSidebar';
import MainContent from 'src/components/MainContent/MainContent';
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
      <MainContent
        palettes={palettes}
        getTextColor={getTextColor}
        handleColorBoxClick={handleColorBoxClick}
        setHoveredColor={setHoveredColor}
        copiedColor={copiedColor}
        hoveredColor={hoveredColor}
        handleLikeClick={handleLikeClick}
        timeSince={timeSince}
      />
    </div>
  );
};

export default PaletteListPage;
