const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')

//const { body, validationResult } = require('express-validator');

const Student = mongoose.model('Student')

router.get('/', (req, res) => {
    res.render('../student/addOrEdit', {
        viewTitle: 'Insert Student'
    })
})

router.post('/', (req, res) => {
    
    // TODO 
    // - stop submitting when hitting any error
    // - clean code, try to write in a better way
    
    if(req.body._id == '' ){ 
        if(findEmptyFields(req) === true){
            //returnMainPgUntilErrRemoved(req, "Insert Student")   
            res.render('../student/addOrEdit', {
                viewTitle: "Insert Student",
                formFieldsError: "Fields are mandatory",
                formFieldClass: 'alert alert-danger'
            })       
        } else {
            // req.checkBody('fname', 'Name is required').notEmpty();
            // req.checkBody('email', 'Email is required').notEmpty();

            // var errors = req.validationErrors();
            // if(errors){
            //     req.session.errors = errors;
            //     req.session.success = false;
            //     res.redirect('../student/addOrEdit');
            // } else {
            //     req.session.success = true;
            //     //res.redirect('/');
            //     res.render('/', { success: req.session.success, errors: req.session.errors });
            //     req.session.errors = null;
            //     //insertRecord(req, res)
            //     //console.log("Inserting data..............")
            // }
            insertRecord(req, res)
            // //console.log("Inserting data..............")
        }        
    } else {
        if(findEmptyFields(req) === true){
            //returnMainPgUntilErrRemoved(req, "Update Student") 
            res.render('../student/addOrEdit', {
                viewTitle: "Update Student",
                formFieldsError: "Fields are mandatory",
                formFieldClass: 'alert alert-danger'
            })       
        } else {
            updateRecord(req, res)
            //console.log("Updating data..............")
        }        
    }
})

function returnMainPgUntilErrRemoved(res, formType){
    return res.render('../student/addOrEdit', {
        viewTitle: formType,
        formFieldsError: "Fields are mandatory",
        formFieldClass: 'alert alert-danger'
    })  
}

function insertRecord(req, res){
    var student = new Student()
    var fname = req.body.fullName
    var email = req.body.email
    var mobile = req.body.mobile
    var city = req.body.city

    student.fullName = fname
    student.email = email
    student.mobile = mobile
    student.city = city
    student.save((err, doc) =>{
        if(!err){
            res.redirect('../student/list')
        } else {
            console.log('Error during insert: '+err)
        }
    }) 
}

function findEmptyFields(req) {
    var flag = false
    var fname = req.body.fullName
    var email = req.body.email
    var mobile = req.body.mobile
    var city = req.body.city
    var allFields = [fname, email, mobile, city]
    var field;
 
    for (field of allFields) {
        if(field == ""){
            flag = true //found empty
        }
    } 
    return flag //not found empty
}

function updateRecord(req, res){
    Student.findOneAndUpdate({
        _id: req.body._id
    },
    req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect('../student/list')
        } else {
            console.log('Error during update: '+ err)
        }
    })
}

router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if(!err){
            res.render('../student/list', {
                list: docs
            })
        } else {
            console.log('Error in retrieval: '+ err)
        }
    })
})

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('../student/addOrEdit', {
                viewTitle: "Update Student",
                student: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('../list')            
        } else {
            console.log('Error in deletion ' + err)
        }
    })
})

module.exports = router