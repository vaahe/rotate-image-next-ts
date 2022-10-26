import { resolve } from "path";
import nc from "next-connect";
import { existsSync, renameSync, unlinkSync } from "fs";
import sharp from "sharp";
import { rotate } from "next/dist/server/lib/squoosh/impl";

type bodyTypes = {
  imageName: string;
  rotateL: boolean;
  rotateR: boolean;
};

type reqType = {
  body: bodyTypes;
};

const handler = nc({
  attachParams: true,
}).put((req: reqType, res) => {
  const imageName = req.body.imageName;
  const imageExists = existsSync(resolve(`./public/images/${imageName}`));
  console.log(imageExists);
  const rotate = req.body["rotate"];
  const rotateR = req.body.rotateR || false;
  const rotateL = req.body.rotateL || false;
  sharp(resolve(`./public/images/${imageName}`))
    .rotate(rotate)
    .toFile(resolve(`./public/images/new_${imageName}`))
    .then((res) => {
      unlinkSync(resolve(`./public/images/${imageName}`));
      renameSync(
        resolve(`./public/images/new_${imageName}`),
        resolve(`./public/images/${imageName}`)
      );
    });
  res.end("rotated");
});

export default handler;
