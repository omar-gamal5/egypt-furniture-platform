import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, FeatureAccess } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  featureAccess: FeatureAccess;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getDefaultFeatureAccess = (user: User | null): FeatureAccess => {
  const isBusinessManager = user?.managesBusinessProfile ?? false;
  const isAuthenticated = !!user;

  return {
    findEducators: isBusinessManager,
    findFurnitureDesigners: isBusinessManager,
    findWoodworkers: isBusinessManager,
    findSalespersons: isBusinessManager,
    announceJobOpenings: isBusinessManager,
    sendJobInvitation: isBusinessManager,
    accessIndustryInsights: isBusinessManager,
    findSupplies: isAuthenticated,
    findEducationalInstitutions: isAuthenticated,
    findDesignStudios: isAuthenticated,
    findProductionFacilities: isAuthenticated,
    findRetailers: true,
    accessCalendar: true,
    accessEducationalResources: true,
    findJobOpportunities: isAuthenticated,
    sendCV: isAuthenticated,
    requestBusinessProfile: isAuthenticated,
    accessFeeds: isAuthenticated
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [featureAccess, setFeatureAccess] = useState<FeatureAccess>(getDefaultFeatureAccess(null));

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('furniture_hub_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setFeatureAccess(getDefaultFeatureAccess(parsedUser));
      } catch (error) {
        console.error('Failed to parse saved user');
        localStorage.removeItem('furniture_hub_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from the backend
      const userData: User = {
        id: '1',
        name: 'Demo User',
        email,
        role: 'designer',
        status: 'active',
        createdAt: new Date().toISOString(),
        profileComplete: true,
        managesBusinessProfile: true, // For demo purposes
        subscription: 'pro' // Set default subscription to pro for testing
      };
      
      setUser(userData);
      setFeatureAccess(getDefaultFeatureAccess(userData));
      localStorage.setItem('furniture_hub_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in a real app, this would come from the backend
      const userData: User = {
        id: '1',
        name,
        email,
        role,
        status: 'active',
        createdAt: new Date().toISOString(),
        profileComplete: false,
        managesBusinessProfile: false,
        subscription: 'pro' // Set default subscription to pro for testing
      };
      
      setUser(userData);
      setFeatureAccess(getDefaultFeatureAccess(userData));
      localStorage.setItem('furniture_hub_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Signup failed', error);
      throw new Error('Signup failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setFeatureAccess(getDefaultFeatureAccess(null));
    localStorage.removeItem('furniture_hub_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      featureAccess,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}