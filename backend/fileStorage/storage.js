const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb) {
        const suffix = Date.now();
        cb(null, suffix + '_' + file.originalname);
    }
});

let upload = multer({ storage: storage });

module.exports = upload;

