import { Model, Mongoose, Schema } from "mongoose";
import { ServiceSchema } from "../service/service.schema";
import IssueAttributes from "./issue.entity";
import { ModelExt } from "src/methods/shared.methods.class";

export type IssueModelExt<T> = ModelExt<T>;
export type IssueDocument = Document & IssueAttributes;
export const IssueSchema: Schema = new Schema (
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        pago: { type: String, required: true },
        servicio: { type: ServiceSchema, required: true },
        idDelete: { type: String, required: true, default: '0' },
        _deletedAt: { type: Date },
        createdBy: Object,
        updatedBy: Object,
    },
    { timestamps: true },
);



const Issue  = (mongoose: Mongoose) =>
  mongoose.model<IssueDocument>('Date', IssueSchema, 'trs-issue') as Model<
    IssueDocument,
    Record<string, unknown>
  >;

export default Issue;