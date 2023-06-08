import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const userId = req.query.userId?.toString();

    try {
        const responseData = await db.user.findUnique({
            where: { id: userId }
        });
        if (responseData != null) {
            return res.status(200).json(responseData);
        }
        if (responseData == null) {
            return res.status(200).json(null)
        }
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler, false)