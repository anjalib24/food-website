import nodemailer from "nodemailer";

const sendUserRegistrationConfirmationEmail = async (recipientEmail, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <p>Dear ${name},</p>
      <p>Thank you for registering on Ethnic Ecommerce. Your registration was successful!</p>
      <p>Feel free to explore our platform and start shopping for your favorite ethnic products.</p>
      <p>Best regards,</p>
      <p>Ethnic Ecommerce Team</p>
    `;

    const info = await transporter.sendMail({
      from: `Ethnic Ecommerce <${process.env.SEND_EMAIL}>`,
      to: recipientEmail,
      subject: "Registration Successful on Ethnic Ecommerce",
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `User registration email Error ${error.Error}`);
  }
};

const sendOrderConfirmationEmail = async (recipientEmail, name, orderId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <p>Dear ${name},</p>
      <p>Thank you for placing an order with Ethnic Ecommerce. Your order (${orderId}) has been confirmed!</p>
      <p>We are preparing your items for shipment. You can track the status of your order through our website.</p>
      <p>Best regards,</p>
      <p>Ethnic Ecommerce Team</p>
    `;

    const info = await transporter.sendMail({
      from: `Ethnic Ecommerce <${process.env.SEND_EMAIL}>`,
      to: recipientEmail,
      subject: "Order Confirmation - Ethnic Ecommerce",
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `Order confirmation email error: ${error.message}`);
  }
};

const sendContactUsEmail = async (recipientEmail, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <p>Dear ${name},</p>
      <p>Your query has been submitted successfully. Our team will get back to you as soon as possible.</p>
      <p>Thank you for choosing Ethnic Ecommerce!</p>
      <p>Best regards,</p>
      <p>Ethnic Ecommerce Team</p>
    `;

    const info = await transporter.sendMail({
      from: `Ethnic Ecommerce <${process.env.SEND_EMAIL}>`,
      to: recipientEmail,
      subject: "Query Submission Successful - Ethnic Ecommerce",
      html: htmlContent,
    });
  } catch (error) {
    throw new ApiError(500, `Constact us email Error ${error.Error}`);
  }
};

export {
  sendUserRegistrationConfirmationEmail,
  sendOrderConfirmationEmail,
  sendContactUsEmail,
};
