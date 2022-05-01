const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");


const getData = asyncHandler(async(req, res, next) => {
    const { filename } = req.params;
    console.log(filename);

    const options = {
        root: path.join(__dirname, '../files'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    console.log(options)
        // res.sendStatus(200)
    res.sendFile(filename, options, (err) => {
        if (err) {
            // next(err)
            // console.log(err)
            res.status(err.status).send("Unable to fetch file")
        } else {
            console.log('Sent:', filename);

        }
    })

});


module.exports = {
    getData
}