import { UserRole, UserStatus, Language, MaterialType, WoodType, MetalType, GlassType, PlasticType, FabricType, MaterialGrade, MaterialFinish, MaterialForm, MaterialSpecs, DesignerSpecialty, ProducerType, RetailerType } from './types';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  isbn: string;
  publisher: string;
  publishedDate: string;
  description: string;
  coverImage: string;
  category: string;
  language: string;
  pages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  profileComplete: boolean;
  managesBusinessProfile?: boolean;
  subscription?: 'free' | 'basic' | 'pro';
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  type: UserRole;
  specialty?: string;
  description?: string;
  location?: string;
  experience?: number;
  website?: string;
  phone?: string;
  email: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  images?: string[];
  featured?: boolean;
  isSponsored?: boolean;
  materials?: MaterialInventory[];
  createdAt: string;
  updatedAt: string;
}

export interface MaterialInventory {
  type: MaterialType;
  subType?: WoodType | MetalType | GlassType | PlasticType | FabricType;
  specs?: MaterialSpecs;
  inStock?: boolean;
  minOrderQuantity?: number;
  leadTime?: string;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  startDate: string;
  endDate: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  type: 'exhibition' | 'workshop' | 'conference' | 'other';
}

export interface FeatureAccess {
  findEducators: boolean;
  findFurnitureDesigners: boolean;
  findWoodworkers: boolean;
  findSalespersons: boolean;
  announceJobOpenings: boolean;
  sendJobInvitation: boolean;
  accessIndustryInsights: boolean;
  findSupplies: boolean;
  findEducationalInstitutions: boolean;
  findDesignStudios: boolean;
  findProductionFacilities: boolean;
  findRetailers: boolean;
  accessCalendar: boolean;
  accessEducationalResources: boolean;
  findJobOpportunities: boolean;
  sendCV: boolean;
  requestBusinessProfile: boolean;
  accessFeeds: boolean;
}

export type {
  UserRole,
  UserStatus,
  Language,
  MaterialType,
  WoodType,
  MetalType,
  GlassType,
  PlasticType,
  FabricType,
  MaterialGrade,
  MaterialFinish,
  MaterialForm,
  MaterialSpecs,
  DesignerSpecialty,
  ProducerType,
  RetailerType
};