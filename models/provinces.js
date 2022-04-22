const { AppModel } = require('./utils');
const { DataTypes } = require("sequelize");


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
                msg: "province name is required"
            },
            notNull: {
                msg: "province name is required"
            }
        }
    },
    //region_id
}

class Provinces extends AppModel {}

module.exports = (sequelize) => {
    Provinces.init({...Schema }, {
        sequelize, // We need to pass the connection instance
        timestamps: true, // adding timestamps
        modelName: 'Provinces', // We need to choose the model name
        tableName: 'Provinces',
    });


    return Provinces;
};