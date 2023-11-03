export interface Filter {
  value: string;
  genre: string;
  limit: number;
  page: number;
}

export interface DataFilterResponse {
  limit: number;
  page: number;
  totalRow: number;
  totalPage: number;
  value: string;
  genre: string;
}
