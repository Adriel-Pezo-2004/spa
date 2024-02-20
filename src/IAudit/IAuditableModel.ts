import mongoose from 'mongoose';

export class IAuditableModel {
  _id?: mongoose.Types.ObjectId;
  enabled?: boolean;
  active?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: Partial<any>;
  updatedBy?: Partial<any>;
}
