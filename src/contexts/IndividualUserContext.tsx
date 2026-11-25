import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  mockSupplies, 
  mockDesignStudios, 
  mockProductionFacilities, 
  mockJobListings, 
  mockFeeds,
  Supply,
  DesignStudio,
  ProductionFacility,
  JobListing,
  JobApplication,
  FeedPost
} from '../utils/mockIndividualData';

interface BusinessProfileRequest {
  id: string;
  businessName: string;
  businessType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  businessWebsite?: string;
  businessDescription: string;
  reason: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface IndividualUserContextType {
  // Data
  supplies: Supply[];
  designStudios: DesignStudio[];
  productionFacilities: ProductionFacility[];
  jobListings: JobListing[];
  feeds: FeedPost[];
  jobApplications: JobApplication[];
  businessProfileRequests: BusinessProfileRequest[];
  
  // Methods
  applyForJob: (application: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => Promise<boolean>;
  likePost: (postId: string) => void;
  submitBusinessProfileRequest: (request: Omit<BusinessProfileRequest, 'id' | 'requestDate' | 'status'>) => Promise<boolean>;
}

const IndividualUserContext = createContext<IndividualUserContextType | undefined>(undefined);

export const useIndividualUser = () => {
  const context = useContext(IndividualUserContext);
  if (context === undefined) {
    throw new Error('useIndividualUser must be used within an IndividualUserProvider');
  }
  return context;
};

interface IndividualUserProviderProps {
  children: ReactNode;
}

export const IndividualUserProvider: React.FC<IndividualUserProviderProps> = ({ children }) => {
  const [supplies] = useState<Supply[]>(mockSupplies);
  const [designStudios] = useState<DesignStudio[]>(mockDesignStudios);
  const [productionFacilities] = useState<ProductionFacility[]>(mockProductionFacilities);
  const [jobListings] = useState<JobListing[]>(mockJobListings);
  const [feeds, setFeeds] = useState<FeedPost[]>(mockFeeds);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [businessProfileRequests, setBusinessProfileRequests] = useState<BusinessProfileRequest[]>([]);

  // Load persisted data from localStorage
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        // Load job applications
        const savedJobApplications = localStorage.getItem('jobApplications');
        if (savedJobApplications) {
          setJobApplications(JSON.parse(savedJobApplications));
        }

        // Load business profile requests
        const savedBusinessRequests = localStorage.getItem('businessProfileRequests');
        if (savedBusinessRequests) {
          setBusinessProfileRequests(JSON.parse(savedBusinessRequests));
        }
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };

    loadPersistedData();
  }, []);

  // Method to apply for a job
  const applyForJob = async (application: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>): Promise<boolean> => {
    try {
      // Create new application object
      const newApplication: JobApplication = {
        ...application,
        id: `app-${Date.now()}`,
        appliedDate: new Date().toISOString(),
        status: 'pending'
      };

      // Update state and localStorage
      const updatedApplications = [...jobApplications, newApplication];
      setJobApplications(updatedApplications);
      localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
      
      return true;
    } catch (error) {
      console.error('Error applying for job:', error);
      return false;
    }
  };

  // Method to like/unlike a post
  const likePost = (postId: string) => {
    setFeeds(prevFeeds => 
      prevFeeds.map(feed => {
        if (feed.id === postId) {
          return {
            ...feed,
            liked: !feed.liked,
            likes: feed.liked ? feed.likes - 1 : feed.likes + 1
          };
        }
        return feed;
      })
    );
  };

  // Method to submit business profile request
  const submitBusinessProfileRequest = async (request: Omit<BusinessProfileRequest, 'id' | 'requestDate' | 'status'>): Promise<boolean> => {
    try {
      // Create new request object
      const newRequest: BusinessProfileRequest = {
        ...request,
        id: `req-${Date.now()}`,
        requestDate: new Date().toISOString(),
        status: 'pending'
      };

      // Update state and localStorage
      const updatedRequests = [...businessProfileRequests, newRequest];
      setBusinessProfileRequests(updatedRequests);
      localStorage.setItem('businessProfileRequests', JSON.stringify(updatedRequests));
      
      return true;
    } catch (error) {
      console.error('Error submitting business profile request:', error);
      return false;
    }
  };

  const value = {
    supplies,
    designStudios,
    productionFacilities,
    jobListings,
    feeds,
    jobApplications,
    businessProfileRequests,
    applyForJob,
    likePost,
    submitBusinessProfileRequest
  };

  return (
    <IndividualUserContext.Provider value={value}>
      {children}
    </IndividualUserContext.Provider>
  );
};