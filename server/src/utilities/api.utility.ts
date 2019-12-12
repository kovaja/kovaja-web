import { Response } from 'express';
import { IErrorResponse } from '../../../shared/api.schemas';
import { AppError } from '../models/AppError';
import { Logger } from './logger';

export class ApiUtility {
  public static handleError(res: Response): (error: Error | AppError) => void {
    return (error: Error | AppError): void => {
      Logger.error(error);

      const isAppError =  (error as AppError).isAppError;
      const status = isAppError ? 400 : 500;
      const message = isAppError ? error.message : 'Ups, something went wrong';

      const errorResponse: IErrorResponse = { error: message };

      res.status(status).send(errorResponse);
    };
  }

  public static handleResponse(res: Response): (data: any) => void {
    return (data: any): void => {
      res.status(200).send(data);
    };
  }
}