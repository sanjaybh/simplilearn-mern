//const mongoose = require("mongoose")
const express = require('express')
const router = express.Router()

require('../../models/db')

const studentController = require('../../controllers/studentController')

router.get('/list', (req, res) =>{
    res.send(`
        <h2>Database Details<h2>
        <h3><a href='/'>back</a></h3>
    `)
    res.end()
})
router.use('/', studentController)

module.exports = router