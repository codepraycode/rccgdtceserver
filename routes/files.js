const express = require("express");
const router = express.Router();

const {
    getData,
} = require("../controllers/files");


// ============= MIDDLE WARES ===============
// ==========================================


// ===== Authentication =========
//===============================



router.route("/:filename")
    .get(getData);

module.exports = router;