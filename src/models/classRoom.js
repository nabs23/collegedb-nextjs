import mongoose from "mongoose";

const classRoomSchema = new mongoose.Schema({
    name: String,
    location: String,
    capacity: Number,
})

const ClassRoomModel = mongoose.models.ClassRoom || mongoose.model('ClassRoom', classRoomSchema);

export default ClassRoomModel;