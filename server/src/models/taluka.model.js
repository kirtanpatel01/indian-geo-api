import mongoose, { Schema, model } from 'mongoose';

const talukaSchema = new Schema({
    name: String,
    districtId: mongoose.Types.ObjectId,
    villages: [
        {
            villageId: mongoose.Types.ObjectId,
            name: String
        }
    ]
});

export const Taluka = model('Taluka', talukaSchema)
