export class HttpException extends Error
{
    message: string;
    errorCode: any;
    statusCode: number;
    errors: errorCodes;

    constructor(message:string, errorCode:errorCodes, statusCode:number, error:any)
    {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }

}
export enum errorCodes
{
    NOT_FOUND = 404,
    ALREADY_EXIST = 301,
    VALIDATION_ERROR = 433,
    UNPROCESSABLE_ENTITY = 433,
    UNCAUGHT_EXCEPTION = 5000,
    FORBIDDEN = 301,
    UNAUTHORIZED = 401
}