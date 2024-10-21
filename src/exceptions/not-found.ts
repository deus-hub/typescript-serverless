import { errorCodes, HttpException } from "./root";

export class notFoundException extends HttpException
{
     constructor(message:string, errorCode:errorCodes)
     {
        super(message, errorCode, 404, null)
     }
}