// inquiryRoutes.js

import express from 'express';
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryById,
  deleteInquiryById
} from '../controller/inquiryController.js';
import { restrictTo, restrictToLoggedInUserOnly } from '../middleware/authFromHeader.js';

const router = express.Router();

// Create a new inquiry
router.post('/create', async (req, res) => {
  const { newInquiry, details, error } = await createInquiry(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  res.status(201).json({ newInquiry, details });
});

// Retrieve all inquiries
router.get('/',restrictToLoggedInUserOnly,restrictTo('Admin'), async (req, res) => {
  const { inquiries, error } = await getAllInquiries();
  if (error) {
    return res.status(500).json({ error });
  }
  res.json({ inquiries });
});

// Retrieve an inquiry by ID
router.get('/:id', async (req, res) => {
  const { inquiry,details, error } = await getInquiryById(req.params.id);
  if (error) {
    return res.status(500).json({ error });
  }
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  res.status(201).json({ inquiry, details });
});

// Update an inquiry by ID
router.put('/:id', async (req, res) => {
  const { message, updatedInquiry, error } = await updateInquiryById(req.params.id, req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  if (!updatedInquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  res.json({message, updatedInquiry});
});

// Delete an inquiry by ID
router.delete('/:id',restrictToLoggedInUserOnly,restrictTo('Admin'), async (req, res) => {
  const { message, error } = await deleteInquiryById(req.params.id);
  if (error) {
    return res.status(500).json({ error });
  }
  res.json({ message });
});

export default router;
