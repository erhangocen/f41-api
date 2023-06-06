import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {

    const {id} = req.body;

    try{
        await db.post.delete({where:{id:id}})
        return res.status(200).json({"success": "true"});
    }catch (error){
        return res.status(500).json({error:error})
    }
}

export default withMethods([RequestMethods.POST], handler)
