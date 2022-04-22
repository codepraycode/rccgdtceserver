const bcrypt = require('bcrypt');
const { AppModel } = require('./utils');
const { DataTypes } = require("sequelize");
const { SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

const SALT_I = 10;


const Schema = {
    // Attributes
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // setting default to automatically populate
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "region name is required"
            },
            notNull: {
                msg: "region name is required"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "region email is required"
            },
            notNull: {
                msg: "region email is required"
            },
            isEmail: {
                msg: "region email provided is not a valid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    default_password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

class Regions extends AppModel {
    static async generateHash(password) {

        let salt = await bcrypt.genSalt(SALT_I);
        let hash = await bcrypt.hash(password, salt)

        return hash

    }

    static decodeToken(token, cb) {
        // this is user
        //let teacher = this;
        jwt.verify(token, SECRET, function(err, decode) {

            if (!decode) {
                cb(null, null)
                return
            }

            Regions.findOne({ where: { _id: decode, token } })
                .then((dregion) => {
                    cb(null, dregion);
                    return
                })
                .catch(error => {
                    console.log(error)
                    cb(err, null);
                    return
                });

        });

    };

    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }

    generateToken = async function() {
        let region = this;

        var token = jwt.sign(region._id, SECRET);

        region.token = token;
    }

    deleteToken = async function() {
        let region = this;

        region.token = null;
    }
}

module.exports = (sequelize) => {
    Regions.init({...Schema }, {
        sequelize, // We need to pass the connection instance
        timestamps: true, // adding timestamps
        modelName: 'Regions', // We need to choose the model name
        tableName: 'Regions',
    });


    return Regions;
};