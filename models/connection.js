const mysql = require("mysql")

const con = mysql.createConnection({
    host: 'localhost',
    database: 'album_photos',
    user: 'root',
    password: ''
})

module.exports = con