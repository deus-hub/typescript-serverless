import { errorCodes, HttpException } from "./root";

export class unAuthorizedException extends HttpException
{
     constructor(message:string, errorCode:errorCodes)
     {
        super(message, errorCode, 401, null)
     }
}