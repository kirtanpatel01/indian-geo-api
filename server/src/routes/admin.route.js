import { Router } from 'express';
import { 
    addStateName,
    addDistrictName,
    addTalukaName,
    addVillageName,
    getAllStates,
    getAllDistricts,
    getAllTalukas,
    getAllVillages,
    getAll
} from '../controllers/admin.controller.js';
const router = Router();

router.route('/add/:stateName').post(addStateName);
router.route('/add/:stateName/:districtName').post(addDistrictName);
router.route('/add/:districtName/:talukaName').post(addTalukaName);
router.route('/add/:talukaName/:villageName').post(addVillageName);

router.route('/get/states').get(getAllStates);
router.route('/get/districts').get(getAllDistricts);
router.route('/get/talukas').get(getAllTalukas);
router.route('/get/villages').get(getAllVillages);

router.route('/get/:input').get(getAll);

export default router;