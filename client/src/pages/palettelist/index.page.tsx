import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
    fetchPalettes,
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
    rangesToSendcolorKey,
  } = usePaletteList();

  useEffect(() => {
    fetchPalettes(rangesToSendcolorKey, 'number');
  }, [fetchPalettes, rangesToSendcolorKey]);

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
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@100&display=swap"
          rel="stylesheet"
        />
      </Helmet>
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
    </>
  );
};

export default PaletteListPage;
