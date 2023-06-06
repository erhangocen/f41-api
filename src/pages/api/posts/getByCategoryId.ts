import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async(req: NextApiRequest, res: NextApiResponse) => {

    const categoryId = req.query.categoryId?.toString();

    try{
        const a = await db.post.findMany({where:{categoryId:categoryId}});
        return res.status(200).json({"data": a});
    }catch (error){
        return res.status(500).json({error:error})
    }
}

export default withMethods([RequestMethods.GET], handler)