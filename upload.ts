import https from "https";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface UploadConfig {
  url: string;
  bucket: string;
  key?: string;
  onConflict?: string;
}

export const upload = async (uploadConfig: UploadConfig) => {
  const {
    url,
    bucket,
    key = path.basename(url),
    onConflict = "keepExistingAndAdd",
  } = uploadConfig;

  var headObjParams: AWS.S3.HeadObjectRequest = {
    Bucket: bucket,
    Key: key,
  };

  const exists = async (params: AWS.S3.HeadObjectRequest) => {
    try {
      await s3.headObject(params).promise();
      return true;
    } catch (error) {
      return false;
    }
  };

  var objKey: string;

  if (await exists(headObjParams)) {
    if (onConflict === "keepExisting") {
      console.log(`File at ${key} exists already`);
      return;
    } else if (onConflict === "replace") {
      objKey = key;
    } else {
      const { dir, name, ext } = path.parse(key);
      var num = 2;
      do {
        objKey = dir ? `${dir}/${name}-${num}${ext}` : `${name}-${num}${ext}`;
        console.log(objKey);
        headObjParams = {
          ...headObjParams,
          Key: objKey,
        };
        num += 1;
      } while (await exists(headObjParams));
    }
  } else {
    objKey = key;
  }

  https
    .get(url, (res) => {
      const uploadParams: AWS.S3.PutObjectRequest = {
        Bucket: bucket,
        Key: objKey,
        Body: res,
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        }
        if (data) {
          console.log("Upload Success", data.Location);
        }
      });
    })
    .on("error", (error) => {
      console.log(error);
    });
};
