export interface news{
 Name:string;
 createdBy:string;
}

export interface PageItem {
  Id: number;
  Title: string;
  BannerImageUrl: any;
  FileRef: string;
  PageCategory: string | null;
  Description?: string;
  Editor?: {
    Title: string;
    Id: number;
    EMail: string;
  };
  [key: string]: any;
}