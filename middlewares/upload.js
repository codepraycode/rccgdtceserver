const util = require('util');
const multer = require('multer');


const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
})

const upload_fields = [
    { name: 'passport', maxCount: 1 },
    { name: 'birth_certificate', maxCount: 1 },
    { name: 'letter_of_recommendation', maxCount: 1 }
]

const uploadFile = multer({
        storage, //: multerStorage,
        // limits:{fileSize:maxSize}
    }).fields(upload_fields) //.single()



module.exports = uploadFile