// const nodemailer = require('nodemailer');
// require('dotenv').config();  // Make sure to load the .env file

// const sendPasswordResetEmail = async (to, resetToken) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',  // You can change this based on your email provider
//     auth: {
//       user: process.env.EMAIL_USER,  // Use your email from the .env file
//       pass: process.env.EMAIL_PASS   // Use your email password from the .env file
//     }
//   });

//   const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;  // Customize your reset URL as needed

//   const mailOptions = {
//     from: process.env.EMAIL_USER,  // Sender email from .env
//     to: to,                        // Recipient email
//     subject: 'Password Reset Request',
//     text: `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link to reset your password: ${resetUrl}`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// };

const nodemailer = require('nodemailer');
require('dotenv').config();

const sendPasswordResetEmail = async (to, resetToken) => {
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',  // If using Gmail
    auth: {
      user: process.env.EMAIL_USER, // Sender email from .env
      pass: process.env.EMAIL_PASS  // Email password or app password from .env
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email
    to,                            // Recipient email
    subject: 'Password Reset Request',
    text: `You are receiving this email because you (or someone else) have requested the reset of a password. 
           Please click on the following link to reset your password: ${resetUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to: ${to}`);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = { sendPasswordResetEmail };

