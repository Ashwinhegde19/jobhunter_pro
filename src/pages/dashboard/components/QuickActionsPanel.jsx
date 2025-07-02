import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

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
      quickActions: {
        en: 'Quick Actions',
        es: 'Acciones Rápidas',
        fr: 'Actions Rapides'
      },
      configureSearch: {
        en: 'Configure Search',
        es: 'Configurar Búsqueda',
        fr: 'Configurer la Recherche'
      },
      manageTemplates: {
        en: 'Manage Templates',
        es: 'Gestionar Plantillas',
        fr: 'Gérer les Modèles'
      },
      viewHistory: {
        en: 'View History',
        es: 'Ver Historial',
        fr: 'Voir l\'Historique'
      },
      updateProfile: {
        en: 'Update Profile',
        es: 'Actualizar Perfil',
        fr: 'Mettre à Jour le Profil'
      },
      viewAnalytics: {
        en: 'View Analytics',
        es: 'Ver Análisis',
        fr: 'Voir les Analyses'
      },
      runManualSearch: {
        en: 'Run Manual Search',
        es: 'Ejecutar Búsqueda Manual',
        fr: 'Lancer une Recherche Manuelle'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleManualSearch = async () => {
    setIsLoading(true);
    // Simulate manual search
    setTimeout(() => {
      setIsLoading(false);
      // Show success notification
      console.log('Manual search completed');
    }, 3000);
  };

  const quickActions = [
    {
      title: getText('configureSearch'),
      description: 'Set up job search parameters and filters',
      icon: 'Settings',
      color: 'primary',
      action: () => navigate('/job-search-configuration')
    },
    {
      title: getText('manageTemplates'),
      description: 'Edit resume and cover letter templates',
      icon: 'FileText',
      color: 'success',
      action: () => navigate('/application-templates')
    },
    {
      title: getText('viewHistory'),
      description: 'Track all submitted applications',
      icon: 'History',
      color: 'info',
      action: () => navigate('/application-history')
    },
    {
      title: getText('updateProfile'),
      description: 'Manage personal information',
      icon: 'User',
      color: 'warning',
      action: () => navigate('/profile-management')
    },
    {
      title: getText('viewAnalytics'),
      description: 'View performance metrics',
      icon: 'BarChart3',
      color: 'secondary',
      action: () => navigate('/analytics-dashboard')
    },
    {
      title: getText('runManualSearch'),
      description: 'Start immediate job search',
      icon: 'Search',
      color: 'primary',
      action: handleManualSearch,
      loading: isLoading
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary hover:bg-primary-100',
      success: 'bg-success-50 text-success hover:bg-success-100',
      info: 'bg-info-50 text-info hover:bg-info-100',
      warning: 'bg-warning-50 text-warning hover:bg-warning-100',
      secondary: 'bg-secondary-50 text-secondary hover:bg-secondary-100'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm">
      <div className="p-4 lg:p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{getText('quickActions')}</h3>
      </div>

      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              disabled={action.loading}
              className={`p-4 rounded-lg text-left transition-all duration-200 hover:scale-105 ${getColorClasses(action.color)} ${
                action.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {action.loading ? (
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon name={action.icon} size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1">{action.title}</h4>
                  <p className="text-sm opacity-80 line-clamp-2">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;