import { sp } from "@pnp/sp";
import { CategoryCounts } from "../components/CustomNewsWebPart";

export const fetchCategoryCounts = async (): Promise<CategoryCounts> => {
  try {
    const items = await sp.web.lists.getByTitle("Site Pages").items.select("Id", "Title", "PageCategory").getAll();
    const counts: CategoryCounts = {};

    items.forEach((item: { PageCategory: string }) => {
      let category = "Uncategorized";
      if (item.PageCategory && typeof item.PageCategory === "string") {
        category = item.PageCategory;
      }
      counts[category] = (counts[category] || 0) + 1;
    });

    return counts;
  } catch (error) {
    console.error("Error fetching page categories:", error);
    return {};  
  }
};


