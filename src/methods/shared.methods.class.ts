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
import { GetDocumentsClass } from 'src/utils/getDocuments.methods';
import { PatchDocumentsClass } from 'src/utils/patchDocuments.methods';
  
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
  
  export default class CommonSchemaClass extends Model implements ModelExt<any> {
    /**
     * Get documents
     */
    static getDocuments = GetDocumentsClass.getDocuments;
    /**
     * Get document
     */
    static getDocument = GetDocumentsClass.getDocument;
    /**
     * Get documents count
     */
    static getDocumentsCount = GetDocumentsClass.getDocumentsCount;
    /**
     * Patch documents bulk
     * */
    static patchDocumentsBulk = PatchDocumentsClass.patchDocumentsBulk;
    /**
     * Get documents with count
     */
    static getDocumentsWithCount = GetDocumentsClass.getDocumentsWithCount;
  
    /**
     * Create document with genId
     */
    static createGenId = PatchDocumentsClass.createGenId;
  
    /**
     * Update one with query
     */
    static updateOneWithQuery = PatchDocumentsClass.updateOneWithQuery;
  }
  