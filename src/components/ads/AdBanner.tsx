import { Advertisement } from '../../types';
import { useUi } from '../../contexts/UiContext';

interface AdBannerProps {
  ad: Advertisement;
  className?: string;
}

export default function AdBanner({ ad, className = '' }: AdBannerProps) {
  const { language } = useUi();
  
  return (
    <div className={`relative ${className}`}>
      <span className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
        {language === 'en' ? 'Ad' : 'إعلان'}
      </span>
      <a 
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg transition-shadow hover:shadow-md"
      >
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-auto object-cover"
        />
        <div className="p-4 bg-white">
          <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
          <p className="text-gray-600 text-sm">{ad.description}</p>
        </div>
      </a>
    </div>
  );
}