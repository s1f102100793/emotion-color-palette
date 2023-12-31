import { colorToHex, type ColorKey, type ColorRanges } from 'commonTypesWithClient/models';
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
  // const sidebarRef = useRef<HTMLDivElement>(null);
  // const isFixedRef = useRef(false);
  // const originalTopRef = useRef<number | null>(null);
  // const lastScrollYRef = useRef<number | null>(null);

  // type Func = (...args: any[]) => void;

  // const throttle = useCallback((func: Func, limit: number): Func => {
  //   let lastFunc: ReturnType<typeof setTimeout> | null = null;
  //   let lastRan: number | null = null;

  //   return (...args: any[]) => {
  //     if (lastRan === null) {
  //       func(...args);
  //       lastRan = Date.now();
  //     } else {
  //       if (lastFunc) {
  //         clearTimeout(lastFunc);
  //       }
  //       lastFunc = setTimeout(
  //         () => {
  //           if (lastRan !== null && Date.now() - lastRan >= limit) {
  //             func(...args);
  //             lastRan = Date.now();
  //           }
  //         },
  //         lastRan ? limit - (Date.now() - lastRan) : limit
  //       );
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   const checkSidebarPosition: Func = throttle(() => {
  //     if (sidebarRef.current === null) return;

  //     const rect = sidebarRef.current.getBoundingClientRect();

  //     if (originalTopRef.current === null) {
  //       console.log('aaaa');
  //       originalTopRef.current = rect.top;
  //     }

  //     const currentScrollY = window.scrollY;

  //     console.log('rect.top:', rect.top);
  //     console.log('window.innerHeight:', window.innerHeight);
  //     console.log('isFixed:', isFixedRef.current);

  //     if (currentScrollY > (lastScrollYRef.current !== null ? lastScrollYRef.current : 0)) {
  //       console.log('bbbb');
  //       if (
  //         rect.bottom <= window.innerHeight &&
  //         rect.bottom >= window.innerHeight - rect.height &&
  //         !isFixedRef.current
  //       ) {
  //         console.log('cccc');
  //         sidebarRef.current.style.position = 'fixed';
  //         sidebarRef.current.style.bottom = '0px';
  //         sidebarRef.current.style.left = '5%';
  //         isFixedRef.current = true;
  //       } else {
  //         sidebarRef.current.style.position = 'relative';
  //         isFixedRef.current = false;
  //       }
  //     } else if (currentScrollY < (lastScrollYRef.current !== null ? lastScrollYRef.current : 0)) {
  //       console.log('xxxx');
  //       if (rect.top >= 0 && rect.top <= rect.height && !isFixedRef.current) {
  //         console.log('yyyy');
  //         sidebarRef.current.style.position = 'fixed';
  //         sidebarRef.current.style.top = '0px';
  //         sidebarRef.current.style.left = '5%';
  //         isFixedRef.current = true;
  //       } else {
  //         sidebarRef.current.style.position = 'relative';
  //         isFixedRef.current = false;
  //       }
  //     }

  //     lastScrollYRef.current = currentScrollY;
  //   }, 100);

  //   window.addEventListener('scroll', checkSidebarPosition);

  //   return () => {
  //     window.removeEventListener('scroll', checkSidebarPosition);
  //   };
  // }, [throttle]);

  return (
    // <div className={styles.leftsidebar} ref={sidebarRef}>
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
          <label key={num} className={styles.option}>
            {' '}
            {/* div を label に変更 */}
            <input
              id={`num-${num}`}
              type="checkbox"
              checked={selectedNumbers.includes(num)}
              onChange={() => handleNumberChange(num)}
            />
            {num}色
          </label>
        ))}
      </div>
      <div className={styles.paletteColors}>
        <div className={styles.subtitle}>カラー</div>
        {Object.keys(colorRanges).map((color) => {
          const colorKey = color as ColorKey;
          return (
            <label key={color} className={styles.option}>
              <input
                id={`color-${color}`}
                type="checkbox"
                checked={selectedColors.includes(colorKey)}
                onChange={() => handleColorChange(colorKey)}
              />
              <span
                className={styles.colorDisplay}
                style={{ backgroundColor: colorToHex[colorKey] }}
              />
              <span>{color}</span>
            </label>
          );
        })}
      </div>

      <button className={styles.fetchbutton} onClick={handleFetch}>
        パレットを取得
      </button>
    </div>
  );
};

export default LeftSidebar;
