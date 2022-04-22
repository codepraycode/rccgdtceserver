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

class Province extends AppModel {}

module.exports = (sequelize) => {
    Province.init({...Schema }, {
        sequelize, // We need to pass the connection instance
        timestamps: true, // adding timestamps
        modelName: 'Province', // We need to choose the model name
        tableName: 'Provinces',
    });


    return Province;
};