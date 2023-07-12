import exp from "constants";
import { type } from "os";

export default interface Group {
    id?: string;
    name?: string;
    description?: string;
    groupPhotoUrl?: string;
    cityId?: number;
    iconUrl?: string;
    categoryId?: string;
    userId?: string;
    createdAt?: Date;
}
