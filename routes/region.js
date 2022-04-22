const express = require("express");
const router = express.Router();

const {
    getRegionData,
    getAllRegions,
    createRegion,
    loginRegion,
    logoutRegion,
    updateRegion
} = require("../controllers/regions");


// ============= MIDDLE WARES ===============
const { regionAuth } = require("../middlewares/auth");

router.get('/logout', regionAuth)
router.get("/data", regionAuth)
router.post("/update", regionAuth);
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

router.route('/update').post(updateRegion);

module.exports = router;