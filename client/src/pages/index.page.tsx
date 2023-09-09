import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(4);
  const [loading, setLoading] = useState(false);

  const loadingText = '作成中...';
  const [chars, setChars] = useState<string[]>([]);

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
  }, [loading]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const valueAsNumber = Number(event.target.value);
    setSelectedValue(valueAsNumber);
    console.log('選択された値:', event.target.value);
  };

  const handleSubmit = async () => {
    setColors([]);
    setLoading(true);
    console.log(inputValue);
    const res = await apiClient.color.$post({ body: { text: inputValue, number: selectedValue } });
    console.log(res);
    if (res !== null && res !== undefined) {
      const colorsArray = Object.values(res);
      setColors(colorsArray);
      setLoading(false);
    } else {
      console.error('API response is undefined.');
      setLoading(false);
    }
  };

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
    </>
  );
};

export default Home;
