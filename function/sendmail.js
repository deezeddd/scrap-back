// import nodemailer from 'nodemailer'
// import 'dotenv/config'


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: 'kalpved123@gmail.com',
//     pass: process.env.PASS,
//   },
// });
// const OTP = 12345
// const mailOption = {
//     from: {
//         name: "Papa Scrap" ,
//         address: process.env.EMAIL
//       }
//       , // sender address
//       to: "ervedantmaurya@gmail.com", // list of receivers
//       subject: "Message From Papa Scrap", // Subject line
//       text: "YO GUYS", // plain text body
//       html: `<b>Your OTP is ${OTP}</b><br></br> <small>Please do not share this with anyone</small>`, // html body
// }

// const sendMail = async(transporter, mailOption) => {
//     // send mail with defined transport object
//     try{
//         await transporter.sendMail(mailOption)
//         console.log("Message sent: %s",mailOption);
//     }
//     catch(err){
//         console.log(err)
//     }
   
//   }

// export default sendMail(transporter, mailOption)
  
  
