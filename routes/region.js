const express = require("express");
const router = express.Router();

const {
    getRegionData,
    getAllRegions,
    createRegion,
    loginRegion,
    logoutRegion
} = require("../controllers/regions");


// ============= MIDDLE WARES ===============
//==============================================


// ===== Authentication =========

router.route("/login").post(loginRegion);

router.route("/logout").get(logoutRegion);

//===============================



router.route("/")
    .get(getAllRegions);

router.route("/create").post(createRegion);

router.route("/data")
    .get(getRegionData);

module.exports = router;