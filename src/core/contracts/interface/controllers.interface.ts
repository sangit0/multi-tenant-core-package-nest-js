import { IResponseResults } from "../response/response.interface";

export interface IController {
    (): Promise<IResponseResults>;
}