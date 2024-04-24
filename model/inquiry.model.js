import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';
import User from "./user.model";

const InquirySchema = new mongoose.Schema({
    inquiryId:{
        type: Number,
        required:true,
        default:0
    },
    productId:{
        type: Number,
        required:true,
    },
    productName:{
        type: String,
        required: true
    }, 
    price:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    inqiryDate:{
        type: Date,
        required: true
    },
    userDetails:{
        type: User,
        required: true
    }
    },
    {timestamps:true}
);
InquirySchema.plugin(mongooseSequence(mongoose), { inc_field: 'inquiryId' });

const Inquiry = mongoose.model('Inquiry', InquirySchema);

export default Inquiry;
