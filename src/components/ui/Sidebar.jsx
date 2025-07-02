import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'Central command center for automation monitoring'
    },
    {
      label: 'Jobs',
      path: null,
      icon: 'Briefcase',
      badge: null,
      tooltip: 'Job search configuration and templates',
      children: [
        {
          label: 'Search Configuration',
          path: '/job-search-configuration',
          icon: 'Settings',
          tooltip: 'Configure automated job search parameters'
        },
        {
          label: 'Application Templates',
          path: '/application-templates',
          icon: 'FileText',
          tooltip: 'Manage cover letter and resume templates'
        }
      ]
    },
    {
      label: 'History',
      path: null,
      icon: 'History',
      badge: null,
      tooltip: 'Application tracking and analytics',
      children: [
        {
          label: 'Application History',
          path: '/application-history',
          icon: 'List',
          tooltip: 'View all submitted applications and responses'
        },
        {
          label: 'Analytics Dashboard',
          path: '/analytics-dashboard',
          icon: 'BarChart3',
          tooltip: 'Performance metrics and optimization insights'
        }
      ]
    },
    {
      label: 'Profile',
      path: '/profile-management',
      icon: 'User',
      badge: null,
      tooltip: 'Personal information and account settings'
    }
  ];

  const isActiveRoute = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (item.children) {
      return item.children.some(child => isActiveRoute(child.path));
    }
    return false;
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const NavItem = ({ item, isChild = false }) => {
    const [isExpanded, setIsExpanded] = useState(isParentActive(item));
    const isActive = isActiveRoute(item.path);
    const hasChildren = item.children && item.children.length > 0;

    useEffect(() => {
      if (isParentActive(item)) {
        setIsExpanded(true);
      }
    }, [location.pathname, item]);

    const handleClick = () => {
      if (hasChildren) {
        setIsExpanded(!isExpanded);
      } else if (item.path) {
        handleNavigation(item.path);
      }
    };

    return (
      <div className="space-y-1">
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
            isActive
              ? 'bg-primary-50 text-primary border-l-2 border-primary'
              : isParentActive(item) && !isChild
              ? 'bg-muted text-text-primary' :'text-text-secondary hover:text-text-primary hover:bg-muted'
          } ${isChild ? 'ml-4 pl-6' : ''}`}
          title={!isCollapsed ? '' : item.tooltip}
        >
          <div className="flex items-center space-x-3">
            <Icon 
              name={item.icon} 
              size={18} 
              className={`${
                isActive ? 'text-primary' : 'text-current'
              }`}
            />
            {!isCollapsed && (
              <span className="truncate">{item.label}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isCollapsed && item.badge && (
              <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                {item.badge}
              </span>
            )}
            {!isCollapsed && hasChildren && (
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>
        </button>

        {/* Children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="space-y-1 ml-4">
            {item.children.map((child, index) => (
              <NavItem key={index} item={child} isChild={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-fixed lg:flex-col bg-surface border-r border-border transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Icon name="Zap" size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium text-text-primary">Navigation</span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={16} className="text-success" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">System Status</p>
                  <p className="text-xs text-success truncate">All systems operational</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-fixed bg-surface border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navigationItems.filter(item => !item.children).map((item, index) => {
            const isActive = isActiveRoute(item.path);
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs font-medium truncate">{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
            );
          })}
          
          {/* Jobs Dropdown for Mobile */}
          <div className="relative">
            <button
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
            >
              <Icon name="Briefcase" size={20} />
              <span className="text-xs font-medium">Jobs</span>
            </button>
          </div>

          {/* History Dropdown for Mobile */}
          <div className="relative">
            <button
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
            >
              <Icon name="History" size={20} />
              <span className="text-xs font-medium">History</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;