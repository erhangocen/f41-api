import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id, name, description, categoryId, iconUrl } = req.body;

    try {
        if (!req.body || !id) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await db.group.update({
            where: { id: id },
            data: {
                name: name,
                description: description,
                categoryId: categoryId,
                iconUrl: iconUrl
            },
        })
        return res.status(200).json(createResponseData("Group successfully updated!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)