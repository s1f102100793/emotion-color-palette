import { apiClient } from 'src/utils/apiClient';
import styles from './palettelist.module.css';

const fetchPalettes = async () => {
  const fetchPalettes = await apiClient.color.$get({ body: { type: 'number', list: 5 } });
  console.log(fetchPalettes);
  return fetchPalettes;
};

const PaletteListPage = () => {
  return (
    <div className={styles.container}>
      <button onClick={fetchPalettes}>ああああ</button>
    </div>
  );
};

export default PaletteListPage;
