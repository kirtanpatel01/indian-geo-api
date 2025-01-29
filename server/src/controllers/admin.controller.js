import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { State } from "../models/state.model.js";
import { District } from "../models/district.model.js";
import { Taluka } from "../models/taluka.model.js";
import { Village } from "../models/village.model.js";
import { ApiError } from "../utils/ApiError.js";

const addStateName = asyncHandler(async(req, res) => {
    const { stateName } = req.params;

    if(!stateName) {
        throw new ApiError(409, "State name is required!")
    }

    const state = await State.create({ name: stateName });
    if(!state) {
        throw new ApiError(500, "Something went wrong while storing data in mongodb!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, state, "State name added successfully!")
    )
})

const addDistrictName = asyncHandler(async(req, res) => {
    const { stateName, districtName } = req.params;

    if(!stateName) {
        throw new ApiError(409, "State name is required!") 
    }
    
    const state = await State.findOne({ name: stateName });
    if(!state) {
        throw new ApiError(404, "State not found!")
    }

    const stateId = state._id;
    if(!stateId) {
        throw new ApiError(404, "State id not found!")
    }

    if(!districtName) {
        throw new ApiError(409, "District name is required!") 
    }
    
    const district = await District.create({
        name: districtName,
        stateId: stateId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, district, "State name added successfully!")
    )
})

const addTalukaName = asyncHandler(async(req, res) => {
    const { districtName, talukaName } = req.params;
    if(!districtName) {
        throw new ApiError(409, "District name is required!") 
    }
    
    const district = await District.findOne({ name: districtName });
    if(!district) {
        throw new ApiError(404, "District not found!")
    }

    const districtId = district._id;
    if(!districtId) {
        throw new ApiError(404, "District id not found!")
    }

    if(!talukaName) {
        throw new ApiError(409, "Taluka name is required!") 
    }

    const taluka = await Taluka.create({
        name: talukaName,
        districtId
    })
    if(!taluka) {
        throw new ApiError(500, "Something went wrong while storing data in mongodb!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, taluka, "State name added successfully!")
    )
})

const addVillageName = asyncHandler(async(req, res) => {
    const { talukaName, villageName } = req.params;
    if(!talukaName) {
        throw new ApiError(409, "Taluka name is required!") 
    }
    
    const taluka = await Taluka.findOne({ name: talukaName });
    if(!taluka) {
        throw new ApiError(404, "Taluka not found!")
    }

    const talukaId = taluka._id;
    if(!talukaId) {
        throw new ApiError(404, "Taluka id not found!")
    }

    if(!talukaName) {
        throw new ApiError(409, "Taluka name is required!") 
    }

    const village = await Village.create({
        name: villageName,
        talukaId
    })
    if(!village) {
        throw new ApiError(500, "Something went wrong while storing data in mongodb!")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, village, "State name added successfully!")
    )
})

const getAllStates = asyncHandler(async(req, res) => {
    const states = await State.find({});
    if(!states) {
        throw new ApiError(500, "Error while fetching state names!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, states, "State names fectched successfully!")
    )
})

const getAllDistricts = asyncHandler(async(req, res) => {
    const districts = await District.find({});
    if(!districts) {
        throw new ApiError(500, "Error while fetching district names!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, districts, "District names fectched successfully!")
    )
})

const getAllTalukas = asyncHandler(async(req, res) => {
    const talukas = await Taluka.find({});
    if(!talukas) {
        throw new ApiError(500, "Error while fetching taluka names!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, talukas, "State names fectched successfully!")
    )
})

const getAllVillages = asyncHandler(async(req, res) => {
    const villages = await Village.find({});
    if(!villages) {
        throw new ApiError(500, "Error while fetching village names!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, villages, "Village names fectched successfully!")
    )
})

const getAll = asyncHandler(async(req, res) => {
    const { input } = req.params;
    if(!input) {
        throw new ApiError('Input is required')
    }
})

export {
    addStateName,
    addDistrictName,
    addTalukaName,
    addVillageName,
    getAllStates,
    getAllDistricts,
    getAllTalukas,
    getAllVillages,
    getAll,
}