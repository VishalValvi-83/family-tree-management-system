import { Router } from 'express';
const router = Router();

import { addFamilyMember, getFamilyMember, getAllFamilyMembers, deleteFamilyMember, updateFamilyMember } from '../controller/Family.js';

router.route('/')
    .get(getAllFamilyMembers)
    .post(addFamilyMember);

router.route('/:_id')
    .get(getFamilyMember)
    .patch(updateFamilyMember)
    .delete(deleteFamilyMember);

export default router;
