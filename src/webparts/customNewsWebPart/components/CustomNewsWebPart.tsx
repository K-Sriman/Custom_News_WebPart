import * as React from 'react';
import { useEffect, useState } from 'react';
import * as services from "../Providers/GetAllNews";
import styles from './CustomNewsWebPart.module.scss';

export interface CategoryCounts {
  [category: string]: number;
}

const PageCategoryCounter: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const loadCounts = async () => {
      try {
        const count = await services.fetchCategoryCounts();
        console.log(count);
        if (count) {
          setCategoryCounts(count);
        }
      } catch (error) {
        console.error("Error loading category counts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return (
    <> 
      <div className={styles.Heading}>Page Categories</div>
    <div className={styles.OutterContainer}>
      {loading ? (
        <div>Loading category counts...</div>
      ) : (
        
        Object.keys(categoryCounts).map((category) => (
          <div key={category} className={styles.card}>
            <div className={styles.category}>{category}</div>
            <div className={styles.categoryCounts}>{categoryCounts[category]}</div>
          </div>
            
          ))
        )}

    </div>
    </>
  );
};

export default PageCategoryCounter;