const { Teachers, Admin } = require('../models');

let teacherAuth = (req, res, next) => {
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

    Teachers.decodeToken(d_token, (err, dteacher) => {
        if (err) {
            console.log(err)
            res.status(401).json({
                error: true,
                message: 'Could Not Verify Logged In'
            })
            return
        }

        if (!dteacher) return res.status(401).json({
            error: true,
            message: "Invalid token, required you are logged in"
        });


        req.token = d_token;

        req.teacher = dteacher;
        next();

    })



}

let adminAuth = (req, res, next) => {
    let token = req.cookies.auth;

    Admin.decodeToken(token, (err, dadmin) => {
        if (err) {
            console.log(err)
            res.status(401).json({
                error: true,
                message: 'Could Not Verify Logged In'
            })
            return
        }

        if (!dadmin) return res.status(401).json({
            error: true,
            message: "Not logged in, required you are logged in"
        });


        req.token = token;
        // console.log(dadmin.toJSON())
        req.admin = dadmin;
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


module.exports = { teacherAuth, adminAuth, errorHandler }