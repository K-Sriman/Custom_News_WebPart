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

export const getNewswithFullDetails = async(): Promise<any> => {
    try{
        const fullDetails= sp.web.lists.getByTitle("Site Pages").items.getAll()
        return fullDetails;
    }
    catch(e){
        console.error(e);
        return {};
    }
}
export const getSpecificDetails = async (): Promise<any> => {
  try {
    // const fullDetailssss = await sp.web.lists
    //   .getByTitle("Site Pages")
    //   .items
    //   .select("Id", "Title", "PageCategory", "Description", "BannerImageUrl", "FileRef")
    //   .getAll();

      const fullDetails = await sp.web.lists
  .getByTitle("Site Pages")
  .items
  .select("Id", "Title", "Description", "PageCategory", "BannerImageUrl", "FileRef", "Editor/Title", "Editor/Id", "Editor/EMail")
  .expand("Editor")
  .getAll();

    return fullDetails;
  } catch (e) {
    console.error(e);
    return [];
  }
};

