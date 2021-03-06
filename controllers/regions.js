const asyncHandler = require("express-async-handler");
const { Regions } = require('../models');
const { generateRegionsData } = require('../models/data_generator');


let populated = false;
// console.log(Admin.classLevelMethod());

const getRegionData = asyncHandler(async(req, res, next) => {
    const { region } = req;
    // // console.log(">>>  >>> ", admin)
    return res.status(200).json(Regions.filterJSON(region));
    // res.sendStatus(200);

});


const getAllRegions = asyncHandler(async(req, res, next) => {
    const all_regions = await Regions.findAll();
    if (!all_regions || all_regions.length === 0) {
        res.status(200).json([]);
        return
        // throw new Error("No Admin Found");
    }

    return res.status(200).json(Regions.filterJSON(all_regions));

});

const createRegion = asyncHandler(async(req, res, next) => {
    // let id = rand(10);
    // console.log(req.body)
    if (populated) {
        return res.status(200).json({ message: "Already Created Regions" });
    }
    let regions = generateRegionsData();


    Regions.bulkCreate(regions)
        .then((created_regions) => {
            populated = true;
            return res.status(201).json({ message: "created " + created_regions.length + " regions" });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(Regions.getCleanError(err))
        })

    // return res.status(200).json(regions)
});



// Authentication
const loginRegion = asyncHandler(async(req, res, next) => {
    // return res.sendStatus(200)
    console.log(req.body)
    const { email, password } = req.body;

    Regions.findOne({ where: { email } })
        .then(async(region) => {
            if (!region) {
                res.status(200).json({
                    isAuth: false,
                    message: 'Auth Failed, Region not found'
                })

                return;
            };


            region.comparePassword(password)
                .then(async(isMatch) => {
                    if (!isMatch) {
                        res.status(401).json({
                            isAuth: false,
                            message: 'Wrong Password'
                        })
                        return
                    }

                    await region.generateToken()

                    await region.save()
                        // console.log(teacher.toJSON())
                        // res.status(200).json(teacher.toJSON())

                    res.cookie('auth', region.token).json({
                        isAuth: true,
                        id: region._id,
                        email: region.email,
                        token: region.token
                    });

                    return
                })
                .catch((error) => {
                    console.log(error);
                    res.status(200).json({
                        isAuth: false,
                        message: 'Could not Authenticate'
                    })

                    return
                })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json(error);

            return;
        })
        // res.sendStatus(200);

});

const logoutRegion = asyncHandler(async(req, res, next) => {
    // return res.sendStatus(200);
    let { region } = req;

    await region.deleteToken()

    await region.save()
        // console.log(teacher.toJSON())
        // res.status(200).json(teacher.toJSON())
    return res.clearCookie('auth').sendStatus(200);

});


const updateRegion = asyncHandler(async(req, res, next) => {
    const { region, body } = req;

    //  filter fields
    let { password } = body
    // const d_admin = await

    if (!password) {
        return res.status(200).json({
            message: "Password wasn't updated since no password was provided"
        });
    }

    if (region.custom_password !== null) {
        return res.status(403).json({
            message: "Password had been updated previously, cannot update again"
        })
    }

    try {

        await region.updatePassword(password);
    } catch (err) {
        console.error(err)
        let error_msg = Regions.getCleanError(err);
        res.status(400).json({
            error: error_msg
        });
        return
    }

    try {
        await region.save()
    } catch (error) {
        res.status(400).json({
            error: err
        });
        return
    }


    res.status(200).json(Regions.filterJSON(region));

});



module.exports = {
    getRegionData,
    getAllRegions,
    createRegion,
    loginRegion,
    logoutRegion,
    updateRegion
}