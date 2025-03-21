import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Define contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  project: z.string().min(10, "Please provide more details about your project"),
  services: z.array(z.string()).optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // In a real app, you might store this in a database or send an email
      // For now, we'll just log it and return success
      console.log("Contact form submission:", validatedData);
      
      // Simulate processing time (remove in production)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      res.status(200).json({
        success: true,
        message: "Thank you for your message! We will get back to you soon."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
