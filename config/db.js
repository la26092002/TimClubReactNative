
//mongodb://127.0.0.1:27017/TIM
//mongodb+srv://user2002:qcQBr2cthN7qQhEp@cluster0.as7ez8o.mongodb.net/tim?retryWrites=true&w=majority

const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected...');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
});

module.exports = connectDB;
