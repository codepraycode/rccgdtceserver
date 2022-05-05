// CONNECTION APARAMETERS
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME


// for generating tokens
const SECRET = process.env.SECRET
const APP_URL = `${process.env.BASE_URL}/api`

module.exports = {
    // sequelize
    // db
    host,
    username,
    password,
    database,
    dialect: 'mysql',
    SECRET,
    APP_URL
}