import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationActions = ({ onSave, onPreview, onReset, hasChanges }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

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
      saveConfiguration: {
        en: 'Save Configuration',
        es: 'Guardar Configuración',
        fr: 'Sauvegarder Configuration'
      },
      previewSearch: {
        en: 'Preview Search',
        es: 'Vista Previa de Búsqueda',
        fr: 'Aperçu de Recherche'
      },
      resetToDefaults: {
        en: 'Reset to Defaults',
        es: 'Restablecer Predeterminados',
        fr: 'Réinitialiser par Défaut'
      },
      unsavedChanges: {
        en: 'You have unsaved changes',
        es: 'Tienes cambios sin guardar',
        fr: 'Vous avez des modifications non sauvegardées'
      },
      lastSaved: {
        en: 'Last saved',
        es: 'Guardado por última vez',
        fr: 'Dernière sauvegarde'
      },
      confirmReset: {
        en: 'Reset Configuration?',
        es: '¿Restablecer Configuración?',
        fr: 'Réinitialiser la Configuration?'
      },
      resetWarning: {
        en: 'This will reset all your settings to default values. This action cannot be undone.',
        es: 'Esto restablecerá todas tus configuraciones a los valores predeterminados. Esta acción no se puede deshacer.',
        fr: 'Cela réinitialisera tous vos paramètres aux valeurs par défaut. Cette action ne peut pas être annulée.'
      },
      confirm: {
        en: 'Confirm Reset',
        es: 'Confirmar Restablecimiento',
        fr: 'Confirmer la Réinitialisation'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      },
      saving: {
        en: 'Saving...',
        es: 'Guardando...',
        fr: 'Sauvegarde...'
      },
      previewing: {
        en: 'Generating Preview...',
        es: 'Generando Vista Previa...',
        fr: 'Génération de l\'Aperçu...'
      },
      configurationSaved: {
        en: 'Configuration saved successfully!',
        es: '¡Configuración guardada exitosamente!',
        fr: 'Configuration sauvegardée avec succès!'
      },
      automationRestart: {
        en: 'Automation will restart with new settings',
        es: 'La automatización se reiniciará con la nueva configuración',
        fr: 'L\'automatisation redémarrera avec les nouveaux paramètres'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setLastSaved(new Date());
      onSave?.();
      
      // Show success notification
      console.log(getText('configurationSaved'));
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate preview generation
      onPreview?.();
    } catch (error) {
      console.error('Preview failed:', error);
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    onReset?.();
    setShowResetConfirm(false);
    setLastSaved(null);
  };

  const formatLastSaved = () => {
    if (!lastSaved) return null;
    
    const now = new Date();
    const diff = now - lastSaved;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) {
      return currentLanguage === 'en' ? 'just now' : 
             currentLanguage === 'es'? 'ahora mismo' : 'à l\'instant';
    } else if (minutes < 60) {
      return currentLanguage === 'en' ? `${minutes} minutes ago` : 
             currentLanguage === 'es' ? `hace ${minutes} minutos` : 
             `il y a ${minutes} minutes`;
    } else {
      return lastSaved.toLocaleString(
        currentLanguage === 'en' ? 'en-US' : 
        currentLanguage === 'es' ? 'es-ES' : 'fr-FR',
        { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }
      );
    }
  };

  const ResetConfirmDialog = () => {
    if (!showResetConfirm) return null;

    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop" />
        
        {/* Dialog */}
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {getText('confirmReset')}
                </h3>
              </div>
              
              <p className="text-text-secondary mb-6">
                {getText('resetWarning')}
              </p>
              
              <div className="flex space-x-3 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setShowResetConfirm(false)}
                >
                  {getText('cancel')}
                </Button>
                <Button
                  variant="warning"
                  onClick={confirmReset}
                >
                  {getText('confirm')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-lg p-6 sticky bottom-4 shadow-lg">
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <div className="flex items-center space-x-2 text-warning">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{getText('unsavedChanges')}</span>
              </div>
            )}
            
            {lastSaved && !hasChanges && (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Check" size={16} />
                <span className="text-sm">
                  {getText('lastSaved')} {formatLastSaved()}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleReset}
              disabled={isSaving || isPreviewing}
            >
              {getText('resetToDefaults')}
            </Button>

            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              onClick={handlePreview}
              loading={isPreviewing}
              disabled={isSaving}
            >
              {isPreviewing ? getText('previewing') : getText('previewSearch')}
            </Button>

            <Button
              variant="primary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
              loading={isSaving}
              disabled={isPreviewing || !hasChanges}
            >
              {isSaving ? getText('saving') : getText('saveConfiguration')}
            </Button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              onClick={handlePreview}
              loading={isPreviewing}
              disabled={isSaving}
              fullWidth
            >
              {isPreviewing ? getText('previewing') : getText('previewSearch')}
            </Button>

            <Button
              variant="primary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
              loading={isSaving}
              disabled={isPreviewing || !hasChanges}
              fullWidth
            >
              {isSaving ? getText('saving') : getText('saveConfiguration')}
            </Button>
          </div>

          <Button
            variant="ghost"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
            disabled={isSaving || isPreviewing}
            fullWidth
          >
            {getText('resetToDefaults')}
          </Button>
        </div>

        {/* Success Message */}
        {lastSaved && !hasChanges && (
          <div className="mt-4 p-3 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-success-600">
                  {getText('configurationSaved')}
                </p>
                <p className="text-xs text-success-700">
                  {getText('automationRestart')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ResetConfirmDialog />
    </>
  );
};

export default ConfigurationActions;