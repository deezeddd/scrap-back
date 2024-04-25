import express from 'express'
import bodyParser from 'body-parser';
import connectDB from './function/connection.js'
import userRouter from './routes/user.js'
import rateRouter from './routes/rateList.js'
import inquiryRouter from './routes/inquiry.js'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
// import sendMail from './sendmail.js'

const app = express()

connectDB()

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())
// app.use(checkForAuthenticationCookie("token"))
//For Parsing JSON
app.use(bodyParser.json());


// WELCOME PAGE
app.get('/', function (req, res) {
  res.send({message: "Welcome to Papa Scrap: ", user: req.user});
})

// Sends OTP MAIL
app.get('/mail',async (req, res) =>{
  // return sendMail
})


app.use('/user',userRouter)

app.use('/rate', rateRouter)
app.use('/inquiry',inquiryRouter)

app.listen(8080,()=>{
  console.log(`Server is Running ${PORT}`)
})