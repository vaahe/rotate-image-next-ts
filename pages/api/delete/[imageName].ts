import { resolve } from "path";
import nc from "next-connect";
import { existsSync, unlinkSync } from "fs";

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
}).delete((req: reqType, res) => {
  let imageName = req.params.wild.split("/")[2];
  console.log(imageName);

  const imageExists = existsSync(resolve(`./public/images/${imageName}`));

  if (imageExists === false) {
    return { message: "image does not exists" };
  }
  
  unlinkSync(resolve(`./public/images/${imageName}`));
  res.end("successfully deleted");
});

export default handler;
