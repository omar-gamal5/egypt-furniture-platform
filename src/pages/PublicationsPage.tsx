import { useState, useEffect } from 'react';
import { Search, BookOpen, User, Bookmark } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Publication } from '../types';

const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Modern Furniture Design Principles',
    authors: ['Ahmed Hassan', 'Sarah Johnson'],
    isbn: '978-0123456789',
    publisher: 'Cairo Design Press',
    publishedDate: '2023',
    description: 'A comprehensive guide to contemporary furniture design principles and practices.',
    coverImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
    category: 'Design',
    language: 'English',
    pages: 256
  },
  {
    id: '2',
    title: 'Traditional Egyptian Furniture Craftsmanship',
    authors: ['Mohamed Ali'],
    isbn: '978-0987654321',
    publisher: 'Heritage Publications',
    publishedDate: '2022',
    description: 'Exploring the rich history and techniques of Egyptian furniture making.',
    coverImage: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg',
    category: 'History',
    language: 'English',
    pages: 320
  },
  {
    id: '3',
    title: 'Sustainable Materials in Furniture Production',
    authors: ['Laila Ibrahim', 'Mark Wilson'],
    isbn: '978-1234567890',
    publisher: 'Green Design Institute',
    publishedDate: '2024',
    description: 'A guide to sustainable materials and eco-friendly production methods.',
    coverImage: 'https://images.pexels.com/photos/4050300/pexels-photo-4050300.jpeg',
    category: 'Sustainability',
    language: 'English',
    pages: 288
  }
];

type SearchType = 'title' | 'author' | 'isbn';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('title');
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>(publications);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = publications.filter(pub => {
      switch (searchType) {
        case 'title':
          return pub.title.toLowerCase().includes(query);
        case 'author':
          return pub.authors.some(author => author.toLowerCase().includes(query));
        case 'isbn':
          return pub.isbn.toLowerCase().includes(query);
        default:
          return true;
      }
    });
    setFilteredPublications(filtered);
  }, [searchQuery, searchType, publications]);

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Industry Publications</h1>
          <p className="text-gray-600">
            Explore academic papers, books, and research publications related to furniture design and manufacturing.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={searchType === 'title' ? 'primary' : 'outline'}
                onClick={() => setSearchType('title')}
              >
                <BookOpen size={16} className="mr-2" />
                Title
              </Button>
              <Button
                variant={searchType === 'author' ? 'primary' : 'outline'}
                onClick={() => setSearchType('author')}
              >
                <User size={16} className="mr-2" />
                Author
              </Button>
              <Button
                variant={searchType === 'isbn' ? 'primary' : 'outline'}
                onClick={() => setSearchType('isbn')}
              >
                <Bookmark size={16} className="mr-2" />
                ISBN
              </Button>
            </div>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((publication) => (
            <Card key={publication.id} className="h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src={publication.coverImage}
                  alt={publication.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{publication.title}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <p>By {publication.authors.join(', ')}</p>
                  <p>ISBN: {publication.isbn}</p>
                  <p>{publication.publisher}, {publication.publishedDate}</p>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {publication.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                    {publication.category}
                  </span>
                  <span className="text-gray-600">
                    {publication.pages} pages
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No publications found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new publications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}