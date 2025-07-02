import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StatusIndicator = () => {
  const [status, setStatus] = useState('active');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [jobsRunning, setJobsRunning] = useState(3);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate status changes
      const statuses = ['active', 'paused', 'error'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Bias towards active status for better UX
      if (Math.random() > 0.3) {
        setStatus('active');
        setJobsRunning(Math.floor(Math.random() * 5) + 1);
      } else {
        setStatus(randomStatus);
        if (randomStatus === 'paused') {
          setJobsRunning(0);
        }
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    const configs = {
      active: {
        icon: 'Play',
        text: {
          en: 'Active',
          es: 'Activo',
          fr: 'Actif'
        },
        description: {
          en: `${jobsRunning} jobs running`,
          es: `${jobsRunning} trabajos ejecutándose`,
          fr: `${jobsRunning} emplois en cours`
        },
        className: 'bg-success text-success-foreground',
        iconClassName: 'text-success-foreground',
        pulseClass: 'animate-pulse-subtle'
      },
      paused: {
        icon: 'Pause',
        text: {
          en: 'Paused',
          es: 'Pausado',
          fr: 'En pause'
        },
        description: {
          en: 'Automation paused',
          es: 'Automatización pausada',
          fr: 'Automatisation en pause'
        },
        className: 'bg-warning text-warning-foreground',
        iconClassName: 'text-warning-foreground',
        pulseClass: ''
      },
      error: {
        icon: 'AlertCircle',
        text: {
          en: 'Error',
          es: 'Error',
          fr: 'Erreur'
        },
        description: {
          en: 'Requires attention',
          es: 'Requiere atención',
          fr: 'Nécessite une attention'
        },
        className: 'bg-error text-error-foreground',
        iconClassName: 'text-error-foreground',
        pulseClass: 'animate-pulse-subtle'
      }
    };
    return configs[status];
  };

  const config = getStatusConfig();
  const formatTime = (date) => {
    return date.toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'es' ? 'es-ES' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusClick = () => {
    // Toggle between active and paused for demo purposes
    if (status === 'active') {
      setStatus('paused');
      setJobsRunning(0);
    } else if (status === 'paused') {
      setStatus('active');
      setJobsRunning(Math.floor(Math.random() * 5) + 1);
    }
    setLastUpdate(new Date());
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Mobile Status Indicator */}
      <div className="lg:hidden">
        <button
          onClick={handleStatusClick}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${config.className} ${config.pulseClass}`}
          title={`${config.text[currentLanguage]} - ${config.description[currentLanguage]}`}
        >
          <Icon 
            name={config.icon} 
            size={14} 
            className={config.iconClassName}
          />
          <span className="hidden sm:inline">{config.text[currentLanguage]}</span>
        </button>
      </div>

      {/* Desktop Status Indicator */}
      <div className="hidden lg:flex lg:items-center lg:space-x-3">
        <button
          onClick={handleStatusClick}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:opacity-90 ${config.className} ${config.pulseClass}`}
        >
          <Icon 
            name={config.icon} 
            size={16} 
            className={config.iconClassName}
          />
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span>{config.text[currentLanguage]}</span>
              {status === 'active' && (
                <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="text-xs opacity-90">
              {config.description[currentLanguage]}
            </div>
          </div>
        </button>

        {/* Last Update Time */}
        <div className="text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{formatTime(lastUpdate)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar for Active Status */}
      {status === 'active' && (
        <div className="hidden lg:block w-16 h-0.5 bg-success-100 rounded-full overflow-hidden">
          <div className="h-full bg-success progress-ambient animate-pulse-subtle"></div>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;