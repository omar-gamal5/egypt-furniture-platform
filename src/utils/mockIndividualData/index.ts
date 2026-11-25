// Type definitions
export interface Supply {
  id: string;
  name: string;
  description: string;
  supplierName: string;
  supplierId: string;
  type: string;
  subType?: string;
  price: number;
  currency: string;
  unit: string;
  inStock: boolean;
  availableQuantity?: number;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  imageUrl: string;
  sustainabilityCertifications?: string[];
}

export interface DesignStudio {
  id: string;
  name: string;
  description: string;
  specialty: string[];
  services: string[];
  location: string;
  coordinates: [number, number];
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  rating: number;
  reviewCount: number;
  imageUrl: string;
  portfolioImages?: string[];
  establishedYear: number;
}

export interface ProductionFacility {
  id: string;
  name: string;
  description: string;
  type: 'furniture_manufacturing' | 'textile_production' | 'woodworking' | 'metal_fabrication' | 'finishing';
  capabilities: string[];
  capacity: string;
  materialsHandled: string[];
  location: string;
  coordinates: [number, number];
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  imageUrl: string;
  certifications: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  location: string;
  coordinates: [number, number];
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  postedDate: string;
  deadline: string;
  contactEmail: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
  resumeUrl: string;
  portfolioUrl?: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'accepted' | 'rejected';
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  type: 'text' | 'image' | 'video' | 'article' | 'event';
  timestamp: string;
  liked: boolean;
  relatedLink?: string;
  relatedLinkTitle?: string;
}

// Mock data
export const mockSupplies: Supply[] = [
  {
    id: 'supply-001',
    name: 'Premium Egyptian Cotton',
    description: 'High-quality Egyptian cotton for upholstery and cushions.',
    supplierName: 'Alexandria Textiles',
    supplierId: 'supplier-001',
    type: 'fabric',
    subType: 'cotton',
    price: 150,
    currency: 'EGP',
    unit: 'per meter',
    inStock: true,
    availableQuantity: 500,
    location: 'Alexandria, Egypt',
    coordinates: [31.2001, 29.9187],
    imageUrl: 'https://images.pexels.com/photos/19611345/pexels-photo-19611345.jpeg',
    sustainabilityCertifications: ['OEKO-TEX', 'GOTS']
  },
  {
    id: 'supply-002',
    name: 'Solid Mahogany Wood',
    description: 'Sustainably sourced mahogany wood for furniture making.',
    supplierName: 'Cairo Wood Suppliers',
    supplierId: 'supplier-002',
    type: 'wood',
    subType: 'mahogany',
    price: 3500,
    currency: 'EGP',
    unit: 'per cubic meter',
    inStock: true,
    availableQuantity: 50,
    location: 'Cairo, Egypt',
    coordinates: [30.0444, 31.2357],
    imageUrl: 'https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg',
    sustainabilityCertifications: ['FSC']
  },
  {
    id: 'supply-003',
    name: 'Brass Hardware Set',
    description: 'Premium brass drawer pulls, handles and hinges for furniture.',
    supplierName: 'Egyptian Metal Works',
    supplierId: 'supplier-003',
    type: 'hardware',
    subType: 'brass',
    price: 450,
    currency: 'EGP',
    unit: 'per set',
    inStock: true,
    availableQuantity: 200,
    location: 'Cairo, Egypt',
    coordinates: [30.0566, 31.2262],
    imageUrl: 'https://images.pexels.com/photos/2883817/pexels-photo-2883817.jpeg'
  },
  {
    id: 'supply-004',
    name: 'Eco-Friendly Leather',
    description: 'Sustainably processed leather for furniture upholstery.',
    supplierName: 'GreenLeather Egypt',
    supplierId: 'supplier-004',
    type: 'leather',
    price: 350,
    currency: 'EGP',
    unit: 'per square meter',
    inStock: false,
    location: 'Port Said, Egypt',
    coordinates: [31.2653, 32.3019],
    imageUrl: 'https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg',
    sustainabilityCertifications: ['LWG']
  },
  {
    id: 'supply-005',
    name: 'High-Density Foam',
    description: 'Premium high-density foam for comfortable seating.',
    supplierName: 'Delta Comfort Materials',
    supplierId: 'supplier-005',
    type: 'foam',
    subType: 'high-density',
    price: 200,
    currency: 'EGP',
    unit: 'per sheet',
    inStock: true,
    availableQuantity: 120,
    location: 'Mansoura, Egypt',
    coordinates: [31.0409, 31.3785],
    imageUrl: 'https://images.pexels.com/photos/3366511/pexels-photo-3366511.jpeg'
  }
];

export const mockDesignStudios: DesignStudio[] = [
  {
    id: 'studio-001',
    name: 'Nile Design Collective',
    description: 'Contemporary furniture design studio specializing in sustainable and locally inspired pieces.',
    specialty: ['Contemporary', 'Sustainable', 'Residential'],
    services: ['Custom Furniture Design', 'Interior Consultation', 'Product Development'],
    location: 'Cairo, Egypt',
    coordinates: [30.0515, 31.2357],
    contactInfo: {
      email: 'info@niledesign.eg',
      phone: '+20 2 1234 5678',
      website: 'www.niledesigncollective.com'
    },
    rating: 4.8,
    reviewCount: 47,
    imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
    portfolioImages: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'
    ],
    establishedYear: 2018
  },
  {
    id: 'studio-002',
    name: 'Alexandria Heritage Design',
    description: 'Design studio focused on merging traditional Egyptian craftsmanship with modern aesthetics.',
    specialty: ['Traditional', 'Heritage', 'Luxury'],
    services: ['Custom Furniture', 'Heritage Restoration', 'Design Consultation'],
    location: 'Alexandria, Egypt',
    coordinates: [31.2001, 29.9187],
    contactInfo: {
      email: 'contact@alexandriaheritage.com',
      phone: '+20 3 4567 8901',
      website: 'www.alexandriaheritagedesign.com'
    },
    rating: 4.7,
    reviewCount: 38,
    imageUrl: 'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg',
    portfolioImages: [
      'https://images.pexels.com/photos/18095862/pexels-photo-18095862.jpeg',
      'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg',
      'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg'
    ],
    establishedYear: 2010
  },
  {
    id: 'studio-003',
    name: 'Modern Pyramid Studios',
    description: 'Contemporary design studio specializing in minimalist furniture for urban living.',
    specialty: ['Minimalist', 'Urban', 'Modular'],
    services: ['Furniture Design', 'Space Planning', 'Commercial Design'],
    location: 'Cairo, Egypt',
    coordinates: [30.0444, 31.2357],
    contactInfo: {
      email: 'hello@modernpyramid.design',
      phone: '+20 2 3456 7890',
      website: 'www.modernpyramidstudios.com'
    },
    rating: 4.5,
    reviewCount: 29,
    imageUrl: 'https://images.pexels.com/photos/14662270/pexels-photo-14662270.jpeg',
    portfolioImages: [
      'https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg',
      'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      'https://images.pexels.com/photos/698170/pexels-photo-698170.jpeg'
    ],
    establishedYear: 2020
  }
];

export const mockProductionFacilities: ProductionFacility[] = [
  {
    id: 'facility-001',
    name: 'Delta Furniture Manufacturing',
    description: 'Large-scale furniture production facility with modern machinery and quality craftsmanship.',
    type: 'furniture_manufacturing',
    capabilities: ['Mass Production', 'Custom Orders', 'Assembly', 'Packaging'],
    capacity: '5000 pieces monthly',
    materialsHandled: ['Wood', 'Metal', 'Upholstery', 'Glass'],
    location: 'Delta Region, Egypt',
    coordinates: [31.1656, 30.9470],
    contactInfo: {
      email: 'production@deltafurniture.eg',
      phone: '+20 40 1234 5678',
      website: 'www.deltafurnituremanufacturing.com'
    },
    imageUrl: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg',
    certifications: ['ISO 9001', 'FSC Chain of Custody']
  },
  {
    id: 'facility-002',
    name: 'Cairo Woodcraft Workshops',
    description: 'Specialized woodworking facility focusing on high-end custom furniture and cabinetry.',
    type: 'woodworking',
    capabilities: ['Custom Furniture', 'Cabinetry', 'Wood Carving', 'Finishing'],
    capacity: '200 custom pieces monthly',
    materialsHandled: ['Hardwood', 'Veneer', 'Exotic Woods', 'Reclaimed Wood'],
    location: 'Cairo, Egypt',
    coordinates: [30.0298, 31.2060],
    contactInfo: {
      email: 'info@cairowoodcraft.com',
      phone: '+20 2 7654 3210',
      website: 'www.cairowoodcraft.com'
    },
    imageUrl: 'https://images.pexels.com/photos/1094770/pexels-photo-1094770.jpeg',
    certifications: ['Handcrafted Quality Assurance']
  },
  {
    id: 'facility-003',
    name: 'Alexandria Metal Fabrication',
    description: 'Metal fabrication facility specializing in furniture frames and decorative elements.',
    type: 'metal_fabrication',
    capabilities: ['Welding', 'Cutting', 'Bending', 'Finishing'],
    capacity: '3000 units monthly',
    materialsHandled: ['Steel', 'Aluminum', 'Brass', 'Iron'],
    location: 'Alexandria, Egypt',
    coordinates: [31.2242, 29.9490],
    contactInfo: {
      email: 'contact@alexmetal.eg',
      phone: '+20 3 8765 4321'
    },
    imageUrl: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg',
    certifications: ['ISO 14001', 'AWS Certified Welding']
  },
  {
    id: 'facility-004',
    name: 'Luxor Fine Finishes',
    description: 'Specialized facility for high-quality finishing, staining, and painting of furniture.',
    type: 'finishing',
    capabilities: ['Wood Staining', 'Painting', 'Lacquering', 'Special Effects'],
    capacity: '1000 pieces monthly',
    materialsHandled: ['Wood', 'MDF', 'Veneer', 'Metal'],
    location: 'Luxor, Egypt',
    coordinates: [25.6989, 32.6421],
    contactInfo: {
      email: 'info@luxorfinishes.com',
      phone: '+20 95 1234 5678',
      website: 'www.luxorfinefinishes.com'
    },
    imageUrl: 'https://images.pexels.com/photos/4792493/pexels-photo-4792493.jpeg',
    certifications: ['Environmental Compliance', 'Low VOC Certified']
  }
];

export const mockJobListings: JobListing[] = [
  {
    id: 'job-001',
    title: 'Senior Furniture Designer',
    company: 'Nile Design Collective',
    companyId: 'studio-001',
    companyLogo: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
    description: 'We are seeking an experienced Furniture Designer to join our team. The ideal candidate will have a strong portfolio showing creativity and attention to detail in furniture design.',
    responsibilities: [
      'Create innovative and functional furniture designs',
      'Develop technical drawings and specifications',
      'Collaborate with craftsmen and production teams',
      'Research materials and production techniques',
      'Present concepts to clients and incorporate feedback'
    ],
    requirements: [
      'Bachelor\'s degree in Industrial Design, Furniture Design, or equivalent',
      'Minimum 5 years experience in furniture design',
      'Proficiency in CAD software (AutoCAD, SolidWorks, etc.)',
      'Strong understanding of materials, production techniques, and sustainability',
      'Excellent communication and presentation skills'
    ],
    location: 'Cairo, Egypt',
    coordinates: [30.0515, 31.2357],
    salary: {
      min: 15000,
      max: 25000,
      currency: 'EGP',
      period: 'monthly'
    },
    employmentType: 'full-time',
    experienceLevel: 'senior',
    postedDate: '2025-04-15',
    deadline: '2025-05-30',
    contactEmail: 'careers@niledesign.eg'
  },
  {
    id: 'job-002',
    title: 'Furniture Production Manager',
    company: 'Delta Furniture Manufacturing',
    companyId: 'facility-001',
    companyLogo: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg',
    description: 'We are looking for an experienced Production Manager to oversee our furniture manufacturing operations. The successful candidate will ensure efficient production processes while maintaining quality standards.',
    responsibilities: [
      'Oversee daily production operations',
      'Develop and implement production schedules',
      'Ensure quality control standards are met',
      'Manage inventory and supply chain logistics',
      'Supervise production staff and team leaders',
      'Identify opportunities for process improvements'
    ],
    requirements: [
      'Bachelor\'s degree in Manufacturing, Engineering, or related field',
      '3+ years experience in furniture production management',
      'Strong knowledge of production processes and quality control',
      'Experience with production planning and inventory management',
      'Excellent leadership and communication skills',
      'Problem-solving abilities and attention to detail'
    ],
    location: 'Delta Region, Egypt',
    coordinates: [31.1656, 30.9470],
    salary: {
      min: 18000,
      max: 22000,
      currency: 'EGP',
      period: 'monthly'
    },
    employmentType: 'full-time',
    experienceLevel: 'mid',
    postedDate: '2025-04-20',
    deadline: '2025-05-25',
    contactEmail: 'hr@deltafurniture.eg'
  },
  {
    id: 'job-003',
    title: 'Junior Interior Designer',
    company: 'Alexandria Heritage Design',
    companyId: 'studio-002',
    companyLogo: 'https://images.pexels.com/photos/4200822/pexels-photo-4200822.jpeg',
    description: 'We are seeking a creative and detail-oriented Junior Interior Designer to join our growing team. This is an excellent opportunity for recent graduates to gain experience in a professional design environment.',
    responsibilities: [
      'Assist senior designers with project development',
      'Create design presentations and mood boards',
      'Research materials, furniture, and fixtures',
      'Participate in client meetings',
      'Develop 2D and 3D visualizations'
    ],
    requirements: [
      'Bachelor\'s degree in Interior Design or related field',
      '0-2 years experience (internships acceptable)',
      'Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite',
      'Knowledge of materials, furniture, and design trends',
      'Strong visual communication skills',
      'Ability to work collaboratively in a team environment'
    ],
    location: 'Alexandria, Egypt',
    coordinates: [31.2001, 29.9187],
    salary: {
      min: 8000,
      max: 12000,
      currency: 'EGP',
      period: 'monthly'
    },
    employmentType: 'full-time',
    experienceLevel: 'entry',
    postedDate: '2025-04-25',
    deadline: '2025-05-20',
    contactEmail: 'jobs@alexandriaheritage.com'
  }
];

export const mockFeeds: FeedPost[] = [
  {
    id: 'feed-001',
    authorId: 'user-001',
    authorName: 'Cairo Design Studios',
    authorAvatar: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
    authorRole: 'designer',
    content: 'We\'re excited to share our latest collection inspired by traditional Egyptian patterns with modern functionality!',
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
    content: 'New shipment of premium upholstery fabrics just arrived! Sustainable, durable, and beautiful options for all your furniture projects.',
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
    content: 'Join us for the annual Furniture Industry Conference happening next month in Cairo. Network with industry leaders, discover new trends, and attend workshops on sustainable production techniques.',
    likes: 76,
    comments: 14,
    shares: 28,
    type: 'event',
    timestamp: '2025-04-28T09:45:00Z',
    liked: false,
    relatedLink: 'https://www.egyptianfurnitureassociation.org/conference2025',
    relatedLinkTitle: 'Egyptian Furniture Conference 2025'
  },
  {
    id: 'feed-004',
    authorId: 'user-004',
    authorName: 'Furniture Design Magazine',
    authorAvatar: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg',
    authorRole: 'publication',
    content: 'Our latest issue explores the revival of traditional craftsmanship in modern Egyptian furniture design. How are designers merging heritage techniques with contemporary aesthetics?',
    images: [
      'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
    ],
    likes: 34,
    comments: 8,
    shares: 15,
    type: 'article',
    timestamp: '2025-04-27T12:30:00Z',
    liked: false,
    relatedLink: 'https://furnituremag.eg/articles/craftsmanship-revival',
    relatedLinkTitle: 'The Revival of Egyptian Craftsmanship'
  },
  {
    id: 'feed-005',
    authorId: 'user-005',
    authorName: 'Sustainable Woods Egypt',
    authorAvatar: 'https://images.pexels.com/photos/5589330/pexels-photo-5589330.jpeg',
    authorRole: 'supplier',
    content: 'Proud to announce that all our wood products now come with full traceability documentation. Sustainability isn\'t just a buzzword - it\'s our commitment to preserving Egypt\'s natural resources.',
    likes: 52,
    comments: 11,
    shares: 23,
    type: 'text',
    timestamp: '2025-04-26T16:45:00Z',
    liked: false
  }
];