import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
    },
    amount: Number,
    entries: [{
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        debit: Number,
        credit: Number
    }],
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default TransactionModel;