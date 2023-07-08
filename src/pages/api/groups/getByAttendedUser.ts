import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const userId = req.query.userId?.toString();

    try {
        if (!userId) {
            return res.status(400).json({ "error": "user cannot be empty" });
        }
        const responseData = await db.group.findMany({
            where: {
                userGroups: {
                    some: {
                        userId: userId ?? "",
                    }
                }
            }
        });
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler, false)