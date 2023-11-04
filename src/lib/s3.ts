import AWS from "aws-sdk";

// initialize s3 bucket

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: "us-east-2",
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: "us-east-2",
    });

    const fileKey =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
    };
    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (e) => {
        console.log(
          "uploading to s3..",
          parseInt(((e.loaded * 100) / e.total).toString()),
        );
      })
      .promise();

    await upload.then((data) => {
      console.log("Successfully uploaded to s3", fileKey);
    });

    return Promise.resolve({ fileKey, fileName: file.name });
  } catch (error) {
    console.error(error);
  }
}

export function getS3Url(fileKey: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${fileKey}`;
  return url;
}
