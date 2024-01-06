import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstructionalFacility",
  },
  daysOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  startTime: Date, // Start time of the class
  endTime: Date, // End time of the class
});

const scheduleModel = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema); 

export default scheduleModel;
