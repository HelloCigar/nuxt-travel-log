import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import env from "~~/lib/env";

export default async function deleteImagesByLogId(userId: number, logId: number) {
  const prefix = `${userId}/${logId}/`;

  const client = createS3Client()
  // 1. List objects under prefix
  const listResp = await client.send(new ListObjectsV2Command({
    Bucket: env.S3_BUCKET,
    Prefix: prefix,
  }));

  if (!listResp.Contents || listResp.Contents.length === 0) return;

  console.log(listResp.Contents);
  
  // 2. Delete objects in bulk (max 1000 at a time)
  await client.send(new DeleteObjectsCommand({
    Bucket: env.S3_BUCKET,
    Delete: {
      Objects: listResp.Contents.map(obj => ({ Key: obj.Key! })),
      Quiet: true,
    },
  }));
}
