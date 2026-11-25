import { useState } from 'react';
import { Search, Filter, Star, Mail, ExternalLink, MapPin } from 'lucide-react';
import { useBusinessManager } from '../../contexts/BusinessManagerContext';
import Button from '../ui/Button';
import Card, { CardContent } from '../ui/Card';

interface ProfessionalsDirectoryProps {
  onInvite?: (professionalId: string) => void;
}

export default function ProfessionalsDirectory({ onInvite }: ProfessionalsDirectoryProps) {
  const { filteredProfessionals, professionals, searchProfessionals, sentInvitations, jobPostings } = useBusinessManager();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  
  // Get unique locations for filter dropdown
  const locations = Array.from(new Set(professionals.map(p => p.location))).sort();
  
  const handleSearch = () => {
    searchProfessionals(searchQuery, {
      role: selectedRole || undefined,
      location: selectedLocation || undefined,
      availability: selectedAvailability as any || undefined
    });
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRole('');
    setSelectedLocation('');
    setSelectedAvailability('');
    searchProfessionals('', {});
  };
  
  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'educator': return 'Educator';
      case 'designer': return 'Designer';
      case 'woodworker': return 'Woodworker';
      case 'salesperson': return 'Salesperson';
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const getAvailabilityClass = (availability: string) => {
    switch(availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Professionals Directory</h2>
        <p className="text-gray-600">
          Find and connect with professionals in the furniture industry for your business needs.
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search by name, specialty, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Professional Types</option>
              <option value="educator">Educators</option>
              <option value="designer">Designers</option>
              <option value="woodworker">Woodworkers</option>
              <option value="salesperson">Salespersons</option>
            </select>
          </div>
          
          <div>
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={handleSearch} className="flex-1">
              <Filter size={16} className="mr-2" />
              Apply Filters
            </Button>
            
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div className="space-y-4">
        {filteredProfessionals.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-medium mb-2">No professionals found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredProfessionals.length}</span> results
              </p>
            </div>
            
            {filteredProfessionals.map(professional => (
              <Card key={professional.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3 p-4 md:p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{professional.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="mr-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {getRoleLabel(professional.role)}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityClass(professional.availability)}`}>
                              {professional.availability.charAt(0).toUpperCase() + professional.availability.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center text-yellow-500">
                            <Star size={16} className="fill-yellow-500" />
                            <span className="ml-1 text-sm font-medium">{professional.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-3">
                        <span className="font-medium">Specialty:</span> {professional.specialty}
                      </p>
                      
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <MapPin size={16} className="mr-1" />
                        <span>{professional.location}</span>
                        <span className="mx-2">•</span>
                        <span>{professional.experience} years experience</span>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {professional.skills.map(skill => (
                            <span key={skill} className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 bg-gray-50 p-4 md:p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information:</h4>
                        {professional.contactInfo.email && (
                          <div className="flex items-center text-sm mb-2">
                            <Mail size={15} className="mr-2 text-gray-500" />
                            <a href={`mailto:${professional.contactInfo.email}`} className="text-primary-600 hover:text-primary-800">
                              {professional.contactInfo.email}
                            </a>
                          </div>
                        )}
                        {professional.contactInfo.website && (
                          <div className="flex items-center text-sm">
                            <ExternalLink size={15} className="mr-2 text-gray-500" />
                            <a href={professional.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">
                              Visit website
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {onInvite && jobPostings.length > 0 && (
                        <div className="mt-4">
                          <Button 
                            onClick={() => onInvite(professional.id)} 
                            disabled={sentInvitations.some(inv => inv.professionalId === professional.id)}
                            fullWidth
                          >
                            {sentInvitations.some(inv => inv.professionalId === professional.id)
                              ? 'Invitation Sent'
                              : 'Invite to Job'
                            }
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}