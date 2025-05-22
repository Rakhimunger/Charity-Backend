
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dqe2ozf8t",
  api_key: "686132778382865",
  api_secret: "1JwHtyC7bKq8rsN0nDMLBa5X6Cg",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event_images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
