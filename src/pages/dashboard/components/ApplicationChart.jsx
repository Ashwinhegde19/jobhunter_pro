import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const ApplicationChart = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('week');

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
      applicationTrends: {
        en: 'Application Trends',
        es: 'Tendencias de Aplicaciones',
        fr: 'Tendances des Candidatures'
      },
      thisWeek: {
        en: 'This Week',
        es: 'Esta Semana',
        fr: 'Cette Semaine'
      },
      thisMonth: {
        en: 'This Month',
        es: 'Este Mes',
        fr: 'Ce Mois'
      },
      applications: {
        en: 'Applications',
        es: 'Aplicaciones',
        fr: 'Candidatures'
      },
      responses: {
        en: 'Responses',
        es: 'Respuestas',
        fr: 'Réponses'
      },
      mon: { en: 'Mon', es: 'Lun', fr: 'Lun' },
      tue: { en: 'Tue', es: 'Mar', fr: 'Mar' },
      wed: { en: 'Wed', es: 'Mié', fr: 'Mer' },
      thu: { en: 'Thu', es: 'Jue', fr: 'Jeu' },
      fri: { en: 'Fri', es: 'Vie', fr: 'Ven' },
      sat: { en: 'Sat', es: 'Sáb', fr: 'Sam' },
      sun: { en: 'Sun', es: 'Dom', fr: 'Dim' }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const weeklyData = [
    { name: getText('mon'), applications: 12, responses: 3 },
    { name: getText('tue'), applications: 8, responses: 2 },
    { name: getText('wed'), applications: 15, responses: 4 },
    { name: getText('thu'), applications: 10, responses: 1 },
    { name: getText('fri'), applications: 18, responses: 5 },
    { name: getText('sat'), applications: 6, responses: 2 },
    { name: getText('sun'), applications: 4, responses: 1 }
  ];

  const monthlyData = [
    { name: 'Week 1', applications: 45, responses: 12 },
    { name: 'Week 2', applications: 52, responses: 15 },
    { name: 'Week 3', applications: 38, responses: 8 },
    { name: 'Week 4', applications: 41, responses: 11 }
  ];

  const data = timeRange === 'week' ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 lg:p-6 border-b border-border space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold text-text-primary">{getText('applicationTrends')}</h3>
        
        <div className="flex items-center space-x-2">
          {/* Time Range Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === 'week' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {getText('thisWeek')}
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === 'month' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              {getText('thisMonth')}
            </button>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-colors ${
                chartType === 'bar' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
              title="Bar Chart"
            >
              <Icon name="BarChart3" size={16} />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-colors ${
                chartType === 'line' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
              title="Line Chart"
            >
              <Icon name="TrendingUp" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <div className="h-64 w-full" aria-label="Application Trends Chart">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="applications" 
                  fill="var(--color-primary)" 
                  name={getText('applications')}
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="responses" 
                  fill="var(--color-success)" 
                  name={getText('responses')}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  name={getText('applications')}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  name={getText('responses')}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">{getText('applications')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-text-secondary">{getText('responses')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationChart;