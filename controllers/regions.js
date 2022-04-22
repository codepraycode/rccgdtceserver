const asyncHandler = require("express-async-handler");
const { Regions } = require('../models');



// console.log(Admin.classLevelMethod());

const getRegionData = asyncHandler(async(req, res, next) => {
    // const { admin } = req;
    // // console.log(">>>  >>> ", admin)
    // res.status(200).json(Admin.filterJSON(admin));
    res.sendStatus(200);
    return
});


const getAllRegions = asyncHandler(async(req, res, next) => {
    // const all_Admin = await Admin.findAll();
    // if (!all_Admin || all_Admin.length === 0) {
    //     res.status(200).json([]);
    //     return
    //     // throw new Error("No Admin Found");
    // }

    // res.status(200).json(Admin.filterJSON(all_Admin));
    return res.sendStatus(200);
});

const createRegion = asyncHandler(async(req, res, next) => {
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




// Authentication
const loginRegion = asyncHandler(async(req, res, next) => {
    return res.sendStatus(200)
        // const { email, password } = req.body;

    // Admin.findOne({ where: { email } })
    //     .then(async(admin) => {
    //         if (!admin) {
    //             res.status(200).json({
    //                 isAuth: false,
    //                 message: 'Auth Failed, Email not found'
    //             })

    //             return;
    //         };


    //         admin.comparePassword(password)
    //             .then(async(isMatch) => {
    //                 if (!isMatch) {
    //                     res.status(200).json({
    //                         isAuth: false,
    //                         message: 'Wrong Password'
    //                     })
    //                     return
    //                 }

    //                 await admin.generateToken()

    //                 await admin.save()
    //                     // console.log(teacher.toJSON())
    //                     // res.status(200).json(teacher.toJSON())

    //                 res.cookie('auth', admin.token).json({
    //                     isAuth: true,
    //                     id: admin._id,
    //                     avatar: admin.avatar,
    //                     email: admin.email,
    //                     username: admin.username,
    //                     token: admin.token
    //                 });

    //                 return
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 res.status(200).json({
    //                     isAuth: false,
    //                     message: 'Could not Authenticate'
    //                 })

    //                 return
    //             })
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         res.status(500).json(error);

    //         return;
    //     })
    // res.sendStatus(200);

});

const logoutRegion = asyncHandler(async(req, res, next) => {
    return res.sendStatus(200);
    // let { admin } = req;

    // await admin.deleteToken()

    // await admin.save()
    //     // console.log(teacher.toJSON())
    //     // res.status(200).json(teacher.toJSON())
    // res.clearCookie('auth').sendStatus(200);
    // user.deleteToken(token, (err, user) => {
    //     if (err) return res.status(400).send(err);

    //     res.sendStatus(200);
    // });

});



module.exports = {
    getRegionData,
    getAllRegions,
    createRegion,
    loginRegion,
    logoutRegion
}