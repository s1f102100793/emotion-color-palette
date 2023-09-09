import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

const fetchPalettes = async () => {
  const fetchPalettes = await apiClient.color.$get();
  return fetchPalettes;
};

const PaletteListPage = () => {
  return <div className={styles.container} />;
};

export default PaletteListPage;
