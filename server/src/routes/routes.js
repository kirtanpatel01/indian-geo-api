import { Router } from "express";
import { getAllVillages } from "../controllers/conttollers.js";


const router = Router();

router.route('/get-all-states').get();

router.route('/get-all-villages/:taluka/:district/:state').get(getAllVillages);

export default router;