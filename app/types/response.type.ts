export interface ResponsePagination<T> {
  limit: number;
  page: number;
  totalRows: number;
  totalPage: number;
  rows: T[];
}
