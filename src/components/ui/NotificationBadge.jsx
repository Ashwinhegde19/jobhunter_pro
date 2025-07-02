import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationBadge = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Initialize with sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'success',
        title: {
          en: 'Application Submitted',
          es: 'Solicitud Enviada',
          fr: 'Candidature Soumise'
        },
        message: {
          en: 'Your application to TechCorp was successfully submitted',
          es: 'Tu solicitud a TechCorp fue enviada exitosamente',
          fr: 'Votre candidature à TechCorp a été soumise avec succès'
        },
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false
      },
      {
        id: 2,
        type: 'info',
        title: {
          en: 'Interview Scheduled',
          es: 'Entrevista Programada',
          fr: 'Entretien Programmé'
        },
        message: {
          en: 'Interview with StartupXYZ scheduled for tomorrow at 2 PM',
          es: 'Entrevista con StartupXYZ programada para mañana a las 2 PM',
          fr: 'Entretien avec StartupXYZ programmé pour demain à 14h'
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      {
        id: 3,
        type: 'warning',
        title: {
          en: 'Application Limit Reached',
          es: 'Límite de Solicitudes Alcanzado',
          fr: 'Limite de Candidatures Atteinte'
        },
        message: {
          en: 'Daily application limit reached. Upgrade to continue',
          es: 'Límite diario de solicitudes alcanzado. Actualiza para continuar',
          fr: 'Limite quotidienne de candidatures atteinte. Mettez à niveau pour continuer'
        },
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true
      }
    ];
    setNotifications(sampleNotifications);
  }, []);

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newNotification = {
          id: Date.now(),
          type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)],
          title: {
            en: 'New Update',
            es: 'Nueva Actualización',
            fr: 'Nouvelle Mise à Jour'
          },
          message: {
            en: 'You have a new job application update',
            es: 'Tienes una nueva actualización de solicitud de trabajo',
            fr: 'Vous avez une nouvelle mise à jour de candidature'
          },
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    const icons = {
      success: 'CheckCircle',
      info: 'Info',
      warning: 'AlertTriangle',
      error: 'AlertCircle'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      success: 'text-success',
      info: 'text-primary',
      warning: 'text-warning',
      error: 'text-error'
    };
    return colors[type] || 'text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) {
      return currentLanguage === 'en' ? 'Just now' : 
             currentLanguage === 'es'? 'Ahora mismo' : 'À l\'instant';
    } else if (minutes < 60) {
      return currentLanguage === 'en' ? `${minutes}m ago` : 
             currentLanguage === 'es' ? `hace ${minutes}m` : 
             `il y a ${minutes}m`;
    } else if (hours < 24) {
      return currentLanguage === 'en' ? `${hours}h ago` : 
             currentLanguage === 'es' ? `hace ${hours}h` : 
             `il y a ${hours}h`;
    } else {
      return currentLanguage === 'en' ? `${days}d ago` : 
             currentLanguage === 'es' ? `hace ${days}d` : 
             `il y a ${days}j`;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Icon name="Bell" size={20} className="text-text-secondary" />
        
        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse-subtle">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-modal-backdrop" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-popover animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-text-primary">
                {currentLanguage === 'en' ? 'Notifications' : 
                 currentLanguage === 'es' ? 'Notificaciones' : 
                 'Notifications'}
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:text-primary-700 font-medium"
                >
                  {currentLanguage === 'en' ? 'Mark all read' : 
                   currentLanguage === 'es' ? 'Marcar todo como leído' : 
                   'Tout marquer comme lu'}
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={32} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">
                    {currentLanguage === 'en' ? 'No notifications yet' : 
                     currentLanguage === 'es' ? 'No hay notificaciones aún' : 
                     'Aucune notification pour le moment'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted transition-colors ${
                        !notification.read ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 ${getNotificationColor(notification.type)}`}>
                          <Icon name={getNotificationIcon(notification.type)} size={16} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${
                              !notification.read ? 'text-text-primary' : 'text-text-secondary'
                            }`}>
                              {notification.title[currentLanguage]}
                            </h4>
                            <button
                              onClick={() => clearNotification(notification.id)}
                              className="ml-2 text-text-muted hover:text-text-secondary"
                            >
                              <Icon name="X" size={14} />
                            </button>
                          </div>
                          
                          <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                            {notification.message[currentLanguage]}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-text-muted">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-primary hover:text-primary-700 font-medium"
                              >
                                {currentLanguage === 'en' ? 'Mark read' : 
                                 currentLanguage === 'es' ? 'Marcar leído' : 
                                 'Marquer lu'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <button className="w-full text-center text-sm text-primary hover:text-primary-700 font-medium">
                  {currentLanguage === 'en' ? 'View all notifications' : 
                   currentLanguage === 'es' ? 'Ver todas las notificaciones' : 
                   'Voir toutes les notifications'}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBadge;