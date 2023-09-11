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
    colorGroups,
    fetchPalettes,
    handleColorChange,
    handleNumberChange,
    handleFetch,
    rangesToSend,
    currentType,
  } = usePaletteList();

  useEffect(() => {
    console.log('useEffect is running');
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null;

    if (!sidebar) {
      return;
    }

    const stickyScrollPoint = 100;

    const handleScroll = () => {
      console.log('Scroll detected:', window.scrollY);
      if (window.scrollY > stickyScrollPoint) {
        sidebar.style.position = 'absolute';
        sidebar.style.top = `${stickyScrollPoint}px`;
      } else {
        sidebar.style.position = 'fixed';
        sidebar.style.top = '20px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('scroll', () => {
      console.log('Direct scroll listener: ', window.scrollY);
    });

    document.addEventListener('scroll', () => {
      console.log('Direct scroll listener on document: ', window.scrollY);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('This useEffect is running');
    const leftsidebar = document.querySelector('.leftsidebar') as HTMLElement | null;

    if (!leftsidebar) {
      return;
    }

    const initialTop = '10%';

    const handleScroll = () => {
      // leftsidebarの一番下の位置を取得
      const leftsidebarBottomPosition = leftsidebar.getBoundingClientRect().bottom;

      // ウィンドウの一番下の位置を取得
      const windowBottomPosition = window.innerHeight;

      // leftsidebarの一番下の位置がウィンドウの一番下の位置に達したか確認
      if (leftsidebarBottomPosition >= windowBottomPosition) {
        const difference = leftsidebarBottomPosition - windowBottomPosition;
        leftsidebar.style.top = `calc(${initialTop} - ${difference}px)`;
      } else {
        leftsidebar.style.top = initialTop;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPalettes(rangesToSend, currentType);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchPalettes, rangesToSend, currentType]);

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
