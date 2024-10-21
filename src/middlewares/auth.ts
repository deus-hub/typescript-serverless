import { NextFunction, Request, Response } from "express";
import { unAuthorizedException } from "../exceptions/unauthorized";
import { errorCodes } from "../exceptions/root";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../secrets";
import { prismaClient } from "..";

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        next(new unAuthorizedException("unauthorized", errorCodes.UNAUTHORIZED))
    } else {
        try {
            const payload = jwt.verify(token, JWT_SECRET) as any
            
            const user = await prismaClient.user.findFirst({where: {id: payload.userId}})
    
            if (!user) {
                next(new unAuthorizedException("unauthorized", errorCodes.UNAUTHORIZED))
            } else {
                req.user = user
                next()
            }
        } catch (error) {
            next(new unAuthorizedException("unauthorized", errorCodes.UNAUTHORIZED))
        }
    }
    
}

export default authMiddleware