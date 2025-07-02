import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = ({ data, loading = false }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [expandedInsight, setExpandedInsight] = useState(null);

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
      insights: {
        en: 'Actionable Insights',
        es: 'Perspectivas Accionables',
        fr: 'Informations Exploitables'
      },
      recommendations: {
        en: 'Recommendations',
        es: 'Recomendaciones',
        fr: 'Recommandations'
      },
      viewDetails: {
        en: 'View Details',
        es: 'Ver Detalles',
        fr: 'Voir les Détails'
      },
      implement: {
        en: 'Implement',
        es: 'Implementar',
        fr: 'Implémenter'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const mockInsights = [
    {
      id: 1,
      type: 'optimization',
      priority: 'high',
      title: {
        en: 'Optimal Application Time',
        es: 'Tiempo Óptimo de Solicitud',
        fr: 'Temps Optimal de Candidature'
      },
      description: {
        en: 'Applications submitted between 9-11 AM on Tuesdays show 34% higher response rates',
        es: 'Las solicitudes enviadas entre 9-11 AM los martes muestran tasas de respuesta 34% más altas',
        fr: 'Les candidatures soumises entre 9h-11h le mardi montrent des taux de réponse 34% plus élevés'
      },
      impact: {
        en: '+34% response rate',
        es: '+34% tasa de respuesta',
        fr: '+34% taux de réponse'
      },
      action: {
        en: 'Schedule applications for Tuesday mornings',
        es: 'Programar solicitudes para martes por la mañana',
        fr: 'Programmer les candidatures pour mardi matin'
      },
      icon: 'Clock',
      color: 'success'
    },
    {
      id: 2,
      type: 'template',
      priority: 'medium',
      title: {
        en: 'Cover Letter Performance',
        es: 'Rendimiento de Carta de Presentación',
        fr: 'Performance de la Lettre de Motivation'
      },
      description: {
        en: 'Template B generates 28% more interview requests than Template A for AI positions',
        es: 'La plantilla B genera 28% más solicitudes de entrevista que la plantilla A para posiciones de IA',
        fr: 'Le modèle B génère 28% plus de demandes d\'entretien que le modèle A pour les postes IA'
      },
      impact: {
        en: '+28% interview rate',
        es: '+28% tasa de entrevistas',
        fr: '+28% taux d\'entretien'
      },
      action: {
        en: 'Switch to Template B for AI roles',
        es: 'Cambiar a la plantilla B para roles de IA',
        fr: 'Passer au modèle B pour les rôles IA'
      },
      icon: 'FileText',
      color: 'primary'
    },
    {
      id: 3,
      type: 'targeting',
      priority: 'high',
      title: {
        en: 'Company Size Sweet Spot',
        es: 'Punto Óptimo del Tamaño de Empresa',
        fr: 'Taille d\'Entreprise Optimale'
      },
      description: {
        en: 'Mid-size companies (50-200 employees) respond 45% more frequently than large corporations',
        es: 'Las empresas medianas (50-200 empleados) responden 45% más frecuentemente que las grandes corporaciones',
        fr: 'Les entreprises moyennes (50-200 employés) répondent 45% plus fréquemment que les grandes entreprises'
      },
      impact: {
        en: '+45% response rate',
        es: '+45% tasa de respuesta',
        fr: '+45% taux de réponse'
      },
      action: {
        en: 'Focus on mid-size companies',
        es: 'Enfocarse en empresas medianas',
        fr: 'Se concentrer sur les entreprises moyennes'
      },
      icon: 'Building',
      color: 'warning'
    },
    {
      id: 4,
      type: 'skills',
      priority: 'medium',
      title: {
        en: 'Skill Gap Analysis',
        es: 'Análisis de Brecha de Habilidades',
        fr: 'Analyse des Lacunes de Compétences'
      },
      description: {
        en: 'Adding "React Native" to your profile could increase matches by 23% based on current market trends',
        es: 'Agregar "React Native" a tu perfil podría aumentar las coincidencias en 23% según las tendencias actuales del mercado',
        fr: 'Ajouter "React Native" à votre profil pourrait augmenter les correspondances de 23% selon les tendances actuelles du marché'
      },
      impact: {
        en: '+23% job matches',
        es: '+23% coincidencias de trabajo',
        fr: '+23% correspondances d\'emploi'
      },
      action: {
        en: 'Update profile with React Native',
        es: 'Actualizar perfil con React Native',
        fr: 'Mettre à jour le profil avec React Native'
      },
      icon: 'TrendingUp',
      color: 'info'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-primary';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error-100 text-error',
      medium: 'bg-warning-100 text-warning',
      low: 'bg-success-100 text-success'
    };
    
    const labels = {
      high: { en: 'High', es: 'Alto', fr: 'Élevé' },
      medium: { en: 'Medium', es: 'Medio', fr: 'Moyen' },
      low: { en: 'Low', es: 'Bajo', fr: 'Faible' }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {labels[priority][currentLanguage]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="w-48 h-6 bg-muted rounded animate-pulse mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="border-l-4 border-l-muted pl-4 py-4 animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="w-32 h-5 bg-muted rounded"></div>
                <div className="w-16 h-6 bg-muted rounded-full"></div>
              </div>
              <div className="w-full h-4 bg-muted rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{getText('insights')}</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} className="text-warning" />
            <span className="text-sm text-text-secondary">{mockInsights.length} {getText('recommendations')}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {mockInsights.map((insight) => (
          <div
            key={insight.id}
            className={`border-l-4 ${getPriorityColor(insight.priority)} pl-4 py-4 bg-muted bg-opacity-30 rounded-r-lg`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${insight.color}-100`}>
                  <Icon name={insight.icon} size={16} className={`text-${insight.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{insight.title[currentLanguage]}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {getPriorityBadge(insight.priority)}
                    <span className="text-sm font-medium text-success">{insight.impact[currentLanguage]}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <Icon 
                  name={expandedInsight === insight.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </button>
            </div>

            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              {insight.description[currentLanguage]}
            </p>

            {expandedInsight === insight.id && (
              <div className="mt-4 p-4 bg-surface rounded-lg border border-border animate-fade-in">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="font-medium text-text-primary">Recommended Action:</span>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  {insight.action[currentLanguage]}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => console.log(`Implementing insight ${insight.id}`)}
                >
                  {getText('implement')}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border bg-muted bg-opacity-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              Insights updated daily based on your application performance
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;