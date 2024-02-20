import { Model, Mongoose, Schema } from "mongoose";
import ServiceAttributes from "./service.entity";

export type ServiceDocument = Document & ServiceAttributes;
export const ServiceSchema: Schema = new Schema (
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        costo: { type: String, required: true },
        active: { type: String, required: true, default: '1' },
        idDelete: { type: String, required: true, default: '0' },
        _deletedAt: { type: Date },
        createdBy: Object,
        updatedBy: Object,
    },
    { timestamps: true },
);



const Service  = (mongoose: Mongoose) =>
  mongoose.model<ServiceDocument>('Service', ServiceSchema, 'mst-service') as Model<
    ServiceDocument,
    Record<string, unknown>
  >;

export default Service;