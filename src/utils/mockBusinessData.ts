// Mock data for Business Manager features

// Types for business manager data
export interface Professional {
  id: string;
  name: string;
  role: string; // 'educator', 'designer', 'woodworker', 'salesperson'
  specialty: string;
  skills: string[];
  location: string;
  experience: number;
  rating: number;
  availability: 'available' | 'busy' | 'unavailable';
  contactInfo: {
    phone?: string;
    email: string;
    website?: string;
  };
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
  applicants?: number;
}

export interface IndustryReport {
  id: string;
  title: string;
  type: 'market' | 'trend' | 'forecast' | 'survey';
  source: string;
  publicationDate: string;
  summary: string;
  tags: string[];
  downloadUrl: string;
}

// Mock data for professionals directory
export const mockProfessionals: Professional[] = [
  {
    id: 'prof-1',
    name: 'Dr. Amira Hassan',
    role: 'educator',
    specialty: 'Furniture Design Education',
    skills: ['Design Theory', 'CAD Software', 'Material Science', 'Design History'],
    location: 'Cairo',
    experience: 15,
    rating: 4.8,
    availability: 'available',
    contactInfo: {
      email: 'amira.hassan@cairouniversity.edu',
      phone: '+20 10 1111 2222',
      website: 'https://design.cairo-university.edu/faculty/hassan'
    }
  },
  {
    id: 'prof-2',
    name: 'Mohamed Fahmy',
    role: 'designer',
    specialty: 'Contemporary Furniture Design',
    skills: ['3D Modeling', 'Sustainable Design', 'Prototyping', 'Material Selection'],
    location: 'Alexandria',
    experience: 8,
    rating: 4.9,
    availability: 'busy',
    contactInfo: {
      email: 'mohamed@fahmydesign.com',
      phone: '+20 10 2222 3333',
      website: 'https://fahmydesign.com'
    }
  },
  {
    id: 'prof-3',
    name: 'Ibrahim El-Masry',
    role: 'woodworker',
    specialty: 'Traditional Woodcarving',
    skills: ['Hand Carving', 'Inlay Work', 'Restoration', 'Traditional Joinery'],
    location: 'Damietta',
    experience: 25,
    rating: 4.7,
    availability: 'available',
    contactInfo: {
      email: 'ibrahim@masrywoodworks.com',
      phone: '+20 10 3333 4444'
    }
  },
  {
    id: 'prof-4',
    name: 'Laila Adel',
    role: 'salesperson',
    specialty: 'Luxury Furniture Sales',
    skills: ['Negotiation', 'Client Relations', 'Product Knowledge', 'Market Analysis'],
    location: 'Cairo',
    experience: 6,
    rating: 4.5,
    availability: 'unavailable',
    contactInfo: {
      email: 'laila.adel@luxuryinteriors.com',
      phone: '+20 10 4444 5555'
    }
  },
  {
    id: 'prof-5',
    name: 'Ahmed Zaki',
    role: 'designer',
    specialty: 'Industrial Furniture Design',
    skills: ['CAD/CAM', 'Manufacturing Processes', 'Material Science', 'Ergonomics'],
    location: 'Giza',
    experience: 12,
    rating: 4.6,
    availability: 'available',
    contactInfo: {
      email: 'ahmed.zaki@industrialdesign.com',
      phone: '+20 10 5555 6666',
      website: 'https://zakidesigns.com'
    }
  },
  {
    id: 'prof-6',
    name: 'Sara Mahmoud',
    role: 'educator',
    specialty: 'Furniture History & Conservation',
    skills: ['Research', 'Conservation Techniques', 'Historical Analysis', 'Documentation'],
    location: 'Alexandria',
    experience: 10,
    rating: 4.7,
    availability: 'busy',
    contactInfo: {
      email: 'sara.mahmoud@alexuniversity.edu',
      website: 'https://heritage.alex-uni.edu/faculty/mahmoud'
    }
  },
  {
    id: 'prof-7',
    name: 'Omar Farid',
    role: 'woodworker',
    specialty: 'Contemporary Woodworking',
    skills: ['CNC Operations', 'Modern Finishing', 'Digital Fabrication', 'Custom Solutions'],
    location: 'Cairo',
    experience: 7,
    rating: 4.5,
    availability: 'available',
    contactInfo: {
      email: 'omar@faridwoodshop.com',
      phone: '+20 10 6666 7777'
    }
  },
  {
    id: 'prof-8',
    name: 'Hoda Sabry',
    role: 'salesperson',
    specialty: 'Office & Commercial Furniture Sales',
    skills: ['B2B Sales', 'Project Management', 'Space Planning', 'Contract Negotiation'],
    location: 'Cairo',
    experience: 9,
    rating: 4.8,
    availability: 'busy',
    contactInfo: {
      email: 'hoda.sabry@officedesigns.com',
      phone: '+20 10 7777 8888',
      website: 'https://officedesigns.com/team/sabry'
    }
  }
];

// Mock data for job postings
export const mockJobPostings: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Furniture Designer',
    company: 'Modern Home Interiors',
    location: 'Cairo',
    type: 'full-time',
    salary: 'EGP 30,000 - 40,000 monthly',
    description: 'We are looking for an experienced furniture designer to join our growing team. The ideal candidate will have a strong portfolio demonstrating creativity and innovation in furniture design.',
    requirements: [
      'Bachelor\'s degree in Design, Architecture, or related field',
      'Minimum 5 years experience in furniture design',
      'Proficiency with 3D modeling software (Rhino, SolidWorks)',
      'Strong understanding of materials and manufacturing processes',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Create unique furniture designs that align with our brand aesthetic',
      'Develop technical drawings and specifications for manufacturing',
      'Collaborate with craftsmen and production team',
      'Research market trends and material innovations',
      'Participate in design reviews and client presentations'
    ],
    postedDate: '2025-04-15',
    deadline: '2025-05-15',
    applicants: 12
  },
  {
    id: 'job-2',
    title: 'Experienced Woodworker',
    company: 'Cairo Design Studios',
    location: 'Cairo',
    type: 'full-time',
    description: 'We are seeking a skilled woodworker to join our workshop team. The candidate will be responsible for crafting high-quality furniture pieces based on our designers\' specifications.',
    requirements: [
      'Minimum 3 years experience in furniture making',
      'Proficiency with both hand tools and power tools',
      'Knowledge of different wood types and their properties',
      'Ability to read and interpret technical drawings',
      'Attention to detail and commitment to quality'
    ],
    responsibilities: [
      'Build furniture pieces according to design specifications',
      'Perform finishing work including sanding and applying finishes',
      'Maintain tools and equipment in good working condition',
      'Suggest improvements to designs from a manufacturing perspective',
      'Collaborate with designers to solve technical challenges'
    ],
    postedDate: '2025-04-18',
    deadline: '2025-05-20',
    applicants: 8
  },
  {
    id: 'job-3',
    title: 'Furniture Sales Representative',
    company: 'Luxury Home Collection',
    location: 'Alexandria',
    type: 'full-time',
    salary: 'Base + Commission',
    description: 'We are looking for a motivated sales representative to join our showroom team. The ideal candidate will have a passion for interior design and furniture, with a talent for building client relationships.',
    requirements: [
      'Previous experience in retail sales, preferably in furniture or home decor',
      'Excellent customer service skills',
      'Knowledge of interior design principles',
      'Strong communication and negotiation skills',
      'Computer literacy for inventory and sales systems'
    ],
    responsibilities: [
      'Assist customers in selecting furniture that meets their needs and preferences',
      'Maintain showroom displays and ensure product knowledge is up to date',
      'Meet or exceed monthly sales targets',
      'Process sales orders and follow up with customers',
      'Coordinate with warehouse team for deliveries and special orders'
    ],
    postedDate: '2025-04-10',
    deadline: '2025-05-10',
    applicants: 15
  }
];

// Mock data for industry reports
export const mockIndustryReports: IndustryReport[] = [
  {
    id: 'report-1',
    title: 'Egyptian Furniture Market Analysis 2025',
    type: 'market',
    source: 'Egyptian Furniture Council',
    publicationDate: 'April 2025',
    summary: 'A comprehensive analysis of the current state of the Egyptian furniture market, including market size, growth trends, key players, and consumer preferences. The report shows a 15% growth in the residential furniture sector and identifies opportunities in export markets.',
    tags: ['Market Analysis', 'Consumer Trends', 'Growth Forecast'],
    downloadUrl: '#'
  },
  {
    id: 'report-2',
    title: 'Sustainable Materials in Furniture Manufacturing',
    type: 'trend',
    source: 'Green Design Association',
    publicationDate: 'March 2025',
    summary: 'This report examines the growing trend of sustainable materials in furniture manufacturing in Egypt and globally. It provides insights into consumer demand for eco-friendly products, available sustainable materials, and best practices for implementation.',
    tags: ['Sustainability', 'Materials', 'Consumer Preferences'],
    downloadUrl: '#'
  },
  {
    id: 'report-3',
    title: 'Furniture Export Opportunities for Egyptian Manufacturers',
    type: 'forecast',
    source: 'Ministry of Trade and Industry',
    publicationDate: 'February 2025',
    summary: 'An analysis of global export opportunities for Egyptian furniture manufacturers, focusing on key markets in the Middle East, Europe, and North America. The report includes regulatory information, logistics considerations, and competitive analysis.',
    tags: ['Exports', 'Global Markets', 'Trade Regulations'],
    downloadUrl: '#'
  },
  {
    id: 'report-4',
    title: 'Digital Transformation in the Furniture Industry',
    type: 'survey',
    source: 'Tech in Business Association',
    publicationDate: 'January 2025',
    summary: 'Results from a survey of 200 furniture businesses in Egypt on their digital transformation journeys. The report covers e-commerce adoption, digital marketing strategies, and use of technology in design and manufacturing processes.',
    tags: ['Digital Transformation', 'E-commerce', 'Technology'],
    downloadUrl: '#'
  }
];

// Furniture sales trends data for charts
export const mockFurnitureSalesData = [
  { month: 'Jan', residential: 1200000, commercial: 800000, total: 2000000 },
  { month: 'Feb', residential: 1300000, commercial: 820000, total: 2120000 },
  { month: 'Mar', residential: 1400000, commercial: 850000, total: 2250000 },
  { month: 'Apr', residential: 1500000, commercial: 900000, total: 2400000 },
  { month: 'May', residential: 1450000, commercial: 950000, total: 2400000 },
  { month: 'Jun', residential: 1550000, commercial: 980000, total: 2530000 },
  { month: 'Jul', residential: 1650000, commercial: 1000000, total: 2650000 },
  { month: 'Aug', residential: 1700000, commercial: 1050000, total: 2750000 }
];

// Market share data for pie charts
export const mockMarketShareData = [
  { category: 'Living Room', percentage: 35 },
  { category: 'Bedroom', percentage: 25 },
  { category: 'Dining Room', percentage: 15 },
  { category: 'Office', percentage: 15 },
  { category: 'Outdoor', percentage: 10 }
];

// Material trends data for bar charts
export const mockMaterialTrendsData = [
  { material: 'Sustainable Wood', count: 85, trend: 'rising' },
  { material: 'Metal', count: 65, trend: 'stable' },
  { material: 'Recycled Materials', count: 55, trend: 'rising' },
  { material: 'Glass', count: 45, trend: 'stable' },
  { material: 'Plastic', count: 30, trend: 'declining' }
];

// Export data for bar charts
export const mockExportData = [
  { country: 'Saudi Arabia', value: 5500000, change: 8 },
  { country: 'UAE', value: 4200000, change: 12 },
  { country: 'Kuwait', value: 3800000, change: 5 },
  { country: 'USA', value: 2500000, change: 15 },
  { country: 'UK', value: 2100000, change: -3 },
  { country: 'Germany', value: 1800000, change: 7 },
  { country: 'France', value: 1500000, change: -2 }
];