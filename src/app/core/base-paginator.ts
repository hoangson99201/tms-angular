import { PageEvent } from "@angular/material/paginator";

export abstract class BasePaginator {

  // BasePaginator() { }

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.refresh();
  }

  getParams() {
    let params: PagingParams = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    return params;
  }

  abstract refresh(): void;
}

export interface PagingResponse<T> {
  length: number;
  list: T[];
}

export interface PagingParams {
  pageSize: number,
  pageIndex: number,
}
