import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  mockProfessionals, 
  mockJobPostings,
  mockIndustryReports, 
  Professional,
  JobPosting,
  IndustryReport
} from '../utils/mockBusinessData';

interface BusinessManagerContextType {
  professionals: Professional[];
  filteredProfessionals: Professional[];
  jobPostings: JobPosting[];
  industryReports: IndustryReport[];
  searchProfessionals: (query: string, filters: { role?: string, location?: string, availability?: string }) => void;
  addJobPosting: (jobPosting: Omit<JobPosting, 'id' | 'postedDate' | 'applicants'>) => void;
  createJobPosting: (jobPosting: Omit<JobPosting, 'id' | 'postedDate' | 'applicants'>) => void;
  inviteProfessional: (professionalId: string, jobId: string) => void;
  sentInvitations: { professionalId: string, jobId: string }[];
}

const BusinessManagerContext = createContext<BusinessManagerContextType | undefined>(undefined);

export const useBusinessManager = (): BusinessManagerContextType => {
  const context = useContext(BusinessManagerContext);
  if (context === undefined) {
    throw new Error('useBusinessManager must be used within a BusinessManagerProvider');
  }
  return context;
};

interface BusinessManagerProviderProps {
  children: ReactNode;
}

export const BusinessManagerProvider = ({ children }: BusinessManagerProviderProps) => {
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>(mockProfessionals);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings);
  const [industryReports] = useState<IndustryReport[]>(mockIndustryReports);
  const [sentInvitations, setSentInvitations] = useState<{ professionalId: string, jobId: string }[]>([]);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const savedJobPostings = localStorage.getItem('businessManager_jobPostings');
    const savedInvitations = localStorage.getItem('businessManager_sentInvitations');
    
    if (savedJobPostings) {
      try {
        setJobPostings(JSON.parse(savedJobPostings));
      } catch (error) {
        console.error('Failed to parse saved job postings', error);
      }
    }
    
    if (savedInvitations) {
      try {
        setSentInvitations(JSON.parse(savedInvitations));
      } catch (error) {
        console.error('Failed to parse saved invitations', error);
      }
    }
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('businessManager_jobPostings', JSON.stringify(jobPostings));
  }, [jobPostings]);
  
  useEffect(() => {
    localStorage.setItem('businessManager_sentInvitations', JSON.stringify(sentInvitations));
  }, [sentInvitations]);
  
  // Search and filter professionals
  const searchProfessionals = (
    query: string, 
    filters: { role?: string, location?: string, availability?: string }
  ) => {
    let results = [...professionals];
    
    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(professional => 
        professional.name.toLowerCase().includes(lowerQuery) ||
        professional.specialty.toLowerCase().includes(lowerQuery) ||
        professional.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
      );
    }
    
    // Apply filters
    if (filters.role) {
      results = results.filter(professional => professional.role === filters.role);
    }
    
    if (filters.location) {
      results = results.filter(professional => professional.location === filters.location);
    }
    
    if (filters.availability) {
      results = results.filter(professional => professional.availability === filters.availability);
    }
    
    setFilteredProfessionals(results);
  };
  
  // Add a new job posting
  const addJobPosting = (jobPosting: Omit<JobPosting, 'id' | 'postedDate' | 'applicants'>) => {
    const newJobPosting: JobPosting = {
      ...jobPosting,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0
    };
    
    setJobPostings(prevJobPostings => [...prevJobPostings, newJobPosting]);
  };
  
  // Create job posting (alias for addJobPosting for API consistency)
  const createJobPosting = addJobPosting;
  
  // Send invitation to a professional for a job
  const inviteProfessional = (professionalId: string, jobId: string) => {
    const newInvitation = { professionalId, jobId };
    setSentInvitations(prevInvitations => [...prevInvitations, newInvitation]);
  };
  
  const value = {
    professionals,
    filteredProfessionals,
    jobPostings,
    industryReports,
    searchProfessionals,
    addJobPosting,
    createJobPosting,
    inviteProfessional,
    sentInvitations
  };
  
  return (
    <BusinessManagerContext.Provider value={value}>
      {children}
    </BusinessManagerContext.Provider>
  );
};