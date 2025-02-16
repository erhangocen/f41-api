import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const groupId = req.query.groupId?.toString();

    try {
        const responseData = await db.event.findMany({
            where: { groupId: groupId }, include: {
                city: true,
                eventAttendees: { include: { user: true } },
                userLikeEvents: { include: { user: true } },
                group: { include: { category: true, owner: true } },
            },

        });
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler, false)