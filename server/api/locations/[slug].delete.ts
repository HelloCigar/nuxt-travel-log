import { removeLocationBySlug } from "~~/lib/db/queries/location";
import defineAuthenticatedEventHandler from "../../utils/define-authenticated-event-handler";
import deleteImagesByLogId from "~~/server/utils/delete-images-by-log-id";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;

  const location = await event.$fetch(`/api/locations/${slug}`,{
    method: "GET"
  })

  location.locationLogs.forEach(async(locationLog) => {
    await deleteImagesByLogId(event.context.user.id, locationLog.id)
  });

  const deleted = await removeLocationBySlug(slug, event.context.user.id);

  if (!deleted) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Location not found."
    }))
  }
  
  setResponseStatus(event, 204)
});