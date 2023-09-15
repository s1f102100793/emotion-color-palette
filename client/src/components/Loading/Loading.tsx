import styles from './Loading.module.css';

const Loading: React.FC = () => {
  const words = ['EMOTION', 'COLOR', 'PALATTE'];

  return (
    <div className={styles.container}>
      {words.map((word, index) => (
        <div
          key={index}
          className={styles.letter}
          style={{
            top: `calc(50% + ${index * 2.5}rem - ${(words.length * 2.5) / 2}rem)`, // 2.5remは行の高さとしています。適宜調整してください。
          }}
        >
          {word}
        </div>
      ))}

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={styles.mask}
          style={{
            animationDelay: `${3 + 0.2 * index}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Loading;
