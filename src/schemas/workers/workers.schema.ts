import { Schema } from "mongoose";

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

/*

const workers  = (mongoose: Mongoose) =>
  mongoose.model<WorkersDocument>('Workers', WorkersSchema, 'mst-workers') as Model<
  WorkersDocument,
    Record<string, unknown>
  >;

export default workers;*/