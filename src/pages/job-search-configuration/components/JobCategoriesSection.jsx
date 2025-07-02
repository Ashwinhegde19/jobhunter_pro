import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const JobCategoriesSection = ({ onCategoriesChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedCategories, setSelectedCategories] = useState([
    'web-developer-intern',
    'full-stack-developer'
  ]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const jobCategories = [
    {
      id: 'web-developer-intern',
      name: {
        en: 'Web Developer Intern',
        es: 'Interno de Desarrollador Web',
        fr: 'Stagiaire Développeur Web'
      },
      description: {
        en: 'Entry-level internship positions in web development',
        es: 'Posiciones de pasantía de nivel inicial en desarrollo web',
        fr: 'Postes de stage de niveau débutant en développement web'
      },
      count: 234
    },
    {
      id: 'full-stack-intern',
      name: {
        en: 'Full Stack Intern',
        es: 'Interno Full Stack',
        fr: 'Stagiaire Full Stack'
      },
      description: {
        en: 'Internship roles covering both frontend and backend development',
        es: 'Roles de pasantía que cubren desarrollo frontend y backend',
        fr: 'Rôles de stage couvrant le développement frontend et backend'
      },
      count: 189
    },
    {
      id: 'full-stack-developer',
      name: {
        en: 'Full Stack Developer',
        es: 'Desarrollador Full Stack',
        fr: 'Développeur Full Stack'
      },
      description: {
        en: 'Junior to mid-level full stack development positions',
        es: 'Posiciones de desarrollo full stack de nivel junior a medio',
        fr: 'Postes de développement full stack de niveau junior à intermédiaire'
      },
      count: 456
    },
    {
      id: 'web-developer',
      name: {
        en: 'Web Developer',
        es: 'Desarrollador Web',
        fr: 'Développeur Web'
      },
      description: {
        en: 'Frontend and backend web development roles',
        es: 'Roles de desarrollo web frontend y backend',
        fr: 'Rôles de développement web frontend et backend'
      },
      count: 378
    },
    {
      id: 'ai-intern',
      name: {
        en: 'Generative AI Intern',
        es: 'Interno de IA Generativa',
        fr: 'Stagiaire IA Générative'
      },
      description: {
        en: 'Internship opportunities in AI and machine learning',
        es: 'Oportunidades de pasantía en IA y aprendizaje automático',
        fr: 'Opportunités de stage en IA et apprentissage automatique'
      },
      count: 67
    },
    {
      id: 'ai-developer',
      name: {
        en: 'Generative AI Developer',
        es: 'Desarrollador de IA Generativa',
        fr: 'Développeur IA Générative'
      },
      description: {
        en: 'AI development and research positions',
        es: 'Posiciones de desarrollo e investigación en IA',
        fr: 'Postes de développement et recherche en IA'
      },
      count: 123
    }
  ];

  const getText = (key) => {
    const texts = {
      jobCategories: {
        en: 'Job Categories',
        es: 'Categorías de Trabajo',
        fr: 'Catégories d\'Emploi'
      },
      selectCategories: {
        en: 'Select the job categories you want to target',
        es: 'Selecciona las categorías de trabajo que quieres enfocar',
        fr: 'Sélectionnez les catégories d\'emploi que vous souhaitez cibler'
      },
      availableJobs: {
        en: 'jobs available',
        es: 'trabajos disponibles',
        fr: 'emplois disponibles'
      },
      selectAll: {
        en: 'Select All',
        es: 'Seleccionar Todo',
        fr: 'Tout Sélectionner'
      },
      clearAll: {
        en: 'Clear All',
        es: 'Limpiar Todo',
        fr: 'Tout Effacer'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(updatedCategories);
    onCategoriesChange?.(updatedCategories);
  };

  const handleSelectAll = () => {
    const allIds = jobCategories.map(cat => cat.id);
    setSelectedCategories(allIds);
    onCategoriesChange?.(allIds);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    onCategoriesChange?.([]);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Briefcase" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{getText('jobCategories')}</h3>
            <p className="text-sm text-text-secondary">{getText('selectCategories')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {selectedCategories.length} selected
          </span>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <button
                onClick={handleSelectAll}
                className="text-sm text-primary hover:text-primary-700 font-medium"
              >
                {getText('selectAll')}
              </button>
              <span className="text-text-muted">|</span>
              <button
                onClick={handleClearAll}
                className="text-sm text-text-secondary hover:text-text-primary font-medium"
              >
                {getText('clearAll')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobCategories.map((category) => (
              <div
                key={category.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCategories.includes(category.id)
                    ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-muted'
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                    selectedCategories.includes(category.id)
                      ? 'border-primary bg-primary' :'border-secondary-300'
                  }`}>
                    {selectedCategories.includes(category.id) && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">
                      {category.name[currentLanguage]}
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      {category.description[currentLanguage]}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-text-muted">
                      <Icon name="Search" size={12} />
                      <span>{category.count} {getText('availableJobs')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCategoriesSection;