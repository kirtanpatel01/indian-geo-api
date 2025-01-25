import { Router } from 'express';
import { addStateName } from '../controllers/admin.controller.js';
const router = Router();

router.route('/add/state/:stateName').post(addStateName);

export default router;