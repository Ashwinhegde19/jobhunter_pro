import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LocationPreferencesSection = ({ onLocationChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(true);
  const [locationSettings, setLocationSettings] = useState({
    searchType: 'remote', // remote, onsite, hybrid, all
    locations: ['San Francisco, CA', 'New York, NY'],
    radius: 25,
    remoteOnly: true,
    hybridAcceptable: true
  });
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const searchTypes = [
    {
      id: 'remote',
      name: {
        en: 'Remote Only',
        es: 'Solo Remoto',
        fr: 'Télétravail Uniquement'
      },
      description: {
        en: 'Work from anywhere positions',
        es: 'Posiciones de trabajo desde cualquier lugar',
        fr: 'Postes de travail depuis n\'importe où'
      },
      icon: 'Home'
    },
    {
      id: 'onsite',
      name: {
        en: 'On-site Only',
        es: 'Solo Presencial',
        fr: 'Sur Site Uniquement'
      },
      description: {
        en: 'Office-based positions',
        es: 'Posiciones basadas en oficina',
        fr: 'Postes basés au bureau'
      },
      icon: 'Building'
    },
    {
      id: 'hybrid',
      name: {
        en: 'Hybrid',
        es: 'Híbrido',
        fr: 'Hybride'
      },
      description: {
        en: 'Mix of remote and office work',
        es: 'Mezcla de trabajo remoto y de oficina',
        fr: 'Mélange de travail à distance et au bureau'
      },
      icon: 'Shuffle'
    },
    {
      id: 'all',
      name: {
        en: 'All Types',
        es: 'Todos los Tipos',
        fr: 'Tous Types'
      },
      description: {
        en: 'Remote, hybrid, and on-site',
        es: 'Remoto, híbrido y presencial',
        fr: 'À distance, hybride et sur site'
      },
      icon: 'Globe'
    }
  ];

  const popularLocations = [
    'San Francisco, CA',
    'New York, NY',
    'Seattle, WA',
    'Austin, TX',
    'Boston, MA',
    'Los Angeles, CA',
    'Chicago, IL',
    'Denver, CO'
  ];

  const getText = (key) => {
    const texts = {
      locationPreferences: {
        en: 'Location Preferences',
        es: 'Preferencias de Ubicación',
        fr: 'Préférences de Localisation'
      },
      configureLocation: {
        en: 'Configure your preferred work locations and arrangements',
        es: 'Configura tus ubicaciones de trabajo y arreglos preferidos',
        fr: 'Configurez vos emplacements de travail et arrangements préférés'
      },
      workArrangement: {
        en: 'Work Arrangement',
        es: 'Arreglo de Trabajo',
        fr: 'Arrangement de Travail'
      },
      specificLocations: {
        en: 'Specific Locations',
        es: 'Ubicaciones Específicas',
        fr: 'Emplacements Spécifiques'
      },
      searchRadius: {
        en: 'Search Radius',
        es: 'Radio de Búsqueda',
        fr: 'Rayon de Recherche'
      },
      miles: {
        en: 'miles',
        es: 'millas',
        fr: 'miles'
      },
      addLocation: {
        en: 'Add Location',
        es: 'Agregar Ubicación',
        fr: 'Ajouter un Emplacement'
      },
      popularLocations: {
        en: 'Popular Locations',
        es: 'Ubicaciones Populares',
        fr: 'Emplacements Populaires'
      },
      enterLocation: {
        en: 'Enter city, state or country',
        es: 'Ingresa ciudad, estado o país',
        fr: 'Entrez ville, état ou pays'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleSearchTypeChange = (type) => {
    const updatedSettings = { ...locationSettings, searchType: type };
    setLocationSettings(updatedSettings);
    onLocationChange?.(updatedSettings);
  };

  const handleRadiusChange = (e) => {
    const updatedSettings = { ...locationSettings, radius: parseInt(e.target.value) };
    setLocationSettings(updatedSettings);
    onLocationChange?.(updatedSettings);
  };

  const addLocation = (location) => {
    if (location && !locationSettings.locations.includes(location)) {
      const updatedSettings = {
        ...locationSettings,
        locations: [...locationSettings.locations, location]
      };
      setLocationSettings(updatedSettings);
      onLocationChange?.(updatedSettings);
      setNewLocation('');
    }
  };

  const removeLocation = (locationToRemove) => {
    const updatedSettings = {
      ...locationSettings,
      locations: locationSettings.locations.filter(loc => loc !== locationToRemove)
    };
    setLocationSettings(updatedSettings);
    onLocationChange?.(updatedSettings);
  };

  const handleAddNewLocation = () => {
    addLocation(newLocation);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{getText('locationPreferences')}</h3>
            <p className="text-sm text-text-secondary">{getText('configureLocation')}</p>
          </div>
        </div>
        
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {isExpanded && (
        <div className="border-t border-border p-4 space-y-6">
          {/* Work Arrangement */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">{getText('workArrangement')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {searchTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSearchTypeChange(type.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    locationSettings.searchType === type.id
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={type.icon} size={16} />
                    <span className="font-medium text-sm">{type.name[currentLanguage]}</span>
                  </div>
                  <p className="text-xs opacity-80">{type.description[currentLanguage]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Specific Locations - Only show if not remote only */}
          {locationSettings.searchType !== 'remote' && (
            <div>
              <h4 className="font-medium text-text-primary mb-3">{getText('specificLocations')}</h4>
              
              {/* Current Locations */}
              <div className="flex flex-wrap gap-2 mb-3">
                {locationSettings.locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-primary-100 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <Icon name="MapPin" size={12} />
                    <span>{location}</span>
                    <button
                      onClick={() => removeLocation(location)}
                      className="hover:text-primary-700"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Location */}
              <div className="flex space-x-2 mb-4">
                <Input
                  type="text"
                  placeholder={getText('enterLocation')}
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNewLocation()}
                />
                <button
                  onClick={handleAddNewLocation}
                  disabled={!newLocation.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>

              {/* Popular Locations */}
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">{getText('popularLocations')}</p>
                <div className="flex flex-wrap gap-2">
                  {popularLocations.map((location) => (
                    <button
                      key={location}
                      onClick={() => addLocation(location)}
                      disabled={locationSettings.locations.includes(location)}
                      className="px-3 py-1 text-sm border border-border rounded-full hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Radius */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {getText('searchRadius')}: {locationSettings.radius} {getText('miles')}
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={locationSettings.radius}
                  onChange={handleRadiusChange}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>5 {getText('miles')}</span>
                  <span>100 {getText('miles')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Remote Work Info */}
          {locationSettings.searchType === 'remote' && (
            <div className="p-4 bg-success-50 rounded-lg border border-success-200">
              <div className="flex items-start space-x-3">
                <Icon name="Wifi" size={16} className="text-success mt-0.5" />
                <div>
                  <h5 className="font-medium text-success-600 mb-1">
                    {currentLanguage === 'en' ? 'Remote Work Focus' : 
                     currentLanguage === 'es'? 'Enfoque en Trabajo Remoto' : 'Focus Télétravail'}
                  </h5>
                  <p className="text-sm text-success-700">
                    {currentLanguage === 'en' ? 'You\'ll only see positions that allow 100% remote work. This significantly increases your job opportunities across different geographical areas.' :
                     currentLanguage === 'es'? 'Solo verás posiciones que permiten 100% trabajo remoto. Esto aumenta significativamente tus oportunidades de trabajo en diferentes áreas geográficas.': 'Vous ne verrez que les postes qui permettent 100% de télétravail. Cela augmente considérablement vos opportunités d\'emploi dans différentes zones géographiques.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPreferencesSection;