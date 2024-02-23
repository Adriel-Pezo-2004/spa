import { Model, SaveOptions, Types } from 'mongoose';
import { PatchBulkInterface, } from '../methods/interface';
import { updateBulkActions } from '../methods/interface';
import cleanDeep from 'clean-deep';
import { CombinedFilters } from './query.utils';
import { mapFindOptions } from './convertQueries';
/**
 * @class PatchDocumentsClass
 */
export class PatchDocumentsClass extends Model {
  /**
   * @description Patch documents in bulk
   * @param props
   */
  static patchDocumentsBulk(props: PatchBulkInterface[]) {
    const bulk: any = this.collection.initializeUnorderedBulkOp();
    props.forEach((prop) => {
      switch (prop.action) {
        case updateBulkActions.arrayFilters:
          bulk
            .find(prop.filters)
            .arrayFilters(prop.arrayFilters)
            .updateOne({ $set: prop.fields });
          break;
        case updateBulkActions.updateOne:
          bulk.find(prop.filters).updateOne({ $set: prop.fields });
          break;
        case updateBulkActions.updateMany:
          bulk.find(prop.filters).updateMany({ $set: prop.fields });
          break;
        case updateBulkActions.replaceOne:
          bulk.find(prop.filters).replaceOne(prop.fields);
          break;
        case updateBulkActions.deleteOne:
          bulk.find(prop.filters).deleteOne();
          break;
        case updateBulkActions.deleteMany:
          bulk.find(prop.filters).deleteMany();
          break;
        case updateBulkActions.insertOne:
          bulk.insert(prop.fields);
          break;
        default:
          break;
      }
    });
    return bulk.execute();
  }

  static createGenId(data: any, user?: any, saveOptions?: SaveOptions) {
    !data._id && (data._id = new Types.ObjectId());
    data.created_by = user ?? data.created_by;
    data.updated_by = user ?? data.updated_by;
    return this.create(cleanDeep(data), saveOptions);
  }

  static updateOneWithQuery(
    props: CombinedFilters<any>,
    updateProperties: Record<string, any>,
    user?: string,
    saveOptions?: SaveOptions
  ) {
    updateProperties.updated_by = user ?? updateProperties.updated_by;
    const { query } = mapFindOptions(props);
    return this.updateOne(query, updateProperties, saveOptions).exec();
  }
}