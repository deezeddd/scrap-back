import express from 'express';
import { createRate, getAllRates, getRateById, updateRate, deleteRate } from '../controller/rateController.js';
import { restrictTo, restrictToLoggedInUserOnly } from '../middleware/authFromHeader.js';



const router = express.Router();

router.route('/addproduct')
  // CREATE operation
  .all(restrictToLoggedInUserOnly,restrictTo(["Admin"]))
  .post(async (req, res) => {
    try {
      console.log(req.body)
      const newRate = await createRate(req.body);
      res.status(201).json(newRate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })


  // READ operation (get all rates)
  router.route('/getallrates')
  .get(async (req, res) => {
    try {
      const rates = await getAllRates();
      res.status(200).json(rates);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  // READ operation (get rate by ID)
router.route('/:id')
  .get(async (req, res) => {
    const productId = req.params.id; 
    try {
      const rate = await getRateById(productId);
      if (!rate) {
        res.status(404).json({ error: 'No Product Available' });
      } else {
        res.status(200).json(rate);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })

                  // UPDATE operation
  .all(restrictToLoggedInUserOnly,restrictTo(["Admin"]))
  .put(async (req, res) => {
    const productId = req.params.id;
    try {
      const updatedRate = await updateRate(productId, req.body);
      res.status(200).json(updatedRate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  })

                 // DELETE operation
  .delete(async (req, res) => {
    const productId = req.params.id;
    try {
      const message = await deleteRate(productId);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

export default router;
