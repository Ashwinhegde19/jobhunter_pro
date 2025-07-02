import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchStatusCard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchStatus, setSearchStatus] = useState({
    isActive: true,
    nextRun: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    totalApplications: 47,
    todayApplications: 12,
    successRate: 68
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
      searchStatus: {
        en: 'Search Status',
        es: 'Estado de Búsqueda',
        fr: 'Statut de Recherche'
      },
      active: {
        en: 'Active',
        es: 'Activo',
        fr: 'Actif'
      },
      paused: {
        en: 'Paused',
        es: 'Pausado',
        fr: 'En pause'
      },
      nextRun: {
        en: 'Next Run',
        es: 'Próxima Ejecución',
        fr: 'Prochaine Exécution'
      },
      totalApplications: {
        en: 'Total Applications',
        es: 'Solicitudes Totales',
        fr: 'Candidatures Totales'
      },
      todayApplications: {
        en: 'Today',
        es: 'Hoy',
        fr: 'Aujourd\'hui'
      },
      successRate: {
        en: 'Success Rate',
        es: 'Tasa de Éxito',
        fr: 'Taux de Réussite'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const formatDateTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    };
    
    return date.toLocaleString(
      currentLanguage === 'en' ? 'en-US' : 
      currentLanguage === 'es' ? 'es-ES' : 'fr-FR',
      options
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <span>{getText('searchStatus')}</span>
        </h2>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
          searchStatus.isActive 
            ? 'bg-success-100 text-success-600' :'bg-warning-100 text-warning-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            searchStatus.isActive ? 'bg-success animate-pulse' : 'bg-warning'
          }`}></div>
          <span>{searchStatus.isActive ? getText('active') : getText('paused')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Run */}
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{getText('nextRun')}</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {formatDateTime(searchStatus.nextRun)}
          </p>
        </div>

        {/* Total Applications */}
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">{getText('totalApplications')}</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {searchStatus.totalApplications}
          </p>
        </div>

        {/* Today Applications */}
        <div className="bg-accent-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{getText('todayApplications')}</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {searchStatus.todayApplications}
          </p>
        </div>

        {/* Success Rate */}
        <div className="bg-success-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">{getText('successRate')}</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {searchStatus.successRate}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchStatusCard;