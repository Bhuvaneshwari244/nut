import React, { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'abstract' | 'detection' | 'technical') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();

  const menuItems = [
    { id: 'home', label: t('nav_home'), page: 'home' as const },
    { id: 'abstract', label: t('nav_abstract'), page: 'abstract' as const },
    { id: 'detection', label: t('nav_detection'), page: 'detection' as const },
    { id: 'technical', label: t('nav_technical'), page: 'technical' as const },
  ];

  const handleNavigation = (page: 'home' | 'abstract' | 'detection' | 'technical') => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">{t('app_title')}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center space-x-2">
              <label htmlFor="lang" className="sr-only">{t('language')}</label>
              <select
                id="lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="border border-gray-300 rounded-md text-sm px-2 py-1"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.page)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    currentPage === item.page
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2">
                <label htmlFor="lang-m" className="block text-xs text-gray-500 mb-1">{t('language')}</label>
                <select
                  id="lang-m"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="border border-gray-300 rounded-md text-sm px-2 py-1 w-full"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;