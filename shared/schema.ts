import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Creative profiles for artists
export const creativeProfiles = pgTable("creative_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  artistName: text("artist_name").notNull(),
  bio: text("bio"),
  specialty: text("specialty").notNull(), // "tattoo", "illustration", "digital", etc.
  location: text("location"),
  instagramHandle: text("instagram_handle"),
  portfolioWebsite: text("portfolio_website"),
  profileImageUrl: text("profile_image_url"),
  isVerified: boolean("is_verified").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("total_reviews").default(0),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// User-submitted portfolio items
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  creativeId: integer("creative_id").references(() => creativeProfiles.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  style: text("style").notNull(),
  tags: text("tags").array().default([]),
  featured: boolean("featured").default(false),
  isApproved: boolean("is_approved").default(false),
  submittedAt: timestamp("submitted_at").defaultNow(),
  approvedAt: timestamp("approved_at"),
});

// Collaboration requests between creatives
export const collaborationRequests = pgTable("collaboration_requests", {
  id: serial("id").primaryKey(),
  fromCreativeId: integer("from_creative_id").references(() => creativeProfiles.id),
  toCreativeId: integer("to_creative_id").references(() => creativeProfiles.id),
  projectTitle: text("project_title").notNull(),
  projectDescription: text("project_description").notNull(),
  projectType: text("project_type").notNull(), // "joint_design", "flash_sheet", "custom_piece"
  budgetRange: text("budget_range"),
  timeline: text("timeline"),
  status: text("status").default("pending"), // "pending", "accepted", "declined", "completed"
  createdAt: timestamp("created_at").defaultNow(),
  respondedAt: timestamp("responded_at"),
});

// Reviews and ratings for creatives
export const creativeReviews = pgTable("creative_reviews", {
  id: serial("id").primaryKey(),
  creativeId: integer("creative_id").references(() => creativeProfiles.id),
  reviewerName: text("reviewer_name").notNull(),
  reviewerEmail: text("reviewer_email").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  reviewText: text("review_text"),
  projectType: text("project_type"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  priceMin: integer("price_min").notNull(),
  priceMax: integer("price_max"),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceId: integer("service_id").references(() => services.id),
  preferredDate: timestamp("preferred_date"),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  status: text("status").default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCreativeProfileSchema = createInsertSchema(creativeProfiles).omit({
  id: true,
  isVerified: true,
  rating: true,
  totalReviews: true,
  joinedAt: true,
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  featured: true,
  isApproved: true,
  submittedAt: true,
  approvedAt: true,
});

export const insertCollaborationRequestSchema = createInsertSchema(collaborationRequests).omit({
  id: true,
  status: true,
  createdAt: true,
  respondedAt: true,
});

export const insertCreativeReviewSchema = createInsertSchema(creativeReviews).omit({
  id: true,
  isVerified: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CreativeProfile = typeof creativeProfiles.$inferSelect;
export type InsertCreativeProfile = z.infer<typeof insertCreativeProfileSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type CollaborationRequest = typeof collaborationRequests.$inferSelect;
export type InsertCollaborationRequest = z.infer<typeof insertCollaborationRequestSchema>;
export type CreativeReview = typeof creativeReviews.$inferSelect;
export type InsertCreativeReview = z.infer<typeof insertCreativeReviewSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
