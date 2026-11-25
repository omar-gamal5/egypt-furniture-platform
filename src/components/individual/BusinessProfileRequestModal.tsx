import React, { useState } from 'react';
import Modal from 'react-modal';
import { useIndividualUser } from '../../contexts/IndividualUserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Ensure Modal is accessible
Modal.setAppElement('#root');

interface BusinessProfileRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define validation schema
const ProfileRequestSchema = Yup.object().shape({
  businessName: Yup.string().required('Business name is required'),
  businessType: Yup.string().required('Business type is required'),
  contactName: Yup.string().required('Contact name is required'),
  contactEmail: Yup.string().email('Invalid email format').required('Email is required'),
  contactPhone: Yup.string()
    .required('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, 'Invalid phone number format'),
  businessAddress: Yup.string().required('Business address is required'),
  businessWebsite: Yup.string().url('Invalid URL format'),
  businessDescription: Yup.string()
    .required('Business description is required')
    .min(50, 'Description must be at least 50 characters long'),
  reasonForRequest: Yup.string().required('Please provide a reason for your request')
});

const BusinessProfileRequestModal: React.FC<BusinessProfileRequestModalProps> = ({ isOpen, onClose }) => {
  const { submitBusinessProfileRequest } = useIndividualUser();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const success = await submitBusinessProfileRequest(values);
      if (success) {
        resetForm();
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting business profile request:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };
  
  const businessTypes = [
    'Design Studio',
    'Production Facility',
    'Supplier',
    'Retailer',
    'Educational Institution',
    'Other'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Request Business Profile"
      className="bg-white rounded-lg p-6 max-w-2xl mx-auto mt-20 shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto"
    >
      <div className="relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Request Business Profile</h2>
        
        {submitted ? (
          <div className="text-center py-10">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Request Submitted Successfully</h3>
            <p className="text-gray-600 mb-6">Thank you for your interest in a business profile. Our team will review your request and contact you shortly.</p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{
              businessName: '',
              businessType: '',
              contactName: '',
              contactEmail: '',
              contactPhone: '',
              businessAddress: '',
              businessWebsite: '',
              businessDescription: '',
              reasonForRequest: '',
            }}
            validationSchema={ProfileRequestSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name*
                    </label>
                    <Field
                      id="businessName"
                      name="businessName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="businessName" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type*
                    </label>
                    <Field
                      as="select"
                      id="businessType"
                      name="businessType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="businessType" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person*
                    </label>
                    <Field
                      id="contactName"
                      name="contactName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="contactName" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email*
                    </label>
                    <Field
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="contactEmail" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone*
                    </label>
                    <Field
                      id="contactPhone"
                      name="contactPhone"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="contactPhone" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                  
                  <div>
                    <label htmlFor="businessWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Website
                    </label>
                    <Field
                      id="businessWebsite"
                      name="businessWebsite"
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="businessWebsite" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address*
                  </label>
                  <Field
                    id="businessAddress"
                    name="businessAddress"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="businessAddress" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Description*
                  </label>
                  <Field
                    as="textarea"
                    id="businessDescription"
                    name="businessDescription"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your business, its specialties, and what you offer to the furniture industry..."
                  />
                  <ErrorMessage name="businessDescription" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div>
                  <label htmlFor="reasonForRequest" className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Business Profile Request*
                  </label>
                  <Field
                    as="textarea"
                    id="reasonForRequest"
                    name="reasonForRequest"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Why do you want to create a business profile? What features are you interested in?"
                  />
                  <ErrorMessage name="reasonForRequest" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Modal>
  );
};

export default BusinessProfileRequestModal;