import multer from "multer";
import path from "path";
import nc from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("./public/images"));
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, `image_${Date.now()}.${extension}`);
    },
  }),
});

const handler = nc({
  attachParams: true,
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.end("Something broke!");
  },
}).post(upload.single("image"), (req, res) => {
  const url = "http://localhost:3000/api/download/" + req.file?.filename;
  res.status(201).json({ fileName: req.file?.filename, url: url });
});

export default handler;
