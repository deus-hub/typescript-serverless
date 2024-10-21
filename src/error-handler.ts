import { NextFunction, Request, Response } from "express"
import { errorCodes, HttpException } from "./exceptions/root"
import { UncaughtException } from "./exceptions/uncaught-exceptions"
import { ZodError } from "zod"
import { badRequestException } from "./exceptions/bad-request"

export const errorHandler = (method: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error:any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                if (error instanceof ZodError) {
                    error = new badRequestException('validation exception', errorCodes.UNPROCESSABLE_ENTITY)
                } else {
                    exception = new UncaughtException('something went wrong', error, errorCodes.UNCAUGHT_EXCEPTION);
                    next(exception)
                }
            }
        }
    }
}
