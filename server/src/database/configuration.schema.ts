import { Document, model, Model, Schema } from 'mongoose';

export interface IConfiguration {
  pocketConsumerKey: string;
  pocketAccessKey: string;
}

interface IConfigurationModel extends IConfiguration, Document { }

const ConfigurationSchema: Schema = new Schema({
  pocketConsumerKey: String,
  pocketAccessKey: String
});

const ConfigurationDB: Model<IConfigurationModel> = model<IConfigurationModel>('Configuration', ConfigurationSchema);


export class Configuration {
  public static create(data: IConfiguration): Promise<IConfiguration> {
    return new ConfigurationDB(data).save();
  }

  public static read(): Promise<IConfiguration> {
    const query = {};

    const promiseExecutor = (resolve, reject): void => {
      ConfigurationDB.findOne(query, (err, record) => err ? reject(err) : resolve(record));
    };

    return new Promise(promiseExecutor);
  }

  public static deleteAll(): Promise<void> {
    const query = {};

    const promiseExecutor = (resolve, reject): void => {
      ConfigurationDB.deleteMany(query, (err) => err ? reject(err) : resolve());
    };

    return new Promise(promiseExecutor);
  }
}