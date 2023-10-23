const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB()

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

//set views engine
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

//load components
app.use('/css',express.static(path.resolve(__dirname,"component/css")))
app.use('/images',express.static(path.resolve(__dirname,"component/images")))
app.use('/js',express.static(path.resolve(__dirname,"component/js")))

//load routes
app.use('/', require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`)});