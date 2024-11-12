import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    name: String,
    code: String,
    description: String,
    amount: Number,
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }
})

const FeeModel = mongoose.models.Fee || mongoose.model('Fee', feeSchema);

export default FeeModel