import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import StatusIndicatorCard from './components/StatusIndicatorCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import ApplicationChart from './components/ApplicationChart';

const Dashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

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
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getText = (key) => {
    const texts = {
      pageTitle: {
        en: 'Dashboard - JobHunter Pro',
        es: 'Panel de Control - JobHunter Pro',
        fr: 'Tableau de Bord - JobHunter Pro'
      },
      welcome: {
        en: 'Welcome back, John!',
        es: '¡Bienvenido de nuevo, John!',
        fr: 'Bon retour, John!'
      },
      subtitle: {
        en: 'Here\'s what\'s happening with your job search automation',
        es: 'Esto es lo que está pasando con tu automatización de búsqueda de empleo',
        fr: 'Voici ce qui se passe avec votre automatisation de recherche d\'emploi'
      },
      todayApplications: {
        en: 'Applications Today',
        es: 'Aplicaciones Hoy',
        fr: 'Candidatures Aujourd\'hui'
      },
      totalApplications: {
        en: 'Total Applications',
        es: 'Total de Aplicaciones',
        fr: 'Total des Candidatures'
      },
      responseRate: {
        en: 'Response Rate',
        es: 'Tasa de Respuesta',
        fr: 'Taux de Réponse'
      },
      activeSearches: {
        en: 'Active Searches',
        es: 'Búsquedas Activas',
        fr: 'Recherches Actives'
      },
      thisWeek: {
        en: 'This week',
        es: 'Esta semana',
        fr: 'Cette semaine'
      },
      thisMonth: {
        en: 'This month',
        es: 'Este mes',
        fr: 'Ce mois'
      },
      loading: {
        en: 'Loading dashboard...',
        es: 'Cargando panel...',
        fr: 'Chargement du tableau de bord...'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const metricsData = [
    {
      title: getText('todayApplications'),
      value: '12',
      subtitle: '+3 from yesterday',
      icon: 'Send',
      trend: 'up',
      trendValue: '+25%',
      color: 'primary'
    },
    {
      title: getText('totalApplications'),
      value: '247',
      subtitle: getText('thisMonth'),
      icon: 'FileText',
      trend: 'up',
      trendValue: '+18%',
      color: 'success'
    },
    {
      title: getText('responseRate'),
      value: '8.3%',
      subtitle: getText('thisWeek'),
      icon: 'TrendingUp',
      trend: 'up',
      trendValue: '+2.1%',
      color: 'warning'
    },
    {
      title: getText('activeSearches'),
      value: '3',
      subtitle: 'Currently running',
      icon: 'Search',
      trend: 'stable',
      trendValue: '0%',
      color: 'primary'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{getText('pageTitle')}</title>
        </Helmet>
        <Header />
        <Sidebar />
        
        <main className="lg:pl-64 pt-16 lg:pt-0">
          <div className="p-4 lg:p-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-secondary">{getText('loading')}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getText('pageTitle')}</title>
        <meta name="description" content="Monitor your automated job search activities and track application progress in real-time with JobHunter Pro dashboard." />
      </Helmet>

      <Header />
      <Sidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0 pb-20 lg:pb-8">
        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              {getText('welcome')}
            </h1>
            <p className="text-text-secondary">
              {getText('subtitle')}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                trend={metric.trend}
                trendValue={metric.trendValue}
                color={metric.color}
              />
            ))}
          </div>

          {/* Status and Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <StatusIndicatorCard />
            <div className="lg:hidden">
              <QuickActionsPanel />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-2 space-y-6">
              <ActivityFeed />
              <ApplicationChart />
            </div>

            {/* Right Column - Quick Actions (Desktop) */}
            <div className="hidden lg:block">
              <QuickActionsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;