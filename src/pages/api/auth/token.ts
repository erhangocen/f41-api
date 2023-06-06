import { withMethods } from "@/lib/api-middlewares/with-methods";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import Methods from "@/lib/request_methods";
import RequestMethods from "@/lib/request_methods";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { refresh } = req.body;

    if (!req.body || !refresh) {
        return res.status(400).json({ error: "refresh cannot be empty" })
    }

    try {
        const decoded = jwt.verify(refresh, process.env.REFRESH_SECRET ?? "");
        const id = (decoded as any).id;
        res.status(200).json({
            token: jwt.sign({ id: id }, process.env.JWT_SECRET ?? "", {
                expiresIn: '10d',
            })
        })
    } catch (error) {
        return res.status(401).json({ error: "Your refresh token is invalid" })
    }
}

export default withMethods([RequestMethods.POST], handler, false);