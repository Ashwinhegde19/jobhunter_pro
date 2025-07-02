import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = () => {
  const [isAutomationRunning, setIsAutomationRunning] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      pauseAutomation: {
        en: 'Pause Automation',
        es: 'Pausar Automatización',
        fr: 'Suspendre l\'Automatisation'
      },
      resumeAutomation: {
        en: 'Resume Automation',
        es: 'Reanudar Automatización',
        fr: 'Reprendre l\'Automatisation'
      },
      quickSearch: {
        en: 'Quick Search',
        es: 'Búsqueda Rápida',
        fr: 'Recherche Rapide'
      },
      emergencyStop: {
        en: 'Emergency Stop',
        es: 'Parada de Emergencia',
        fr: 'Arrêt d\'Urgence'
      },
      confirmPause: {
        en: 'Pause automation? This will stop all active job searches.',
        es: '¿Pausar automatización? Esto detendrá todas las búsquedas de trabajo activas.',
        fr: 'Suspendre l\'automatisation ? Cela arrêtera toutes les recherches d\'emploi actives.'
      },
      confirmStop: {
        en: 'Emergency stop? This will immediately halt all processes and may affect pending applications.',
        es: '¿Parada de emergencia? Esto detendrá inmediatamente todos los procesos y puede afectar las solicitudes pendientes.',
        fr: 'Arrêt d\'urgence ? Cela arrêtera immédiatement tous les processus et peut affecter les candidatures en attente.'
      },
      confirm: {
        en: 'Confirm',
        es: 'Confirmar',
        fr: 'Confirmer'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleToggleAutomation = () => {
    if (isAutomationRunning) {
      setConfirmAction('pause');
      setShowConfirmDialog(true);
    } else {
      executeAction('resume');
    }
  };

  const handleQuickSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success notification or navigate to results
      console.log('Quick search initiated');
    }, 2000);
  };

  const handleEmergencyStop = () => {
    setConfirmAction('stop');
    setShowConfirmDialog(true);
  };

  const executeAction = async (action) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (action) {
        case 'pause':
          setIsAutomationRunning(false);
          console.log('Automation paused');
          break;
        case 'resume':
          setIsAutomationRunning(true);
          console.log('Automation resumed');
          break;
        case 'stop':
          setIsAutomationRunning(false);
          console.log('Emergency stop executed');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
      setConfirmAction(null);
    }
  };

  const ConfirmDialog = () => {
    if (!showConfirmDialog) return null;

    const message = confirmAction === 'stop' ? getText('confirmStop') : getText('confirmPause');

    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop" />
        
        {/* Dialog */}
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  confirmAction === 'stop' ? 'bg-error-100' : 'bg-warning-100'
                }`}>
                  <Icon 
                    name={confirmAction === 'stop' ? 'AlertTriangle' : 'Pause'} 
                    size={20} 
                    className={confirmAction === 'stop' ? 'text-error' : 'text-warning'}
                  />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {confirmAction === 'stop' ? getText('emergencyStop') : getText('pauseAutomation')}
                </h3>
              </div>
              
              <p className="text-text-secondary mb-6">
                {message}
              </p>
              
              <div className="flex space-x-3 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={isLoading}
                >
                  {getText('cancel')}
                </Button>
                <Button
                  variant={confirmAction === 'stop' ? 'danger' : 'warning'}
                  onClick={() => executeAction(confirmAction)}
                  loading={isLoading}
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
      {/* Desktop Quick Actions */}
      <div className="hidden lg:flex lg:items-center lg:space-x-2">
        <Button
          variant={isAutomationRunning ? "warning" : "success"}
          size="sm"
          iconName={isAutomationRunning ? "Pause" : "Play"}
          iconPosition="left"
          onClick={handleToggleAutomation}
          disabled={isLoading}
          className="transition-all duration-300"
        >
          {isAutomationRunning ? getText('pauseAutomation') : getText('resumeAutomation')}
        </Button>

        <Button
          variant="primary"
          size="sm"
          iconName="Search"
          iconPosition="left"
          onClick={handleQuickSearch}
          loading={isLoading}
        >
          {getText('quickSearch')}
        </Button>

        <Button
          variant="danger"
          size="sm"
          iconName="Square"
          iconPosition="left"
          onClick={handleEmergencyStop}
          disabled={isLoading}
          className="hover:bg-error-600"
        >
          {getText('emergencyStop')}
        </Button>
      </div>

      {/* Mobile Quick Actions */}
      <div className="lg:hidden space-y-3">
        <div className="flex space-x-2">
          <Button
            variant={isAutomationRunning ? "warning" : "success"}
            size="sm"
            iconName={isAutomationRunning ? "Pause" : "Play"}
            onClick={handleToggleAutomation}
            disabled={isLoading}
            fullWidth
          >
            {isAutomationRunning ? getText('pauseAutomation') : getText('resumeAutomation')}
          </Button>

          <Button
            variant="primary"
            size="sm"
            iconName="Search"
            onClick={handleQuickSearch}
            loading={isLoading}
            fullWidth
          >
            {getText('quickSearch')}
          </Button>
        </div>

        <Button
          variant="danger"
          size="sm"
          iconName="Square"
          iconPosition="left"
          onClick={handleEmergencyStop}
          disabled={isLoading}
          fullWidth
        >
          {getText('emergencyStop')}
        </Button>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="lg:hidden">
        <button
          onClick={handleToggleAutomation}
          disabled={isLoading}
          className={`fab w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isAutomationRunning 
              ? 'bg-warning text-warning-foreground hover:bg-warning-600' 
              : 'bg-success text-success-foreground hover:bg-success-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          aria-label={isAutomationRunning ? getText('pauseAutomation') : getText('resumeAutomation')}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icon 
              name={isAutomationRunning ? "Pause" : "Play"} 
              size={24} 
            />
          )}
        </button>
      </div>

      {/* Status Indicator for Mobile FAB */}
      {isAutomationRunning && (
        <div className="lg:hidden fixed bottom-20 right-6 z-fixed">
          <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium shadow-md animate-pulse-subtle">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success-foreground rounded-full"></div>
              <span>Active</span>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog />
    </>
  );
};

export default QuickActions;