export interface Car {
  unique_id: number;
  price: number;
  folder_id: string;
  mark_id: string;
  images: {
    [key: string]: string;
  };
  body_type: string;
  modification_id: string;
  state: string;
  run: number;
  year: number;
  registry_year: number;
  vin: string;
}

export interface Meta {
  totalCount: number;
  currentPage: number;
  totalPages: number;
}