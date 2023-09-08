import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(4);

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
    console.log(inputValue);
    const res = await apiClient.color.$post({ body: { text: inputValue, number: selectedValue } });
    console.log(res);
    if (res !== null && res !== undefined) {
      const colorsArray = Object.values(res);
      setColors(colorsArray);
    } else {
      console.error('API response is undefined.');
    }
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap"
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
        />
        <label htmlFor="colorCount">色の数を選択:</label>
        <select id="colorCount" value={selectedValue} onChange={handleChange}>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button onClick={handleSubmit}>送信</button>
        <div className={styles.colors}>
          {' '}
          {colors.map((color, index) => (
            <div key={index} className={styles.colorBox} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
