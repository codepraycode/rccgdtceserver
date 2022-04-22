const express = require("express");
const router = express.Router();

const {
    getAllProvinces,
    getProvinceData,
    createProvince
} = require("../controllers/province");


// ============= MIDDLE WARES ===============
const { regionAuth } = require("../middlewares/auth");

router.get('/', regionAuth);
router.post("/create", regionAuth);
router.get("/data", regionAuth);
//==============================================



router.route("/")
    .get(getAllProvinces);

router.route("/create").post(createProvince);

router.route("/data")
    .get(getProvinceData);

module.exports = router;