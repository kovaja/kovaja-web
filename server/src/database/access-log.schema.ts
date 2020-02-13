import { Document, model, Model, Schema } from 'mongoose';

export interface IAccessLog {
  time: string;
  host: string;
  url: string;
  userAgent: string;
  ip: string;
}

interface IAccessLogModel extends IAccessLog, Document { }

const AccessLogSchema: Schema = new Schema({
  time: String,
  host: String,
  url: String,
  userAgent: String,
  ip: String
});

const AccessLogDB: Model<IAccessLogModel> = model<IAccessLogModel>('AccessLog', AccessLogSchema);


export class AccessLog {
  public static create(data: IAccessLog): Promise<IAccessLog> {
    return new AccessLogDB(data).save();
  }
}