import { Document, Model, Query } from 'mongoose';
import { PaginateParams } from './paginate.options.interface';
import { PaginateResultInterface } from './paginate.results.interface';

export class PaginationResults<PaginationEntity> {
  public results: PaginationEntity[];
  public currentPageTotal: number;
  public total: number;
  public perPage: number;
  public currentPage: number;

  constructor(paginationResults: PaginateResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.currentPageTotal = paginationResults.results.length;
    this.total = paginationResults.total;
    this.perPage = paginationResults.perPage;
    this.currentPage = paginationResults.currentPage;

  }
}


export async function paginate<T>(
  options: PaginateParams, model: any, filter: any, fields: any, isOnCollectionQuery = false): Promise<PaginationResults<T>> {
  try {
    const skip = (options.limit * options.page) - options.limit;

    const conditionsAndFilterOptions = [{
      $facet: {
        results: [
          { $project: fields },
          { $match: filter },
          { $skip: skip },
          { $limit: options.limit }
        ],
        totalCount: [
          { $match: filter },
          { $count: 'totalCount' }
        ]
      }
    }];
    let results = [];
    let totalCount = [];

    if (isOnCollectionQuery) {
      [{ results, totalCount }] = await model.aggregate(conditionsAndFilterOptions).toArray();
    }
    else {
      [{ results, totalCount }] = await model.aggregate(conditionsAndFilterOptions);
    }

    const total = totalCount && totalCount.length > 0 && totalCount[0]['totalCount'] || 0;

    return new PaginationResults<T>({
      results,
      total,
      perPage: options.limit,
      currentPage: options.page
    });
  } catch (error) {
    throw error
  }
}

function getAggregateData() {

}