import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import RequestMethods from "@/lib/request_methods";
import createResponseData from "@/types/ResponseModel";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id, name, description, eventPhotoUrl, eventDate, eventLat, eventLong, cityId, groupId } = req.body;

    try {
        if (!req.body || !id || !name || !description || !eventPhotoUrl || !eventDate || !eventLat || !eventLong || !cityId || !groupId) {
            return res.status(400).json({ "error": "fields cannot be empty" });
        }
        await db.event.update({
            where: { id: id },
            data: {
                name: name,
                description: description,
                eventPhotoUrl: eventPhotoUrl,
                eventDate: eventDate,
                eventLat: eventLat,
                eventLng: eventLong,
                cityId: cityId,
                groupId: groupId,
            },
        })
        return res.status(200).json(createResponseData("Event successfully updated!"));
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export default withMethods([RequestMethods.POST], handler, false)