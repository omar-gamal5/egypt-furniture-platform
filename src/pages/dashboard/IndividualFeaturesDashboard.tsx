import React, { useState } from 'react';
import InteractiveMap from '../../components/individual/InteractiveMap';
import JobApplicationForm from '../../components/individual/JobApplicationForm';
import BusinessProfileRequestModal from '../../components/individual/BusinessProfileRequestModal';
import FeedsList from '../../components/individual/FeedsList';
import { useIndividualUser } from '../../contexts/IndividualUserContext';
import { JobListing } from '../../utils/mockIndividualData';

const IndividualFeaturesDashboard: React.FC = () => {
  const { 
    supplies, 
    designStudios, 
    productionFacilities, 
    jobListings,
  } = useIndividualUser();
  
  // State for managing modals and selected items
  const [showBusinessRequestModal, setShowBusinessRequestModal] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<JobListing | null>(null);
  const [activeTab, setActiveTab] = useState<'supplies' | 'studios' | 'facilities' | 'jobs' | 'feeds'>('feeds');
  
  // Convert data to map locations based on active tab
  const getMapLocations = () => {
    switch (activeTab) {
      case 'supplies':
        return supplies.map(supply => ({
          id: supply.id,
          name: supply.name,
          description: supply.description,
          location: supply.location,
          coordinates: supply.coordinates,
          imageUrl: supply.imageUrl
        }));
      case 'studios':
        return designStudios.map(studio => ({
          id: studio.id,
          name: studio.name,
          description: studio.description,
          location: studio.location,
          coordinates: studio.coordinates,
          imageUrl: studio.imageUrl
        }));
      case 'facilities':
        return productionFacilities.map(facility => ({
          id: facility.id,
          name: facility.name,
          description: facility.description,
          location: facility.location,
          coordinates: facility.coordinates,
          imageUrl: facility.imageUrl
        }));
      case 'jobs':
        return jobListings.map(job => ({
          id: job.id,
          name: `${job.title} at ${job.company}`,
          description: job.description,
          location: job.location,
          coordinates: job.coordinates,
          imageUrl: job.companyLogo
        }));
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Furniture Industry Explorer</h1>
        <p className="text-gray-600 mt-2">Find supplies, studios, facilities, job opportunities, and connect with the furniture industry.</p>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('feeds')}
            className={`px-4 py-2 rounded-md ${activeTab === 'feeds' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Feeds
          </button>
          <button
            onClick={() => setActiveTab('supplies')}
            className={`px-4 py-2 rounded-md ${activeTab === 'supplies' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Supplies
          </button>
          <button
            onClick={() => setActiveTab('studios')}
            className={`px-4 py-2 rounded-md ${activeTab === 'studios' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Studios
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-2 rounded-md ${activeTab === 'facilities' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Facilities
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-md ${activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Jobs
          </button>
        </div>
        
        <button
          onClick={() => setShowBusinessRequestModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Request Business Profile
        </button>
      </div>
      
      {activeTab !== 'feeds' && (
        <div className="h-96 mb-8">
          <InteractiveMap locations={getMapLocations()} height="100%" />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${activeTab === 'feeds' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {activeTab === 'feeds' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Latest Industry Updates</h2>
              <FeedsList />
            </div>
          )}
          
          {activeTab === 'supplies' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Supplies Directory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplies.map((supply) => (
                  <div key={supply.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={supply.imageUrl}
                      alt={supply.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{supply.name}</h3>
                      <p className="text-gray-600 text-sm">{supply.supplierName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-sm ${supply.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {supply.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">
                          {supply.price} {supply.currency} {supply.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'studios' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Design Studios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {designStudios.map((studio) => (
                  <div key={studio.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={studio.imageUrl}
                      alt={studio.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{studio.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{studio.location}</p>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(studio.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </span>
                        <span className="ml-1">({studio.reviewCount} reviews)</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {studio.specialty.slice(0, 3).map((spec, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'facilities' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Production Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productionFacilities.map((facility) => (
                  <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={facility.imageUrl}
                      alt={facility.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      <p className="text-gray-600 text-sm">{facility.location}</p>
                      <p className="text-gray-700 text-sm mt-2">
                        <span className="font-medium">Type:</span>{' '}
                        <span className="capitalize">{facility.type.replace('_', ' ')}</span>
                      </p>
                      <p className="text-gray-700 text-sm">
                        <span className="font-medium">Capacity:</span> {facility.capacity}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {facility.materialsHandled.slice(0, 3).map((material, index) => (
                          <span key={index} className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'jobs' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Job Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobListings.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-12 h-12 rounded-md object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {job.employmentType}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-700 line-clamp-2">{job.description}</p>
                      </div>
                      
                      <div className="mt-4 text-right">
                        <button
                          onClick={() => setSelectedJobForApplication(job)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {activeTab === 'feeds' && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
              <ul className="space-y-4">
                <li className="border-b border-gray-100 pb-3">
                  <p className="font-medium">Cairo Furniture Fair</p>
                  <p className="text-sm text-gray-600">May 15-18, 2025</p>
                  <p className="text-sm text-gray-700 mt-1">The largest furniture exhibition in Egypt with over 200 exhibitors from around the world.</p>
                </li>
                <li className="border-b border-gray-100 pb-3">
                  <p className="font-medium">Sustainable Design Workshop</p>
                  <p className="text-sm text-gray-600">May 22, 2025</p>
                  <p className="text-sm text-gray-700 mt-1">Learn sustainable design practices for furniture manufacturing.</p>
                </li>
                <li>
                  <p className="font-medium">Alexandria Design Week</p>
                  <p className="text-sm text-gray-600">June 5-12, 2025</p>
                  <p className="text-sm text-gray-700 mt-1">A week-long celebration of design with exhibitions, talks, and networking events.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <h3 className="font-semibold text-lg mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#SustainableFurniture</span>
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#EgyptianDesign</span>
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#ModernLiving</span>
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#WoodCraftsmanship</span>
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#InteriorInspiration</span>
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#FurnitureDesign</span>
                <span className="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full px-3 py-1">#HomeDecor</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Business Profile Request Modal */}
      <BusinessProfileRequestModal
        isOpen={showBusinessRequestModal}
        onClose={() => setShowBusinessRequestModal(false)}
      />
      
      {/* Job Application Form Modal */}
      {selectedJobForApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto my-8">
            <div className="relative">
              <button
                onClick={() => setSelectedJobForApplication(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <JobApplicationForm 
                job={selectedJobForApplication} 
                onClose={() => setSelectedJobForApplication(null)} 
                onSuccess={() => {
                  alert('Application submitted successfully!');
                  setSelectedJobForApplication(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualFeaturesDashboard;