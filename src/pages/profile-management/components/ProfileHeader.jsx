import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userProfile, onPhotoUpdate, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const getText = (key) => {
    const texts = {
      profilePhoto: {
        en: 'Profile Photo',
        es: 'Foto de Perfil',
        fr: 'Photo de Profil'
      },
      uploadPhoto: {
        en: 'Upload Photo',
        es: 'Subir Foto',
        fr: 'Télécharger Photo'
      },
      editProfile: {
        en: 'Edit Profile',
        es: 'Editar Perfil',
        fr: 'Modifier Profil'
      },
      saveChanges: {
        en: 'Save Changes',
        es: 'Guardar Cambios',
        fr: 'Sauvegarder'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      },
      profileComplete: {
        en: 'Profile Complete',
        es: 'Perfil Completo',
        fr: 'Profil Complet'
      },
      memberSince: {
        en: 'Member since',
        es: 'Miembro desde',
        fr: 'Membre depuis'
      },
      lastUpdated: {
        en: 'Last updated',
        es: 'Última actualización',
        fr: 'Dernière mise à jour'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleSave = () => {
    // Simulate save operation
    setIsEditing(false);
    console.log('Profile updated:', editedProfile);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoUpdate(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const completionPercentage = 85;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Profile Photo and Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Profile Photo */}
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-secondary-100 border-4 border-white shadow-lg">
              <Image
                src={userProfile.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                alt={getText('profilePhoto')}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Photo Upload Button */}
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors shadow-lg">
              <Icon name="Camera" size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Basic Info */}
          <div className="text-center sm:text-left">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="text-2xl font-bold bg-transparent border-b border-border focus:border-primary outline-none"
                />
                <input
                  type="text"
                  value={editedProfile.title}
                  onChange={(e) => setEditedProfile({...editedProfile, title: e.target.value})}
                  className="text-text-secondary bg-transparent border-b border-border focus:border-primary outline-none"
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">{userProfile.name}</h1>
                <p className="text-text-secondary text-lg">{userProfile.title}</p>
              </>
            )}
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-4 mt-2 text-sm text-text-muted">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{userProfile.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{getText('memberSince')} {userProfile.memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats and Actions */}
        <div className="flex flex-col items-center lg:items-end space-y-4">
          {/* Profile Completion */}
          <div className="text-center lg:text-right">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-16 h-2 bg-secondary-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-text-primary">{completionPercentage}%</span>
            </div>
            <p className="text-xs text-text-secondary">{getText('profileComplete')}</p>
          </div>

          {/* Action Buttons */}
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
                  {getText('saveChanges')}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => setIsEditing(true)}
              >
                {getText('editProfile')}
              </Button>
            )}
          </div>

          {/* Last Updated */}
          <p className="text-xs text-text-muted">
            {getText('lastUpdated')}: {userProfile.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;