const express = require("express");
const router = express.Router();

const {
    getAllProvinces,
    getProvinceData,
    createProvince
} = require("../controllers/province");


// ============= MIDDLE WARES ===============
//==============================================



router.route("/")
    .get(getAllProvinces);

router.route("/create").post(createProvince);

router.route("/data")
    .get(getProvinceData);

module.exports = router;