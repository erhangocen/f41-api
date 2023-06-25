import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { group } from "console";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId, groupId } = req.body;

    try {
        if (!req.body || !userId || !groupId) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await db.userGroups.create({
            data: {
                userId: userId,
                groupId : groupId
            },
        })
        return res.status(200).json(createResponseData("You have been successfully attended!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)