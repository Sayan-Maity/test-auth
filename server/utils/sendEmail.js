import nodemailer from "nodemailer";

// const sendEmail = async options => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   })

//   const mailOptions = {
//     from: "Sayan Maity <sayancr777@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     //html:
//   }

//   await transporter.sendMail(mailOptions)
// }

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sayancr777@gmail.com",
        pass: "xwca rjxf ayyu gnyv",
      },
    });
    const mailOptions = {
      from: "Sayan Maity <sayancr777@gmail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `<p>${options.message}</p>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          message: "Email Sent Successfully",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Email not sent",
    });
  }
};

export default sendEmail;
