import mongoose from "mongoose";

mongoose.set('useCreateIndex', true);
// create Schema
const Product = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

// export model
export default mongoose.model('Products', Product);