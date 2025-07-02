import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationSummaryHeader = ({ applications, currentLanguage }) => {
  const [summaryStats, setSummaryStats] = useState({
    total: 0,
    pending: 0,
    interviews: 0,
    responseRate: 0
  });

  useEffect(() => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'submitted' || app.status === 'viewed').length;
    const interviews = applications.filter(app => app.status === 'interview').length;
    const responded = applications.filter(app => app.status !== 'submitted').length;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

    setSummaryStats({ total, pending, interviews, responseRate });
  }, [applications]);

  const getText = (key) => {
    const texts = {
      totalApplications: {
        en: 'Total Applications',
        es: 'Solicitudes Totales',
        fr: 'Candidatures Totales'
      },
      pendingResponses: {
        en: 'Pending Responses',
        es: 'Respuestas Pendientes',
        fr: 'Réponses en Attente'
      },
      interviewsScheduled: {
        en: 'Interviews Scheduled',
        es: 'Entrevistas Programadas',
        fr: 'Entretiens Programmés'
      },
      responseRate: {
        en: 'Response Rate',
        es: 'Tasa de Respuesta',
        fr: 'Taux de Réponse'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const StatCard = ({ icon, label, value, color, progress }) => (
    <div className="bg-surface rounded-lg p-4 border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={20} className="text-white" />
        </div>
        <span className="text-2xl font-bold text-text-primary">{value}</span>
      </div>
      <p className="text-sm text-text-secondary mb-2">{label}</p>
      {progress !== undefined && (
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${color.replace('bg-', 'bg-')}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-background p-4 lg:p-6 border-b border-border">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          {currentLanguage === 'en' ? 'Application History' : 
           currentLanguage === 'es'? 'Historial de Solicitudes' : 'Historique des Candidatures'}
        </h1>
        <p className="text-text-secondary">
          {currentLanguage === 'en' ? 'Track and analyze your automated job applications' : 
           currentLanguage === 'es'? 'Rastrea y analiza tus solicitudes de trabajo automatizadas' : 'Suivez et analysez vos candidatures d\'emploi automatisées'}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="FileText"
          label={getText('totalApplications')}
          value={summaryStats.total}
          color="bg-primary"
        />
        <StatCard
          icon="Clock"
          label={getText('pendingResponses')}
          value={summaryStats.pending}
          color="bg-warning"
        />
        <StatCard
          icon="Calendar"
          label={getText('interviewsScheduled')}
          value={summaryStats.interviews}
          color="bg-success"
        />
        <StatCard
          icon="TrendingUp"
          label={getText('responseRate')}
          value={`${summaryStats.responseRate}%`}
          color="bg-accent"
          progress={summaryStats.responseRate}
        />
      </div>
    </div>
  );
};

export default ApplicationSummaryHeader;