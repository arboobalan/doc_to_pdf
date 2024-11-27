const express = require('express');
const path =require('path');
const app = express();

app.use(express.static('uploads'));
const bodyParser  =require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const pdfController = require('./controller/pdfController');
app.use('/',pdfController);

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

const dotenv = require('dotenv');
dotenv.config();

port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server started at => http://localhost:${port}`);
});