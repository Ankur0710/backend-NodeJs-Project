const mongoose = require('mongoose');

// creating a database
mongoose.connect("mongodb://localhost:27017/Ankur" , {
    // useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useFindAndModify : false
}).then(() =>{
    console.log("Connection is successful")
}).catch((error) =>{
    console.log("MongoDB give error in ",error)
})