import type { ColorKey, HSVModel, ReturnColorModel } from 'commonTypesWithClient/models';
import { useEffect } from 'react';
import { usePaletteList } from 'src/hooks/usePaletteList';
import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

const PaletteListPage = () => {
  const {
    selectedColors,
    selectedNumbers,
    palettes,
    setPalettes,
    currentCount,
    setCurrentCount,
    colorRanges,
    handleColorChange,
    handleNumberChange,
    handleFetch,
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

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchPalettes(rangesToSend, currentType);
  //   }, 100);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [fetchPalettes, rangesToSend, currentType]);

  // eslint-disable-next-line complexity
  const rgbToHSV = (rInput: number, gInput: number, bInput: number): HSVModel => {
    const r = rInput / 255;
    const g = gInput / 255;
    const b = bInput / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    const v = max;

    return { h: h * 360, s: s * 100, v: v * 100 };
  };

  const hexToHSVModel = (hex: string): HSVModel => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return rgbToHSV(r, g, b);
  };

  const handleLikeClick = async (palette: ReturnColorModel) => {
    const newLike = palette.like + 1;

    const newColors = palette.color.map((color) => hexToHSVModel(color));

    await apiClient.like.$post({
      body: {
        id: palette.id,
        text: palette.text,
        paletteSize: palette.paletteSize,
        color: newColors,
        like: newLike,
      },
    });

    // 状態も更新する
    setPalettes((prev) =>
      prev.map((p) => {
        if (p.id === palette.id) {
          return { ...p, like: newLike };
        }
        return p;
      })
    );
  };

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
                <div key={idx} className={styles.color} style={{ background: color }} />
              ))}
            </div>
            <h3>{palette.text}</h3>
            <div className={styles.info}>
              <div>
                <span onClick={() => handleLikeClick(palette)}>❤️ {palette.like}</span>
              </div>
              <div>Created At: {new Date(palette.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteListPage;
