export interface news{
 Name:string;
 createdBy:string;
}

export interface PageItem {
  Id: number;
  Title: string;
  BannerImageUrl: string;
  FileRef: string;
  PageCategory: string | undefined;
  Description?: string;
  Editor?: {
    Title: string;
    Id: number;
    EMail: string;
  };
}