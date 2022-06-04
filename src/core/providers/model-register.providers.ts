import { Connection, Document, Model, Schema } from "mongoose";
import { TENANT_OWN_DB_CONNECTION } from "../utils/system.config";


export interface IModelInjectorProvider<T> {
    name: string;
    schema: T;
    collectionName?: string;
}

export const RegisterModelsProviders = (models: IModelInjectorProvider<Schema<Document<any, any, any>, Model<any, any, any>, undefined, any>>[]) => {

    return models.map(element => {
        return {
            provide: element.name,
            useFactory: (connection: Connection) => connection.model(element.name, element.schema, element.collectionName || element.name),
            inject: [TENANT_OWN_DB_CONNECTION]
        }
    });
}