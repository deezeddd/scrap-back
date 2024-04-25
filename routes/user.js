import { restrictToLoggedInUserOnly,restrictTo } from '../middleware/authFromHeader.js';
import User from '../model/user.model.js'
import express from 'express'



const router = express.Router();

//HOME
router.get('/', (req, res) => {
  res.send("User")
})

//SIGNUP
router.post('/signup', async (req, res) => {
  try {
    // Check if user already exists with the provided email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
      role: req.body.role
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

// LOGIN
router.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password)
    console.log(token);
  
    res.json({token});

  } catch (err) {

    console.error('Error during login:', err.message);
    
    res.status(401).json( {"Error during login": err.message} );
  }
});

//Via Cookie Method
//LOGOUT
// router.get('/logout', (req,res)=>{
//   try{
//     if(!res.cookie('token')){
//       res.send("No User Logged-in")
//     }
//     res.clearCookie('token')
//     res.send("User Logged-out")
//   }catch(err){
//     res.status(500).send({msg: err.message})
//   }
// })

router.get('/logout',restrictToLoggedInUserOnly, (req, res) => {
  try {
    // Check if the request includes the authorization header with a token
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send("No user logged in");
    }

    // Clear the token from the headers
    delete req.headers['authorization'];

    res.status(200).send("User logged out");
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});



//Get User details , Delete User details by ID //ADMIN ACCESS
router
.all(restrictToLoggedInUserOnly,restrictTo(["Admin"]))
.get('/allusers',async (req,res)=>{
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
    res.status(500).send({msg: err.message})

  }
})

//All Users

export default router;
