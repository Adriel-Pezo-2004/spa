export enum updateBulkActions {
    updateOne = 'updateOne',
    updateMany = 'updateMany',
    replaceOne = 'replaceOne',
    deleteOne = 'deleteOne',
    deleteMany = 'deleteMany',
    insertOne = 'insertOne',
    arrayFilters = 'arrayFilters',
  }
  

export interface PatchBulkInterface {
  action: updateBulkActions;
  filters: Record<any, any>;
  fields: Record<any, any>;
  arrayFilters?: Record<any, any>[];
}

export interface QueryInterface {
  query: Record<any, string>;
  projection?: string;
  limit?: any;
  sort?: [string, 1 | -1][];
  skip?: number;
  populate?: string;
}

export interface DocumentWithCountInterface {
  data: Record<string, any>[];
  pageInfo: {
    _id: string;
    count: number;
  };
}
