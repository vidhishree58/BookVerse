const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const response = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname}`,
  });

  return response;
}

module.exports = uploadFile;