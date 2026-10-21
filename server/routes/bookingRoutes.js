import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Submit booking enquiry
router.post('/', createBooking);

// Protected Admin: Manage enquiries
router.get('/', protectAdmin, getBookings);
router.get('/:id', protectAdmin, getBookingById);
router.patch('/:id/status', protectAdmin, updateBookingStatus);

export default router;
