const { Model, DataTypes } = require("sequelize");


class AppModel extends Model {
    static getCleanError(error_msg) {
        let res = {}

        if (!error_msg.errors) {
            return res
        }

        error_msg.errors.forEach((each) => {
            let { path, message } = each;
            res[path] = message
        })


        return res
    }


    static filterJSON(instance) {

        if (Array.isArray(instance)) {
            let response = instance.map(each => {
                let { password, token, ...rest } = each.dataValues;

                return rest
            })


            return response;
        }
        let { password, token, ...rest } = instance.toJSON(); //.toJson();


        return rest;
    }
}


module.exports = {
    AppModel
}