import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    //upload file
    const file = data.get("file");

    const s3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const fileNameExt = file.name.split(".").pop();
    const newFileName = uniqid() + "." + fileNameExt;

    const chunks = [];

    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucketName = "joao-food-ordering-app";

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = "https://" + bucketName + ".s3.amazonaws.com/" + newFileName;
    return Response.json(link);
  }

  return Response.json(true);
}
