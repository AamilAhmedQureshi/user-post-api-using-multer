var multer = require("multer");
var path = require("path");

const matchImage = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
const matchvideo = [
  "video/quicktime",
  "video/mov",
  "video/mkv",
  "video/wmv",
  "video/flv",
  "video/avi",
  "video/mp4",
  "video/webm",
];

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (matchImage.indexOf(file.mimetype) != -1)
      cb(null, path.join(`${__dirname}/../public/image`));
    else if (matchvideo.indexOf(file.mimetype) != -1)
      cb(null, path.join(`${__dirname}/../public/video`));
    else throw new Error("Upload only images and videos");
  },

  filename: (req, file, cb) => {
    let name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = path.extname(file.originalname);
    cb(null, name + +Date.now() + "" + ext);
  },
});

var upload = multer({ storage: storage });
module.exports = upload;
