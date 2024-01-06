import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
    name: String,
    code: String,
    description: String,
    amount: Number,
    tuitionDiscount: Number,
    feesDiscount: Number,
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }
})

const ScholarshipModel = mongoose.models.Scholarship || mongoose.model('Scholarship', scholarshipSchema);

export default ScholarshipModel;