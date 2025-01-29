import mongoose, { Schema, model } from "mongoose";

const stateSchema = new Schema({
    name: String,
    districts: {
        type: [
            {
                districtId: mongoose.Types.ObjectId,
                name: String,
            },
        ],
        default: [],
    },
});

export const State = model("State", stateSchema);
