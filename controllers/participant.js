const asyncHandler = require("express-async-handler");
const { Participant, Province } = require('../models');

const uploadFile = require('../middlewares/upload');
const multer = require("multer");


// ============ GETTERS ================

// Get All Participant Data
const getAllData = asyncHandler(async(req, res, next) => {
    const { region } = req;


    const participant = await Participant.findAll({ where: { RegionId: region._id } });

    if (!participant || participant.length === 0) {
        res.status(200).json([]);
        return
        // throw new Error("No Admin Found");
    }

    return res.status(200).json(Participant.filterJSON(participant));
    return
});


// Get A Participant Data
const getData = asyncHandler(async(req, res, next) => {
    const { pid: id } = req.params;

    let d_participant = await Participant.findOne({ where: { _id: id } });

    if (!d_participant) {
        return res.status(200).json({});
    }





    return res.status(200).json(Participant.filterJSON(d_participant));
});


// Get Valid Participant Categories
const participant_categories = ['lower_junior', 'upper_junior', 'lower_teen', 'super_teen']
const quiz_categories = ['quiz_competition', 'bible_recitation', 'essay_writting', 'debate', 'spelling_bee']

const getCategories = asyncHandler(async(req, res, next) => {

    const { quiz } = req.params;

    if (quiz) {
        //  Get Quiz Categories
        return res.status(200).json(quiz_categories)
    }

    return res.status(200).json(participant_categories)
});


// ===========================================


// ============ CREATE ================

//  Create a participant

const createParticipant = asyncHandler(async(req, res, next) => {

    // Everything went fine
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

            new_participant.save()
                .then(async() => {
                    await province.addParticipant(new_participant)
                    await region.addParticipant(new_participant)

                    return res.status(201).json(Participant.filterJSON(new_participant))

                })
                .catch((error) => {
                    // console.
                    return res.status(409).json({
                        message: "Participant Already Exist",
                        // error
                    });
                })
                // .then()
                // .catch()
        })
        .catch(error => {
            let error_response = Participant.getCleanError(error);
            return res.status(400).json(error_response);
        });

});

// Upload Participant Files
const uploadParticipantFile = asyncHandler(async(req, res, next) => {

    let { pid: participant_id } = req.params;

    if (!participant_id) {
        return res.status(400).json({
            message: " `participant_id` not given "
        })
    }


    // Validate province

    let participant = await Participant.findOne({
        where: {
            _id: participant_id
        }
    });

    if (!participant) {
        return res.status(404).json({
            message: "Participant Could Not Be Resolved"
        })
    }

    uploadFile(req, res, async(err) => {
        if (err instanceof multer.MulterError) {
            // Error occured during uploading
            console.error(err);
            return res.status(400).json({
                message: `An Error Ocuured While Uploading File(s): '${err.field}' `
            })
        } else if (err) {
            // Other Error outside Mutler
            console.error(err);
            return res.status(400).json({
                message: 'Unable to create participant'
            })
        }

        // let { region, body, files } = req;
        let files = req.files;

        if (!files) {
            return res.status(400).json({
                message: 'No Files Uploaded'
            });
        }


        let uploaded_files = {};

        Object.entries(files).forEach(([field, config]) => {
            uploaded_files[field] = `uploads/${config[0].filename}`;
        });


        // data = {
        //     ...data,
        //     uploaded_files
        // }
        try {
            await participant.update({...uploaded_files });
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
        // return res.status(201).json(uploaded_files);
        return res.status(201).json(Participant.filterJSON(participant))



    });





});

// ===========================================




// ============ MODIFIERS ================

const updateParticipant = asyncHandler(async(req, res, next) => {
    const { region, body, params } = req;

    //  filter fields
    let { pid } = params;
    // const d_admin = await 

    const participant = await Participant.findOne({ where: { RegionId: region._id, _id: pid } });

    if (!participant) {
        res.status(400).json({
            message: "Participant could not be identified"
        });
        return
        // throw new Error("No Admin Found");
    }


    try {
        await participant.update({...body });
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
    let { region, params } = req;

    let { pid } = params;

    let d_participant = await Participant.findOne({ where: { RegionId: region._id, _id: pid } });

    if (!d_participant) {
        return res.sendStatus(200)
    }

    await d_participant.destroy();

    return res.sendStatus(200);


});

// ===========================================




module.exports = {
    getAllData,
    getData,
    createParticipant,
    uploadParticipantFile,
    updateParticipant,
    deleteParticipant,


    getCategories
}