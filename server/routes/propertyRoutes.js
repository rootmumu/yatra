import express from 'express';
import {
  getProperties,
  getPropertyById,
  getPropertyAvailability,
  createProperty,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
  blockDates,
  unblockDates
} from '../controllers/propertyController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.get('/:id/availability', getPropertyAvailability);

// Protected Admin routes
router.post('/', protectAdmin, createProperty);
router.put('/:id', protectAdmin, updateProperty);
router.delete('/:id', protectAdmin, deleteProperty);
router.patch('/:id/toggle-status', protectAdmin, togglePropertyStatus);
router.post('/:id/block-dates', protectAdmin, blockDates);
router.post('/:id/unblock-dates', protectAdmin, unblockDates);

export default router;
