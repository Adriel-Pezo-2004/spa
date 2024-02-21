import {
    DocumentWithCountInterface,
    PatchBulkInterface,
  } from '../utils/interfaces/DocumentWithCountInterface.interface';
  import {
    AggregateOptions,
    DocumentSetOptions,
    Model,
    SaveOptions,
  } from 'mongoose';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { LeanDocument } from 'mongoose';
  import { BulkWriteResult } from 'mongodb';
import { CombinedFilter } from 'src/utils/query.util';
  
  export interface ModelExt<T> extends Model<T> {
    getDocuments: (
      props: CombinedFilter<any>,
      options?: DocumentSetOptions,
    ) => Promise<LeanDocument<any>[]>;
    getDocument: (
      props: CombinedFilter<any>,
      options?: DocumentSetOptions,
    ) => Promise<LeanDocument<any>>;
    getDocumentsCount: (
      props: CombinedFilter<any>,
      options?: DocumentSetOptions,
    ) => Promise<number>;
    patchDocumentsBulk: (data: PatchBulkInterface[]) => Promise<BulkWriteResult>;
    getDocumentsWithCount: (
      props: CombinedFilter<any>,
      options?: AggregateOptions,
    ) => Promise<DocumentWithCountInterface>;
  
    createGenId(
      data: any,
      user?: any,
      saveOptions?: SaveOptions,
    ): Promise<LeanDocument<any> | any>;
    updateOneWithQuery(
      query: CombinedFilter<any>,
      data: any,
      user?: any,
      saveOptions?: SaveOptions,
    ): Promise<any>;
  }
  
  /**
   * @class CommonSchemaClass
   */
 