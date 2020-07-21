const multer = require('multer');

// Configure multer for uploading profile avatars
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(res, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File can only be an image (jpg, jpeg, png)'));
    }

    cb(undefined, true);
  },
});

module.exports = upload;
