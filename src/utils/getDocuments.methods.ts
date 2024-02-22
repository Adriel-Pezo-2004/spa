import { AggregateOptions, DocumentSetOptions, Model } from 'mongoose';
import cleanDeep from 'clean-deep';
import { isEmpty, merge } from 'lodash';
import { CombinedFilters } from './query.utils';
import { mapFindOptions } from './convertQueries';
/**
 * @class GetDocumentsClass
 */
export class GetDocumentsClass extends Model {
  /**
   * @description get documents from database with/without pagination, sorting, projection, limit (find)
   * @param query
   * @param projection
   * @param limit
   * @param sort
   * @param skip
   */

  static getDocuments(
    props: CombinedFilters<any>,
    options: DocumentSetOptions = {},
  ) {
    const {
      query = {},
      projection = '',
      limit = 0,
      sort = [],
      skip = 0,
      populate = '',
    } = mapFindOptions(props);
    return this.find(query, options)
      .read('secondaryPreferred')
      .select(projection)
      .populate(populate)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  /**
   * @description get document with query (findOne)
   * @param query
   * @param projection
   * @param limit
   * @param sort
   * @param skip
   * @param populate
   */
  static getDocument(
    props: CombinedFilters<any>,
    options: DocumentSetOptions = {},
  ) {
    const {
      query = {},
      projection = '',
      limit = 0,
      sort = [],
      skip = 0,
      populate = '',
    } = mapFindOptions(props);

    return this.findOne(query, options)
      .read('secondaryPreferred')
      .select(projection)
      .populate(populate)
      .lean()
      .exec();
  }

  /**
   * @description get count of documents from database with/without pagination, sorting, projection, limit
   * @param query
   * @param projection
   * @param limit
   * @param sort
   * @param skip
   */
  static getDocumentsCount(
    props: CombinedFilters<any>,
    options: any = {},
  ) {
    const { query = {}, sort = [] } = mapFindOptions(props);
    return this.countDocuments(query, options)
      .read('secondaryPreferred')
      .lean()
      .exec();
  }

  /**
   * @description get documents with count field from database with/without pagination, sorting, projection, limit
   * @param query
   * @param projection
   * @param limit
   * @param sort
   * @param skip@albatrosdeveloper/ave-utils-npm@albatrosdeveloper/ave-utils-npm
   */
  static getDocumentsWithCount(
    props: CombinedFilters<any>,
    options: AggregateOptions = {},
  ) {
    const {
      query = {},
      projection = '',
      limit = undefined,
      sort = [],
      skip = 0,
    } = mapFindOptions(props);
    function getArr(...args: any) {
      return args;
    }
    const aggregate = cleanDeep(
      [
        {
          $match: query,
        },
        {
          $project: !isEmpty(<any>projection)
            ? merge(
                getArr(
                  ...projection
                    .split(' ')
                    .map((item: string) => ({
                      [item.replace(/-/g, '')]: item.includes('-') ? 0 : 1,
                    }))
                    .flat(Infinity),
                ),
              )
            : undefined,
        },
        {
          $facet: {
            data: [{ $sort: sort }, { $skip: skip }, { $limit: limit }],
            pageInfo: [{ $group: { _id: null, total: { $sum: 1 } } }],
          },
        },
      ],
      { nullValues: false },
    );
    return this.aggregate(<any>aggregate, options)
      .allowDiskUse(true)
      .read('secondaryPreferred')
      .exec();
  }
}
