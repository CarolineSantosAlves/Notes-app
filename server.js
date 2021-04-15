const express = require('express');
//const cors = require('cors');
const app = express();
//app.use(cors());

const routes = require('./router');
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.use(routes);
app.listen(3000, function(){
    console.log('servidor rodando na porta 3000')
})