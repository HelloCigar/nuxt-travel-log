import { locationLogImage, type InsertLocationLogImage } from "../schema"
import db from '../../db'

export async function insertLocationLogImage(
    locationLogId: number,
    insertable: InsertLocationLogImage,
    userId: number
) {
    const [inserted] = await db.insert(locationLogImage).values({
        ...insertable,
        userId,
        locationLogId
    }).returning()

    return inserted;
}