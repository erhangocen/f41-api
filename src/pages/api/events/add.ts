import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import Group from "@/types/group";
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
        var group:Group | null = await db.group.findUnique({
            where: {
                id: groupId
            }
        })
        await axios.post("https://fcm.googleapis.com/fcm/send", {
            "to": "/topics/"+group?.id,
            "notification": {
                "body": description,
                "title": group?.name+" has added a new event!",
                "image": eventPhotoUrl,
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