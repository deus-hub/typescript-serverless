import { NextFunction, Request, Response } from "express"
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../secrets";
import { badRequestException } from "../exceptions/bad-request";
import { errorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";
import { notFoundException } from "../exceptions/not-found";

export const signup = async (req:Request, res:Response, next:NextFunction) => {
    SignUpSchema.parse(req.body)
        const {name, email, password} = req.body;
    
        let user = await prismaClient.user.findFirst({where: {email}})
    
        if (user) {
            new badRequestException("User already exists", errorCodes.NOT_FOUND);
        }
    
        user = await prismaClient.user.create({
            data:{
                name,
                email,
                password: hashSync(password, 10)
            }
        })
        
        res.json(user)

}

export const login = async (req:Request, res:Response, next:NextFunction) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email : email}})

    if (!user) {
        throw new notFoundException("User does not exist", errorCodes.NOT_FOUND);
    }
    if (!compareSync(password, user.password)) {
        throw new badRequestException("Incorrrect username or password", errorCodes.FORBIDDEN);
    }

    const token = jwt.sign({
         userId: user.id
    },JWT_SECRET)

    res.json({user, token} )
}

export const user = async(req:Request, res:Response) => {
    res.json(req.user)
}