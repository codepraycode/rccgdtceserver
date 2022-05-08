const express = require("express");
const router = express.Router();

const {
    getAllData,
    getData,
    createParticipant,
    uploadParticipantFile,
    updateParticipant,
    deleteParticipant,

    getCategories
} = require("../controllers/participant");


// ============= MIDDLE WARES ===============
// const multer = require("multer");
const { regionAuth } = require("../middlewares/auth");

router.get("/", regionAuth);
router.post("/create", regionAuth);
router.post("/:pid/upload", regionAuth); //, uploadFile);


router.get("/:pid", regionAuth)
router.put("/:pid", regionAuth)
router.delete("/:pid", regionAuth)

// router.put("/update", regionAuth);

// router.delete("/delete", regionAuth);
// ==========================================


// ===== Authentication =========
//===============================



router.route('/create').post(createParticipant);

router.route('/categories').get(getCategories);
router.route('/categories/:quiz').get(getCategories);

router.route('/:pid/upload').post(uploadParticipantFile);

router.route("/:pid")
    .get(getData)
    .put(updateParticipant)
    .delete(deleteParticipant)

// router.route("/update")
//     .put(updateParticipant)

// router.route("/delete").delete(deleteParticipant)


router.route("/")
    .get(getAllData);


module.exports = router;