import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { group } from "console";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId, eventId } = req.body;

    try {
        if (!req.body || !userId || !eventId) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await db.userLikeEvents.create({
            data: {
                userId: userId,
                eventId: eventId
            },
        })
        return res.status(200).json(createResponseData("You have been successfully liked!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)