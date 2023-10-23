const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            //useCreatendex: true,
            //useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected: ${con.connection.host}');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB

/*const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'mysql2112',
    database: 'Handledb'
})*/