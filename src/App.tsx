import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RegistrationProvider } from './context/RegistrationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { MyPassesDrawer } from './components/MyPassesDrawer';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RegistrationProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-paper-100 text-ink-900 dark:bg-paper-dark dark:text-neutral-100 transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />

            {/* Global Overlays & Modals */}
            <RegistrationModal />
            <MyPassesDrawer />
          </div>
        </BrowserRouter>
      </RegistrationProvider>
    </ThemeProvider>
  );
};

export default App;
