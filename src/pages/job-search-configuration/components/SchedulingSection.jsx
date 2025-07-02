import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SchedulingSection = ({ onScheduleChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(true);
  const [scheduleSettings, setScheduleSettings] = useState({
    interval: 'daily', // hourly, every6hours, daily, custom
    customHours: 24,
    startTime: '09:00',
    endTime: '17:00',
    weekdaysOnly: true,
    maxApplicationsPerDay: 10,
    respectRateLimits: true
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

  const scheduleIntervals = [
    {
      id: 'hourly',
      name: {
        en: 'Every Hour',
        es: 'Cada Hora',
        fr: 'Chaque Heure'
      },
      description: {
        en: 'Continuous job searching throughout the day',
        es: 'Búsqueda continua de trabajo durante el día',
        fr: 'Recherche d\'emploi continue tout au long de la journée'
      },
      icon: 'Clock',
      recommended: false,
      warning: true
    },
    {
      id: 'every6hours',
      name: {
        en: 'Every 6 Hours',
        es: 'Cada 6 Horas',
        fr: 'Toutes les 6 Heures'
      },
      description: {
        en: 'Balanced approach with 4 searches per day',
        es: 'Enfoque equilibrado con 4 búsquedas por día',
        fr: 'Approche équilibrée avec 4 recherches par jour'
      },
      icon: 'RotateCcw',
      recommended: true,
      warning: false
    },
    {
      id: 'daily',
      name: {
        en: 'Daily',
        es: 'Diario',
        fr: 'Quotidien'
      },
      description: {
        en: 'Once per day at your preferred time',
        es: 'Una vez por día a tu hora preferida',
        fr: 'Une fois par jour à votre heure préférée'
      },
      icon: 'Calendar',
      recommended: true,
      warning: false
    },
    {
      id: 'custom',
      name: {
        en: 'Custom Interval',
        es: 'Intervalo Personalizado',
        fr: 'Intervalle Personnalisé'
      },
      description: {
        en: 'Set your own custom timing',
        es: 'Establece tu propio horario personalizado',
        fr: 'Définissez votre propre horaire personnalisé'
      },
      icon: 'Settings',
      recommended: false,
      warning: false
    }
  ];

  const getText = (key) => {
    const texts = {
      scheduling: {
        en: 'Scheduling',
        es: 'Programación',
        fr: 'Planification'
      },
      configureAutomation: {
        en: 'Configure when and how often to run automated searches',
        es: 'Configura cuándo y con qué frecuencia ejecutar búsquedas automatizadas',
        fr: 'Configurez quand et à quelle fréquence exécuter les recherches automatisées'
      },
      searchInterval: {
        en: 'Search Interval',
        es: 'Intervalo de Búsqueda',
        fr: 'Intervalle de Recherche'
      },
      recommended: {
        en: 'Recommended',
        es: 'Recomendado',
        fr: 'Recommandé'
      },
      highVolume: {
        en: 'High Volume',
        es: 'Alto Volumen',
        fr: 'Volume Élevé'
      },
      customInterval: {
        en: 'Custom Interval (hours)',
        es: 'Intervalo Personalizado (horas)',
        fr: 'Intervalle Personnalisé (heures)'
      },
      activeHours: {
        en: 'Active Hours',
        es: 'Horas Activas',
        fr: 'Heures Actives'
      },
      startTime: {
        en: 'Start Time',
        es: 'Hora de Inicio',
        fr: 'Heure de Début'
      },
      endTime: {
        en: 'End Time',
        es: 'Hora de Fin',
        fr: 'Heure de Fin'
      },
      weekdaysOnly: {
        en: 'Weekdays only (Mon-Fri)',
        es: 'Solo días laborables (Lun-Vie)',
        fr: 'Jours ouvrables uniquement (Lun-Ven)'
      },
      applicationLimits: {
        en: 'Application Limits',
        es: 'Límites de Solicitud',
        fr: 'Limites de Candidature'
      },
      maxPerDay: {
        en: 'Maximum applications per day',
        es: 'Máximo de solicitudes por día',
        fr: 'Maximum de candidatures par jour'
      },
      respectLimits: {
        en: 'Respect platform rate limits',
        es: 'Respetar límites de tasa de plataforma',
        fr: 'Respecter les limites de taux de plateforme'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleIntervalChange = (interval) => {
    const updatedSettings = { ...scheduleSettings, interval };
    setScheduleSettings(updatedSettings);
    onScheduleChange?.(updatedSettings);
  };

  const handleCustomHoursChange = (e) => {
    const updatedSettings = { ...scheduleSettings, customHours: parseInt(e.target.value) };
    setScheduleSettings(updatedSettings);
    onScheduleChange?.(updatedSettings);
  };

  const handleTimeChange = (field, value) => {
    const updatedSettings = { ...scheduleSettings, [field]: value };
    setScheduleSettings(updatedSettings);
    onScheduleChange?.(updatedSettings);
  };

  const handleToggleChange = (field) => {
    const updatedSettings = { ...scheduleSettings, [field]: !scheduleSettings[field] };
    setScheduleSettings(updatedSettings);
    onScheduleChange?.(updatedSettings);
  };

  const handleMaxApplicationsChange = (e) => {
    const updatedSettings = { ...scheduleSettings, maxApplicationsPerDay: parseInt(e.target.value) };
    setScheduleSettings(updatedSettings);
    onScheduleChange?.(updatedSettings);
  };

  const getNextRunTime = () => {
    const now = new Date();
    let nextRun = new Date();

    switch (scheduleSettings.interval) {
      case 'hourly':
        nextRun.setHours(now.getHours() + 1, 0, 0, 0);
        break;
      case 'every6hours':
        const next6Hour = Math.ceil(now.getHours() / 6) * 6;
        nextRun.setHours(next6Hour, 0, 0, 0);
        if (next6Hour >= 24) {
          nextRun.setDate(nextRun.getDate() + 1);
          nextRun.setHours(0, 0, 0, 0);
        }
        break;
      case 'daily':
        const [startHour, startMinute] = scheduleSettings.startTime.split(':');
        nextRun.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
        if (nextRun <= now) {
          nextRun.setDate(nextRun.getDate() + 1);
        }
        break;
      case 'custom':
        nextRun.setHours(now.getHours() + scheduleSettings.customHours, 0, 0, 0);
        break;
      default:
        break;
    }

    return nextRun.toLocaleString(
      currentLanguage === 'en' ? 'en-US' : 
      currentLanguage === 'es' ? 'es-ES' : 'fr-FR',
      { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{getText('scheduling')}</h3>
            <p className="text-sm text-text-secondary">{getText('configureAutomation')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            Next: {getNextRunTime()}
          </span>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border p-4 space-y-6">
          {/* Search Interval */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">{getText('searchInterval')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scheduleIntervals.map((interval) => (
                <button
                  key={interval.id}
                  onClick={() => handleIntervalChange(interval.id)}
                  className={`p-4 rounded-lg border text-left transition-all relative ${
                    scheduleSettings.interval === interval.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-muted'
                  }`}
                >
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {interval.recommended && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                        {getText('recommended')}
                      </span>
                    )}
                    {interval.warning && (
                      <span className="bg-warning text-warning-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                        {getText('highVolume')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 mt-2">
                    <Icon 
                      name={interval.icon} 
                      size={20} 
                      className={scheduleSettings.interval === interval.id ? 'text-primary' : 'text-text-secondary'}
                    />
                    <div>
                      <h5 className="font-medium text-text-primary mb-1">
                        {interval.name[currentLanguage]}
                      </h5>
                      <p className="text-sm text-text-secondary">
                        {interval.description[currentLanguage]}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Interval Settings */}
          {scheduleSettings.interval === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getText('customInterval')}
              </label>
              <input
                type="range"
                min="1"
                max="168"
                step="1"
                value={scheduleSettings.customHours}
                onChange={handleCustomHoursChange}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>1 hour</span>
                <span className="font-medium">{scheduleSettings.customHours} hours</span>
                <span>1 week</span>
              </div>
            </div>
          )}

          {/* Active Hours */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">{getText('activeHours')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  {getText('startTime')}
                </label>
                <input
                  type="time"
                  value={scheduleSettings.startTime}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  {getText('endTime')}
                </label>
                <input
                  type="time"
                  value={scheduleSettings.endTime}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <button
                  onClick={() => handleToggleChange('weekdaysOnly')}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    scheduleSettings.weekdaysOnly
                      ? 'border-primary bg-primary' :'border-secondary-300'
                  }`}
                >
                  {scheduleSettings.weekdaysOnly && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </button>
                <span className="text-sm text-text-primary">{getText('weekdaysOnly')}</span>
              </label>
            </div>
          </div>

          {/* Application Limits */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">{getText('applicationLimits')}</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {getText('maxPerDay')}: {scheduleSettings.maxApplicationsPerDay}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={scheduleSettings.maxApplicationsPerDay}
                  onChange={handleMaxApplicationsChange}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              <label className="flex items-center space-x-3 cursor-pointer">
                <button
                  onClick={() => handleToggleChange('respectRateLimits')}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    scheduleSettings.respectRateLimits
                      ? 'border-primary bg-primary' :'border-secondary-300'
                  }`}
                >
                  {scheduleSettings.respectRateLimits && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </button>
                <span className="text-sm text-text-primary">{getText('respectLimits')}</span>
              </label>
            </div>
          </div>

          {/* Schedule Preview */}
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={16} className="text-primary mt-0.5" />
              <div>
                <h5 className="font-medium text-primary-600 mb-1">
                  {currentLanguage === 'en' ? 'Schedule Preview' : 
                   currentLanguage === 'es'? 'Vista Previa del Horario' : 'Aperçu du Calendrier'}
                </h5>
                <p className="text-sm text-primary-700">
                  {currentLanguage === 'en' ? 
                    `Next search will run at ${getNextRunTime()}. Maximum ${scheduleSettings.maxApplicationsPerDay} applications will be submitted per day${scheduleSettings.weekdaysOnly ? ' (weekdays only)' : ''}.` :
                   currentLanguage === 'es' ? 
                    `La próxima búsqueda se ejecutará a las ${getNextRunTime()}. Se enviarán máximo ${scheduleSettings.maxApplicationsPerDay} solicitudes por día${scheduleSettings.weekdaysOnly ? ' (solo días laborables)' : ''}.` :
                    `La prochaine recherche s'exécutera à ${getNextRunTime()}. Maximum ${scheduleSettings.maxApplicationsPerDay} candidatures seront soumises par jour${scheduleSettings.weekdaysOnly ? ' (jours ouvrables uniquement)' : ''}.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingSection;