import { withMethods } from "@/lib/api-middlewares/with-methods";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import Methods from "@/lib/request_methods";
import RequestMethods from "@/lib/request_methods";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.body;

    if (!req.body || !id) {
        return res.status(400).json({ error: "id cannot be empty" })
    }

    res.json({
        token: jwt.sign({ id: id }, process.env.JWT_SECRET ?? "", {
            expiresIn: '10d',
        }),
        refresh: jwt.sign({ id: id }, process.env.REFRESH_SECRET ?? "", {
            expiresIn: '360d',
        }),
    })
}

export default withMethods([RequestMethods.POST], handler, false);