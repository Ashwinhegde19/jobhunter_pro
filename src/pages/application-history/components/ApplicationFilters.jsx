import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ApplicationFilters = ({ onFiltersChange, currentLanguage }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    category: 'all',
    company: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const getText = (key) => {
    const texts = {
      searchPlaceholder: {
        en: 'Search by position or company...',
        es: 'Buscar por puesto o empresa...',
        fr: 'Rechercher par poste ou entreprise...'
      },
      allStatuses: {
        en: 'All Statuses',
        es: 'Todos los Estados',
        fr: 'Tous les Statuts'
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
      offer: {
        en: 'Offer',
        es: 'Oferta',
        fr: 'Offre'
      },
      allDates: {
        en: 'All Time',
        es: 'Todo el Tiempo',
        fr: 'Toute la Période'
      },
      last7Days: {
        en: 'Last 7 Days',
        es: 'Últimos 7 Días',
        fr: '7 Derniers Jours'
      },
      last30Days: {
        en: 'Last 30 Days',
        es: 'Últimos 30 Días',
        fr: '30 Derniers Jours'
      },
      last90Days: {
        en: 'Last 90 Days',
        es: 'Últimos 90 Días',
        fr: '90 Derniers Jours'
      },
      allCategories: {
        en: 'All Categories',
        es: 'Todas las Categorías',
        fr: 'Toutes les Catégories'
      },
      webDeveloper: {
        en: 'Web Developer',
        es: 'Desarrollador Web',
        fr: 'Développeur Web'
      },
      fullStack: {
        en: 'Full Stack',
        es: 'Full Stack',
        fr: 'Full Stack'
      },
      aiJobs: {
        en: 'AI/ML Jobs',
        es: 'Trabajos de IA/ML',
        fr: 'Emplois IA/ML'
      },
      internships: {
        en: 'Internships',
        es: 'Prácticas',
        fr: 'Stages'
      },
      clearFilters: {
        en: 'Clear Filters',
        es: 'Limpiar Filtros',
        fr: 'Effacer les Filtres'
      },
      moreFilters: {
        en: 'More Filters',
        es: 'Más Filtros',
        fr: 'Plus de Filtres'
      },
      lessFilters: {
        en: 'Less Filters',
        es: 'Menos Filtros',
        fr: 'Moins de Filtres'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      dateRange: 'all',
      category: 'all',
      company: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 'all');

  return (
    <div className="bg-surface border-b border-border p-4 lg:p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder={getText('searchPlaceholder')}
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">{getText('allStatuses')}</option>
          <option value="submitted">{getText('submitted')}</option>
          <option value="viewed">{getText('viewed')}</option>
          <option value="interview">{getText('interview')}</option>
          <option value="rejected">{getText('rejected')}</option>
          <option value="offer">{getText('offer')}</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">{getText('allDates')}</option>
          <option value="7">{getText('last7Days')}</option>
          <option value="30">{getText('last30Days')}</option>
          <option value="90">{getText('last90Days')}</option>
        </select>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 px-3 py-2 border border-border rounded-md text-sm bg-surface text-text-primary hover:bg-muted transition-colors"
        >
          <Icon name="Filter" size={16} />
          <span>{isExpanded ? getText('lessFilters') : getText('moreFilters')}</span>
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={clearAllFilters}
          >
            {getText('clearFilters')}
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {currentLanguage === 'en' ? 'Job Category' : 
               currentLanguage === 'es'? 'Categoría de Trabajo' : 'Catégorie d\'Emploi'}
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">{getText('allCategories')}</option>
              <option value="web-developer">{getText('webDeveloper')}</option>
              <option value="full-stack">{getText('fullStack')}</option>
              <option value="ai-ml">{getText('aiJobs')}</option>
              <option value="internship">{getText('internships')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {currentLanguage === 'en' ? 'Company Name' : 
               currentLanguage === 'es'? 'Nombre de la Empresa' : 'Nom de l\'Entreprise'}
            </label>
            <Input
              type="text"
              placeholder={currentLanguage === 'en' ? 'Filter by company...' : 
                          currentLanguage === 'es'? 'Filtrar por empresa...' : 'Filtrer par entreprise...'}
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationFilters;