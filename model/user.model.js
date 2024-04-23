import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const UserSchema = new mongoose.Schema({
    userId:{
        type: Number,
        required:true,
        default:0
    },
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
 
});
UserSchema.plugin(mongooseSequence(mongoose), { inc_field: 'userId' });

const User = mongoose.model('User', UserSchema);

export default User;
