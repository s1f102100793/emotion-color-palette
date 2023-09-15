import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHome } from 'src/hooks/useHome';
import { pagesPath } from 'src/utils/$path';
import styles from './index.module.css';

const Home = () => {
  const {
    inputValue,
    colors,
    selectedValue,
    loadingText,
    loading,
    chars,
    setChars,
    handleInputChange,
    handleChange,
    handleSubmit,
  } = useHome();

  useEffect(() => {
    if (loading) {
      const currentChars: string[] = [];
      for (let i = 0; i < loadingText.length; i++) {
        setTimeout(() => {
          currentChars.push(loadingText[i]);
          setChars([...currentChars]);
        }, i * 100);
      }
    } else {
      setChars([]);
    }
  }, [loading, setChars, loadingText]);

  // const [pageHeight, setPageHeight] = useState(window.innerHeight);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setPageHeight(window.innerHeight);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const fallTime = pageHeight / 600;

  // const droplets = Array.from({ length: 10 }).map((_, index) => (
  //   <div
  //     key={index}
  //     className={styles.droplet}
  //     style={{
  //       left: `${Math.random() * 100}vw`,
  //       animationDuration: `${fallTime}s`,
  //       width: `${5 + Math.random() * 10}px`,
  //       height: `${5 + Math.random() * 10}px`,
  //       animationDelay: `${Math.random() * 5}s`,
  //     }}
  //   />
  // ));

  interface PaintSplashProps {
    left: number;
    top: number;
    duration: number;
    delay: number;
    color: string;
    style?: React.CSSProperties;
  }

  interface MainPaintSplashProps {
    style: React.CSSProperties;
    color: string;
  }

  const generateRandomColor = () => {
    return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
  };

  const MainPaintSplash: React.FC<MainPaintSplashProps> = (props) => {
    return (
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" style={props.style}>
        <path d="M 10 10 L 90 10 L 50 90 Z" fill={props.color} />
      </svg>
    );
  };

  const PaintSplash: React.FC<PaintSplashProps> = ({ left, top, duration, delay, color }) => {
    return (
      <svg
        className="paint-splash"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          fill: color,
        }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="40" />
      </svg>
    );
  };

  const [mainSplashColor, setMainSplashColor] = useState<string>(generateRandomColor());
  const [splashes, setSplashes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const mainSplash = (
      <MainPaintSplash
        key="main"
        style={{
          left: '50%',
          top: '50%',
          animationDuration: '2s',
          animationDelay: '0s',
        }}
        color={mainSplashColor}
      />
    );

    const generatedSplashes = [
      mainSplash,
      ...Array.from({ length: 10 }).map((_, index) => (
        <PaintSplash
          key={index}
          left={Math.random() * 100}
          top={Math.random() * 100}
          duration={0.5 + Math.random()}
          delay={Math.random()}
          color={mainSplashColor}
        />
      )),
    ];

    setSplashes(generatedSplashes);
  }, [mainSplashColor]);
  return (
    <>
      {/* {droplets} */}

      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@100&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className={styles.container}>
        {splashes}
        <h1 className={styles.title}>感情カラーパレット</h1>
        <p className={styles.description}>あなたの感情を色で表現しよう。</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="感情を表現する文を入力..."
          className={styles.textInput}
        />
        <label className={styles.label} htmlFor="colorCount">
          色の数を選択:
        </label>
        <select
          className={styles.selectBox}
          id="colorCount"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <button onClick={handleSubmit} className={styles.submitButton}>
          送信
        </button>
        {loading ? (
          <div className={styles.loadingText}>
            {chars.map((char, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.5}s` }}
                className={styles.loadingChar}
              >
                {char}
              </span>
            ))}
          </div>
        ) : null}
        <div className={styles.colors}>
          {colors.map((color, index) => (
            <div key={index} className={styles.colorBox} style={{ backgroundColor: color }}>
              <span className={styles.colorCode}>{color}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.floatingButtonContainer}>
        <span className={styles.floatingText}>カラーパレットのリストへ</span>
        <Link href={pagesPath.palettelist.$url()} legacyBehavior>
          <a className={styles.floatingButton}>→</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
