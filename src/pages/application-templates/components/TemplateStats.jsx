import React from 'react';
import Icon from '../../../components/AppIcon';

const TemplateStats = ({ templates }) => {
  const stats = {
    total: templates.length,
    coverLetters: templates.filter(t => t.type === 'cover-letter').length,
    resumes: templates.filter(t => t.type === 'resume').length,
    totalApplications: templates.reduce((sum, t) => sum + t.usageCount, 0),
    avgResponseRate: templates.length > 0 
      ? Math.round(templates.reduce((sum, t) => sum + t.responseRate, 0) / templates.length)
      : 0,
    defaultTemplates: templates.filter(t => t.isDefault).length,
    highPerformers: templates.filter(t => t.responseRate > 20).length
  };

  const statCards = [
    {
      label: 'Total Templates',
      value: stats.total,
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: `${stats.coverLetters} cover letters, ${stats.resumes} resumes`
    },
    {
      label: 'Total Applications',
      value: stats.totalApplications.toLocaleString(),
      icon: 'Send',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Sent using your templates'
    },
    {
      label: 'Avg Response Rate',
      value: `${stats.avgResponseRate}%`,
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Across all templates'
    },
    {
      label: 'High Performers',
      value: stats.highPerformers,
      icon: 'Award',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      description: 'Templates with >20% response rate'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateStats;