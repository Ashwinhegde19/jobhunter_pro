import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import StatusIndicator from './StatusIndicator';
import NotificationBadge from './NotificationBadge';
import QuickActions from './QuickActions';

const Header = () => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  };

  const getPageTitle = () => {
    const titles = {
      '/dashboard': 'Dashboard',
      '/job-search-configuration': 'Job Search Configuration',
      '/application-templates': 'Application Templates',
      '/application-history': 'Application History',
      '/profile-management': 'Profile Management',
      '/analytics-dashboard': 'Analytics Dashboard'
    };
    return titles[location.pathname] || 'JobHunter Pro';
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-semibold text-text-primary">JobHunter Pro</h1>
        <p className="text-xs text-text-secondary -mt-1">Automated Job Search</p>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-fixed bg-surface border-b border-border px-4 lg:px-6 h-nav min-h-nav">
      <div className="flex items-center justify-between h-full">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Logo />
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={20} 
              className="text-text-secondary" 
            />
          </button>
        </div>

        {/* Center - Page Title (Desktop) */}
        <div className="hidden lg:block">
          <h2 className="text-lg font-medium text-text-primary">{getPageTitle()}</h2>
        </div>

        {/* Right Side - Status, Notifications, Actions, User */}
        <div className="flex items-center space-x-3">
          {/* Status Indicator */}
          <StatusIndicator />

          {/* Quick Actions (Desktop) */}
          <div className="hidden lg:block">
            <QuickActions />
          </div>

          {/* Notifications */}
          <NotificationBadge />

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-muted transition-colors"
            >
              <Icon name="Globe" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary uppercase">{currentLanguage}</span>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-text-primary">John Doe</p>
              <p className="text-xs text-text-secondary">Premium Plan</p>
            </div>
            <button className="p-1 rounded-md hover:bg-muted transition-colors">
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-surface border-b border-border shadow-lg">
          <div className="p-4 space-y-4">
            {/* Page Title (Mobile) */}
            <div className="pb-2 border-b border-border">
              <h2 className="text-lg font-medium text-text-primary">{getPageTitle()}</h2>
            </div>

            {/* Quick Actions (Mobile) */}
            <QuickActions />

            {/* Language Options */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-primary">Language</p>
              <div className="flex space-x-2">
                {['en', 'es', 'fr'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      currentLanguage === lang
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary hover:bg-secondary-100'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;