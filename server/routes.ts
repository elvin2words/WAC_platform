import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookingSchema, 
  insertContactMessageSchema,
  insertCreativeProfileSchema,
  insertPortfolioItemSchema,
  insertCollaborationRequestSchema,
  insertCreativeReviewSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Creative Profiles routes
  app.get("/api/creatives", async (req, res) => {
    try {
      const profiles = await storage.getAllCreativeProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creative profiles" });
    }
  });

  app.get("/api/creatives/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid creative ID" });
      }
      
      const profile = await storage.getCreativeProfileById(id);
      if (!profile) {
        return res.status(404).json({ message: "Creative profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creative profile" });
    }
  });

  app.post("/api/creatives", async (req, res) => {
    try {
      const result = insertCreativeProfileSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid creative profile data", 
          errors: fromZodError(result.error).toString()
        });
      }
      
      const profile = await storage.createCreativeProfile(result.data);
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to create creative profile" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const items = await storage.getApprovedPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/featured", async (req, res) => {
    try {
      const items = await storage.getFeaturedPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured portfolio items" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const result = insertPortfolioItemSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid portfolio item data", 
          errors: fromZodError(result.error).toString()
        });
      }
      
      const item = await storage.createPortfolioItem(result.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create portfolio item" });
    }
  });

  app.get("/api/portfolio/creative/:creativeId", async (req, res) => {
    try {
      const creativeId = parseInt(req.params.creativeId);
      if (isNaN(creativeId)) {
        return res.status(400).json({ message: "Invalid creative ID" });
      }
      
      const items = await storage.getPortfolioItemsByCreativeId(creativeId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items for creative" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid portfolio item ID" });
      }
      
      const item = await storage.getPortfolioItemById(id);
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid booking data", 
          errors: fromZodError(result.error).toString()
        });
      }
      
      const booking = await storage.createBooking(result.data);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid contact data", 
          errors: fromZodError(result.error).toString()
        });
      }
      
      const message = await storage.createContactMessage(result.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Collaboration routes
  app.get("/api/collaborations", async (req, res) => {
    try {
      const requests = await storage.getAllCollaborationRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collaboration requests" });
    }
  });

  app.post("/api/collaborations", async (req, res) => {
    try {
      const result = insertCollaborationRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid collaboration request data", 
          errors: fromZodError(result.error).toString()
        });
      }
      
      const request = await storage.createCollaborationRequest(result.data);
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to create collaboration request" });
    }
  });

  app.get("/api/collaborations/creative/:creativeId", async (req, res) => {
    try {
      const creativeId = parseInt(req.params.creativeId);
      if (isNaN(creativeId)) {
        return res.status(400).json({ message: "Invalid creative ID" });
      }
      
      const requests = await storage.getCollaborationRequestsByCreativeId(creativeId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collaboration requests for creative" });
    }
  });

  app.patch("/api/collaborations/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid collaboration ID" });
      }
      
      const { status } = req.body;
      if (!["accepted", "declined", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      
      const request = await storage.updateCollaborationRequestStatus(id, status);
      if (!request) {
        return res.status(404).json({ message: "Collaboration request not found" });
      }
      
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to update collaboration status" });
    }
  });

  // Review routes
  app.get("/api/reviews/creative/:creativeId", async (req, res) => {
    try {
      const creativeId = parseInt(req.params.creativeId);
      if (isNaN(creativeId)) {
        return res.status(400).json({ message: "Invalid creative ID" });
      }
      
      const reviews = await storage.getReviewsByCreativeId(creativeId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews for creative" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const result = insertCreativeReviewSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid review data", 
          errors: fromZodError(result.error).toString()
        });
      }
      
      const review = await storage.createCreativeReview(result.data);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
