import mongoose from "mongoose";

// Period Types
const periodTypes = {
    Semestral: ['First Semester', 'Second Semester', 'Summer'],
    Trimestral: ['First Trimester', 'Second Trimester', 'Third Trimester', 'Summer'],
}

const institutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Institution name is required'],
    },
    shortName: {
        type: String,
        required: true,
        maxLength: 24,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: props => `${props.value} should only contain letters!`
        },
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    city: {
        type: String,
        required: [true, 'City/Municipality is required'],
    },
    province: {
        type: String,
        required: [true, 'Province is required'],
    },
    region: {
        type: String,
        required: [true, 'Region is required'],
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    periodType: {
        type: String,
        required: true,
        enum: {
            values: ['Semestral', 'Trimestral'],
            message: '{VALUE} is not supported for periodType'
        },
        immutable: true,
    },
    customLetterhead: {
        type: String,
        maxLength: [3000, 'Letterhead must be less than 3000 characters including HTML tags'],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Define a virtual property for each period type, if the program's periodType is Semestral return periodTypes.Semestral
institutionSchema.virtual('periods').get(function () {
    return periodTypes[this.periodType];
});


// const Institution = mongoose.model('Institution', institutionSchema);
const Institution =  mongoose.models.Institution || mongoose.model('Institution', institutionSchema);

export default Institution;