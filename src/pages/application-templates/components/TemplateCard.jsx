import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onEdit, onDuplicate, onDelete, onPreview }) => {
  const [showActions, setShowActions] = useState(false);

  const getJobTypeColor = (type) => {
    const colors = {
      'web-developer': 'bg-blue-100 text-blue-800',
      'full-stack': 'bg-green-100 text-green-800',
      'ai-intern': 'bg-purple-100 text-purple-800',
      'ai-developer': 'bg-indigo-100 text-indigo-800',
      'internship': 'bg-orange-100 text-orange-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.general;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Template Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {template.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name={template.type === 'resume' ? 'FileText' : 'Mail'} size={16} />
              <span className="capitalize">{template.type}</span>
              <span>•</span>
              <span>Modified {formatDate(template.lastModified)}</span>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={() => onPreview(template)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              title="Preview template"
            >
              <Icon name="Eye" size={16} />
            </button>
            <button
              onClick={() => onEdit(template)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              title="Edit template"
            >
              <Icon name="Edit" size={16} />
            </button>
            <button
              onClick={() => onDuplicate(template)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              title="Duplicate template"
            >
              <Icon name="Copy" size={16} />
            </button>
            <button
              onClick={() => onDelete(template)}
              className="p-1.5 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600"
              title="Delete template"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Template Content Preview */}
      <div className="p-4">
        <div className="bg-gray-50 rounded-md p-3 mb-3">
          <p className="text-sm text-gray-600 line-clamp-3">
            {template.preview}
          </p>
        </div>

        {/* Job Types */}
        <div className="flex flex-wrap gap-2 mb-3">
          {template.jobTypes.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(type)}`}
            >
              {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          ))}
        </div>

        {/* Statistics */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Icon name="Send" size={14} />
              <span>{template.usageCount} applications</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Icon name="TrendingUp" size={14} />
              <span>{template.responseRate}% response rate</span>
            </div>
          </div>
          
          {template.isDefault && (
            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
              Default
            </span>
          )}
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="lg:hidden p-4 pt-0">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onPreview(template)}
            fullWidth
          >
            Preview
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(template)}
            fullWidth
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;