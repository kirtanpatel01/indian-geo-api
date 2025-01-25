import mongoose, { Schema, model } from 'mongoose';

const stateSchema = new Schema({
    name: String,
    districts: [
        {
            districtId: mongoose.Types.ObjectId,
            name: String
        }
    ]
});

export const State = model('State', stateSchema)