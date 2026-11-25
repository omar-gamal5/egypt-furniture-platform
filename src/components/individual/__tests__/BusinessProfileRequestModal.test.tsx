import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import BusinessProfileRequestModal from '../BusinessProfileRequestModal';
import { IndividualUserProvider } from '../../../contexts/IndividualUserContext';

// Mock react-modal
jest.mock('react-modal', () => {
  return ({ isOpen, children }: any) => {
    return isOpen ? <div data-testid="modal">{children}</div> : null;
  };
});

// Mock the context
jest.mock('../../../contexts/IndividualUserContext', () => {
  const actual = jest.requireActual('../../../contexts/IndividualUserContext');
  return {
    ...actual,
    useIndividualUser: () => ({
      submitBusinessProfileRequest: jest.fn().mockResolvedValue(true),
    }),
  };
});

describe('BusinessProfileRequestModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock setAppElement to avoid issues
    (BusinessProfileRequestModal as any).prototype?.setAppElement = jest.fn();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Request Business Profile')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={false} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Request Business Profile')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    // Find and click the close button (the X icon in the top right)
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('validates required fields', async () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    // Submit form without filling in required fields
    const submitButton = screen.getByText('Submit Request');
    fireEvent.click(submitButton);
    
    // Check validation messages
    await waitFor(() => {
      expect(screen.getByText(/Business name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Business type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Business address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Business description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please provide a reason for your request/i)).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    // Enter invalid email
    const emailField = screen.getByLabelText(/Contact Email/i);
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Submit Request');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });

  test('submits form when all fields are valid', async () => {
    const useIndividualUserMock = require('../../../contexts/IndividualUserContext').useIndividualUser;
    const submitRequestMock = jest.fn().mockResolvedValue(true);
    
    useIndividualUserMock.mockReturnValue({
      submitBusinessProfileRequest: submitRequestMock,
    });
    
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Business Name/i), { target: { value: 'My Business' } });
    fireEvent.change(screen.getByLabelText(/Business Type/i), { target: { value: 'Design Studio' } });
    fireEvent.change(screen.getByLabelText(/Contact Person/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Contact Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contact Phone/i), { target: { value: '123-456-7890' } });
    fireEvent.change(screen.getByLabelText(/Business Address/i), { target: { value: '123 Main St, Cairo, Egypt' } });
    fireEvent.change(screen.getByLabelText(/Business Website/i), { target: { value: 'https://example.com' } });
    fireEvent.change(screen.getByLabelText(/Business Description/i), { 
      target: { 
        value: 'This is my business description. It is at least 50 characters long to satisfy the validation requirements.' 
      } 
    });
    fireEvent.change(screen.getByLabelText(/Reason for Business Profile Request/i), { 
      target: { 
        value: 'I want to showcase my business on this platform.' 
      } 
    });
    
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText('Submit Request'));
    });
    
    // Wait for the form submission and validation
    await waitFor(() => {
      expect(submitRequestMock).toHaveBeenCalledWith(expect.objectContaining({
        businessName: 'My Business',
        businessType: 'Design Studio',
        contactName: 'John Doe',
        contactEmail: 'john.doe@example.com',
      }));
      
      // Check that success message is shown
      expect(screen.getByText('Request Submitted Successfully')).toBeInTheDocument();
    });
  });

  test('displays success message after successful submission', async () => {
    render(
      <IndividualUserProvider>
        <BusinessProfileRequestModal isOpen={true} onClose={mockOnClose} />
      </IndividualUserProvider>
    );
    
    // Fill out the form with minimal required fields
    fireEvent.change(screen.getByLabelText(/Business Name/i), { target: { value: 'My Business' } });
    fireEvent.change(screen.getByLabelText(/Business Type/i), { target: { value: 'Design Studio' } });
    fireEvent.change(screen.getByLabelText(/Contact Person/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Contact Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contact Phone/i), { target: { value: '123-456-7890' } });
    fireEvent.change(screen.getByLabelText(/Business Address/i), { target: { value: '123 Main St, Cairo, Egypt' } });
    fireEvent.change(screen.getByLabelText(/Business Description/i), { 
      target: { 
        value: 'This is my business description. It is at least 50 characters long to satisfy the validation requirements.' 
      } 
    });
    fireEvent.change(screen.getByLabelText(/Reason for Business Profile Request/i), { 
      target: { 
        value: 'I want to showcase my business on this platform.' 
      } 
    });
    
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText('Submit Request'));
    });
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Request Submitted Successfully')).toBeInTheDocument();
      expect(screen.getByText('Thank you for your interest in a business profile. Our team will review your request and contact you shortly.')).toBeInTheDocument();
      
      // Ensure the form is no longer displayed
      expect(screen.queryByLabelText(/Business Name/i)).not.toBeInTheDocument();
    });
    
    // Close the modal after success
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});