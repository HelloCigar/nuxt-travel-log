import type { InsertLocationLog } from '../schema'
import { locationLog } from '../schema'

import db from '../../db'
import { and, eq } from 'drizzle-orm'

export async function insertLocationLog(
    locationId: number, 
    insertable: InsertLocationLog, 
    userId: number
) {
    const [inserted] = await db.insert(locationLog).values({
        ...insertable,
        locationId,
        userId
    }).returning()

    return inserted
}

export async function findLocationLog(
    id: number, 
    userId: number
) {
    const foundLog = await db.query.locationLog.findFirst({
        where: and(
            eq(locationLog.id, id),
            eq(locationLog.userId, userId)
        )
    })

    return foundLog
}
