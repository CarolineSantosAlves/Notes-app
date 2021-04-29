const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(router);

let marked = require('marked');

router.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
})

router.post('/', (req, res) =>{
    let text = marked(req.body.htmlText);
    
    
    return res.json(text)
})
module.exports = router;