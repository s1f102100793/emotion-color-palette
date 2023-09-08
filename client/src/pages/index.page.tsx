import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>感情カラーパレット</h1>
      <p className={styles.description}>あなたの感情を色で表現しましょう。</p>
      {/* ここに他のコンポーネントや要素を追加可能 */}
    </div>
  );
};

export default Home;
