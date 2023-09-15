import Link from 'next/link';
import { useEffect } from 'react';
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
