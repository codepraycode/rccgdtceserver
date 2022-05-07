// CONNECTION APARAMETERS
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME


// for generating tokens
const SECRET = process.env.SECRET
const BASE_URL = process.env.BASE_URL
const APP_URL = `${!BASE_URL ? '': BASE_URL+'/api'}`


/* 
    HEROKU DATABSE CREDENTIALS
    DB_HOST= us-cdbr-east-05.cleardb.net
    DB_USER= b38ddd9e4f97a3
    DB_PASSWORD= 7f40e2bb
    DB_NAME= heroku_9d6497ea327f27c
 */
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