import Rate from '../model/rate.model.js'; 

// CREATE operation
const createRate = async (rateData) => {
  try {
    const newRate = new Rate(rateData);
    const savedRate = await newRate.save();
    return savedRate;
  } catch (error) {
    throw new Error('Could not create rate: ' + error.message);
  }
};

// READ operation (get all rates)
const getAllRates = async () => {
  try {
    const rates = await Rate.find();
    return rates;
  } catch (error) {
    throw new Error('Could not fetch rates: ' + error.message);
  }
};

// READ operation (get rate by ID)
const getRateById = async (productId) => {
  try {
    const rate = await Rate.findOne({ productId });
    return rate;
  } catch (error) {
    throw new Error('Could not fetch rate: ' + error.message);
  }
};

// UPDATE operation
const updateRate = async (productId, updatedData) => {
  try {
    const rate = await Rate.findOneAndUpdate(productId, updatedData, { new: true });
    return rate;
  } catch (error) {
    throw new Error('Could not update rate: ' + error.message);
  }
};

// DELETE operation
const deleteRate = async (productId) => {
  try {
    await Rate.findOneAndDelete({ productId });

    // await Rate.findByIdAndDelete(productId);
    return 'Rate deleted successfully';
  } catch (error) {
    throw new Error('Could not delete rate: ' + error.message);
  }
};

export { createRate, getAllRates, getRateById, updateRate, deleteRate };
