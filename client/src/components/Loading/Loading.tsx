import styles from './Loading.module.css';

const Loading: React.FC = () => {
  const words = ['EMOTION', 'COLOR', 'PALATTE'];

  return (
    <div className={styles.container}>
      <div className={styles.blackSreen}>
        {words.map((word, index) => (
          <div key={index} className={styles.letter} style={{ animationDelay: `${0.5 * index}s` }}>
            {word}
          </div>
        ))}
      </div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={styles.slide}
          style={{
            left: `${16.66 * index}%`,
            animationDelay: `${0.8 + 0.2 * index}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Loading;
