import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import KPICard from './components/KPICard';
import ChartContainer from './components/ChartContainer';
import FilterPanel from './components/FilterPanel';
import InsightsPanel from './components/InsightsPanel';
import ExportPanel from './components/ExportPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: '30',
    jobType: 'all',
    company: '',
    status: 'all',
    platform: 'all'
  });
  const [refreshing, setRefreshing] = useState(false);

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
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getText = (key) => {
    const texts = {
      title: {
        en: 'Analytics Dashboard',
        es: 'Panel de Análisis',
        fr: 'Tableau de Bord Analytique'
      },
      subtitle: {
        en: 'Comprehensive insights into your job search performance',
        es: 'Perspectivas integrales sobre el rendimiento de tu búsqueda de empleo',
        fr: 'Aperçus complets sur les performances de votre recherche d\'emploi'
      },
      refreshData: {
        en: 'Refresh Data',
        es: 'Actualizar Datos',
        fr: 'Actualiser les Données'
      },
      lastUpdated: {
        en: 'Last updated',
        es: 'Última actualización',
        fr: 'Dernière mise à jour'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Applications',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: 'Send',
      color: 'primary'
    },
    {
      title: 'Response Rate',
      value: '18.2%',
      change: '+3.4%',
      changeType: 'increase',
      icon: 'MessageCircle',
      color: 'success'
    },
    {
      title: 'Interview Rate',
      value: '7.8%',
      change: '+1.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'warning'
    },
    {
      title: 'Avg Response Time',
      value: '4.2 days',
      change: '-0.8 days',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'info'
    }
  ];

  // Mock chart data
  const applicationVolumeData = [
    { name: 'Jan 1', value: 12 },
    { name: 'Jan 8', value: 19 },
    { name: 'Jan 15', value: 15 },
    { name: 'Jan 22', value: 22 },
    { name: 'Jan 29', value: 18 },
    { name: 'Feb 5', value: 25 },
    { name: 'Feb 12', value: 21 }
  ];

  const successRateData = [
    { name: 'Web Developer', value: 23 },
    { name: 'Full Stack', value: 18 },
    { name: 'AI Intern', value: 31 },
    { name: 'Frontend', value: 15 },
    { name: 'Backend', value: 12 }
  ];

  const platformData = [
    { name: 'LinkedIn', value: 45 },
    { name: 'Indeed', value: 28 },
    { name: 'Glassdoor', value: 15 },
    { name: 'Monster', value: 12 }
  ];

  const responsePatternData = [
    { name: 'Mon', value: 8 },
    { name: 'Tue', value: 15 },
    { name: 'Wed', value: 12 },
    { name: 'Thu', value: 18 },
    { name: 'Fri', value: 10 },
    { name: 'Sat', value: 3 },
    { name: 'Sun', value: 2 }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleExport = (exportOptions) => {
    console.log('Exporting data with options:', exportOptions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">{getText('title')}</h1>
              <p className="text-text-secondary mt-1">{getText('subtitle')}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-text-secondary">
                {getText('lastUpdated')}: {new Date().toLocaleTimeString()}
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleRefresh}
                loading={refreshing}
              >
                {getText('refreshData')}
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
                loading={loading}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-3 space-y-6">
              {/* Application Volume Chart */}
              <ChartContainer
                title="Application Volume Over Time"
                data={applicationVolumeData}
                type="line"
                height={300}
                loading={loading}
                onExport={() => handleExport({ chart: 'volume' })}
              />

              {/* Success Rate and Platform Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer
                  title="Success Rate by Job Type"
                  data={successRateData}
                  type="bar"
                  height={250}
                  loading={loading}
                  onExport={() => handleExport({ chart: 'success' })}
                />
                
                <ChartContainer
                  title="Applications by Platform"
                  data={platformData}
                  type="pie"
                  height={250}
                  loading={loading}
                  onExport={() => handleExport({ chart: 'platform' })}
                />
              </div>

              {/* Response Pattern Chart */}
              <ChartContainer
                title="Response Pattern by Day of Week"
                data={responsePatternData}
                type="bar"
                height={250}
                loading={loading}
                onExport={() => handleExport({ chart: 'pattern' })}
              />

              {/* Insights Panel */}
              <InsightsPanel data={null} loading={loading} />
            </div>

            {/* Right Column - Filters and Export */}
            <div className="space-y-6">
              <FilterPanel onFiltersChange={handleFiltersChange} loading={loading} />
              <ExportPanel onExport={handleExport} loading={loading} />
            </div>
          </div>

          {/* Performance Comparison Section */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Performance Comparison</h3>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-success" />
                <span className="text-sm text-success font-medium">Above Average</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">Your Performance</h4>
                <p className="text-2xl font-bold text-primary">18.2%</p>
                <p className="text-sm text-text-secondary">Response Rate</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={24} className="text-secondary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">Platform Average</h4>
                <p className="text-2xl font-bold text-secondary">12.8%</p>
                <p className="text-sm text-text-secondary">Response Rate</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} className="text-success" />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">Top Performers</h4>
                <p className="text-2xl font-bold text-success">24.5%</p>
                <p className="text-sm text-text-secondary">Response Rate</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-success-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  You're performing 42% better than the platform average!
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default AnalyticsDashboard;