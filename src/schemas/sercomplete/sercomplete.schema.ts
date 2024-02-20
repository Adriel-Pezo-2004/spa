import { Model, Mongoose, Schema } from "mongoose";
import { ServiceSchema } from "../service/service.schema";
import SerCompleteAttributes from "./sercomplete.entity";

export type SerCompleteDocument = Document & SerCompleteAttributes;
export const SerCompleteSchema: Schema = new Schema (
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        typeOfpay: { type: String, required: true },
        servicio: { type: ServiceSchema, required: true },
        idDelete: { type: String, required: true, default: '0' },
        _deletedAt: { type: Date },
        createdBy: Object,
        updatedBy: Object,
    },
    { timestamps: true },
);


const SerComplete  = (mongoose: Mongoose) =>
  mongoose.model<SerCompleteDocument>('serComplete', SerCompleteSchema, 'trs-serComplete') as Model<
  SerCompleteDocument,
    Record<string, unknown>
  >;

export default SerComplete;