import { ValidationTypes } from "class-validator";

export interface IResponseResults {
    results: any;
    isValid: boolean;
    error?: ValidationTypes;
}