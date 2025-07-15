import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { sendContactNotification, sendWelcomeEmail } from "./emailService";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form data:", req.body);
      
      // Basic validation
      if (!req.body.fullName || !req.body.email || !req.body.courseInterest) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields: fullName, email, and courseInterest are required" 
        });
      }

      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notifications
      console.log("New contact submission:", contact);
      
      // Send notification email to admin
      try {
        const emailSent = await sendContactNotification(contact);
        if (emailSent) {
          console.log("Email notification sent successfully");
        } else {
          console.log("Email notification failed to send");
        }
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
      
      // Send welcome email to user (for full contact forms, not quick inquiries)
      if (contact.type !== 'quick') {
        try {
          const welcomeSent = await sendWelcomeEmail(contact);
          if (welcomeSent) {
            console.log("Welcome email sent to user");
          }
        } catch (emailError) {
          console.error("Error sending welcome email:", emailError);
        }
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Validation error: " + error.errors.map(e => e.message).join(', '),
          errors: error.errors 
        });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error. Please try again." 
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      console.log("Received newsletter subscription:", req.body);
      
      if (!req.body.email) {
        return res.status(400).json({ 
          success: false, 
          message: "Email address is required" 
        });
      }

      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingNewsletters = await storage.getNewsletters();
      const emailExists = existingNewsletters.some(n => n.email === validatedData.email);
      
      if (emailExists) {
        return res.status(400).json({ 
          success: false, 
          message: "Email already subscribed to newsletter" 
        });
      }

      const newsletter = await storage.createNewsletter(validatedData);
      
      console.log("New newsletter subscription:", newsletter);
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        id: newsletter.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Newsletter validation error:", error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Invalid email format", 
          errors: error.errors 
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error. Please try again." 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get all newsletter subscriptions (for admin purposes)
  app.get("/api/newsletters", async (req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json(newsletters);
    } catch (error) {
      console.error("Get newsletters error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
