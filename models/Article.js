import mongoose from "mongoose";

mongoose.set('useCreateIndex', true);
// create Schema
const Article = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});

// export model
export default mongoose.model('Articles', Article);