import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const JobPreferencesSection = ({ jobPreferences, onUpdate, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState(jobPreferences);

  const getText = (key) => {
    const texts = {
      jobPreferences: {
        en: 'Job Preferences',
        es: 'Preferencias de Trabajo',
        fr: 'Préférences d\'Emploi'
      },
      targetRoles: {
        en: 'Target Roles',
        es: 'Roles Objetivo',
        fr: 'Rôles Cibles'
      },
      salaryExpectations: {
        en: 'Salary Expectations',
        es: 'Expectativas Salariales',
        fr: 'Attentes Salariales'
      },
      locationPreferences: {
        en: 'Location Preferences',
        es: 'Preferencias de Ubicación',
        fr: 'Préférences de Localisation'
      },
      workArrangement: {
        en: 'Work Arrangement',
        es: 'Modalidad de Trabajo',
        fr: 'Modalité de Travail'
      },
      availability: {
        en: 'Availability',
        es: 'Disponibilidad',
        fr: 'Disponibilité'
      },
      experienceLevel: {
        en: 'Experience Level',
        es: 'Nivel de Experiencia',
        fr: 'Niveau d\'Expérience'
      },
      companySize: {
        en: 'Company Size Preference',
        es: 'Preferencia de Tamaño de Empresa',
        fr: 'Préférence de Taille d\'Entreprise'
      },
      industries: {
        en: 'Preferred Industries',
        es: 'Industrias Preferidas',
        fr: 'Industries Préférées'
      },
      minSalary: {
        en: 'Minimum Salary',
        es: 'Salario Mínimo',
        fr: 'Salaire Minimum'
      },
      maxSalary: {
        en: 'Maximum Salary',
        es: 'Salario Máximo',
        fr: 'Salaire Maximum'
      },
      currency: {
        en: 'Currency',
        es: 'Moneda',
        fr: 'Devise'
      },
      remote: {
        en: 'Remote',
        es: 'Remoto',
        fr: 'À Distance'
      },
      hybrid: {
        en: 'Hybrid',
        es: 'Híbrido',
        fr: 'Hybride'
      },
      onsite: {
        en: 'On-site',
        es: 'Presencial',
        fr: 'Sur Site'
      },
      immediate: {
        en: 'Immediate',
        es: 'Inmediato',
        fr: 'Immédiat'
      },
      twoWeeks: {
        en: '2 weeks notice',
        es: 'Aviso de 2 semanas',
        fr: 'Préavis de 2 semaines'
      },
      oneMonth: {
        en: '1 month notice',
        es: 'Aviso de 1 mes',
        fr: 'Préavis d\'1 mois'
      },
      edit: {
        en: 'Edit',
        es: 'Editar',
        fr: 'Modifier'
      },
      save: {
        en: 'Save',
        es: 'Guardar',
        fr: 'Sauvegarder'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleSave = () => {
    onUpdate(editedPreferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPreferences(jobPreferences);
    setIsEditing(false);
  };

  const targetRoleOptions = [
    "Frontend Developer",
    "Backend Developer", 
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "AI/ML Engineer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile Developer",
    "UI/UX Designer"
  ];

  const experienceLevels = [
    "Entry Level (0-1 years)",
    "Junior (1-3 years)",
    "Mid-level (3-5 years)",
    "Senior (5+ years)"
  ];

  const companySizes = [
    "Startup (1-50 employees)",
    "Small (51-200 employees)",
    "Medium (201-1000 employees)",
    "Large (1000+ employees)"
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "E-commerce",
    "Education",
    "Gaming",
    "Media & Entertainment",
    "Consulting",
    "Government",
    "Non-profit"
  ];

  const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

  const MultiSelectField = ({ options, selected, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option) => {
      const newSelected = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
      onChange(newSelected);
    };

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border border-border rounded-md bg-surface hover:bg-muted focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={!isEditing}
        >
          <div className="flex items-center justify-between">
            <span className="text-text-primary">
              {selected.length > 0 ? `${selected.length} selected` : placeholder}
            </span>
            <Icon name="ChevronDown" size={16} className="text-text-secondary" />
          </div>
        </button>

        {isOpen && isEditing && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="mr-3 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-text-primary">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Section Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
            <Icon name="Briefcase" size={20} className="text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            {getText('jobPreferences')}
          </h2>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                {getText('cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Check"
                onClick={handleSave}
              >
                {getText('save')}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={() => setIsEditing(true)}
            >
              {getText('edit')}
            </Button>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className="p-6 space-y-6">
        {/* Target Roles */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {getText('targetRoles')}
          </label>
          <MultiSelectField
            options={targetRoleOptions}
            selected={editedPreferences.targetRoles}
            onChange={(roles) => setEditedPreferences({...editedPreferences, targetRoles: roles})}
            placeholder="Select target roles"
          />
          {!isEditing && (
            <div className="flex flex-wrap gap-2 mt-2">
              {jobPreferences.targetRoles.map((role, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-100 text-accent"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Salary Expectations */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            {getText('salaryExpectations')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('minSalary')}
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedPreferences.salary.min}
                  onChange={(e) => setEditedPreferences({
                    ...editedPreferences,
                    salary: {...editedPreferences.salary, min: e.target.value}
                  })}
                  placeholder="50000"
                />
              ) : (
                <p className="text-text-primary">
                  {jobPreferences.salary.currency} {jobPreferences.salary.min.toLocaleString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('maxSalary')}
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedPreferences.salary.max}
                  onChange={(e) => setEditedPreferences({
                    ...editedPreferences,
                    salary: {...editedPreferences.salary, max: e.target.value}
                  })}
                  placeholder="80000"
                />
              ) : (
                <p className="text-text-primary">
                  {jobPreferences.salary.currency} {jobPreferences.salary.max.toLocaleString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('currency')}
              </label>
              {isEditing ? (
                <select
                  value={editedPreferences.salary.currency}
                  onChange={(e) => setEditedPreferences({
                    ...editedPreferences,
                    salary: {...editedPreferences.salary, currency: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              ) : (
                <p className="text-text-primary">{jobPreferences.salary.currency}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location and Work Arrangement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {getText('locationPreferences')}
            </label>
            <MultiSelectField
              options={["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA", "Remote", "Flexible"]}
              selected={editedPreferences.locations}
              onChange={(locations) => setEditedPreferences({...editedPreferences, locations})}
              placeholder="Select preferred locations"
            />
            {!isEditing && (
              <div className="flex flex-wrap gap-2 mt-2">
                {jobPreferences.locations.map((location, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary"
                  >
                    {location}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {getText('workArrangement')}
            </label>
            {isEditing ? (
              <select
                value={editedPreferences.workArrangement}
                onChange={(e) => setEditedPreferences({...editedPreferences, workArrangement: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="remote">{getText('remote')}</option>
                <option value="hybrid">{getText('hybrid')}</option>
                <option value="onsite">{getText('onsite')}</option>
              </select>
            ) : (
              <p className="text-text-primary capitalize">{jobPreferences.workArrangement}</p>
            )}
          </div>
        </div>

        {/* Experience Level and Company Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {getText('experienceLevel')}
            </label>
            {isEditing ? (
              <select
                value={editedPreferences.experienceLevel}
                onChange={(e) => setEditedPreferences({...editedPreferences, experienceLevel: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-primary">{jobPreferences.experienceLevel}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {getText('availability')}
            </label>
            {isEditing ? (
              <select
                value={editedPreferences.availability}
                onChange={(e) => setEditedPreferences({...editedPreferences, availability: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="immediate">{getText('immediate')}</option>
                <option value="2weeks">{getText('twoWeeks')}</option>
                <option value="1month">{getText('oneMonth')}</option>
              </select>
            ) : (
              <p className="text-text-primary">{getText(jobPreferences.availability)}</p>
            )}
          </div>
        </div>

        {/* Company Size and Industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {getText('companySize')}
            </label>
            <MultiSelectField
              options={companySizes}
              selected={editedPreferences.companySizes}
              onChange={(sizes) => setEditedPreferences({...editedPreferences, companySizes: sizes})}
              placeholder="Select company sizes"
            />
            {!isEditing && (
              <div className="flex flex-wrap gap-2 mt-2">
                {jobPreferences.companySizes.map((size, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary"
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {getText('industries')}
            </label>
            <MultiSelectField
              options={industries}
              selected={editedPreferences.industries}
              onChange={(industries) => setEditedPreferences({...editedPreferences, industries})}
              placeholder="Select preferred industries"
            />
            {!isEditing && (
              <div className="flex flex-wrap gap-2 mt-2">
                {jobPreferences.industries.map((industry, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-warning-100 text-warning"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreferencesSection;