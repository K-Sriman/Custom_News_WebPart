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
  const[showUncategorized, setShowUncategorized] = useState<boolean>(true);

  const backgroundColors = [
     '#2C5C5C', '#519E8A', '#B2D8B2', '#88C057',
    '#D4EDB5', '#35605A', '#2E8B57', '#447C69', '#60929E',
    '#35424A', '#3E4C59', '#627C85', '#708D81', '#8FA9A3',
    '#A9CBB7', '#3C8DAD', '#5DA9E9', '#7BB6A4','#1F3B4D', '#99C24D'
  ];
  
  useEffect(():void => {

    const loadCounts = async() : Promise<void> => {
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

    loadCounts().catch(console.error);
  }, []);

  
  const toggleUncategorized=() : void=>{
    setShowUncategorized(prev => !prev);
  }
  
  const filteredCategories = Object.keys(categoryCounts).filter(category =>
    showUncategorized ? true : category !== "Uncategorized"
  );


  return (
    <> 
      <div className={styles.OutterContainer} style={{ position: 'relative' }}>
        <button
          onClick={toggleUncategorized} 
          className={styles.uncategorizedToggle}
        >
          {showUncategorized ? 'Hide Uncategorized' : 'Show Uncategorized'}
        </button>
  
        {loading ? (
          <div>Loading category counts...</div>
        ) : filteredCategories.length === 0 ? (
          <div>No page categories exist</div> 
        ) : (
          filteredCategories.map((category, index) => (
            <div
              key={category}
              className={styles.card}
              style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
            >
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