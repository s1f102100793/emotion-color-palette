import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(inputValue);
    const res = await apiClient.color.$post({ body: { text: inputValue, number: 5 } });
    console.log(res);
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
        <button onClick={handleSubmit}>送信</button>
      </div>
    </>
  );
};

export default Home;
