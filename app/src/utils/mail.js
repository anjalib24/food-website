import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { ApiError } from "./ApiError.js";
import { Credential } from "../models/credentials.model.js";
const __dirname = path.resolve();
const emailBannerPath = path.join(
  __dirname,
  "/public/emailBanner/Banner-Email-Ethnic-Foods.png"
);

const readImageAsDataURI = (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString("base64");
  return `data:image/png;base64,${imageBase64}`;
};
// import handlebars from "handlebars";

const getEmailTransport = async () => {
  try {
    let auth;
    const getCredencials = await Credential.findOne();

    if (
      getCredencials &&
      getCredencials?.sendEmail &&
      getCredencials?.sendEmailPassword
    ) {
      auth = {
        user: getCredencials?.sendEmail,
        pass: getCredencials?.sendEmailPassword,
      };
    } else if (process.env.STRIPE_SECRET_KEY) {
      auth = {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      };
    } else {
      throw new ApiError(404, "Send email mail and password not found.");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: 587,
      secure: false,
      auth: auth,
    });
    return transporter;
  } catch (error) {
    throw new ApiError(404, error.message || error);
  }
};

const sendUserRegistrationConfirmationEmail = async (recipientEmail, name) => {
  try {
    const transporter = await getEmailTransport();

    const shopLink = "https://www.ethnicfoods.com";
    const emailBannerDataURI = readImageAsDataURI(emailBannerPath);

    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:Banner-Email-Ethnic-Foods.png" alt="Ethnic Foods Banner" style="max-width: 100%; height: auto;">
        </div>
        <p style="font-size: 18px; font-weight: bold; text-align: center;">Welcome to EthnicFoods.com!</p>
        <p style="font-size: 16px; text-align: center;">Thank you for registering with us.</p>
        <p style="font-size: 16px; text-align: center;">Your user registration details are as follows:</p>
        <ul style="list-style-type: none; padding: 0; text-align: center;">
          <li style="font-size: 16px;">User Name: ${name}</li>
        </ul>
        <ul style="list-style-type: none; padding: 0; text-align: center;">
          <li style="font-size: 16px;">Password: ********</li>
        </ul>
        <p style="font-size: 16px; text-align: center;">Explore the flavors of the world and experience new cultures with EthnicFoods.com.</p>
        <p style="font-size: 16px; text-align: center;">Continue Shopping with Ethnic Foods </p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${shopLink}" style="text-decoration: none;">
            <button style="background-color: #007BFF; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">Shop Now</button>
          </a>
        </div>
        <p style="font-size: 16px; text-align: center; margin-top: 20px;">Thank you for choosing EthnicFoods.com!</p>
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 16px; font-weight: bold;">Ethnic Foods Market LLC</p>
          <p style="font-size: 16px;">World’s Food Market</p>
          <p style="font-size: 16px;"><a href="www.ethnicfoods.com" style="color: #007BFF; text-decoration: none;">www.ethnicfoods.com</a></p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `Ethnic Ecommerce <${process.env.SEND_EMAIL}>`,
      to: recipientEmail,
      subject: "Welcome to EthnicFoods.com",
      attachments: [
        {
          filename: "Banner-Email-Ethnic-Foods.png",
          path: emailBannerDataURI,
          cid: "Banner-Email-Ethnic-Foods.png",
        },
      ],
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `User registration email Error: ${error.message}`);
  }
};

const sendOrderConfirmationEmail = async (
  recipientEmail,
  orderId,
  orderAmount,
  items
) => {
  try {
    const transporter = await getEmailTransport();

    const shopLink = "https://www.ethnicfoods.com";
    const emailBannerDataURI = readImageAsDataURI(emailBannerPath);

    const orderItemsListHTML = `
    <div style="text-align: center; margin-left:90px;">
      <ul style="list-style-type: disc; text-align: left; padding-left: 20px; font-size: 16px;">
        ${items
          .map(
            (item) =>
              `<li>Item Number ${item?.quantity}, Item Name ${item?.title}</li>`
          )
          .join("")}
      </ul>
    </div>
    `;

    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; text-align: center;">
        <img src="cid:Banner-Email-Ethnic-Foods.png" alt="Ethnic Foods Banner" style="max-width: 100%; height: auto;">
        <p style="font-size: 18px; font-weight: bold; margin-top: 20px;">Thank you for your order with EthnicFoods.com</p>
        <p style="font-size: 16px;">Your order details are below:</p>
        <p style="font-size: 16px;">Order Number: ${orderId}</p>
        <p style="font-size: 16px;">Order Amount: ${orderAmount} USD</p>
        <p style="font-size: 16px;">Items Ordered:</p>
        ${orderItemsListHTML}   
        <p style="font-size: 16px;">You can view shipping details <a href="${shopLink}/yourprofile#/">here</a></p>
        <p style="font-size: 16px;">Thank you for shopping with EthnicFoods.com</p>
        <p style="font-size: 16px;">We look forward to seeing you again!</p>
        <p style="font-size: 16px; margin-bottom: 20px;">Ethnic Foods Market LLC</p>
        <p style="font-size: 16px; margin-bottom: 20px;">World’s Food Market</p>
        <p style="font-size: 16px; margin-bottom: 20px;"><a href="www.ethnicfoods.com" style="color: #007BFF; text-decoration: none;">www.ethnicfoods.com</a></p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SEND_EMAIL,
      to: recipientEmail,
      subject: "Thank you for your order with EthnicFoods.com",
      attachments: [
        {
          filename: "Banner-Email-Ethnic-Foods.png",
          path: emailBannerDataURI,
          cid: "Banner-Email-Ethnic-Foods.png",
        },
      ],
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `Order confirmation email error: ${error.message}`);
  }
};

const sendContactUsEmail = async (recipientEmail, name) => {
  try {
    const transporter = await getEmailTransport();

    const emailBannerDataURI = readImageAsDataURI(emailBannerPath);

    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; text-align: center;">
        <img src="cid:Banner-Email-Ethnic-Foods.png" alt="Ethnic Foods Banner" style="max-width: 100%; height: auto;">
        <p style="font-size: 18px; font-weight: bold; margin-top: 20px;">Thank you for reaching out to EthnicFoods.com</p>
        <p style="font-size: 16px;">We will get back to you soon.</p>
        <p style="font-size: 16px; margin-bottom: 20px;">Ethnic Foods Market LLC</p>
        <p style="font-size: 16px; margin-bottom: 20px;">World’s Food Market</p>
        <p style="font-size: 16px; margin-bottom: 20px;"><a href="www.ethnicfoods.com" style="color: #007BFF; text-decoration: none;">www.ethnicfoods.com</a></p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SEND_EMAIL,
      to: recipientEmail,
      subject: "Thank you for reaching out to EthnicFoods.com",
      attachments: [
        {
          filename: "Banner-Email-Ethnic-Foods.png",
          path: emailBannerDataURI,
          cid: "Banner-Email-Ethnic-Foods.png",
        },
      ],
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `Contact us email Error: ${error.message}`);
  }
};

const sendResetPasswordEmail = async (recipientEmail, name, userId, token) => {
  try {
    const transporter = await getEmailTransport();
    const emailBannerDataURI = readImageAsDataURI(emailBannerPath);

    // const localResetLink = `http://localhost:5173/reset-password/${token}`;
    const resetLink = `https://ethnicfoods.com/reset-password/${token}`;

    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
          <img src="cid:Banner-Email-Ethnic-Foods.png" alt="Ethnic Foods Banner" style="max-width: 100%; height: auto;">
          <h2 style="font-size: 24px; font-weight: bold; margin-top: 20px; color: #007bff;">Reset Your Password</h2>
          <p style="font-size: 16px;">Hello ${name},</p>
          <p style="font-size: 16px;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          <p style="font-size: 16px;">To reset your password, please click on the following link:</p>
          <p style="font-size: 16px;"><a href="${resetLink}" style="color: #007bff;">Reset Password</a></p>
          <p style="font-size: 16px;">If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
          <p style="font-size: 16px;">${resetLink}</p>
          <p style="font-size: 16px;">If you need further assistance, please contact our support team.</p>
          <p style="font-size: 16px;">Best regards,<br>EthnicFoods Team</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SEND_EMAIL,
      to: recipientEmail,
      subject: "Reset Your Password",
      attachments: [
        {
          filename: "Banner-Email-Ethnic-Foods.png",
          path: emailBannerDataURI,
          cid: "Banner-Email-Ethnic-Foods.png",
        },
      ],
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `Reset password email error: ${error.message}`);
  }
};

// const sendEmailUsingTemplate = async (
//   recipientEmail = "shakil.patel@r-one.in",
//   name = "shakil",
//   resetLink = "https://youtube.com"
// ) => {
//   try {
//     const transporter = await getEmailTransport();

//     const htmls = `
//     <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
//       <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
//         <img src="cid:Banner-Email-Ethnic-Foods.png" alt="Ethnic Foods Banner" style="max-width: 100%; height: auto;">
//         <h2 style="font-size: 24px; font-weight: bold; margin-top: 20px; color: #007bff;">Reset Your Password</h2>
//         <p style="font-size: 16px;">Hello {{name}},</p>
//         <p style="font-size: 16px;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
//         <p style="font-size: 16px;">To reset your password, please click on the following link:</p>
//         <p style="font-size: 16px;"><a href="{{resetLink}}" style="color: #007bff;">Reset Password</a></p>
//         <p style="font-size: 16px;">If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
//         <p style="font-size: 16px;">{{resetLink}}</p>
//         <p style="font-size: 16px;">If you need further assistance, please contact our support team.</p>
//         <p style="font-size: 16px;">Best regards,<br>EthnicFoods Team</p>
//       </div>
//     </div>
//   `;

//     const template = handlebars.compile(htmls);

//     const emailHtml = template({ name, resetLink });

//     // Send email
//     const info = await transporter.sendMail({
//       from: process.env.SEND_EMAIL,
//       to: recipientEmail,
//       subject: "Reset Your Password",

//       html: emailHtml,
//     });

//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

export {
  sendUserRegistrationConfirmationEmail,
  sendOrderConfirmationEmail,
  sendContactUsEmail,
  sendResetPasswordEmail,
  // sendEmailUsingTemplate,
};
