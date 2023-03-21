const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = () => {
    const DB_URI = ( NODE_ENV === 'development') ? process.env.DB_URI_TEST : process.env.DB_URI ;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, res) => {
        if(!err) {
            console.log('**** CONEXION CORRECTA****');
        }else{
            console.log('**** ERROR CONEXION ****');
        }
    }
    
    );

}


module.exports = dbConnect