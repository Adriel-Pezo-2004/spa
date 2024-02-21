import { Model, Mongoose, Schema } from "mongoose";
import WorkersAttributes from "./workers.entity";
import { ModelExt } from "src/methods/shared.methods.class";



export type WorkersModelExt<T> = ModelExt<T>;

export type WorkersDocument = Document & WorkersAttributes;
export const WorkersSchema: Schema = new Schema (
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        typeofpayment: { type: String, required: true },
        idDelete: { type: String, required: true, default: '0' },
        _deletedAt: { type: Date },
        createdBy: Object,
        updatedBy: Object,
    },
    { timestamps: true },
);


const workers  = (mongoose: Mongoose) =>
  mongoose.model<WorkersDocument>('Workers', WorkersSchema, 'mst-workers') as Model<
  WorkersDocument,
    Record<string, unknown>
  >;

export default workers;