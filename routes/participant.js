const express = require("express");
const router = express.Router();

const {
    getAllData,
    // getDataById,
    createParticipant,
    uploadParticipantFile,
    updateParticipant,
    deleteParticipant
} = require("../controllers/participant");


// ============= MIDDLE WARES ===============
// const multer = require("multer");
const { regionAuth } = require("../middlewares/auth");

router.post("/create", regionAuth);
router.post("/upload", regionAuth); //, uploadFile);
router.put("/update", regionAuth);
router.get("/data", regionAuth);
router.delete("/delete", regionAuth);
// ==========================================


// ===== Authentication =========
//===============================



router.route("/data")
    .get(getAllData);

router.route('/create').post(createParticipant);
router.route('/:pid/upload').post(uploadParticipantFile);

router.route("/update")
    .put(updateParticipant)

router.route("/delete").delete(deleteParticipant)


module.exports = router;