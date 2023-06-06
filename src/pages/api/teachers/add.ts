import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import ResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/teachers/add:
 *     post:
 *      tags:
 *          - Teachers
 *      description: add teacher
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                      name:
 *                         type: string
 *                      department:
 *                        type: string
 *      responses:
 *          200:
 *              description: response data
 * 
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { name, department } = req.body;

    try {
        if (name == null || department == null) {
            return res.status(400).json({ "error": "Name or Department can't be null" });
        }
        await db.teacher.create({
            data: {
                name: name,
                department: department
            },
        })
        return res.status(200).json(createResponseData("Teacher successfully added!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler)