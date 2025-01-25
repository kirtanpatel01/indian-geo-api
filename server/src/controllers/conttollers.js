import { District } from "../models/district.model.js";
import { State } from "../models/state.model.js";
import { Taluka } from "../models/taluka.model.js";
import { Village } from "../models/village.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllVillages = asyncHandler(async (req, res) => {
  const { taluka, district, state } = req.params;

  // Step 4: Fetch all villages within the taluka
  const villages = await Village.find({}, { name: 1 });

  const transformedVillages = villages.map((village) => ({
    ...village._doc, // Spread the document properties
    _id: { $oid: village._id.toString() }, // Manually format _id
  }));

  // Step 5: Return the response
  return res
    .status(200)
    .json(
      new ApiResponse(200, transformedVillages, "Village names fetched successfully!")
    );
});

export { getAllVillages };

const getAllDistricts = asyncHandler(async (req, res) => {
  const { state } = req.params;

  // Find districts for the given state
  const districts = await District.find({ stateId: state }, { name: 1 });

  const transformedDistricts = districts.map((district) => ({
    ...district._doc,
    _id: { $oid: district._id.toString() }
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, transformedDistricts, "District names fetched successfully!")
    );
})

const getAllTalukas = asyncHandler(async (req, res) => {
  const { district } = req.params;

  // Find talukas for the given district
  const districtDoc = await District.findById(district);

  if (!districtDoc) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "District not found"));
  }

  const transformedTalukas = districtDoc.talukas.map((taluka) => ({
    ...taluka._doc,
    _id: { $oid: taluka.talukaId.toString() },
    name: taluka.name
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, transformedTalukas, "Taluka names fetched successfully!")
    );
});

export { getAllTalukas };
