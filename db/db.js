import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const dbConn = mongoose.connection;
dbConn.on('error', (error)=> console.error(error));
dbConn.once('open', () => console.log('Database Connected'));

export default dbConn;