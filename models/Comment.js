import mongoose from "mongoose";

mongoose.set('useCreateIndex', true);
// create Schema
const Comment = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    article_id:{
        type: String,
        required: true
    },
});

// export model
export default mongoose.model('Comments', Comment);