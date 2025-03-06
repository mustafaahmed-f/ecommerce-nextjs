import { paginationFunction } from "./paginationFn";

export class apiFeatures {
  query: any;
  queryObj: any;
  constructor(query: any, queryObj: any) {
    this.query = query;
    this.queryObj = queryObj;
  }

  pagination() {
    const { page, size } = this.queryObj;
    const { limit, skip } = paginationFunction({ page, size });
    this.query = this.query.limit(limit).skip(skip);
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split("/").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
}
