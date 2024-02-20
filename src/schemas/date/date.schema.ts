import { Schema } from "mongoose";
import { ServiceSchema } from "../service/service.schema";

export const DateSchema: Schema = new Schema (
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        telefono: { type: String, required: true },
        servicio: { type: ServiceSchema, required: true },
        date: { type: Date, required: true },
        separated: { type: String, required: true, default: '1' },
        idDelete: { type: String, required: true, default: '0' },
        _deletedAt: { type: Date },
        createdBy: Object,
        updatedBy: Object,
    },
    { timestamps: true },
);


/*const Dated  = (mongoose: Mongoose) =>
  mongoose.model<DateDocument>('Date', DateSchema, 'trs-date') as Model<
    DateDocument,
    Record<string, unknown>
  >;

export default Dated;*/