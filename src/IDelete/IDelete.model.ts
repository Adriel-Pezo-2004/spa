import { IAuditableModel } from '../IAudit/IAuditableModel';

export class IDeletableModel extends IAuditableModel {
  idDelete?: string;
  _deletedAt?: Date;
}
