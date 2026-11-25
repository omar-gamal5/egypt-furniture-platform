import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedsList from '../FeedsList';
import { IndividualUserProvider } from '../../../contexts/IndividualUserContext';

// Mock data
const mockFeeds = [
  {
    id: 'feed-001',
    authorId: 'user-001',
    authorName: 'Cairo Design Studios',
    authorAvatar: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
    authorRole: 'designer',
    content: 'We\'re excited to share our latest collection!',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'
    ],
    likes: 42,
    comments: 7,
    shares: 12,
    type: 'image',
    timestamp: '2025-04-30T14:23:00Z',
    liked: false
  },
  {
    id: 'feed-002',
    authorId: 'user-002',
    authorName: 'Alexandria Textiles',
    authorAvatar: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg',
    authorRole: 'supplier',
    content: 'New shipment of premium upholstery fabrics just arrived!',
    images: [
      'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg'
    ],
    likes: 16,
    comments: 3,
    shares: 2,
    type: 'image',
    timestamp: '2025-04-29T10:15:00Z',
    liked: true
  },
  {
    id: 'feed-003',
    authorId: 'user-003',
    authorName: 'Egyptian Furniture Association',
    authorAvatar: 'https://images.pexels.com/photos/4200822/pexels-photo-4200822.jpeg',
    authorRole: 'educational',
    content: 'Join us for the annual Furniture Industry Conference happening next month in Cairo.',
    likes: 76,
    comments: 14,
    shares: 28,
    type: 'event',
    timestamp: '2025-04-28T09:45:00Z',
    liked: false,
    relatedLink: 'https://www.egyptianfurnitureassociation.org/conference2025',
    relatedLinkTitle: 'Egyptian Furniture Conference 2025'
  }
];

// Mock the context
jest.mock('../../../contexts/IndividualUserContext', () => {
  const actual = jest.requireActual('../../../contexts/IndividualUserContext');
  return {
    ...actual,
    useIndividualUser: () => ({
      feeds: mockFeeds,
      likePost: jest.fn(),
    }),
  };
});

describe('FeedsList Component', () => {
  test('renders all feeds', () => {
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    // Check that all feed authors are displayed
    expect(screen.getByText('Cairo Design Studios')).toBeInTheDocument();
    expect(screen.getByText('Alexandria Textiles')).toBeInTheDocument();
    expect(screen.getByText('Egyptian Furniture Association')).toBeInTheDocument();
    
    // Check that content is displayed
    expect(screen.getByText('We\'re excited to share our latest collection!')).toBeInTheDocument();
    expect(screen.getByText('New shipment of premium upholstery fabrics just arrived!')).toBeInTheDocument();
    expect(screen.getByText('Join us for the annual Furniture Industry Conference happening next month in Cairo.')).toBeInTheDocument();
  });

  test('renders correct number of feeds when limit is provided', () => {
    render(
      <IndividualUserProvider>
        <FeedsList limit={2} />
      </IndividualUserProvider>
    );
    
    // Check that only the first two feeds are displayed
    expect(screen.getByText('Cairo Design Studios')).toBeInTheDocument();
    expect(screen.getByText('Alexandria Textiles')).toBeInTheDocument();
    expect(screen.queryByText('Egyptian Furniture Association')).not.toBeInTheDocument();
  });

  test('displays author roles correctly', () => {
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    expect(screen.getByText('Designer', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Supplier', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Educational', { exact: false })).toBeInTheDocument();
  });

  test('displays images correctly', () => {
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    // Get all post images (not profile avatars)
    const postImages = screen.getAllByAltText(/Post by/);
    expect(postImages.length).toBe(3); // 2 from the first post, 1 from the second post
    
    // Check src attribute of first image
    expect(postImages[0]).toHaveAttribute('src', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg');
  });

  test('displays related links when present', () => {
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    // Check for related link
    const relatedLink = screen.getByText('Egyptian Furniture Conference 2025');
    expect(relatedLink).toBeInTheDocument();
    expect(relatedLink.closest('a')).toHaveAttribute('href', 'https://www.egyptianfurnitureassociation.org/conference2025');
  });

  test('shows correct like status', () => {
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    // Find all like buttons and check their status
    const likeButtons = screen.getAllByText(/Likes/);
    
    // First post is not liked
    expect(likeButtons[0]).toHaveTextContent('42 Likes');
    expect(likeButtons[0].closest('button')).not.toHaveClass('text-blue-600');
    
    // Second post is liked
    expect(likeButtons[1]).toHaveTextContent('16 Likes');
    expect(likeButtons[1].closest('button')).toHaveClass('text-blue-600');
  });

  test('calls likePost when like button is clicked', () => {
    const likePostMock = jest.fn();
    jest.spyOn(require('../../../contexts/IndividualUserContext'), 'useIndividualUser').mockImplementation(() => ({
      feeds: mockFeeds,
      likePost: likePostMock,
    }));
    
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    // Click the like button of the first post
    const likeButtons = screen.getAllByText(/Likes/);
    fireEvent.click(likeButtons[0]);
    
    expect(likePostMock).toHaveBeenCalledWith('feed-001');
  });

  test('formats timestamps correctly', () => {
    render(
      <IndividualUserProvider>
        <FeedsList />
      </IndividualUserProvider>
    );
    
    // Check that dates are formatted correctly
    // The exact format will depend on the locale, so we just check for presence
    expect(screen.getByText(/Apr 30/)).toBeInTheDocument();
    expect(screen.getByText(/Apr 29/)).toBeInTheDocument();
    expect(screen.getByText(/Apr 28/)).toBeInTheDocument();
  });
});