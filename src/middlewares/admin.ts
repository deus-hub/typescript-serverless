import { NextFunction, Request, Response } from "express";
import { unAuthorizedException } from "../exceptions/unauthorized";
import { errorCodes } from "../exceptions/root";


const adminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const user = req.user
    if (user ) {
        if (user.role == 'ADMIN') {
            next()
        } else {
            next(new unAuthorizedException("user not an admin", errorCodes.UNAUTHORIZED))
        }
    } else {
        next(new unAuthorizedException("unauthorized", errorCodes.UNAUTHORIZED))
    }
    
}

export default adminMiddleware