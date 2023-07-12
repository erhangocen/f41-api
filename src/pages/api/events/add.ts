import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { name, description, eventPhotoUrl, eventDate, eventLat, eventLng, cityId, groupId, eventAddress } = req.body;

    try {
        if (!req.body || !name || !description || !eventDate || !eventLat || !eventLng || !cityId || !groupId) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await db.event.create({
            data: {
                name: name,
                description: description,
                eventPhotoUrl: eventPhotoUrl,
                eventDate: eventDate,
                eventLat: eventLat,
                eventLng: eventLng,
                cityId: cityId,
                groupId: groupId,
                eventAddress: eventAddress
            },
        })
        axios.post("https://fcm.googleapis.com/fcm/send", {
            "to": "topics/all",
            "notification": {
                "body": "Body of Your Notification",
                "title": "Title of Your Notification"
            }
        }, {headers: {
            "Content-Type": "application/json",
            Authorization: "key= AAAAy-GxA_w:APA91bHmQzs-al_FRXiFt8djj7O0HN92TJXUN6gvoUTwJ3UdNO0m0aEFMW1xcGRaouhU0s6zCKxnifPUumiBKdpMN4GPYqkRoNVqrf0xDZe_RY_Gy8OjtBevpOLwKmVM8PbMHk1dinez"
        }})
        return res.status(200).json(createResponseData("Event successfully added!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)