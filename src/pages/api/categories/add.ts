import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { name, photoUrl } = req.body;

    try {
        if (!req.body || !name || !photoUrl) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await db.category.create({
            data: {
                name: name,
                photoUrl: photoUrl
            },
        })
        return res.status(200).json(createResponseData("Category successfully added!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)