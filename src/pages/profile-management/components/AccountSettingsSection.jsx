import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettingsSection = ({ accountSettings, onUpdate, currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(accountSettings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getText = (key) => {
    const texts = {
      accountSettings: {
        en: 'Account Settings',
        es: 'Configuración de Cuenta',
        fr: 'Paramètres du Compte'
      },
      notifications: {
        en: 'Notifications',
        es: 'Notificaciones',
        fr: 'Notifications'
      },
      automation: {
        en: 'Automation',
        es: 'Automatización',
        fr: 'Automatisation'
      },
      privacy: {
        en: 'Privacy & Security',
        es: 'Privacidad y Seguridad',
        fr: 'Confidentialité et Sécurité'
      },
      subscription: {
        en: 'Subscription',
        es: 'Suscripción',
        fr: 'Abonnement'
      },
      emailNotifications: {
        en: 'Email Notifications',
        es: 'Notificaciones por Email',
        fr: 'Notifications Email'
      },
      pushNotifications: {
        en: 'Push Notifications',
        es: 'Notificaciones Push',
        fr: 'Notifications Push'
      },
      jobAlerts: {
        en: 'Job Application Alerts',
        es: 'Alertas de Solicitudes de Trabajo',
        fr: 'Alertes de Candidatures'
      },
      weeklyReports: {
        en: 'Weekly Reports',
        es: 'Reportes Semanales',
        fr: 'Rapports Hebdomadaires'
      },
      systemUpdates: {
        en: 'System Updates',
        es: 'Actualizaciones del Sistema',
        fr: 'Mises à Jour Système'
      },
      automationSchedule: {
        en: 'Automation Schedule',
        es: 'Horario de Automatización',
        fr: 'Planification Automatisation'
      },
      dailyLimit: {
        en: 'Daily Application Limit',
        es: 'Límite Diario de Solicitudes',
        fr: 'Limite Quotidien de Candidatures'
      },
      rateLimiting: {
        en: 'Rate Limiting',
        es: 'Limitación de Velocidad',
        fr: 'Limitation de Débit'
      },
      autoRetry: {
        en: 'Auto-retry Failed Applications',
        es: 'Reintentar Solicitudes Fallidas',
        fr: 'Réessayer Candidatures Échouées'
      },
      profileVisibility: {
        en: 'Profile Visibility',
        es: 'Visibilidad del Perfil',
        fr: 'Visibilité du Profil'
      },
      dataSharing: {
        en: 'Data Sharing',
        es: 'Compartir Datos',
        fr: 'Partage de Données'
      },
      twoFactorAuth: {
        en: 'Two-Factor Authentication',
        es: 'Autenticación de Dos Factores',
        fr: 'Authentification à Deux Facteurs'
      },
      changePassword: {
        en: 'Change Password',
        es: 'Cambiar Contraseña',
        fr: 'Changer Mot de Passe'
      },
      currentPlan: {
        en: 'Current Plan',
        es: 'Plan Actual',
        fr: 'Plan Actuel'
      },
      billingHistory: {
        en: 'Billing History',
        es: 'Historial de Facturación',
        fr: 'Historique de Facturation'
      },
      upgradePlan: {
        en: 'Upgrade Plan',
        es: 'Actualizar Plan',
        fr: 'Mettre à Niveau'
      },
      cancelSubscription: {
        en: 'Cancel Subscription',
        es: 'Cancelar Suscripción',
        fr: 'Annuler Abonnement'
      },
      deleteAccount: {
        en: 'Delete Account',
        es: 'Eliminar Cuenta',
        fr: 'Supprimer Compte'
      },
      save: {
        en: 'Save Changes',
        es: 'Guardar Cambios',
        fr: 'Sauvegarder'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      },
      edit: {
        en: 'Edit',
        es: 'Editar',
        fr: 'Modifier'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const tabs = [
    { id: 'notifications', label: getText('notifications'), icon: 'Bell' },
    { id: 'automation', label: getText('automation'), icon: 'Settings' },
    { id: 'privacy', label: getText('privacy'), icon: 'Shield' },
    { id: 'subscription', label: getText('subscription'), icon: 'CreditCard' }
  ];

  const handleSave = () => {
    onUpdate(editedSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSettings(accountSettings);
    setIsEditing(false);
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-secondary-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('emailNotifications')}</h4>
            <p className="text-sm text-text-secondary">Receive notifications via email</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.notifications.email}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              notifications: { ...editedSettings.notifications, email: value }
            })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('pushNotifications')}</h4>
            <p className="text-sm text-text-secondary">Receive browser push notifications</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.notifications.push}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              notifications: { ...editedSettings.notifications, push: value }
            })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('jobAlerts')}</h4>
            <p className="text-sm text-text-secondary">Get notified about job application status</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.notifications.jobAlerts}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              notifications: { ...editedSettings.notifications, jobAlerts: value }
            })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('weeklyReports')}</h4>
            <p className="text-sm text-text-secondary">Weekly summary of your job search activity</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.notifications.weeklyReports}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              notifications: { ...editedSettings.notifications, weeklyReports: value }
            })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('systemUpdates')}</h4>
            <p className="text-sm text-text-secondary">Important system updates and maintenance</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.notifications.systemUpdates}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              notifications: { ...editedSettings.notifications, systemUpdates: value }
            })}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const AutomationTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {getText('automationSchedule')}
          </label>
          {isEditing ? (
            <select
              value={editedSettings.automation.schedule}
              onChange={(e) => setEditedSettings({
                ...editedSettings,
                automation: { ...editedSettings.automation, schedule: e.target.value }
              })}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="hourly">Every Hour</option>
              <option value="6hours">Every 6 Hours</option>
              <option value="daily">Daily</option>
              <option value="custom">Custom</option>
            </select>
          ) : (
            <p className="text-text-primary capitalize">{accountSettings.automation.schedule}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {getText('dailyLimit')}
          </label>
          {isEditing ? (
            <Input
              type="number"
              value={editedSettings.automation.dailyLimit}
              onChange={(e) => setEditedSettings({
                ...editedSettings,
                automation: { ...editedSettings.automation, dailyLimit: parseInt(e.target.value) }
              })}
              min="1"
              max="100"
            />
          ) : (
            <p className="text-text-primary">{accountSettings.automation.dailyLimit} applications per day</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('rateLimiting')}</h4>
            <p className="text-sm text-text-secondary">Prevent being blocked by job platforms</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.automation.rateLimiting}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              automation: { ...editedSettings.automation, rateLimiting: value }
            })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('autoRetry')}</h4>
            <p className="text-sm text-text-secondary">Automatically retry failed applications</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.automation.autoRetry}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              automation: { ...editedSettings.automation, autoRetry: value }
            })}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const PrivacyTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {getText('profileVisibility')}
          </label>
          {isEditing ? (
            <select
              value={editedSettings.privacy.profileVisibility}
              onChange={(e) => setEditedSettings({
                ...editedSettings,
                privacy: { ...editedSettings.privacy, profileVisibility: e.target.value }
              })}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="recruiters">Recruiters Only</option>
            </select>
          ) : (
            <p className="text-text-primary capitalize">{accountSettings.privacy.profileVisibility}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('dataSharing')}</h4>
            <p className="text-sm text-text-secondary">Share anonymized data for platform improvement</p>
          </div>
          <ToggleSwitch
            checked={editedSettings.privacy.dataSharing}
            onChange={(value) => setEditedSettings({
              ...editedSettings,
              privacy: { ...editedSettings.privacy, dataSharing: value }
            })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('twoFactorAuth')}</h4>
            <p className="text-sm text-text-secondary">Add extra security to your account</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${accountSettings.privacy.twoFactorAuth ? 'text-success' : 'text-text-secondary'}`}>
              {accountSettings.privacy.twoFactorAuth ? 'Enabled' : 'Disabled'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Toggle 2FA')}
            >
              {accountSettings.privacy.twoFactorAuth ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Button
            variant="outline"
            iconName="Key"
            onClick={() => console.log('Change password')}
          >
            {getText('changePassword')}
          </Button>
        </div>
      </div>
    </div>
  );

  const SubscriptionTab = () => (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">{getText('currentPlan')}</h4>
            <p className="text-sm text-text-secondary">Premium Plan - $29.99/month</p>
            <p className="text-xs text-text-muted">Next billing: December 15, 2024</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-success text-success-foreground">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h4 className="font-medium text-text-primary">Plan Features</h4>
            <ul className="text-sm text-text-secondary mt-2 space-y-1">
              <li>• Unlimited job applications</li>
              <li>• Advanced filtering options</li>
              <li>• Priority customer support</li>
              <li>• Analytics dashboard</li>
            </ul>
          </div>
          <Button
            variant="primary"
            iconName="ArrowUp"
          >
            {getText('upgradePlan')}
          </Button>
        </div>

        <div className="border-t border-border pt-4">
          <Button
            variant="outline"
            iconName="FileText"
            onClick={() => console.log('View billing history')}
          >
            {getText('billingHistory')}
          </Button>
        </div>

        <div className="border-t border-border pt-4">
          <Button
            variant="danger"
            iconName="XCircle"
            onClick={() => console.log('Cancel subscription')}
          >
            {getText('cancelSubscription')}
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <h4 className="font-medium text-error mb-2">Danger Zone</h4>
          <p className="text-sm text-text-secondary mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="danger"
            iconName="Trash2"
            onClick={() => setShowDeleteConfirm(true)}
          >
            {getText('deleteAccount')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationsTab />;
      case 'automation':
        return <AutomationTab />;
      case 'privacy':
        return <PrivacyTab />;
      case 'subscription':
        return <SubscriptionTab />;
      default:
        return <NotificationsTab />;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Section Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-secondary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            {getText('accountSettings')}
          </h2>
        </div>
        
        {activeTab !== 'subscription' && (
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
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop" />
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-error" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Delete Account
                  </h3>
                </div>
                
                <p className="text-text-secondary mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                </p>
                
                <div className="flex space-x-3 justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log('Account deleted');
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSettingsSection;