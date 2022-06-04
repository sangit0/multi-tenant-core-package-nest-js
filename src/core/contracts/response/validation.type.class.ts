import { HttpStatus } from "@nestjs/common";

export interface ErrorType {
  statusCode: HttpStatus;
  message: string;
}

export class ValidationResult {
  public isValid: boolean;
  public error?: ErrorType;

  constructor(returnType: ValidationResult) {
    this.isValid = returnType.isValid;
    this.error = returnType.error;
  }
}
