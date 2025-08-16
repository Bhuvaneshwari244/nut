import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AbstractPage from './pages/AbstractPage';
import DetectionPage from './pages/DetectionPage';
import TechnicalPage from './pages/TechnicalPage';

type PageType = 'home' | 'abstract' | 'detection' | 'technical';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'abstract':
        return <AbstractPage />;
      case 'detection':
        return <DetectionPage />;
      case 'technical':
        return <TechnicalPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;