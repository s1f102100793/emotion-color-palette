import { Helmet } from 'react-helmet';
import styles from './index.module.css';

const Home = () => {
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
        <p className={styles.description}>あなたの感情を色で表現しましょう。</p>
        {/* ここに他のコンポーネントや要素を追加可能 */}
      </div>
    </>
  );
};

export default Home;
