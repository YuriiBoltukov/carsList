export interface Car {
  unique_id: number;
  price: number;
  folder_id: string;
  mark_id: string;
  images: {
    [key: string]: string;
  };
}

export interface Meta {
  totalCount: number;
  currentPage: number;
  totalPages: number;
}