const asyncHandler = require("express-async-handler");
const { Participants } = require('../models');



// console.log(Admin.classLevelMethod());

const getAllData = asyncHandler(async(req, res, next) => {
    // const { admin } = req;
    // // console.log(">>>  >>> ", admin)
    // res.status(200).json(Admin.filterJSON(admin));
    res.sendStatus(200);
    return
});


// Get Admin by Id
const getDataById = asyncHandler(async(req, res, next) => {
    // const { id } = req.params;

    // const d_admin = await Admin.findByPk(id);

    // if (!d_admin) {
    //     res.status(200).json({});
    //     return
    //     // throw new Error("Admin Not Found");
    // }

    // // remove Password
    // // let { password, token, ...rest } = d_admin.toJSON()

    // res.status(200).json(Admin.filterJSON(d_admin));
    res.sendStatus(200);
});


const createParticipant = asyncHandler(async(req, res, next) => {
    res.sendStatus(200);
});



const updateParticipant = asyncHandler(async(req, res, next) => {
    res.sendStatus(200);
});

const deleteParticipant = asyncHandler(async(req, res, next) => {
    res.sendStatus(200);

});





module.exports = {
    getAllData,
    getDataById,
    createParticipant,
    updateParticipant,
    deleteParticipant
}