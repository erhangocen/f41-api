import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const id = req.query.id?.toString();

    try {
        if (!id) {
            return res.status(400).json({ "error": "id cannot be empty" });
        }
        await db.group.delete({
            where: { id: id },
        })
        return res.status(200).json(createResponseData("Group successfully deleted!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.DELETE], handler, false)