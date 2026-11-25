import { useState } from 'react';
import { PlusCircle, MinusCircle, CheckCircle } from 'lucide-react';
import { useBusinessManager } from '../../contexts/BusinessManagerContext';
import Button from '../ui/Button';

interface JobPostingFormProps {
  onSuccess?: () => void;
}

export default function JobPostingForm({ onSuccess }: JobPostingFormProps) {
  const { createJobPosting } = useBusinessManager();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'freelance',
    salary: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    deadline: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error if field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle array field changes (requirements, responsibilities)
  const handleArrayFieldChange = (type: 'requirements' | 'responsibilities', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[type]];
      newArray[index] = value;
      return {
        ...prev,
        [type]: newArray
      };
    });
  };
  
  // Add new item to array field
  const addArrayItem = (type: 'requirements' | 'responsibilities') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };
  
  // Remove item from array field
  const removeArrayItem = (type: 'requirements' | 'responsibilities', index: number) => {
    setFormData(prev => {
      const newArray = [...prev[type]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [type]: newArray.length ? newArray : ['']
      };
    });
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.deadline.trim()) newErrors.deadline = 'Application deadline is required';
    
    // Validate requirements and responsibilities are not empty
    if (formData.requirements.some(req => !req.trim())) {
      newErrors.requirements = 'All requirements must be filled or removed';
    }
    
    if (formData.responsibilities.some(resp => !resp.trim())) {
      newErrors.responsibilities = 'All responsibilities must be filled or removed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Filter out empty array items
      const filteredRequirements = formData.requirements.filter(req => req.trim());
      const filteredResponsibilities = formData.responsibilities.filter(resp => resp.trim());
      
      // Create job posting
      createJobPosting({
        ...formData,
        requirements: filteredRequirements,
        responsibilities: filteredResponsibilities,
        deadline: formData.deadline
      });
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: '',
          company: '',
          location: '',
          type: 'full-time',
          salary: '',
          description: '',
          requirements: [''],
          responsibilities: [''],
          deadline: ''
        });
        setSubmitSuccess(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      console.error('Error creating job posting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Create Job Posting</h2>
        <p className="text-gray-600">
          Post a new job opening to find qualified professionals for your business
        </p>
      </div>
      
      {/* Success message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
          <CheckCircle className="text-green-500 mr-3" size={20} />
          <div>
            <p className="font-medium text-green-800">Job posting created successfully!</p>
            <p className="text-green-700 text-sm mt-1">
              Your job posting has been published and is now visible to potential candidates.
            </p>
          </div>
        </div>
      )}
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              placeholder="e.g., Senior Furniture Designer"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${
                errors.company ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Your company name"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${
                errors.location ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              placeholder="e.g., Cairo, Alexandria, Remote"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
          
          {/* Job Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Job Type*
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          
          {/* Salary (Optional) */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
              Salary (Optional)
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., EGP 15,000 - 20,000 or 'Competitive'"
            />
          </div>
          
          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline*
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${
                errors.deadline ? 'border-red-300' : 'border-gray-300'
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
            )}
          </div>
        </div>
        
        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className={`block w-full px-3 py-2 border ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            } rounded-md focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Describe the job role, responsibilities, and ideal candidate..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        {/* Requirements */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Requirements*
            </label>
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
            >
              <PlusCircle size={16} className="mr-1" />
              Add Requirement
            </button>
          </div>
          
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                className={`block w-full px-3 py-2 border ${
                  errors.requirements ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:ring-primary-500 focus:border-primary-500`}
                placeholder="e.g., Bachelor's degree in Design or related field"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('requirements', index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <MinusCircle size={18} />
                </button>
              )}
            </div>
          ))}
          
          {errors.requirements && (
            <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
          )}
        </div>
        
        {/* Responsibilities */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Responsibilities*
            </label>
            <button
              type="button"
              onClick={() => addArrayItem('responsibilities')}
              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
            >
              <PlusCircle size={16} className="mr-1" />
              Add Responsibility
            </button>
          </div>
          
          {formData.responsibilities.map((resp, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={resp}
                onChange={(e) => handleArrayFieldChange('responsibilities', index, e.target.value)}
                className={`block w-full px-3 py-2 border ${
                  errors.responsibilities ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:ring-primary-500 focus:border-primary-500`}
                placeholder="e.g., Design furniture pieces that align with brand aesthetics"
              />
              {formData.responsibilities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('responsibilities', index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <MinusCircle size={18} />
                </button>
              )}
            </div>
          ))}
          
          {errors.responsibilities && (
            <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            isLoading={isSubmitting}
          >
            {submitSuccess ? 'Job Posted Successfully' : 'Post Job'}
          </Button>
        </div>
      </form>
    </div>
  );
}