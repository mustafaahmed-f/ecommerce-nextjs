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

  filter() {
    const queryObj = { ...this.queryObj };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(eq|ne|gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}
