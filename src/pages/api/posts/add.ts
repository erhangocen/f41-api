import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { Prisma } from "@prisma/client";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";
import { any, z } from "zod";

/**
 * @swagger
 * /api/posts/add:
 *     post:
 *      tags:
 *          - Posts
 *      description: add teacher
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                      categoryId:
 *                         type: string
 *                      title:
 *                        type: string
 *                      image:
 *                        type: string
 *                      description:
 *                        type: string
 *      responses:
 *          200:
 *              description: response data
 * 
 */
const handler = async(req: NextApiRequest, res: NextApiResponse) => {

    const {categoryId,title,image,description} = req.body;

    try{
        var a = await db.category.findFirst({where:{id:categoryId}})
        if(a == null){
            return res.status(400).json({"error":"this category is not exist"})
        }
        await db.post.create({
            data:{
                categoryId: categoryId,
                title: title,
                image: image,
                description: description
            },
        })
        return res.status(200).json(createResponseData("The post successfully added!"));
    }catch (error){
        return res.status(500).json({error:error})
    }
}

export default withMethods([RequestMethods.POST], handler)