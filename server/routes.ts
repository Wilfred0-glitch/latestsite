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
        const welcomeSent = await sendWelcomeEmail(contact);
        if (welcomeSent) {
          console.log("Welcome email sent to user");
        }
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingNewsletters = await storage.getNewsletters();
      const emailExists = existingNewsletters.some(n => n.email === validatedData.email);
      
      if (emailExists) {
        res.status(400).json({ 
          success: false, 
          message: "Email already subscribed to newsletter" 
        });
        return;
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
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
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
