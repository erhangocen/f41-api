import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async(req: NextApiRequest, res: NextApiResponse) => {

    const {title} = req.body;

    try{
        await db.category.create({
            data:{
                title: title
            },
        })
        return res.status(200).json(createResponseData("The category successfully added!"));
    }catch (error){
        return res.status(500).json({error:error})
    }
}

export default withMethods([RequestMethods.POST], handler)