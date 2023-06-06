import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/teachers/getAll:
 *   get:
 *     tags:
 *      - Teachers
 *     description: simple get all teachers
 *     responses:
 *       200:
 *         description: response data
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const responseData = await db.teacher.findMany();
        return res.status(200).json(responseData);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.GET], handler)