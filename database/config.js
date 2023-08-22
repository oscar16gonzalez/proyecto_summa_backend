const mongoose = require('mongoose');



const dbConnection = async() => {

    const db = process.env.MONGODB_CNN || `mongodb+srv://user_summa:Tm0iVcrdmI9Ce2jz@clustersumma.iovgb6l.mongodb.net/controlRutas;`

    try {

        await mongoose.connect( db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports = {
    dbConnection
}
