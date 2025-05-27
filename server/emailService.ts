import nodemailer from 'nodemailer';
import type { Contact } from '@shared/schema';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.warn('Gmail credentials not found. Email notifications will not work.');
} else {
  console.log('Gmail credentials found for:', process.env.GMAIL_USER);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendContactNotification(contact: Contact): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('Email not sent - Gmail credentials not configured');
    return false;
  }

  try {
    const isQuickInquiry = contact.type === 'quick';
    const subject = isQuickInquiry 
      ? `New Quick Course Inquiry from ${contact.fullName}` 
      : `New Contact Form Submission from ${contact.fullName}`;

    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0101a4e9 0%, #2563eb 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🌱 Code Garden</h1>
          <p style="margin: 10px 0 0 0;">${isQuickInquiry ? 'Quick Course Inquiry' : 'New Contact Form Submission'}</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #0101a4e9; margin-bottom: 20px;">Contact Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${contact.fullName}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
            ${contact.childAge ? `<p><strong>Child's Age:</strong> ${contact.childAge}</p>` : ''}
            <p><strong>Course Interest:</strong> ${contact.courseInterest}</p>
            ${contact.message ? `<p><strong>Message:</strong><br>${contact.message}</p>` : ''}
            <p><strong>Newsletter Subscription:</strong> ${contact.newsletter ? 'Yes' : 'No'}</p>
            <p><strong>Submitted:</strong> ${contact.createdAt?.toLocaleString()}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${contact.email}" style="background: #ff8000cf; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block;">
              Reply to ${contact.fullName}
            </a>
          </div>
        </div>
        
        <div style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Code Garden - Nurturing Young Minds Through Coding</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: subject,
      html: htmlContent,
      replyTo: contact.email,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent for contact: ${contact.fullName}`);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

export async function sendWelcomeEmail(contact: Contact): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || contact.type === 'quick') {
    return false;
  }

  try {
    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0101a4e9 0%, #2563eb 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🌱 Welcome to Code Garden!</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #0101a4e9;">Thank you for your interest, ${contact.fullName}!</h2>
          
          <p>We're excited that you're considering Code Garden for your child's coding journey. We've received your inquiry about <strong>${contact.courseInterest}</strong> and will get back to you within 24 hours.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ff8000cf; margin-top: 0;">What happens next?</h3>
            <ul>
              <li>Our team will review your inquiry</li>
              <li>We'll contact you within 24 hours</li>
              <li>We'll discuss the best course options for your child</li>
              <li>We can schedule a free consultation call</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p><strong>Questions? Contact us anytime:</strong></p>
            <p>📞 +234 810 502 5758</p>
            <p>💬 <a href="https://wa.me/message/URLNSTYGZ4XUE1" style="color: #0101a4e9;">WhatsApp</a></p>
          </div>
        </div>
        
        <div style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Code Garden - Nurturing Young Minds Through Coding</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: contact.email,
      subject: 'Welcome to Code Garden - We received your inquiry!',
      html: welcomeHtml,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to: ${contact.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}