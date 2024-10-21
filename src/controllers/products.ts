import { Request, Response } from "express";
import { prismaClient } from "..";
import { notFoundException } from "../exceptions/not-found";
import { errorCodes } from "../exceptions/root";

export const createProduct = async(req:Request, res:Response) => {
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })

    res.json(product)
}

export const updateProduct = async(req:Request, res:Response) => {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',')
        }

        const updateProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        })

        res.json(updateProduct)


    } catch (error) {
        throw new notFoundException("product not found", errorCodes.NOT_FOUND)
    }
    
}
export const deleteProduct = async(req:Request, res:Response) => {
    try {

        const deleteProduct = await prismaClient.product.delete({
            where: {
                id: +req.params.id
            }
        })

        res.json(deleteProduct)


    } catch (error) {
        throw new notFoundException("product not found", errorCodes.NOT_FOUND)
    }
}
export const listProducts = async(req:Request, res:Response) => {
    try {

        const count = await prismaClient.product.count();
        const skip = +(req.query.skip?.toString() || '0');
        const products = await prismaClient.product.findMany({
            skip: skip,
            take: 10
        })

        res.json({
            count, data: products
        })

    } catch (error) {
        throw new notFoundException("product not found", errorCodes.NOT_FOUND)
    }
}
export const getProductById = async(req:Request, res:Response) => {
    try {

        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id : +req.params.id
            }
        })

        res.json(product)

    } catch (error) {
        throw new notFoundException("product not found", errorCodes.NOT_FOUND)
    }
}
