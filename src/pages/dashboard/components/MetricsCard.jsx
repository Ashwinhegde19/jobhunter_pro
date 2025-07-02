import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary',
        trend: 'text-primary'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'text-success',
        trend: 'text-success'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'text-warning',
        trend: 'text-warning'
      },
      error: {
        bg: 'bg-error-50',
        icon: 'text-error',
        trend: 'text-error'
      }
    };
    return colors[colorType] || colors.primary;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary">{value}</h3>
            {trend && trendValue && (
              <div className={`flex items-center space-x-1 ${colorClasses.trend}`}>
                <Icon 
                  name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={16} 
                />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-text-muted mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses.icon} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;