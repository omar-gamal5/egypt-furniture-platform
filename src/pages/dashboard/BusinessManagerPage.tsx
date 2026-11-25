import { useState, useEffect } from 'react';
import { Users, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BusinessManagerProvider } from '../../contexts/BusinessManagerContext';
import Card, { CardContent } from '../../components/ui/Card';
import ProfessionalsDirectory from '../../components/business/ProfessionalsDirectory';
import JobPostingForm from '../../components/business/JobPostingForm';
import IndustryInsightsDashboard from '../../components/business/IndustryInsightsDashboard';

export default function BusinessManagerPage() {
  const { user, featureAccess } = useAuth();
  const [activeTab, setActiveTab] = useState<'professionals' | 'job-postings' | 'industry-insights'>('professionals');
  const [isTestMode, setIsTestMode] = useState(false);

  // Check URL parameters for test mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsTestMode(urlParams.get('testMode') === 'true');
  }, []);

  // Check if user is either a student or a designer with pro subscription
  const hasValidAccess = isTestMode || 
    (user?.role === 'student') || 
    (user?.role === 'designer' && user?.subscription === 'pro') ||
    (user?.role === 'development'); // Allow development accounts for testing

  if (!hasValidAccess) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <AlertCircle size={48} className="text-primary-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
            <p className="text-gray-600 mb-6">
              This Business Manager feature is available only to students and designers with pro subscriptions.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Current role: {user?.role || 'Unknown'}<br/>
              Subscription: {user?.subscription || 'None'}
            </p>
            {isTestMode && (
              <div className="bg-blue-100 p-3 rounded text-sm mt-4">
                Test mode is active. This message is only visible during testing.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <BusinessManagerProvider>
      <div className="container py-8">
        {isTestMode && (
          <div className="bg-blue-100 border-blue-200 border p-3 rounded text-sm mb-4">
            Test mode is active. This banner is only visible during testing.
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2">Business Manager Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Manage your business profile, find professionals, post jobs, and access industry insights
        </p>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center ${
              activeTab === 'professionals'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('professionals')}
          >
            <Users size={16} className="mr-2" />
            Find Professionals
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center ${
              activeTab === 'job-postings'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('job-postings')}
          >
            <Briefcase size={16} className="mr-2" />
            Job Postings
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm flex items-center ${
              activeTab === 'industry-insights'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('industry-insights')}
          >
            <TrendingUp size={16} className="mr-2" />
            Industry Insights
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'professionals' && (
            <div>
              {featureAccess?.findEducators || featureAccess?.findFurnitureDesigners || 
               featureAccess?.findWoodworkers || featureAccess?.findSalespersons ? (
                <ProfessionalsDirectory />
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-600">
                      You don't have access to the professionals directory feature. Please upgrade your subscription.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'job-postings' && (
            <div>
              {featureAccess?.announceJobOpenings ? (
                <JobPostingForm />
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-600">
                      You don't have access to the job posting feature. Please upgrade your subscription.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'industry-insights' && (
            <div>
              {featureAccess?.accessIndustryInsights ? (
                <IndustryInsightsDashboard />
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-600">
                      You don't have access to the industry insights feature. Please upgrade your subscription.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </BusinessManagerProvider>
  );
}