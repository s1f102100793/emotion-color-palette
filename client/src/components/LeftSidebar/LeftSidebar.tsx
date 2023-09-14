import type { ColorKey, ColorRanges } from 'commonTypesWithClient/models';
import React, { useEffect, useRef } from 'react';
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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isFixedRef = useRef(false);
  const originalTopRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number | null>(null);

  useEffect(() => {
    const checkSidebarPosition = () => {
      if (sidebarRef.current === null) return;

      const rect = sidebarRef.current.getBoundingClientRect();

      if (originalTopRef.current === null) {
        originalTopRef.current = rect.top;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > (lastScrollYRef.current || 0)) {
        if (rect.bottom <= window.innerHeight && !isFixedRef.current) {
          sidebarRef.current.style.position = 'fixed';
          sidebarRef.current.style.bottom = '0px';
          sidebarRef.current.style.left = '5%';
          isFixedRef.current = true;
        }
      }
      else {
        if (rect.top >= originalTopRef.current) {
          sidebarRef.current.style.position = 'relative';
          sidebarRef.current.style.top = 'auto';
          sidebarRef.current.style.bottom = 'auto';
          isFixedRef.current = false;
        } else if (isFixedRef.current) {
          sidebarRef.current.style.position = 'fixed';
          sidebarRef.current.style.top = '10px'; // 上のマージンを10pxに設定します
          sidebarRef.current.style.bottom = 'auto';
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', checkSidebarPosition);

    return () => {
      window.removeEventListener('scroll', checkSidebarPosition);
    };
  }, []);

  return (
    <div className={styles.leftsidebar} ref={sidebarRef}>
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
