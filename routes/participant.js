const express = require("express");
const router = express.Router();

const {
    getAllData,
    getDataById,
    createParticipant,
    updateParticipant,
    deleteParticipant
} = require("../controllers/participant");


// ============= MIDDLE WARES ===============
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