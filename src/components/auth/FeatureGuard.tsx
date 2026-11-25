import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

interface FeatureGuardProps {
  feature: keyof FeatureAccess;
  children: ReactNode;
  fallback?: ReactNode;
}

export default function FeatureGuard({ feature, children, fallback }: FeatureGuardProps) {
  const { isAuthenticated, featureAccess } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Sign in to access this feature</h3>
        <p className="text-gray-600 mb-4">Create an account or sign in to access all features</p>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (!featureAccess[feature]) {
    return (
      <div className="text-center py-8">
        {fallback || (
          <>
            <h3 className="text-lg font-semibold mb-2">Feature not available</h3>
            <p className="text-gray-600">
              This feature is only available to business profile managers.
            </p>
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
}