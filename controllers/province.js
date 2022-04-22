const asyncHandler = require("express-async-handler");
const { Provinces } = require('../models');



// console.log(Admin.classLevelMethod());

const getProvinceData = asyncHandler(async(req, res, next) => {
    // const { admin } = req;
    // // console.log(">>>  >>> ", admin)
    // res.status(200).json(Admin.filterJSON(admin));
    res.sendStatus(200);
    return
});


const getAllProvinces = asyncHandler(async(req, res, next) => {
    // const all_Admin = await Admin.findAll();
    // if (!all_Admin || all_Admin.length === 0) {
    //     res.status(200).json([]);
    //     return
    //     // throw new Error("No Admin Found");
    // }

    // res.status(200).json(Admin.filterJSON(all_Admin));
    return res.sendStatus(200);
});

const createProvince = asyncHandler(async(req, res, next) => {
    // let id = rand(10);
    // console.log(req.body)
    return res.sendStatus(200)


    // const admin_user = Admin.build({...req.body });
    // admin_user.validate()
    //     .then(() => {

    //         //
    //         admin_user.save()
    //             .then(async() => {
    //                 // console.log(admin_user.toJSON())


    //                 let subi = await Subscription.create({ admin_id: admin_user._id })

    //                 await admin_user.addSubscription(subi)

    //                 res.status(201).json(Admin.filterJSON(admin_user))

    //             })
    //             .catch((error) => {
    //                 // console.
    //                 res.status(409).json({
    //                     message: "Admin Already Exist",
    //                     // error
    //                 });
    //             })
    //             // .then()
    //             // .catch()
    //     })
    //     .catch(error => {
    //         // console.log(error);
    //         let error_response = Admin.getCleanError(error);
    //         res.status(400).json(error_response);
    //     })

});


module.exports = {
    getAllProvinces,
    getProvinceData,
    createProvince
}