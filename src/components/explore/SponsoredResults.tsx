import { Profile } from '../../types';
import ProfileCard from './ProfileCard';
import { useUi } from '../../contexts/UiContext';

interface SponsoredResultsProps {
  profiles: Profile[];
  onToggleFavorite: (profileId: string) => void;
  favorites: string[];
}

export default function SponsoredResults({ 
  profiles, 
  onToggleFavorite, 
  favorites 
}: SponsoredResultsProps) {
  const { language } = useUi();

  if (profiles.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="bg-warning-50 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">
          {language === 'en' ? 'Sponsored Results' : 'نتائج مُموّلة'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isFavorited={favorites.includes(profile.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}