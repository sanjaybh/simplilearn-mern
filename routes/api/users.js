const express = require('express')
const router = express.Router()
const uuid = require('uuid')

let users = require('../../Stubbed/Users')

const jwt = require("jsonwebtoken")
const { verifyToken, tokenGenKey } = require("../../apikey")
//let serverToken = tokenGenKey["tokenKey"]

//get all users
router.get('/', verifyToken, (req, res) => {
    var token = req.token
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, tokenGenKey['secretword'], (err, authData) => {
        if(err){
           return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        } else{
            res.json({
                message: 'Posts created...',
                authData,
                users
            })
        }
    })    
})

//get user by id
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found){
        res.json(users.filter(user => user.id == parseInt(req.params.id)))
    } else {
        res.sendStatus(400).send("User not found")
    }
})

//create a new user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newUser.name || !newUser.email){
        return res.sendStatus(400).send("Unable to create new user")
    }

    users.push(newUser)
    res.json(users)
})

//Update user
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found){
        const updateUser = req.body

        users.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.name = updateUser.name ? updateUser.name : user.name
                user.email = updateUser.email ? updateUser.email : user.email
                res.json({msg: 'User has been updated', user})
            }
        })
    } else {
        res.sendStatus(400)
    }
})

//Delete User
router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found){
        user = users.filter(user => user.id !== parseInt(req.params.id))
        res.json({msg: "User deleted", user})
    } else {
        res.sendStatus(400)
    }
})

//Export router
module.exports = router