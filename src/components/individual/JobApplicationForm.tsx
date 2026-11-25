import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useIndividualUser } from '../../contexts/IndividualUserContext';
import { JobListing } from '../../utils/mockIndividualData';

interface JobApplicationFormProps {
  job: JobListing;
  onClose?: () => void;
  onSuccess?: () => void;
}

// Define validation schema using Yup
const ApplicationSchema = Yup.object().shape({
  applicantName: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  applicantEmail: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  applicantPhone: Yup.string()
    .required('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, 'Invalid phone number format'),
  coverLetter: Yup.string()
    .required('Cover letter is required')
    .min(100, 'Cover letter must be at least 100 characters'),
  resumeFile: Yup.mixed()
    .required('Resume is required'),
  portfolioUrl: Yup.string()
    .url('Invalid URL format')
});

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onClose, onSuccess }) => {
  const { applyForJob } = useIndividualUser();
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  
  // Convert file to base64 for localStorage storage
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      // Convert file to base64 string for storage
      const resumeUrl = await fileToBase64(values.resumeFile);
      
      // Create application object
      const application = {
        jobId: job.id,
        applicantId: 'user-123', // In a real app, this would be the logged in user's ID
        applicantName: values.applicantName,
        applicantEmail: values.applicantEmail,
        applicantPhone: values.applicantPhone,
        coverLetter: values.coverLetter,
        resumeUrl, // Store base64 string
        portfolioUrl: values.portfolioUrl || undefined
      };
      
      // Submit application
      applyForJob(application);
      
      // Reset form and notify success
      resetForm();
      setFileName('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error applying for job:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for {job.title}</h2>
      <p className="text-gray-600 mb-4">at {job.company}</p>
      
      <Formik
        initialValues={{
          applicantName: '',
          applicantEmail: '',
          applicantPhone: '',
          coverLetter: '',
          resumeFile: undefined,
          portfolioUrl: ''
        }}
        validationSchema={ApplicationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                id="applicantName"
                name="applicantName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="applicantName" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            <div>
              <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                id="applicantEmail"
                name="applicantEmail"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="applicantEmail" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            <div>
              <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Field
                id="applicantPhone"
                name="applicantPhone"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="applicantPhone" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            <div>
              <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-1">
                Resume/CV
              </label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                  <span>Choose File</span>
                  <input
                    id="resumeFile"
                    name="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue('resumeFile', file);
                        setFileName(file.name);
                      }
                    }}
                  />
                </label>
                <span className="ml-3 text-sm text-gray-500">{fileName || 'No file chosen'}</span>
              </div>
              {errors.resumeFile && touched.resumeFile && (
                <div className="mt-1 text-sm text-red-600">{errors.resumeFile as string}</div>
              )}
            </div>
            
            <div>
              <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio URL (optional)
              </label>
              <Field
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="portfolioUrl" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <Field
                as="textarea"
                id="coverLetter"
                name="coverLetter"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="coverLetter" component="div" className="mt-1 text-sm text-red-600" />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobApplicationForm;