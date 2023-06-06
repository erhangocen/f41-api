import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id, name, email } = req.body;

    try {
        if (!req.body || !id || !name || !email) {
            return res.status(400).json({ "error": "id, name or email cannot be empty" });
        }
        await db.user.create({
            data: {
                id: id,
                name: name,
                email: email
            },
        })
        return res.status(200).json(createResponseData("Teacher successfully added!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler)