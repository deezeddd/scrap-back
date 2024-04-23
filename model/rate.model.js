import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const RateSchema = new mongoose.Schema({
    productId:{
        type: Number,
        required:true,
        default:0
    },
    productName:{
        type: String,
        required: true
    }, 
    price:{
        type: Number,
        required: true
    }
 
});
RateSchema.plugin(mongooseSequence(mongoose), { inc_field: 'productId' });

const Rate = mongoose.model('Rate', RateSchema);

export default Rate;
