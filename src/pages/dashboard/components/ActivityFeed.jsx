import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activities, setActivities] = useState([]);

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
    const mockActivities = [
      {
        id: 1,
        type: 'application',
        company: 'TechCorp Solutions',
        position: 'Frontend Developer Intern',
        status: 'submitted',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        platform: 'LinkedIn'
      },
      {
        id: 2,
        type: 'response',
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        status: 'viewed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        platform: 'Indeed'
      },
      {
        id: 3,
        type: 'application',
        company: 'AI Innovations Inc',
        position: 'Generative AI Intern',
        status: 'submitted',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        platform: 'AngelList'
      },
      {
        id: 4,
        type: 'response',
        company: 'WebDev Agency',
        position: 'Junior Web Developer',
        status: 'interview',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        platform: 'Glassdoor'
      },
      {
        id: 5,
        type: 'application',
        company: 'Digital Solutions Ltd',
        position: 'React Developer',
        status: 'submitted',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        platform: 'LinkedIn'
      },
      {
        id: 6,
        type: 'response',
        company: 'Tech Startup Hub',
        position: 'Full Stack Intern',
        status: 'rejected',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        platform: 'Indeed'
      }
    ];
    setActivities(mockActivities);
  }, []);

  const getText = (key) => {
    const texts = {
      recentActivity: {
        en: 'Recent Activity',
        es: 'Actividad Reciente',
        fr: 'Activité Récente'
      },
      viewAll: {
        en: 'View All',
        es: 'Ver Todo',
        fr: 'Voir Tout'
      },
      submitted: {
        en: 'Submitted',
        es: 'Enviado',
        fr: 'Soumis'
      },
      viewed: {
        en: 'Viewed',
        es: 'Visto',
        fr: 'Vu'
      },
      interview: {
        en: 'Interview',
        es: 'Entrevista',
        fr: 'Entretien'
      },
      rejected: {
        en: 'Rejected',
        es: 'Rechazado',
        fr: 'Rejeté'
      },
      application: {
        en: 'Applied to',
        es: 'Aplicado a',
        fr: 'Candidature à'
      },
      response: {
        en: 'Response from',
        es: 'Respuesta de',
        fr: 'Réponse de'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: {
        color: 'bg-primary text-primary-foreground',
        icon: 'Send'
      },
      viewed: {
        color: 'bg-info text-info-foreground',
        icon: 'Eye'
      },
      interview: {
        color: 'bg-success text-success-foreground',
        icon: 'Calendar'
      },
      rejected: {
        color: 'bg-error text-error-foreground',
        icon: 'X'
      }
    };
    return configs[status] || configs.submitted;
  };

  const getActivityIcon = (type) => {
    return type === 'application' ? 'FileText' : 'MessageSquare';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) {
      return currentLanguage === 'en' ? 'Just now' : 
             currentLanguage === 'es'? 'Ahora mismo' : 'À l\'instant';
    } else if (minutes < 60) {
      return currentLanguage === 'en' ? `${minutes}m ago` : 
             currentLanguage === 'es' ? `hace ${minutes}m` : 
             `il y a ${minutes}m`;
    } else {
      return currentLanguage === 'en' ? `${hours}h ago` : 
             currentLanguage === 'es' ? `hace ${hours}h` : 
             `il y a ${hours}h`;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{getText('recentActivity')}</h3>
        <button className="text-sm text-primary hover:text-primary-700 font-medium">
          {getText('viewAll')}
        </button>
      </div>

      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities.map((activity) => {
          const statusConfig = getStatusConfig(activity.status);
          return (
            <div key={activity.id} className="p-4 lg:p-6 hover:bg-muted transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={18} 
                    className="text-primary" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-text-secondary mb-1">
                        {getText(activity.type)} <span className="font-medium text-text-primary">{activity.company}</span>
                      </p>
                      <h4 className="font-medium text-text-primary mb-2">{activity.position}</h4>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          <Icon name={statusConfig.icon} size={12} />
                          <span>{getText(activity.status)}</span>
                        </span>
                        <span className="text-xs text-text-muted">{activity.platform}</span>
                      </div>
                    </div>
                    <span className="text-xs text-text-muted flex-shrink-0 ml-4">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;