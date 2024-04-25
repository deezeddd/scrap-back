import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';
import User from "./user.model.js";

const InquirySchema = new mongoose.Schema({
    inquiryId:{
        type: Number,
        required:true,
        default:0
    },
    productId:{
        type: Number,
        required: true
    },
    userId:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    inqiryDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    },
    {timestamps:true}
);
InquirySchema.plugin(mongooseSequence(mongoose), { inc_field: 'inquiryId' });

const Inquiry = mongoose.model('Inquiry', InquirySchema);

export default Inquiry;
