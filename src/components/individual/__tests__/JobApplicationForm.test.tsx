import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import JobApplicationForm from '../JobApplicationForm';
import { IndividualUserProvider } from '../../../contexts/IndividualUserContext';

// Mock the context
jest.mock('../../../contexts/IndividualUserContext', () => {
  const actual = jest.requireActual('../../../contexts/IndividualUserContext');
  return {
    ...actual,
    useIndividualUser: () => ({
      applyForJob: jest.fn(),
    }),
  };
});

// Mock FileReader
global.FileReader = class {
  constructor() {
    this.onload = jest.fn();
  }
  
  readAsDataURL() {
    setTimeout(() => {
      if (this.onload) {
        this.result = 'data:application/pdf;base64,mockFileContent';
        this.onload();
      }
    }, 50);
  }
};

describe('JobApplicationForm Component', () => {
  const mockJob = {
    id: 'job-001',
    title: 'Senior Furniture Designer',
    company: 'Nile Design Collective',
    companyId: 'studio-001',
    companyLogo: 'https://example.com/logo.jpg',
    description: 'Job description goes here',
    responsibilities: ['Responsibility 1', 'Responsibility 2'],
    requirements: ['Requirement 1', 'Requirement 2'],
    location: 'Cairo',
    coordinates: [30.0515, 31.2357] as [number, number],
    salary: {
      min: 15000,
      max: 25000,
      currency: 'EGP',
      period: 'monthly' as const,
    },
    employmentType: 'full-time' as const,
    experienceLevel: 'senior' as const,
    postedDate: '2025-04-15',
    deadline: '2025-05-30',
    contactEmail: 'careers@example.com',
  };

  const mockFile = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with job title and company name', () => {
    render(
      <IndividualUserProvider>
        <JobApplicationForm job={mockJob} onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </IndividualUserProvider>
    );
    
    expect(screen.getByText(`Apply for ${mockJob.title}`)).toBeInTheDocument();
    expect(screen.getByText(`at ${mockJob.company}`)).toBeInTheDocument();
    
    // Check that form fields are present
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cover Letter/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose File/i)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(
      <IndividualUserProvider>
        <JobApplicationForm job={mockJob} onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </IndividualUserProvider>
    );
    
    // Submit form without filling in required fields
    const submitButton = screen.getByText(/Submit Application/i);
    fireEvent.click(submitButton);
    
    // Check validation messages
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Cover letter is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Resume is required/i)).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    render(
      <IndividualUserProvider>
        <JobApplicationForm job={mockJob} onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </IndividualUserProvider>
    );
    
    const emailField = screen.getByLabelText(/Email/i);
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText(/Submit Application/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });

  test('validates phone number format', async () => {
    render(
      <IndividualUserProvider>
        <JobApplicationForm job={mockJob} onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </IndividualUserProvider>
    );
    
    const phoneField = screen.getByLabelText(/Phone Number/i);
    fireEvent.change(phoneField, { target: { value: 'abc' } });
    
    const submitButton = screen.getByText(/Submit Application/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid phone number format/i)).toBeInTheDocument();
    });
  });

  test('calls onClose when cancel button is clicked', () => {
    render(
      <IndividualUserProvider>
        <JobApplicationForm job={mockJob} onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </IndividualUserProvider>
    );
    
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('submits form when all fields are valid', async () => {
    const useIndividualUserMock = require('../../../contexts/IndividualUserContext').useIndividualUser;
    const applyForJobMock = jest.fn();
    
    useIndividualUserMock.mockReturnValue({
      applyForJob: applyForJobMock,
    });
    
    render(
      <IndividualUserProvider>
        <JobApplicationForm job={mockJob} onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </IndividualUserProvider>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123-456-7890' } });
    fireEvent.change(screen.getByLabelText(/Cover Letter/i), { 
      target: { value: 'This is my cover letter. It is at least 100 characters long to satisfy the validation requirements. I am very interested in this position and believe I would be a good fit.' } 
    });
    
    // Mock file input change
    const fileInput = screen.getByLabelText(/Resume\/CV/i, { selector: 'input' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [mockFile] } });
    });
    
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText(/Submit Application/i));
    });
    
    // Wait for the form submission and validation
    await waitFor(() => {
      expect(applyForJobMock).toHaveBeenCalledWith(expect.objectContaining({
        jobId: mockJob.id,
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantPhone: '123-456-7890',
      }));
      
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});