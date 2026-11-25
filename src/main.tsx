import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { UiProvider } from './contexts/UiContext';
import { IndividualUserProvider } from './contexts/IndividualUserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <UiProvider>
          <IndividualUserProvider>
            <App />
          </IndividualUserProvider>
        </UiProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);