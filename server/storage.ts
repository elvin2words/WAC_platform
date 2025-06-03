import {
  users,
  portfolioItems,
  services,
  bookings,
  contactMessages,
  type User,
  type InsertUser,
  type PortfolioItem,
  type InsertPortfolioItem,
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

  // Portfolio
  getAllPortfolioItems(): Promise<PortfolioItem[]>;
  getFeaturedPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemById(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

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
  private portfolioItems: Map<number, PortfolioItem>;
  private services: Map<number, Service>;
  private bookings: Map<number, Booking>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentPortfolioId: number;
  private currentServiceId: number;
  private currentBookingId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.portfolioItems = new Map();
    this.services = new Map();
    this.bookings = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentPortfolioId = 1;
    this.currentServiceId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed portfolio items
    const portfolioData: InsertPortfolioItem[] = [
      {
        title: "Dragon Design",
        description: "Traditional Style",
        imageUrl: "https://pixabay.com/get/g7b407bdc0ca405034979743a5ac1598ece1301dd23d48ec4e074efeb1f00261c7cb6008117dfed33ed5ead4b8b9b945bc1c5e2525ecbffd799c8391040809b86_1280.jpg",
        category: "Traditional",
        style: "Dragon",
        featured: true,
      },
      {
        title: "Sacred Geometry",
        description: "Mandala Style",
        imageUrl: "https://pixabay.com/get/g02b0ab5861f741c16aee5bfc6de25b7e95057a18cd3f260a0e663a282a6c097ab72391879073c6dc55c71243c78ca550d4b6c74de316f6d748284692d39d24f0_1280.jpg",
        category: "Geometric",
        style: "Mandala",
        featured: true,
      },
      {
        title: "Line Art",
        description: "Minimalist",
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "Minimalist",
        style: "Line Art",
        featured: true,
      },
      {
        title: "Portrait",
        description: "Realistic",
        imageUrl: "https://pixabay.com/get/gaf4ab3fa1eac6aafe73f5f00a5cd772349ea6741d89c14ffe92819864318ba57ee5eafd2819768db75299005323d8eac442df101149079384a1f2a85ef45b6a9_1280.jpg",
        category: "Realistic",
        style: "Portrait",
        featured: true,
      },
      {
        title: "Koi Fish",
        description: "Japanese Style",
        imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "Japanese",
        style: "Koi Fish",
        featured: true,
      },
      {
        title: "Abstract Art",
        description: "Watercolor",
        imageUrl: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "Abstract",
        style: "Watercolor",
        featured: true,
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

  // Portfolio
  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.featured);
  }

  async getPortfolioItemById(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = { ...insertItem, id };
    this.portfolioItems.set(id, item);
    return item;
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
