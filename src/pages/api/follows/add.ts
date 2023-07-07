import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { group } from "console";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { followeeId, followerId } = req.body;

    try {
        if (!req.body || !followeeId || !followerId) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        var response = await db.follow.create({
            data: {
                followeeId: followeeId,
                followerId: followerId,
            },
        })
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)