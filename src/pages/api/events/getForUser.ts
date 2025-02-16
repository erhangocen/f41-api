import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const userId = req.query.userId?.toString();

    try {
        const responseData = await db.event.findMany({
            include: {
                city: { include: { country: true } },
                eventAttendees: { include: { user: true } },
                userLikeEvents: { include: { user: true } },
                group: { include: { category: true, owner: true } },
            },
            orderBy: {
                eventDate: "asc",
            },
            where: {
                eventDate: {
                    gt: new Date(Date.now()).toISOString(),
                },
                /* katıldığı guruplar */
                group: {
                    userGroups: {
                        some: {
                            userId: userId ?? "",
                        }
                    }
                },
                /* kendinin olmayan eventler */
                NOT: {
                    group: {
                        userId: userId ?? "",
                    }
                }
            },
        });
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler, false)