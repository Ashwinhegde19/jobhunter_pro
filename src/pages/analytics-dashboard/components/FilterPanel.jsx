import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onFiltersChange, loading = false }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30',
    jobType: 'all',
    company: '',
    status: 'all',
    platform: 'all'
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

  const getText = (key) => {
    const texts = {
      filters: {
        en: 'Filters',
        es: 'Filtros',
        fr: 'Filtres'
      },
      dateRange: {
        en: 'Date Range',
        es: 'Rango de Fechas',
        fr: 'Plage de Dates'
      },
      jobType: {
        en: 'Job Type',
        es: 'Tipo de Trabajo',
        fr: 'Type d\'Emploi'
      },
      company: {
        en: 'Company',
        es: 'Empresa',
        fr: 'Entreprise'
      },
      status: {
        en: 'Status',
        es: 'Estado',
        fr: 'Statut'
      },
      platform: {
        en: 'Platform',
        es: 'Plataforma',
        fr: 'Plateforme'
      },
      applyFilters: {
        en: 'Apply Filters',
        es: 'Aplicar Filtros',
        fr: 'Appliquer les Filtres'
      },
      resetFilters: {
        en: 'Reset',
        es: 'Restablecer',
        fr: 'Réinitialiser'
      },
      last7Days: {
        en: 'Last 7 days',
        es: 'Últimos 7 días',
        fr: '7 derniers jours'
      },
      last30Days: {
        en: 'Last 30 days',
        es: 'Últimos 30 días',
        fr: '30 derniers jours'
      },
      last90Days: {
        en: 'Last 90 days',
        es: 'Últimos 90 días',
        fr: '90 derniers jours'
      },
      allTime: {
        en: 'All time',
        es: 'Todo el tiempo',
        fr: 'Tout le temps'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
    setIsExpanded(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: '30',
      jobType: 'all',
      company: '',
      status: 'all',
      platform: 'all'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const dateRangeOptions = [
    { value: '7', label: getText('last7Days') },
    { value: '30', label: getText('last30Days') },
    { value: '90', label: getText('last90Days') },
    { value: 'all', label: getText('allTime') }
  ];

  const jobTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'web-developer', label: 'Web Developer' },
    { value: 'full-stack', label: 'Full Stack Developer' },
    { value: 'ai-intern', label: 'AI Intern' },
    { value: 'web-intern', label: 'Web Developer Intern' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'applied', label: 'Applied' },
    { value: 'viewed', label: 'Viewed' },
    { value: 'interview', label: 'Interview' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'offer', label: 'Offer' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'glassdoor', label: 'Glassdoor' },
    { value: 'monster', label: 'Monster' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{getText('filters')}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{getText('filters')}</h3>
      </div>

      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('dateRange')}</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('jobType')}</label>
          <select
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          >
            {jobTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('company')}</label>
          <Input
            type="text"
            placeholder="Enter company name..."
            value={filters.company}
            onChange={(e) => handleFilterChange('company', e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('status')}</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('platform')}</label>
          <select
            value={filters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          >
            {platformOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Button
            variant="primary"
            onClick={handleApplyFilters}
            loading={loading}
            fullWidth
            iconName="Filter"
            iconPosition="left"
          >
            {getText('applyFilters')}
          </Button>
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            disabled={loading}
            iconName="RotateCcw"
            iconPosition="left"
          >
            {getText('resetFilters')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;