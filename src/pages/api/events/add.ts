import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
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
        return res.status(200).json(createResponseData("Event successfully added!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)