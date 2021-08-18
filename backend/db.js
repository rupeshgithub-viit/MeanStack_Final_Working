const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/meanDB', (err)=>{
    if(!err){
        console.log('DB Connnection Successful')
    }
    else{
        console.log('Error in Connnection ' + err)

    }
})

module.exports = mongoose;