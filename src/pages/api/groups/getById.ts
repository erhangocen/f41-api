import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const groupId = req.query.groupId?.toString();

    try {
        const responseData = await db.group.findUnique({
            where: { id: groupId }, include: {
                category: true,
                owner: true,
                events: { include: { city: true, userLikeEvents: true, eventAttendees: true } },
                userGroups: true,
            }
        });
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler, false)