import { Router } from 'express';
const router = Router();

import {
    getFamilyTree,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember
} from '../controller/Family.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getFamilyTree)
    .post(protect, addFamilyMember);

router.route('/:id')
    .put(protect, updateFamilyMember)
    .delete(protect, deleteFamilyMember);

export default router;
