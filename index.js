import express from 'express'
import bodyParser from 'body-parser';
import connectDB from './function/connection.js'
import userRouter from './routes/user.js'
import rateRouter from './routes/rateList.js'
import 'dotenv/config'
// import sendMail from './sendmail.js'

import AdminAccess  from './middleware.js'
const app = express()

connectDB()

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
//For Parsing JSON
app.use(bodyParser.json());


// WELCOME PAGE
app.get('/',AdminAccess("Admin"), function (req, res) {
  res.send("Welcome To Papa Scrap");
})

// Sends OTP MAIL
app.get('/mail',async (req, res) =>{
  // return sendMail
})


app.use('/user',userRouter)

app.use('/rate',rateRouter)

app.listen(8080,()=>{
  console.log(`Server is Running ${PORT}`)
})