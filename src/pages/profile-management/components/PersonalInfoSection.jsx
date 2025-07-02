import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ personalInfo, onUpdate, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(personalInfo);
  const [errors, setErrors] = useState({});

  const getText = (key) => {
    const texts = {
      personalInformation: {
        en: 'Personal Information',
        es: 'Información Personal',
        fr: 'Informations Personnelles'
      },
      contactDetails: {
        en: 'Contact Details',
        es: 'Detalles de Contacto',
        fr: 'Coordonnées'
      },
      fullName: {
        en: 'Full Name',
        es: 'Nombre Completo',
        fr: 'Nom Complet'
      },
      email: {
        en: 'Email Address',
        es: 'Dirección de Email',
        fr: 'Adresse Email'
      },
      phone: {
        en: 'Phone Number',
        es: 'Número de Teléfono',
        fr: 'Numéro de Téléphone'
      },
      location: {
        en: 'Location',
        es: 'Ubicación',
        fr: 'Localisation'
      },
      linkedin: {
        en: 'LinkedIn Profile',
        es: 'Perfil de LinkedIn',
        fr: 'Profil LinkedIn'
      },
      github: {
        en: 'GitHub Profile',
        es: 'Perfil de GitHub',
        fr: 'Profil GitHub'
      },
      portfolio: {
        en: 'Portfolio Website',
        es: 'Sitio Web de Portafolio',
        fr: 'Site Web Portfolio'
      },
      professionalSummary: {
        en: 'Professional Summary',
        es: 'Resumen Profesional',
        fr: 'Résumé Professionnel'
      },
      skills: {
        en: 'Skills',
        es: 'Habilidades',
        fr: 'Compétences'
      },
      addSkill: {
        en: 'Add Skill',
        es: 'Agregar Habilidad',
        fr: 'Ajouter Compétence'
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!editedInfo.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!editedInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editedInfo.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!editedInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(editedInfo);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedInfo(personalInfo);
    setErrors({});
    setIsEditing(false);
  };

  const handleSkillAdd = (skill) => {
    if (skill.trim() && !editedInfo.skills.includes(skill.trim())) {
      setEditedInfo({
        ...editedInfo,
        skills: [...editedInfo.skills, skill.trim()]
      });
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setEditedInfo({
      ...editedInfo,
      skills: editedInfo.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const SkillsEditor = () => {
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
      handleSkillAdd(newSkill);
      setNewSkill('');
    };

    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {editedInfo.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => handleSkillRemove(skill)}
                  className="ml-2 text-primary-600 hover:text-primary-700"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </span>
          ))}
        </div>
        
        {isEditing && (
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={getText('addSkill')}
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              onClick={addSkill}
            >
              {getText('addSkill')}
            </Button>
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
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            {getText('personalInformation')}
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
        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            {getText('contactDetails')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('fullName')}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editedInfo.fullName}
                  onChange={(e) => setEditedInfo({...editedInfo, fullName: e.target.value})}
                  className={errors.fullName ? 'border-error' : ''}
                />
              ) : (
                <p className="text-text-primary">{personalInfo.fullName}</p>
              )}
              {errors.fullName && (
                <p className="text-error text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('email')}
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editedInfo.email}
                  onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                  className={errors.email ? 'border-error' : ''}
                />
              ) : (
                <p className="text-text-primary">{personalInfo.email}</p>
              )}
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('phone')}
              </label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editedInfo.phone}
                  onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                  className={errors.phone ? 'border-error' : ''}
                />
              ) : (
                <p className="text-text-primary">{personalInfo.phone}</p>
              )}
              {errors.phone && (
                <p className="text-error text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('location')}
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editedInfo.location}
                  onChange={(e) => setEditedInfo({...editedInfo, location: e.target.value})}
                />
              ) : (
                <p className="text-text-primary">{personalInfo.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            Professional Links
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('linkedin')}
              </label>
              {isEditing ? (
                <Input
                  type="url"
                  value={editedInfo.linkedin}
                  onChange={(e) => setEditedInfo({...editedInfo, linkedin: e.target.value})}
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                <p className="text-text-primary">{personalInfo.linkedin || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('github')}
              </label>
              {isEditing ? (
                <Input
                  type="url"
                  value={editedInfo.github}
                  onChange={(e) => setEditedInfo({...editedInfo, github: e.target.value})}
                  placeholder="https://github.com/username"
                />
              ) : (
                <p className="text-text-primary">{personalInfo.github || 'Not provided'}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {getText('portfolio')}
              </label>
              {isEditing ? (
                <Input
                  type="url"
                  value={editedInfo.portfolio}
                  onChange={(e) => setEditedInfo({...editedInfo, portfolio: e.target.value})}
                  placeholder="https://yourportfolio.com"
                />
              ) : (
                <p className="text-text-primary">{personalInfo.portfolio || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {getText('professionalSummary')}
          </label>
          {isEditing ? (
            <textarea
              value={editedInfo.summary}
              onChange={(e) => setEditedInfo({...editedInfo, summary: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Brief description of your professional background and goals..."
            />
          ) : (
            <p className="text-text-primary whitespace-pre-wrap">
              {personalInfo.summary || 'No summary provided'}
            </p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {getText('skills')}
          </label>
          <SkillsEditor />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;