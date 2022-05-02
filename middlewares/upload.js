const util = require('util');
const multer = require('multer');


const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
})

const upload_fields = [{ name: 'passport', maxCount: 1 }, { name: 'birth_certificate', maxCount: 1 }, { name: 'letter_of_recommendation', maxCount: 1 }]
const uploadFile = multer({
        storage, //: multerStorage,
        // limits:{fileSize:maxSize}
    }).fields(upload_fields) //.single()




// const upload = (req, res, next) => {
//     try {
//         // await uploadFile(req, res);
//         uploadFile(req, res).then(() => {
//                 if (req.files == undefined) {
//                     return res.status(400).send({ message: "Please upload a file!" });
//                 };
//                 next();
//             })
//             .catch(err => {
//                 let file_names = []
//                 if (req.files) {
//                     (req.files).forEach(each => {
//                         file_names.push(each.originalname);
//                     });
//                 }

//                 res.status(500).send({
//                     message: `Could not upload file(s): ${file_names.join(',').trimEnd(',')}`
//                 })
//             })


//         //      res.status(200).send({
//         //   message: "Uploaded the file successfully: " + req.file.originalname,
//         // });
//         // next();
//     } catch (err) {

//     }
// }

module.exports = uploadFile