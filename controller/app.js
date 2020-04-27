const express =     require('express');
const app =         express();
const user =        require('../model/user.js');
const category =    require('../model/category.js');
const bodyParser =  require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/api/user/:userid', (req, res) => {

    const id = req.params.userid;

    user.getUser(id, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.status(500).send('Some error');
        }
    })
})

app.get('/api/user', (req, res) => {

    user.getUsers((err, result) => {
        if(!err) {
            res.send(result);
        } else {
            console.log(result);
            res.status(500).send('Some error');
        }
    })
})

app.post('/api/user', (req, res) => {

    const username  = req.body.username;
    const email     = req.body.email;
    const role      = req.body.role;
    const password  = req.body.password;

    user.addUser(username, email, role, password, (err, result) => {
        
        if(err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.send(`${result} record added`);
        }
    })
})

app.put('/api/user/:userid', (req,res) => {

    const email     = req.body.email;
    const password  = req.body.password;
    const userid    = req.params.userid;

    user.updateUser(email, password, userid, (err, result) => {

        if(err) {
            res.status(500).send(err);
        } else {
            res.send(`${result} record updated`);
        }
    })
})

app.delete('/api/user/:userid', (req, res) => {

    const userid = req.params.userid;

    user.deleteUser(userid, (err,result) => {

        if(err) {
            res.status(500).send(err);
        } else {
            res.send(`${result} record deleted`);
        }
    })
})

app.get('/api/category', (req, res) => {

    category.getCategory((err, result) => {

        if(err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    })

})

app.get('/api/category/:cat_id/furniture', (req, res) => {

    const cat_id = req.params.cat_id;

    category.getFurnitureByCatID(cat_id, (err, result) => {

        if(err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    })
})


module.exports = app
