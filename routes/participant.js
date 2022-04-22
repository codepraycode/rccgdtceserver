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
const { regionAuth } = require("../middlewares/auth");

// router.get('/', regionAuth);
router.post("/create", regionAuth);
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