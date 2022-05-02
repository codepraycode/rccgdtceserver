const express = require("express");
const router = express.Router();

const {
    getAllData,
    // getDataById,
    createParticipant,
    updateParticipant,
    deleteParticipant
} = require("../controllers/participant");


// ============= MIDDLE WARES ===============
// const multer = require("multer");
const { regionAuth } = require("../middlewares/auth");
const uploadFile = require('../middlewares/upload');


//Configuration for Multer
// const upload = multer({ dest: "files" });
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "files");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//     },
// });

// const upload = multer({
//     storage: multerStorage,
//     //   fileFilter: multerFilter,
// });


// router.get('/', regionAuth);
// upload.single("passport")
//birth_certificate
//letter_of_recommendation
//const upload_fields = [{ name: 'passport', maxCount: 1 }, { name: 'birth_certificate', maxCount: 1 }, { name: 'letter_of_recommendation', maxCount: 1 }]
// upload.fields(upload_fields)

router.post("/create", regionAuth, uploadFile);
router.put("/update", regionAuth);
router.get("/data", regionAuth);
router.delete("/delete", regionAuth);
// ==========================================


// ===== Authentication =========
//===============================



router.route("/data")
    .get(getAllData);

router.route('/create').post(createParticipant);

router.route("/update")
    .put(updateParticipant)

router.route("/delete").delete(deleteParticipant)


module.exports = router;