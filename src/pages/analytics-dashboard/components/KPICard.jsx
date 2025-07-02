import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color = 'primary', loading = false }) => {
  const getChangeIcon = () => {
    if (changeType === 'increase') return 'TrendingUp';
    if (changeType === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-success';
    if (changeType === 'decrease') return 'text-error';
    return 'text-text-secondary';
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-muted rounded-lg"></div>
          <div className="w-4 h-4 bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-16 h-8 bg-muted rounded"></div>
          <div className="w-24 h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-100`}>
          <Icon name={icon} size={20} className={`text-${color}`} />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
        <p className="text-sm text-text-secondary">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;