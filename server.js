const express = require('express');
//const cors = require('cors');
const app = express();
//app.use(cors());

const routes = require('./router');
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.use(routes);
const port = process.env.PORT || 3000 
app.listen(port, function(){
    console.log('Servidor rodando na porta 3000');
})