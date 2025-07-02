import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const AdvancedFiltersSection = ({ onFiltersChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    keywords: ['React', 'JavaScript', 'Node.js'],
    excludeKeywords: ['Senior', 'Lead', 'Manager'],
    companyBlacklist: ['Company A', 'Company B'],
    companyWhitelist: ['Google', 'Microsoft', 'Apple'],
    platforms: ['linkedin', 'indeed', 'glassdoor'],
    companySize: ['startup', 'medium', 'large'],
    jobType: ['full-time', 'contract'],
    benefits: ['health-insurance', 'remote-work', 'flexible-hours']
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludeKeyword, setNewExcludeKeyword] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [activeTab, setActiveTab] = useState('keywords');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin' },
    { id: 'indeed', name: 'Indeed', icon: 'Search' },
    { id: 'glassdoor', name: 'Glassdoor', icon: 'Eye' },
    { id: 'monster', name: 'Monster', icon: 'Globe' },
    { id: 'ziprecruiter', name: 'ZipRecruiter', icon: 'Zap' }
  ];

  const companySizes = [
    {
      id: 'startup',
      name: {
        en: 'Startup (1-50)',
        es: 'Startup (1-50)',
        fr: 'Startup (1-50)'
      }
    },
    {
      id: 'medium',
      name: {
        en: 'Medium (51-500)',
        es: 'Mediana (51-500)',
        fr: 'Moyenne (51-500)'
      }
    },
    {
      id: 'large',
      name: {
        en: 'Large (500+)',
        es: 'Grande (500+)',
        fr: 'Grande (500+)'
      }
    }
  ];

  const jobTypes = [
    {
      id: 'full-time',
      name: {
        en: 'Full-time',
        es: 'Tiempo Completo',
        fr: 'Temps Plein'
      }
    },
    {
      id: 'part-time',
      name: {
        en: 'Part-time',
        es: 'Tiempo Parcial',
        fr: 'Temps Partiel'
      }
    },
    {
      id: 'contract',
      name: {
        en: 'Contract',
        es: 'Contrato',
        fr: 'Contrat'
      }
    },
    {
      id: 'internship',
      name: {
        en: 'Internship',
        es: 'Pasantía',
        fr: 'Stage'
      }
    }
  ];

  const benefits = [
    {
      id: 'health-insurance',
      name: {
        en: 'Health Insurance',
        es: 'Seguro de Salud',
        fr: 'Assurance Santé'
      }
    },
    {
      id: 'remote-work',
      name: {
        en: 'Remote Work',
        es: 'Trabajo Remoto',
        fr: 'Télétravail'
      }
    },
    {
      id: 'flexible-hours',
      name: {
        en: 'Flexible Hours',
        es: 'Horarios Flexibles',
        fr: 'Horaires Flexibles'
      }
    },
    {
      id: 'paid-vacation',
      name: {
        en: 'Paid Vacation',
        es: 'Vacaciones Pagadas',
        fr: 'Congés Payés'
      }
    }
  ];

  const tabs = [
    {
      id: 'keywords',
      name: {
        en: 'Keywords',
        es: 'Palabras Clave',
        fr: 'Mots-clés'
      },
      icon: 'Hash'
    },
    {
      id: 'companies',
      name: {
        en: 'Companies',
        es: 'Empresas',
        fr: 'Entreprises'
      },
      icon: 'Building'
    },
    {
      id: 'platforms',
      name: {
        en: 'Platforms',
        es: 'Plataformas',
        fr: 'Plateformes'
      },
      icon: 'Globe'
    },
    {
      id: 'preferences',
      name: {
        en: 'Preferences',
        es: 'Preferencias',
        fr: 'Préférences'
      },
      icon: 'Settings'
    }
  ];

  const getText = (key) => {
    const texts = {
      advancedFilters: {
        en: 'Advanced Filters',
        es: 'Filtros Avanzados',
        fr: 'Filtres Avancés'
      },
      finetuneSearch: {
        en: 'Fine-tune your search with advanced filtering options',
        es: 'Ajusta tu búsqueda con opciones de filtrado avanzadas',
        fr: 'Affinez votre recherche avec des options de filtrage avancées'
      },
      includeKeywords: {
        en: 'Include Keywords',
        es: 'Incluir Palabras Clave',
        fr: 'Inclure Mots-clés'
      },
      excludeKeywords: {
        en: 'Exclude Keywords',
        es: 'Excluir Palabras Clave',
        fr: 'Exclure Mots-clés'
      },
      companyBlacklist: {
        en: 'Company Blacklist',
        es: 'Lista Negra de Empresas',
        fr: 'Liste Noire d\'Entreprises'
      },
      companyWhitelist: {
        en: 'Company Whitelist',
        es: 'Lista Blanca de Empresas',
        fr: 'Liste Blanche d\'Entreprises'
      },
      jobPlatforms: {
        en: 'Job Platforms',
        es: 'Plataformas de Trabajo',
        fr: 'Plateformes d\'Emploi'
      },
      companySize: {
        en: 'Company Size',
        es: 'Tamaño de Empresa',
        fr: 'Taille d\'Entreprise'
      },
      jobType: {
        en: 'Job Type',
        es: 'Tipo de Trabajo',
        fr: 'Type d\'Emploi'
      },
      benefits: {
        en: 'Benefits',
        es: 'Beneficios',
        fr: 'Avantages'
      },
      addKeyword: {
        en: 'Add keyword',
        es: 'Agregar palabra clave',
        fr: 'Ajouter mot-clé'
      },
      addCompany: {
        en: 'Add company',
        es: 'Agregar empresa',
        fr: 'Ajouter entreprise'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const addItem = (listType, item) => {
    if (item && !filters[listType].includes(item)) {
      const updatedFilters = {
        ...filters,
        [listType]: [...filters[listType], item]
      };
      setFilters(updatedFilters);
      onFiltersChange?.(updatedFilters);
    }
  };

  const removeItem = (listType, item) => {
    const updatedFilters = {
      ...filters,
      [listType]: filters[listType].filter(i => i !== item)
    };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const toggleItem = (listType, item) => {
    const updatedFilters = {
      ...filters,
      [listType]: filters[listType].includes(item)
        ? filters[listType].filter(i => i !== item)
        : [...filters[listType], item]
    };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const renderKeywordsTab = () => (
    <div className="space-y-6">
      {/* Include Keywords */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('includeKeywords')}</h5>
        <div className="flex flex-wrap gap-2 mb-3">
          {filters.keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-success-100 text-success-600 px-3 py-1 rounded-full text-sm"
            >
              <span>{keyword}</span>
              <button
                onClick={() => removeItem('keywords', keyword)}
                className="hover:text-success-700"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder={getText('addKeyword')}
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem('keywords', newKeyword);
                setNewKeyword('');
              }
            }}
          />
          <button
            onClick={() => {
              addItem('keywords', newKeyword);
              setNewKeyword('');
            }}
            disabled={!newKeyword.trim()}
            className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>

      {/* Exclude Keywords */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('excludeKeywords')}</h5>
        <div className="flex flex-wrap gap-2 mb-3">
          {filters.excludeKeywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-error-100 text-error-600 px-3 py-1 rounded-full text-sm"
            >
              <span>{keyword}</span>
              <button
                onClick={() => removeItem('excludeKeywords', keyword)}
                className="hover:text-error-700"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder={getText('addKeyword')}
            value={newExcludeKeyword}
            onChange={(e) => setNewExcludeKeyword(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem('excludeKeywords', newExcludeKeyword);
                setNewExcludeKeyword('');
              }
            }}
          />
          <button
            onClick={() => {
              addItem('excludeKeywords', newExcludeKeyword);
              setNewExcludeKeyword('');
            }}
            disabled={!newExcludeKeyword.trim()}
            className="px-4 py-2 bg-error text-error-foreground rounded-lg hover:bg-error-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompaniesTab = () => (
    <div className="space-y-6">
      {/* Company Whitelist */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('companyWhitelist')}</h5>
        <div className="flex flex-wrap gap-2 mb-3">
          {filters.companyWhitelist.map((company, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm"
            >
              <span>{company}</span>
              <button
                onClick={() => removeItem('companyWhitelist', company)}
                className="hover:text-primary-700"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder={getText('addCompany')}
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem('companyWhitelist', newCompany);
                setNewCompany('');
              }
            }}
          />
          <button
            onClick={() => {
              addItem('companyWhitelist', newCompany);
              setNewCompany('');
            }}
            disabled={!newCompany.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>

      {/* Company Blacklist */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('companyBlacklist')}</h5>
        <div className="flex flex-wrap gap-2 mb-3">
          {filters.companyBlacklist.map((company, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-warning-100 text-warning-600 px-3 py-1 rounded-full text-sm"
            >
              <span>{company}</span>
              <button
                onClick={() => removeItem('companyBlacklist', company)}
                className="hover:text-warning-700"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder={getText('addCompany')}
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem('companyBlacklist', newCompany);
                setNewCompany('');
              }
            }}
          />
          <button
            onClick={() => {
              addItem('companyBlacklist', newCompany);
              setNewCompany('');
            }}
            disabled={!newCompany.trim()}
            className="px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:bg-warning-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlatformsTab = () => (
    <div>
      <h5 className="font-medium text-text-primary mb-3">{getText('jobPlatforms')}</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => toggleItem('platforms', platform.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              filters.platforms.includes(platform.id)
                ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={platform.icon} size={20} />
              <span className="font-medium">{platform.name}</span>
              {filters.platforms.includes(platform.id) && (
                <Icon name="Check" size={16} className="ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Company Size */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('companySize')}</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {companySizes.map((size) => (
            <button
              key={size.id}
              onClick={() => toggleItem('companySize', size.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                filters.companySize.includes(size.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
              }`}
            >
              <span className="font-medium text-sm">{size.name[currentLanguage]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('jobType')}</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {jobTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleItem('jobType', type.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                filters.jobType.includes(type.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
              }`}
            >
              <span className="font-medium text-sm">{type.name[currentLanguage]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h5 className="font-medium text-text-primary mb-3">{getText('benefits')}</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((benefit) => (
            <button
              key={benefit.id}
              onClick={() => toggleItem('benefits', benefit.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                filters.benefits.includes(benefit.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{benefit.name[currentLanguage]}</span>
                {filters.benefits.includes(benefit.id) && (
                  <Icon name="Check" size={16} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{getText('advancedFilters')}</h3>
            <p className="text-sm text-text-secondary">{getText('finetuneSearch')}</p>
          </div>
        </div>
        
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {isExpanded && (
        <div className="border-t border-border">
          {/* Tab Navigation */}
          <div className="flex border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.name[currentLanguage]}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'keywords' && renderKeywordsTab()}
            {activeTab === 'companies' && renderCompaniesTab()}
            {activeTab === 'platforms' && renderPlatformsTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFiltersSection;