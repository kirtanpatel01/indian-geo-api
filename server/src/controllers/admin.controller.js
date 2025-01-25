import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addStateName = asyncHandler(async(req, res) => {
    const { stateName } = req.params;
    return res
    .status(200)
    .json(
        new ApiResponse(200, stateName, "State name added successfully!")
    )
})

export {
    addStateName,
}