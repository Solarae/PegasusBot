import fs from "fs";
import https from "https";
import path from "path";

export const download = async (
  url: string,
  dest: string,
  onConflict: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    var dst: string;

    if (fs.existsSync(dest)) {
      if (onConflict === "keepExisting") {
        console.log(`File at ${dest} exists already`);
        return resolve("");
      } else if (onConflict === "replace") {
        dst = dest;
      } else {
        dst = dest;
        const { dir, name, ext } = path.parse(dest);
        var num = 2;
        while (fs.existsSync(dst)) {
          dst = `${dir}/${name}-${num}${ext}`;
          num += 1;
        }
      }
    } else {
      dst = dest;
    }

    https
      .get(url, (res) => {
        console.log(`Starting download for ${url}`);
        console.log(dst);
        const file = fs.createWriteStream(dst);
        res.pipe(file).on("finish", () => {
          file.close();
          console.log(`Download of ${url} completed!`);
          resolve("");
        });
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      });
  });
};
