import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ExperienceFiltersSection = ({ onExperienceChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedExperience, setSelectedExperience] = useState(['entry-level', 'internship']);
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

  const experienceLevels = [
    {
      id: 'internship',
      name: {
        en: 'Internship',
        es: 'Pasantía',
        fr: 'Stage'
      },
      description: {
        en: 'Student internships and training programs',
        es: 'Pasantías estudiantiles y programas de entrenamiento',
        fr: 'Stages étudiants et programmes de formation'
      },
      icon: 'GraduationCap',
      color: 'text-accent'
    },
    {
      id: 'entry-level',
      name: {
        en: 'Entry Level (0-1 years)',
        es: 'Nivel Inicial (0-1 años)',
        fr: 'Niveau Débutant (0-1 ans)'
      },
      description: {
        en: 'Perfect for recent graduates and career changers',
        es: 'Perfecto para recién graduados y cambios de carrera',
        fr: 'Parfait pour les nouveaux diplômés et les reconversions'
      },
      icon: 'User',
      color: 'text-primary'
    },
    {
      id: 'junior',
      name: {
        en: 'Junior (1-2 years)',
        es: 'Junior (1-2 años)',
        fr: 'Junior (1-2 ans)'
      },
      description: {
        en: 'For those with some professional experience',
        es: 'Para aquellos con algo de experiencia profesional',
        fr: 'Pour ceux qui ont une certaine expérience professionnelle'
      },
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 'no-experience',
      name: {
        en: 'No Experience Required',
        es: 'Sin Experiencia Requerida',
        fr: 'Aucune Expérience Requise'
      },
      description: {
        en: 'Jobs that welcome complete beginners',
        es: 'Trabajos que dan la bienvenida a principiantes completos',
        fr: 'Emplois qui accueillent les débutants complets'
      },
      icon: 'Star',
      color: 'text-warning'
    }
  ];

  const getText = (key) => {
    const texts = {
      experienceLevel: {
        en: 'Experience Level',
        es: 'Nivel de Experiencia',
        fr: 'Niveau d\'Expérience'
      },
      selectExperience: {
        en: 'Choose experience levels that match your background',
        es: 'Elige niveles de experiencia que coincidan con tu perfil',
        fr: 'Choisissez les niveaux d\'expérience qui correspondent à votre profil'
      },
      recommended: {
        en: 'Recommended',
        es: 'Recomendado',
        fr: 'Recommandé'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleExperienceToggle = (experienceId) => {
    const updatedExperience = selectedExperience.includes(experienceId)
      ? selectedExperience.filter(id => id !== experienceId)
      : [...selectedExperience, experienceId];
    
    setSelectedExperience(updatedExperience);
    onExperienceChange?.(updatedExperience);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Award" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{getText('experienceLevel')}</h3>
            <p className="text-sm text-text-secondary">{getText('selectExperience')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {selectedExperience.length} selected
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experienceLevels.map((level) => (
              <div
                key={level.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all relative ${
                  selectedExperience.includes(level.id)
                    ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-muted'
                }`}
                onClick={() => handleExperienceToggle(level.id)}
              >
                {/* Recommended Badge */}
                {(level.id === 'entry-level' || level.id === 'internship') && (
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {getText('recommended')}
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                    selectedExperience.includes(level.id)
                      ? 'border-primary bg-primary' :'border-secondary-300'
                  }`}>
                    {selectedExperience.includes(level.id) && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={level.icon} size={16} className={level.color} />
                      <h4 className="font-medium text-text-primary">
                        {level.name[currentLanguage]}
                      </h4>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {level.description[currentLanguage]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Tips */}
          <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div>
                <h5 className="font-medium text-accent-600 mb-1">
                  {currentLanguage === 'en' ? 'Pro Tip' : 
                   currentLanguage === 'es'? 'Consejo Pro' : 'Conseil Pro'}
                </h5>
                <p className="text-sm text-accent-700">
                  {currentLanguage === 'en' ? 'Selecting multiple experience levels increases your job matches. Entry-level and internship positions are highly recommended for new graduates.' :
                   currentLanguage === 'es'? 'Seleccionar múltiples niveles de experiencia aumenta tus coincidencias de trabajo. Las posiciones de nivel inicial y pasantías son altamente recomendadas para recién graduados.': 'Sélectionner plusieurs niveaux d\'expérience augmente vos correspondances d\'emploi. Les postes de niveau débutant et les stages sont fortement recommandés pour les nouveaux diplômés.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceFiltersSection;