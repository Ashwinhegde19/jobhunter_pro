import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const StatusIndicatorCard = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSearches, setActiveSearches] = useState(3);
  const [lastRun, setLastRun] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setLastRun(new Date());
        setActiveSearches(Math.floor(Math.random() * 5) + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getText = (key) => {
    const texts = {
      automationStatus: {
        en: 'Automation Status',
        es: 'Estado de Automatización',
        fr: 'Statut d\'Automatisation'
      },
      running: {
        en: 'Running',
        es: 'Ejecutándose',
        fr: 'En cours'
      },
      paused: {
        en: 'Paused',
        es: 'Pausado',
        fr: 'En pause'
      },
      activeSearches: {
        en: 'Active Searches',
        es: 'Búsquedas Activas',
        fr: 'Recherches Actives'
      },
      lastRun: {
        en: 'Last Run',
        es: 'Última Ejecución',
        fr: 'Dernière Exécution'
      },
      pause: {
        en: 'Pause',
        es: 'Pausar',
        fr: 'Suspendre'
      },
      resume: {
        en: 'Resume',
        es: 'Reanudar',
        fr: 'Reprendre'
      },
      configure: {
        en: 'Configure',
        es: 'Configurar',
        fr: 'Configurer'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setLastRun(new Date());
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">{getText('automationStatus')}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${
          isRunning 
            ? 'bg-success-100 text-success' :'bg-warning-100 text-warning'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isRunning ? 'bg-success animate-pulse' : 'bg-warning'
          }`}></div>
          <span>{isRunning ? getText('running') : getText('paused')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-text-primary mb-1">{activeSearches}</div>
          <div className="text-sm text-text-secondary">{getText('activeSearches')}</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-text-primary mb-1">{formatTime(lastRun)}</div>
          <div className="text-sm text-text-secondary">{getText('lastRun')}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={isRunning ? "warning" : "success"}
          iconName={isRunning ? "Pause" : "Play"}
          iconPosition="left"
          onClick={handleToggle}
          fullWidth
        >
          {isRunning ? getText('pause') : getText('resume')}
        </Button>
        <Button
          variant="outline"
          iconName="Settings"
          iconPosition="left"
          fullWidth
        >
          {getText('configure')}
        </Button>
      </div>
    </div>
  );
};

export default StatusIndicatorCard;