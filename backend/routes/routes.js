const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.js');
const ObjectId = require('mongoose').Types.ObjectId;




// get 2
router.get('/getallemployee',(req,res)=>{

    
        Employee.find({},(err, doc)=>{
            if(err){
                console.log('Error in Get Employee by id' +err)
            }
            else{
                res.send(doc);
            }

        });

    
    


    // Employee.find( (err,doc)=>{
    //     if(err){
    //         console.log('Error in Post Data' +err)
    //     }
    //     else{
    //         res.send(doc);
    //     }
    // })
});


//get by id
router.get('/:id',(req,res)=>{

    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id,(err, doc)=>{
            if(err){
                console.log('Error in Get Employee by id' +err)
            }
            else{
                res.send(doc);
            }

        });

    }
    else{
        return res.status(400).send('No record found with ' + req.params.id)
    }


    // Employee.find( (err,doc)=>{
    //     if(err){
    //         console.log('Error in Post Data' +err)
    //     }
    //     else{
    //         res.send(doc);
    //     }
    // })
});


//Post
router.post('/employee',(req,res)=>{
    let emp = new Employee({
    name :  req.body.name,
    position:  req.body.position,
    dept: req.body.dept
    });

    emp.save((err, doc)=>{
        if(err){
            console.log('Error in post data' + err)
        }
        else{
            res.send(doc);
        }
    })

});

// delete
router.delete('/:id',(req,res)=>{

    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id,(err, doc)=>{
            if(err){
                console.log('Error in Deleting Employee by id' +err)
            }
            else{
                res.send(doc);
            }

        });

    }
    else{
        return res.status(400).send('No record found with ' + req.params.id)
    }


    // Employee.find( (err,doc)=>{
    //     if(err){
    //         console.log('Error in Post Data' +err)
    //     }
    //     else{
    //         res.send(doc);
    //     }
    // })
});


// Put
router.put('/:id',(req,res)=>{

    let emp = {
        name :  req.body.name,
        position:  req.body.position,
        dept: req.body.dept
        };

    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err, doc)=>{
            if(err){
                console.log('Error in Update Employee by id' +err)
            }
            else{
                res.send(doc);
            }

        });

    }
    else{
        return res.status(400).send('No record found with ' + req.params.id)
    }


    // Employee.find( (err,doc)=>{
    //     if(err){
    //         console.log('Error in Post Data' +err)
    //     }
    //     else{
    //         res.send(doc);
    //     }
    // })
});

module.exports = router;


