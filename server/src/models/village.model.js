import mongoose, { Schema, model } from 'mongoose';

const villageSchema = new Schema({
    name: String,
    talukaId: mongoose.Types.ObjectId,
});

export const Village = model('Village', villageSchema)