import { Router } from 'express';
import { getContactInfo, updateContactInfo } from './contact.controller';
import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/role';
import { validate } from '../../middleware/validate';
import { contactInfoSchema } from '../../schemas/contact';
export const contactRouter = Router();
contactRouter.get('/contact-info', getContactInfo);
contactRouter.put('/admin/contact-info', authMiddleware, requireRole('admin'), validate(contactInfoSchema), updateContactInfo);