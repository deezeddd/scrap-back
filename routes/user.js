import User from '../model/user.model.js'
import express from 'express'
import AdminAccess from '../middleware/middleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send("User")
})

//Create User!

router.post('/signup', async (req, res) => {
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
      password: req.body.password  
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
router.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password)
    console.log(token);
    res.send(token);

  } catch (err) {

    console.error('Error during login:', err.message);
    
    res.status(401).json( {"Error during login": err.message} );
  }
});



//Get User details , Delete User details by ID

//All Users

export default router;
