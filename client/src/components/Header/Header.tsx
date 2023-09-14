import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pagesPath } from 'src/utils/$path';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollThreshold = 50;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <span className={styles.revealingText}>感情カラーパレット</span>
      <Link href={pagesPath.$url()}>
        <span>作成する</span>
      </Link>
    </header>
  );
};

export default Header;
