import mongoose, { Schema, model } from 'mongoose';

const districtSchema = new Schema({
    name: String,
    stateId: mongoose.Types.ObjectId,
    talukas: {
        type: [
            {
                talukaId: mongoose.Types.ObjectId,
                name: String
            }
        ],
        default: []
    }
});

export const District = model('District', districtSchema)
