import mongoose, { Schema, model } from 'mongoose';

const districtSchema = new Schema({
    name: String,
    stateId: mongoose.Types.ObjectId,
    talukas: [
        {
            talukaId: mongoose.Types.ObjectId,
            name: String
        }
    ]
});

export const District = model('District', districtSchema)