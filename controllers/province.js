const asyncHandler = require("express-async-handler");
const { Province } = require('../models');



// console.log(Admin.classLevelMethod());

const getProvinceData = asyncHandler(async(req, res, next) => {
    const { region, body } = req;

    let { id } = body;
    if (!id) {
        return res.status(400).json({
            message: "No Province `id` provided"
        })
    }
    // // console.log(">>>  >>> ", admin)
    let d_province = await Province.findOne({ where: { RegionId: region._id, _id: id } })

    if (!d_province) {
        return res.status(404).json({});
    }
    res.status(200).json(Province.filterJSON(d_province));
    // res.sendStatus(200);
    return
});


const getAllProvinces = asyncHandler(async(req, res, next) => {
    const { region } = req;
    const provinces = await Province.findAll({ where: { RegionId: region._id } });
    if (!provinces || provinces.length === 0) {
        res.status(200).json([]);
        return
        // throw new Error("No Admin Found");
    }

    return res.status(200).json(Province.filterJSON(provinces));
    // return res.sendStatus(200);
});

const createProvince = asyncHandler(async(req, res, next) => {
    // let id = rand(10);
    // console.log(req.body)
    const { region, body } = req;

    const new_province = await Province.build({...body });
    new_province.validate()
        .then(() => {

            //
            new_province.save()
                .then(async() => {
                    // console.log(admin_user.toJSON())

                    await region.addProvince(new_province)

                    res.status(201).json(Province.filterJSON(new_province))

                })
                .catch((error) => {
                    // console.
                    res.status(409).json({
                        message: "Admin Already Exist",
                        // error
                    });
                })
                // .then()
                // .catch()
        })
        .catch(error => {
            // console.log(error);
            let error_response = Province.getCleanError(error);
            res.status(400).json(error_response);
        })

});


module.exports = {
    getAllProvinces,
    getProvinceData,
    createProvince
}