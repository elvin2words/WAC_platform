import {
  users,
  creativeProfiles,
  portfolioItems,
  collaborationRequests,
  creativeReviews,
  services,
  bookings,
  contactMessages,
  type User,
  type InsertUser,
  type CreativeProfile,
  type InsertCreativeProfile,
  type PortfolioItem,
  type InsertPortfolioItem,
  type CollaborationRequest,
  type InsertCollaborationRequest,
  type CreativeReview,
  type InsertCreativeReview,
  type Service,
  type InsertService,
  type Booking,
  type InsertBooking,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Creative Profiles
  getAllCreativeProfiles(): Promise<CreativeProfile[]>;
  getCreativeProfileById(id: number): Promise<CreativeProfile | undefined>;
  getCreativeProfileByUserId(userId: number): Promise<CreativeProfile | undefined>;
  createCreativeProfile(profile: InsertCreativeProfile): Promise<CreativeProfile>;
  updateCreativeProfile(id: number, updates: Partial<CreativeProfile>): Promise<CreativeProfile | undefined>;

  // Portfolio
  getAllPortfolioItems(): Promise<PortfolioItem[]>;
  getFeaturedPortfolioItems(): Promise<PortfolioItem[]>;
  getApprovedPortfolioItems(): Promise<PortfolioItem[]>;
  getPendingPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemById(id: number): Promise<PortfolioItem | undefined>;
  getPortfolioItemsByCreativeId(creativeId: number): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  approvePortfolioItem(id: number): Promise<PortfolioItem | undefined>;

  // Collaboration Requests
  getAllCollaborationRequests(): Promise<CollaborationRequest[]>;
  getCollaborationRequestById(id: number): Promise<CollaborationRequest | undefined>;
  getCollaborationRequestsByCreativeId(creativeId: number): Promise<CollaborationRequest[]>;
  createCollaborationRequest(request: InsertCollaborationRequest): Promise<CollaborationRequest>;
  updateCollaborationRequestStatus(id: number, status: string): Promise<CollaborationRequest | undefined>;

  // Creative Reviews
  getReviewsByCreativeId(creativeId: number): Promise<CreativeReview[]>;
  createCreativeReview(review: InsertCreativeReview): Promise<CreativeReview>;

  // Services
  getAllServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Contact Messages
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private creativeProfiles: Map<number, CreativeProfile>;
  private portfolioItems: Map<number, PortfolioItem>;
  private collaborationRequests: Map<number, CollaborationRequest>;
  private creativeReviews: Map<number, CreativeReview>;
  private services: Map<number, Service>;
  private bookings: Map<number, Booking>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentCreativeId: number;
  private currentPortfolioId: number;
  private currentCollaborationId: number;
  private currentReviewId: number;
  private currentServiceId: number;
  private currentBookingId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.creativeProfiles = new Map();
    this.portfolioItems = new Map();
    this.collaborationRequests = new Map();
    this.creativeReviews = new Map();
    this.services = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentCreativeId = 1;
    this.currentPortfolioId = 1;
    this.currentCollaborationId = 1;
    this.currentReviewId = 1;
    this.currentServiceId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed creative profiles first
    const creativeProfilesData: InsertCreativeProfile[] = [
      {
        userId: null,
        artistName: "Sarah Chen",
        bio: "Traditional and neo-traditional tattoo artist with 8+ years experience",
        specialty: "tattoo",
        location: "Los Angeles, CA",
        instagramHandle: "@sarahchen_ink",
        portfolioWebsite: "sarahchenart.com",
        profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        userId: null,
        artistName: "Marcus Rodriguez",
        bio: "Digital illustrator specializing in fantasy and mythology designs",
        specialty: "illustration",
        location: "Austin, TX",
        instagramHandle: "@marcus_creates",
        portfolioWebsite: "marcusrodriguez.art",
        profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        userId: null,
        artistName: "Luna Blackwood",
        bio: "Dark art and blackwork specialist, creating unique geometric pieces",
        specialty: "tattoo",
        location: "Portland, OR",
        instagramHandle: "@luna_blackink",
        portfolioWebsite: null,
        profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
    ];

    creativeProfilesData.forEach((profile) => {
      this.createCreativeProfile(profile);
    });

    // Seed portfolio items
    const portfolioData: InsertPortfolioItem[] = [
      {
        creativeId: 1,
        title: "Dragon Design",
        description: "Traditional Style",
        imageUrl: "https://pixabay.com/get/g7b407bdc0ca405034979743a5ac1598ece1301dd23d48ec4e074efeb1f00261c7cb6008117dfed33ed5ead4b8b9b945bc1c5e2525ecbffd799c8391040809b86_1280.jpg",
        category: "Traditional",
        style: "Dragon",
        tags: ["dragon", "traditional", "asian"],
      },
      {
        creativeId: 1,
        title: "Sacred Geometry",
        description: "Mandala Style",
        imageUrl: "https://pixabay.com/get/g02b0ab5861f741c16aee5bfc6de25b7e95057a18cd3f260a0e663a282a6c097ab72391879073c6dc55c71243c78ca550d4b6c74de316f6d748284692d39d24f0_1280.jpg",
        category: "Geometric",
        style: "Mandala",
        tags: ["mandala", "geometric", "spiritual"],
      },
      {
        creativeId: 2,
        title: "Line Art",
        description: "Minimalist",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "Minimalist",
        style: "Line Art",
        tags: ["minimalist", "lineart", "simple"],
      },
      {
        creativeId: 1,
        title: "Portrait",
        description: "Realistic",
        imageUrl: "https://pixabay.com/get/gaf4ab3fa1eac6aafe73f5f00a5cd772349ea6741d89c14ffe92819864318ba57ee5eafd2819768db75299005323d8eac442df101149079384a1f2a85ef45b6a9_1280.jpg",
        category: "Realistic",
        style: "Portrait",
        tags: ["portrait", "realistic", "face"],
      },
      {
        creativeId: 3,
        title: "Koi Fish",
        description: "Japanese Style",
        imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "Japanese",
        style: "Koi Fish",
        tags: ["koi", "japanese", "fish"],
      },
      {
        creativeId: 2,
        title: "Abstract Art",
        description: "Watercolor",
        imageUrl: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "Abstract",
        style: "Watercolor",
        tags: ["abstract", "watercolor", "artistic"],
      },
    ];

    portfolioData.forEach((item) => {
      this.createPortfolioItem(item);
    });

    // Seed services
    const servicesData: InsertService[] = [
      {
        name: "Custom Design",
        description: "Personalized tattoo designs created just for you",
        features: ["Consultation included", "3 design revisions", "High-res files", "Print-ready format"],
        priceMin: 150,
        priceMax: 300,
        icon: "palette",
        color: "neon-blue",
      },
      {
        name: "Flash Sheets",
        description: "Ready-to-use design collections",
        features: ["50+ designs per sheet", "Various styles", "Commercial license", "Monthly updates"],
        priceMin: 75,
        priceMax: null,
        icon: "bolt",
        color: "neon-pink",
      },
      {
        name: "Premium Printing",
        description: "Professional tattoo stencil printing",
        features: ["Thermal transfer paper", "Multiple sizes", "Fast turnaround", "Bulk discounts"],
        priceMin: 25,
        priceMax: 50,
        icon: "print",
        color: "neon-purple",
      },
    ];

    servicesData.forEach((service) => {
      this.createService(service);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Creative Profiles
  async getAllCreativeProfiles(): Promise<CreativeProfile[]> {
    return Array.from(this.creativeProfiles.values());
  }

  async getCreativeProfileById(id: number): Promise<CreativeProfile | undefined> {
    return this.creativeProfiles.get(id);
  }

  async getCreativeProfileByUserId(userId: number): Promise<CreativeProfile | undefined> {
    return Array.from(this.creativeProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createCreativeProfile(insertProfile: InsertCreativeProfile): Promise<CreativeProfile> {
    const id = this.currentCreativeId++;
    const profile: CreativeProfile = { 
      ...insertProfile, 
      id,
      userId: insertProfile.userId || null,
      bio: insertProfile.bio || null,
      location: insertProfile.location || null,
      instagramHandle: insertProfile.instagramHandle || null,
      portfolioWebsite: insertProfile.portfolioWebsite || null,
      profileImageUrl: insertProfile.profileImageUrl || null,
      isVerified: false,
      rating: "0.00",
      totalReviews: 0,
      joinedAt: new Date()
    };
    this.creativeProfiles.set(id, profile);
    return profile;
  }

  async updateCreativeProfile(id: number, updates: Partial<CreativeProfile>): Promise<CreativeProfile | undefined> {
    const profile = this.creativeProfiles.get(id);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...updates };
    this.creativeProfiles.set(id, updatedProfile);
    return updatedProfile;
  }

  // Portfolio
  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.featured);
  }

  async getApprovedPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.isApproved);
  }

  async getPendingPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => !item.isApproved);
  }

  async getPortfolioItemById(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }

  async getPortfolioItemsByCreativeId(creativeId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.creativeId === creativeId);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = { 
      ...insertItem, 
      id,
      creativeId: insertItem.creativeId || null,
      tags: insertItem.tags || [],
      featured: false,
      isApproved: true, // Auto-approve for demo
      submittedAt: new Date(),
      approvedAt: new Date()
    };
    this.portfolioItems.set(id, item);
    return item;
  }

  async approvePortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    const item = this.portfolioItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { 
      ...item, 
      isApproved: true, 
      approvedAt: new Date() 
    };
    this.portfolioItems.set(id, updatedItem);
    return updatedItem;
  }

  // Collaboration Requests
  async getAllCollaborationRequests(): Promise<CollaborationRequest[]> {
    return Array.from(this.collaborationRequests.values());
  }

  async getCollaborationRequestById(id: number): Promise<CollaborationRequest | undefined> {
    return this.collaborationRequests.get(id);
  }

  async getCollaborationRequestsByCreativeId(creativeId: number): Promise<CollaborationRequest[]> {
    return Array.from(this.collaborationRequests.values()).filter(
      request => request.fromCreativeId === creativeId || request.toCreativeId === creativeId
    );
  }

  async createCollaborationRequest(insertRequest: InsertCollaborationRequest): Promise<CollaborationRequest> {
    const id = this.currentCollaborationId++;
    const request: CollaborationRequest = { 
      ...insertRequest, 
      id,
      status: "pending",
      createdAt: new Date(),
      respondedAt: null
    };
    this.collaborationRequests.set(id, request);
    return request;
  }

  async updateCollaborationRequestStatus(id: number, status: string): Promise<CollaborationRequest | undefined> {
    const request = this.collaborationRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest = { 
      ...request, 
      status, 
      respondedAt: new Date() 
    };
    this.collaborationRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  // Creative Reviews
  async getReviewsByCreativeId(creativeId: number): Promise<CreativeReview[]> {
    return Array.from(this.creativeReviews.values()).filter(
      review => review.creativeId === creativeId
    );
  }

  async createCreativeReview(insertReview: InsertCreativeReview): Promise<CreativeReview> {
    const id = this.currentReviewId++;
    const review: CreativeReview = { 
      ...insertReview, 
      id,
      isVerified: false,
      createdAt: new Date()
    };
    this.creativeReviews.set(id, review);
    
    // Update creative profile rating
    await this.updateCreativeRating(insertReview.creativeId);
    
    return review;
  }

  private async updateCreativeRating(creativeId: number): Promise<void> {
    const reviews = await this.getReviewsByCreativeId(creativeId);
    if (reviews.length === 0) return;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(2);
    
    await this.updateCreativeProfile(creativeId, {
      rating: averageRating,
      totalReviews: reviews.length
    });
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  // Contact Messages
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      status: "unread",
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
