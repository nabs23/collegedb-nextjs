import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    name: String,
    type: {
        type: String,
        enum: ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'],
        required: true
    },
    normalBalance: {
        type: String,
        enum: ['Debit', 'Credit'],
        required: true
    }
})

const AccountModel = mongoose.models.Account || mongoose.model('Account', accountSchema);

export default AccountModel;