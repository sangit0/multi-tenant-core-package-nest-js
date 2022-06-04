export interface PaginateResultInterface<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    perPage: number;
    currentPage: number;
    next?: string;
    previous?: string;
  }