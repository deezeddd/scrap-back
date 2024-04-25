// inquiryController.js

import Inquiry from '../model/inquiry.model.js';
import User from '../model/user.model.js';
import { getRateById } from './rateController.js';

// Helper function to get user details
const getUserDetails = async (userId) => {
  const user = await User.findOne({ userId });
  return user ? { userName: user.name, userPh: "user.phone", userAdd: "user.address" } : null;
};

// Create a new inquiry
const createInquiry = async (requestData) => {
  try {
    const newInquiry = await Inquiry.create(requestData);

    const product = await getRateById(requestData.productId);
    if (!product) {
      return { error: "Product Not Found" };
    }

    const userId = parseInt(requestData.userId);
    const user = await getUserDetails(userId)
    if (!user) {
      return { error: "User Not Found" };
    }

    return {
      newInquiry,
      //TODO NoT NEeded
      details:{
        prodName: product.productName,
        userName: user.name,
        userPh: "9923121232", //TODO
        userAdd: '31/1213 ABC St' //TODO}
      }
    };
  } catch (error) {
    return { error: error.message };
  }
};

// Retrieve all inquiries
const getAllInquiries = async () => {
  try {
    const inquiries = await Inquiry.find();
    return { inquiries };
  } catch (error) {
    return { error: 'Internal server error' };
  }
};

// Retrieve an inquiry by ID
const getInquiryById = async (inquiryId) => {
  try {
    const inquiry = await Inquiry.findOne({inquiryId: inquiryId});

    const product = await getRateById(inquiry.productId);
    console.log(product)
    if (!product) {
      return { error: "Product Not Found" };
    }

    const userId = parseInt(inquiry.userId);
    const user = await getUserDetails(userId)
    if (!user) {
      return { error: "User Not Found" };
    }
    console.log(user)

    return { 
        inquiry,
        details:{
            prodName: product.productName,
            userName: user.name,
            userPh: "9923121232", //TODO
            userAdd: '31/1213 ABC St' //TODO}
          }
     };
  } catch (error) {
    return { error: 'Internal server error' };
  }
};

// Update an inquiry by ID
const updateInquiryById = async (inquiryId, updateData) => {
  try {
    const updatedInquiry = await Inquiry.findOneAndUpdate({inquiryId}, updateData, { new: true });
    return { message:"Inquiry Updated Successfully" ,updatedInquiry };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete an inquiry by ID

const deleteInquiryById = async (inquiryId) => {
  try {
    // Find the inquiry by its ID
    const inquiry = await Inquiry.findOne({inquiryId});
    
    // Check if the inquiry exists
    if (inquiry) {
      // Inquiry found, proceed with deletion
      const deletedInquiry = await Inquiry.findOneAndDelete({inquiryId});
      return { message: 'Inquiry deleted successfully' };
    } else {
      // Inquiry not found, return appropriate message
      return { message: 'Inquiry not found' };
    }
  } catch (error) {
    // Handle internal server error
    return { error: 'Internal server error' };
  }
};


export {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryById,
  deleteInquiryById
};
