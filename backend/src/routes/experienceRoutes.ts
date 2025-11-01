import { Router } from 'express';
import {
    getAllExperiences,
    getExperienceById,
    getExperienceSlots,
} from '../controllers/experienceController';

const router = Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);
router.get('/:id/slots', getExperienceSlots);

export default router;