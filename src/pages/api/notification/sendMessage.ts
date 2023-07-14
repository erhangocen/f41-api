import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { topic, body, title, route, id } = req.body;

    try {
        if (!req.body) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await axios.post("https://fcm.googleapis.com/fcm/send", {
            "to": "/topics/" + id,
            "notification": {
                "body": body,
                "title": title,
            },
            "data": {
                "route": "message",
                "id": id
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "key= AAAAy-GxA_w:APA91bHmQzs-al_FRXiFt8djj7O0HN92TJXUN6gvoUTwJ3UdNO0m0aEFMW1xcGRaouhU0s6zCKxnifPUumiBKdpMN4GPYqkRoNVqrf0xDZe_RY_Gy8OjtBevpOLwKmVM8PbMHk1dinez"
            }
        })
        return res.status(200).json(createResponseData("Group successfully added!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)