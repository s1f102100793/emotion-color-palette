import type { ColorKey, HSVModel, ReturnColorModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
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

    setPalettes((prev) =>
      prev.map((p) => {
        if (p.id === palette.id) {
          return { ...p, like: newLike };
        }
        return p;
      })
    );
  };

  // eslint-disable-next-line complexity
  const timeSince = (date: Date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
      return 'Just now';
    }

    if (secondsPast < 3600) {
      return `${Math.round(secondsPast / 60)} minutes ago`;
    }

    if (secondsPast <= 86400) {
      return 'Today';
    }

    const daysPast = Math.round(secondsPast / 86400);
    if (daysPast === 1) {
      return '1 day ago';
    }
    if (daysPast < 30) {
      return `${daysPast} days ago`;
    }

    const monthsPast = Math.round(daysPast / 30);
    if (monthsPast === 1) {
      return '1 month ago';
    }
    if (monthsPast < 12) {
      return `${monthsPast} months ago`;
    }

    const yearsPast = Math.round(monthsPast / 12);
    if (yearsPast === 1) {
      return '1 year ago';
    }
    return `${yearsPast} years ago`;
  };

  const getTextColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (luminance > 0.7) {
      return '#000'; // 黒
    } else if (luminance > 0.4) {
      return '#777'; // 灰色
    } else {
      return '#fff'; // 白
    }
  };

  const [copiedColor, setCopiedColor] = useState<{ color: string; paletteId: number } | null>(null);
  const [hoveredColor, setHoveredColor] = useState<{ color: string; paletteId: number } | null>(
    null
  );

  const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  };

  const handleColorBoxClick = (color: string, paletteId: number) => {
    copyToClipboard(color);
    setCopiedColor({ color, paletteId });
    setTimeout(() => {
      setCopiedColor(null);
    }, 3000);
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
                <div
                  key={idx}
                  className={styles.color}
                  style={{ background: color, color: getTextColor(color) }}
                  // handleColorBoxClickを変更
                  onClick={() => handleColorBoxClick(color, palette.id)}
                  onMouseEnter={() => setHoveredColor({ color, paletteId: palette.id })}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  {/* チェックマークと色を表示する条件を変更 */}
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
