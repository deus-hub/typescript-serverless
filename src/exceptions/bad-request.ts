import { errorCodes, HttpException } from "./root";

export class badRequestException extends HttpException
{
     constructor(message:string, errorCode:errorCodes)
     {
        super(message, errorCode, 400, null)
     }
}