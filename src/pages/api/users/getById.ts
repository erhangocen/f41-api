import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const userId = req.query.userId?.toString();

    try {
        const responseData = await db.user.findUnique({
            where: { id: userId }, include: {
                groups: { include: { category: true, owner: true } },

                eventAttendees: { include: { event: { include: { group: true, city: true, userLikeEvents: true, eventAttendees: true } } } },

                userGroups: { include: { group: { include: { category: true, owner: true } } } },

                userLikeEvents: { include: { event: { include: { group: true, city: true, userLikeEvents: true, eventAttendees: true } } } },
            }
        });
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler, false)