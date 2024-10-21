import express, {Express, Request, Response } from 'express'
import { PORT } from '../secrets'
import rootRouter from './routes'
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from './middlewares/error';
import { SignUpSchema } from './schema/users';

const app:Express = express()
app.use(express.json())

export const prismaClient = new PrismaClient({
    log:['query']
})
// export const prismaClient = new PrismaClient({
//     log:['query']
// }).$extends({
//     query: {
//         user: {
//             create({args, query}) {
//                 args.data = SignUpSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// })


// app.get('/', (req:Request, res:Response) => {
//     res.send('working')
// })

app.use('/api', rootRouter)

app.use(errorMiddleware)

app.listen(PORT, ()=>{console.log('I am working ')})