import { Logger } from '@nestjs/common';
import {
  AggregateOptions,
  Connection,
  Document,
  DocumentSetOptions,
  InsertManyOptions,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateWriteOpResult,
} from 'mongoose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LeanDocument } from 'mongoose';
import { ModelExt } from './shared.methods.class';
import { CombinedFilter } from '../utils/query.util';
import { CombinedFilters } from '../utils/query.utils';
import {
  DocumentWithCountInterface,
  PatchBulkInterface,
} from './interface';
import { BulkWriteResult } from 'mongodb';
import { getAggregateData } from '../utils/get-aggregate-data';
import { mapFindOptions } from '../utils/convertQueries';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cleanDeep = require('clean-deep');

export abstract class AbstractRepository<
  TDocument extends Document,
  TAttributes,
> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: ModelExt<TDocument>,
    private readonly connection: Connection,
  ) {}

  /**
   * Return the connection
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Return a session for a transaction
   */
  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  /**
   * Get documents by buildQuery
   * @param props buildQuery
   * @param options
   */
  async getDocuments(
    props: CombinedFilter<TAttributes>,
    options?: DocumentSetOptions,
  ): Promise<TAttributes[]> {
    return await this.model.getDocuments(props, options);
  }

  /**
   * Get document by buildQuery
   * @param props buildQuery
   * @param options
   */
  async getDocument(
    props: CombinedFilter<TAttributes>,
    options?: DocumentSetOptions,
  ): Promise<TAttributes> {
    return await this.model.getDocument(props, options);
  }

  /**
   * Get number of documents by buildQuery
   * @param props buildQuery
   * @param options
   */
  async getDocumentsCount(
    props: CombinedFilter<TAttributes>,
    options?: DocumentSetOptions,
  ): Promise<number> {
    return await this.model.getDocumentsCount(props, options);
  }

  /**
   * Get documents with total by buildQuery
   * @param props buildQuery
   * @param options
   */
  async getDocumentsWithCount(
    props: CombinedFilter<TAttributes>,
    options?: AggregateOptions,
  ): Promise<DocumentWithCountInterface> {
    return await this.model.getDocumentsWithCount(props, options);
  }

  /**
   * Get documents by search
   * @param props buildQuery
   * @param search
   */
  getDocumentsBySearch(
    props: CombinedFilters<TAttributes>,
    search: string,
  ): Promise<TAttributes[]> {
    const { query, project } = getAggregateData(props);
    return this.model
      .aggregate([
        {
          $match: {
            $text: {
              $search: search,
              $caseSensitive: false,
              $diacriticSensitive: false,
            },
            ...cleanDeep(query),
          },
        },
        {
          $addFields: {
            score: { $meta: 'textScore' },
          },
        },
        ...project,
        {
          $sort: {
            score: -1,
          },
        },
      ])
      .allowDiskUse(true)
      .read('secondaryPreferred')
      .exec();
  }

  /**
   * Create a document
   * @param data
   * @param user
   * @param saveOptions
   */
  async createGenId(
    data: TDocument,
    user?: any,
    saveOptions?: SaveOptions,
  ): Promise<TAttributes> {
    return await this.model.createGenId(data, user, saveOptions);
  }

  /**
   * Create bulk documents
   * @param data
   * @param user
   * @param options
   */
  async createDocumentsBulk(
    data: TDocument[],
    user?: any,
    options?: InsertManyOptions,
  ): Promise<LeanDocument<TAttributes>[]> {
    data.forEach((d: any) => {
      d._id = new Types.ObjectId();
      d.created_by = user ?? d.created_by;
      d.updated_by = user ?? d.updated_by;
    });
    return await this.model.create(data, options);
  }

  /**
   * Update a document by buildQuery
   * @param props buildQuery
   * @param data
   * @param user
   * @param options
   */
  async updateOneWithQuery(
    props: CombinedFilter<TAttributes>,
    data: Partial<TAttributes>,
    user?: any,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    if (options && options.new === true) {
    }
    return await this.model.updateOneWithQuery(props, data, user, options);
  }

  /**
   * Update bulk documents
   * @param data
   */
  async patchDocumentsBulk(
    data: PatchBulkInterface[],
  ): Promise<BulkWriteResult> {
    return await this.model.patchDocumentsBulk(data);
  }

  /**
   * Delete a document by buildQuery
   * @param props buildQuery
   * @param options
   */
  async deleteOneWithQuery(
    props: CombinedFilters<TAttributes>,
    options?: any,
  ) {
    const { query } = mapFindOptions(props);
    return await this.model.deleteOne(query, options);
  }

  /**
   * Delete many documents by buildQuery
   * @param props buildQuery
   * @param options
   */
  async deleteManyWithQuery(
    props: CombinedFilters<TAttributes>,
    options?: any,
  ) {
    const { query } = mapFindOptions(props);
    return await this.model.deleteMany(query, options);
  }
}
