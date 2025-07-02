import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SearchStatusCard from './components/SearchStatusCard';
import JobCategoriesSection from './components/JobCategoriesSection';
import ExperienceFiltersSection from './components/ExperienceFiltersSection';
import LocationPreferencesSection from './components/LocationPreferencesSection';
import SalaryRangeSection from './components/SalaryRangeSection';
import SchedulingSection from './components/SchedulingSection';
import AdvancedFiltersSection from './components/AdvancedFiltersSection';
import ConfigurationActions from './components/ConfigurationActions';

const JobSearchConfiguration = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [hasChanges, setHasChanges] = useState(false);
  const [configuration, setConfiguration] = useState({
    categories: ['web-developer-intern', 'full-stack-developer'],
    experience: ['entry-level', 'internship'],
    location: {
      searchType: 'remote',
      locations: ['San Francisco, CA', 'New York, NY'],
      radius: 25
    },
    salary: {
      currency: 'USD',
      minSalary: 45000,
      maxSalary: 85000,
      salaryType: 'annual'
    },
    schedule: {
      interval: 'daily',
      startTime: '09:00',
      endTime: '17:00',
      maxApplicationsPerDay: 10
    },
    filters: {
      keywords: ['React', 'JavaScript', 'Node.js'],
      platforms: ['linkedin', 'indeed', 'glassdoor']
    }
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getText = (key) => {
    const texts = {
      pageTitle: {
        en: 'Job Search Configuration',
        es: 'Configuración de Búsqueda de Trabajo',
        fr: 'Configuration de Recherche d\'Emploi'
      },
      pageDescription: {
        en: 'Customize your automated job search parameters and application preferences for optimal matching.',
        es: 'Personaliza tus parámetros de búsqueda de trabajo automatizada y preferencias de solicitud para una coincidencia óptima.',
        fr: 'Personnalisez vos paramètres de recherche d\'emploi automatisée et vos préférences de candidature pour une correspondance optimale.'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleConfigurationChange = (section, data) => {
    setConfiguration(prev => ({
      ...prev,
      [section]: data
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving configuration:', configuration);
    setHasChanges(false);
    // Here you would typically send the configuration to your backend
  };

  const handlePreview = () => {
    console.log('Generating preview with configuration:', configuration);
    // Here you would typically generate a preview of the search results
  };

  const handleReset = () => {
    setConfiguration({
      categories: ['web-developer-intern', 'full-stack-developer'],
      experience: ['entry-level', 'internship'],
      location: {
        searchType: 'remote',
        locations: ['San Francisco, CA', 'New York, NY'],
        radius: 25
      },
      salary: {
        currency: 'USD',
        minSalary: 45000,
        maxSalary: 85000,
        salaryType: 'annual'
      },
      schedule: {
        interval: 'daily',
        startTime: '09:00',
        endTime: '17:00',
        maxApplicationsPerDay: 10
      },
      filters: {
        keywords: ['React', 'JavaScript', 'Node.js'],
        platforms: ['linkedin', 'indeed', 'glassdoor']
      }
    });
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 pb-24 lg:pb-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                {getText('pageTitle')}
              </h1>
              <p className="text-text-secondary text-sm lg:text-base">
                {getText('pageDescription')}
              </p>
            </div>

            {/* Search Status Card */}
            <SearchStatusCard />

            {/* Configuration Sections */}
            <div className="space-y-6">
              <JobCategoriesSection 
                onCategoriesChange={(categories) => handleConfigurationChange('categories', categories)}
              />
              
              <ExperienceFiltersSection 
                onExperienceChange={(experience) => handleConfigurationChange('experience', experience)}
              />
              
              <LocationPreferencesSection 
                onLocationChange={(location) => handleConfigurationChange('location', location)}
              />
              
              <SalaryRangeSection 
                onSalaryChange={(salary) => handleConfigurationChange('salary', salary)}
              />
              
              <SchedulingSection 
                onScheduleChange={(schedule) => handleConfigurationChange('schedule', schedule)}
              />
              
              <AdvancedFiltersSection 
                onFiltersChange={(filters) => handleConfigurationChange('filters', filters)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Sticky Actions */}
      <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-4xl lg:mx-auto z-fixed">
        <ConfigurationActions
          onSave={handleSave}
          onPreview={handlePreview}
          onReset={handleReset}
          hasChanges={hasChanges}
        />
      </div>
    </div>
  );
};

export default JobSearchConfiguration;