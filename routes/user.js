import User from '../model/user.model.js'
import express from 'express'
import autoIncrement from 'mongoose-auto-increment';
import AdminAccess from '../middleware.js';

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("User")
})

//Create User!

router.post('/signup', AdminAccess("ADMIN"), async (req, res) => {
  try {
    // Check if user already exists with the provided email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    
    // Create a new user document
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password  // Note: You should hash the password before saving it in production
    });

    // Save the new user document to the database
    const savedUser = await newUser.save();
    console.log('New user created:', savedUser);
    
    res.status(201).json(savedUser); // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for user login
router.post('/login', AdminAccess("admin"), async (req, res) => {
  // Check if the provided email and password match a user in the database
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct (you should compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // If authentication succeeds, create a login session or JWT token
    // Return success response with user details or token
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Get User details , Delete User details by ID

//All Users

export default router;
