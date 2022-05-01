const { Regions } = require('../models');

let regionAuth = (req, res, next) => {
    let d_token = null;




    let { token } = req.body;

    if (!token) {
        let { auth } = req.cookies;
        if (auth) {
            d_token = auth;
        } else {
            res.status(401).json({
                error: true,
                message: "No Authentication Token Found, required you are logged in"
            });
            return
        }
    } else {
        d_token = token;
    }

    Regions.decodeToken(d_token, (err, dregion) => {
        if (err) {
            console.log(err)
            res.status(401).json({
                error: true,
                message: 'Could Not Verify Logged In'
            })
            return
        }

        if (!dregion) return res.status(401).json({
            error: true,
            message: "Invalid token, required you are logged in"
        });


        req.token = d_token;

        req.region = dregion;

        // console.log("Verified Token")
        next();

    })



}

const errorHandler = (err, req, res, next) => {
    const statusCode = 400; //res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "Error in your request" : err.stack,
    });
};


module.exports = { regionAuth, errorHandler }