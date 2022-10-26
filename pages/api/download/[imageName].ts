import { resolve } from "path";
import nc from "next-connect";
import { existsSync, readFileSync } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

type paramType = {
  wild: string;
};

type reqType = {
  params: paramType;
};

const handler = nc({
  attachParams: true,
}).get((req: reqType, res) => {
  let imageName = req.params.wild.split("/")[2];
  console.log(imageName);

  const imageExists = existsSync(resolve(`./public/images/${imageName}`));

  if (imageExists === false) {
    return { message: "image does not exists" };
  }
  const image = readFileSync(resolve(`./public/images/${imageName}`));
  res.end(image);
});

export default handler;
