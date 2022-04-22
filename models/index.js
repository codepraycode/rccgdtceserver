const { Sequelize } = require('sequelize');

const {
    host,
    username,
    password,
    database,
    dialect
} = require("../config/config");

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect //: 'mysql'
});



const Participants = require("./participant")(sequelize);
const Regions = require("./regions")(sequelize);
const Provinces = require("./provinces")(sequelize);


// Relation
Regions.hasMany(Provinces, { onDelete: 'CASCADE' })
Provinces.belongsTo(Regions, { onDelete: "CASCADE" });


sequelize.authenticate().then(() => {
    console.log("Connected To DataBase");
    if (process.env.NODE_ENV === 'development') {
        sequelize.sync({ force: true }); // drop all tables and create them again
        // sequelize.sync({ alter: true }); // apply the changes and keep the data in db
    } else {
        sequelize.sync(); // create tables if not exists
    }

});

module.exports = {
    Participants,
    Regions,
    Provinces
}