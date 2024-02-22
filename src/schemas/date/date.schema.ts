import { Model, Mongoose, Schema, Document } from "mongoose";
import { ServiceSchema } from "../service/service.schema";
import DateAttributes from "./date.entity";
import CommonSchemaClass, { ModelExt } from "src/methods/shared.methods.class";

export type DateModelExt<T> = ModelExt<T>;
export type DateDocument = Document & DateAttributes;
export const DateSchema: Schema = new Schema (
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
        code : {type: String, required: true, unique: true},
        name: { type: String, required: true },
        telefono: { type: String, required: true },
        servicio: { type: ServiceSchema, required: true },
        separated: { type: String, required: true, default: '1' },
        idDelete: { type: String, required: true, default: '0' },
        _deletedAt: { type: Date },
        createdBy: Object,
        updatedBy: Object,
    },
    { timestamps: true },
);

DateSchema.statics.getDocuments = CommonSchemaClass.getDocuments;
DateSchema.statics.getDocument = CommonSchemaClass.getDocument;
DateSchema.statics.getDocumentsCount = CommonSchemaClass.getDocumentsCount;
DateSchema.statics.patchDocumentsBulk = CommonSchemaClass.patchDocumentsBulk;
DateSchema.statics.getDocumentsWithCount = CommonSchemaClass.getDocumentsWithCount;
DateSchema.statics.createGenId = CommonSchemaClass.createGenId;
DateSchema.statics.updateOneWithQuery = CommonSchemaClass.updateOneWithQuery;

const Dated  = (mongoose: Mongoose) =>
  mongoose.model<DateDocument>('Date', DateSchema, 'trs-date') as Model<
    DateDocument,
    Record<string, unknown>
  >;

export default Dated;