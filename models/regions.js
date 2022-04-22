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
        type: DataTypes.VIRTUAL,
        get() {
            if (this.custom_password) {
                return this.custom_password
            }

            return this.default_password;
        },
        set(value) {

            this.custom_password = value;
        }
    },
    custom_password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    default_password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT
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

    async comparePassword(password) {
        // console.log(this.password);
        let region = this;

        if (region.custom_password !== null) {
            let isMatch = await bcrypt.compare(password, this.custom_password);

            return isMatch;
        }

        return password === region.default_password;

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


    async updatePassword(new_password) {
        let region = this;
        // const salt = await bcrypt.genSaltSync(SALT_I);

        // region.password = bcrypt.hashSync(region.password, salt);
        let hash = await Regions.generateHash(new_password);

        region.password = hash
    }
}

module.exports = (sequelize) => {
    Regions.init({...Schema }, {
        sequelize, // We need to pass the connection instance
        timestamps: true, // adding timestamps
        modelName: 'Regions', // We need to choose the model name
        tableName: 'Regions',
        hooks: {
            beforeCreate: async(region) => {
                if (region.password) {
                    // const salt = await bcrypt.genSaltSync(SALT_I);

                    // region.password = bcrypt.hashSync(region.password, salt);
                    let hash = await Regions.generateHash(region);

                    region.password = hash
                }
            }
        }
    });


    return Regions;
};