var express = require('express')
var users = require('./routes/users');
//var bodyParser = require('body-parser')

var app = express(); 
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/user', users); 


app.listen(3000);







