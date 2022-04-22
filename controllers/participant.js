const asyncHandler = require("express-async-handler");
const { Participant, Province } = require('../models');



// console.log(Admin.classLevelMethod());

const getAllData = asyncHandler(async(req, res, next) => {
    const { region } = req;

    // let {province_id} = body;

    const participant = await Participant.findAll({ where: { RegionId: region._id } });
    if (!participant || participant.length === 0) {
        res.status(200).json([]);
        return
        // throw new Error("No Admin Found");
    }

    return res.status(200).json(Participant.filterJSON(participant));
    return
});


// Get Admin by Id
const getDataById = asyncHandler(async(req, res, next) => {
    const { id } = req.body;

    let d_participant = Participant.findOne({ where: { _id: id } });

    if (!d_participant) {
        res.status(200).json({});
        return
        // throw new Error("Admin Not Found");
    }



    return res.status(200).json(Participant.filterJSON(d_participant));
    // res.sendStatus(200);
});


const createParticipant = asyncHandler(async(req, res, next) => {
    let { region, body } = req;

    let { province_id, ...data } = body;


    if (!province_id) {
        return res.status(400).json({
            message: " `province_id` not given "
        })
    }

    // Validate province
    let province = await Province.findOne({
        where: {
            RegionId: region._id,
            _id: province_id
        }
    });

    if (!province) {
        return res.status(400).json({
            message: "Province Could Not Be Resolved"
        })
    }

    // if it gets to this point, that means the province is valid;

    const new_participant = await Participant.build({...data });

    new_participant.validate()
        .then(() => {
            //
            new_participant.save()
                .then(async() => {
                    // console.log(admin_user.toJSON())
                    await province.addParticipant(new_participant)
                    await region.addParticipant(new_participant)

                    return res.status(201).json(Participant.filterJSON(new_participant))

                })
                .catch((error) => {
                    // console.
                    return res.status(409).json({
                        message: "Admin Already Exist",
                        // error
                    });
                })
                // .then()
                // .catch()
        })
        .catch(error => {
            // console.log(error);
            let error_response = Participant.getCleanError(error);
            return res.status(400).json(error_response);
        })

});



const updateParticipant = asyncHandler(async(req, res, next) => {
    const { region, body } = req;

    //  filter fields
    let { id, ...updatable_fields } = body
    // const d_admin = await 

    const participant = await Participant.findOne({ where: { RegionId: region._id, _id: id } });

    if (!participant) {
        res.status(400).json({
            message: "Participant could not be identified"
        });
        return
        // throw new Error("No Admin Found");
    }


    try {
        await participant.update({...updatable_fields });
    } catch (err) {
        console.error(err)
        let error_msg = Participant.getCleanError(err);
        res.status(400).json({
            error: error_msg
        });
        return
    }

    try {
        await participant.save()
    } catch (error) {
        res.status(400).json({
            error: err
        });
        return
    }


    return res.status(200).json(Participant.filterJSON(participant));

});



const deleteParticipant = asyncHandler(async(req, res, next) => {
    let { region, body } = req;

    let { id } = body;

    let d_participant = await Participant.findOne({ where: { RegionId: region._id, _id: id } });

    if (!d_participant) {
        return res.sendstatus(200)
    }

    console.log(d_participant);

    await d_participant.destroy();

    res.sendStatus(200);


});





module.exports = {
    getAllData,
    getDataById,
    createParticipant,
    updateParticipant,
    deleteParticipant
}