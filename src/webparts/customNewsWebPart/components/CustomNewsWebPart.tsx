import * as React from 'react';
import { useEffect, useState } from 'react';
import * as services from "../Providers/GetAllNews";
import styles from './CustomNewsWebPart.module.scss';
import { PageItem } from '../Model/news';




export interface CategoryCounts {
  [category: string]: number;
}

const PageCategoryCounter: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});
  const [groupedDetails, setGroupedDetails] = useState<Record<string, PageItem[]>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const fullDetails: PageItem[] = await services.getNewswithFullDetails();
        console.log(fullDetails);
        const AllCategeriesDetails = await services.getSpecificDetails();
        console.log(AllCategeriesDetails);
        const counts = await services.fetchCategoryCounts();

        if (AllCategeriesDetails) {
          const grouped: Record<string, PageItem[]> = {};
          AllCategeriesDetails.forEach((item: PageItem) => {
            const category = item.PageCategory || "Uncategorized";
            if (!grouped[category]) grouped[category] = [];
            grouped[category].push(item);
          });

          setGroupedDetails(grouped);
        }

        if (counts) {
          setCategoryCounts(counts);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
    return null;
  };

  return (
    <div className={styles.fullContainer}>
      {loading ? (
        <div>Loading category counts...</div>
      ) : (
        (Object.entries(groupedDetails) as [string, PageItem[]][]).map(([category, items]) => {
          const isExpanded = expandedCategories[category];
          const itemsToShow = isExpanded ? items : items.slice(0, 4);
          const hasMore = items.length > 4;

          return (
            <> <div key={category} className={styles.categorySection}>
              <h3 className="categoryTitle">
                {category} ({categoryCounts[category] || items.length})
              </h3>

              <div className={styles.categoryList}>
                {itemsToShow.map((item: PageItem) => (
                  <a href={item.FileRef} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                  <div key={item?.Id} className="categoryItem" style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                    <div className="BannerImage" style={{ marginRight: 10 }}>
                      <img height={100} width={150} src={item?.BannerImageUrl?.Url} alt={item.Title} />
                    </div>
                    <div className="newsData">
                      <strong>{item?.Title}</strong>
                      {item?.Description && <p>{item?.Description.substring(0, 50)}...</p>}
                      {item?.Editor && <h6> {item.Editor?.Title}</h6>}
                    </div>
                  </div>
                </a>

                ))}
              </div>

              {hasMore && (
                <button onClick={() => toggleCategory(category)} className={styles.seeMoreBtn}>
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}

                <span className={styles.separtor} />
            </div>
            <span className={styles.separtor} />
            </>
            
          );
        })
      )}
    </div>
  );
};

export default PageCategoryCounter;