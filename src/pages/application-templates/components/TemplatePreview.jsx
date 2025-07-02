import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplatePreview = ({ template, isOpen, onClose, onEdit, COMPANY_NAME }) => {
  if (!isOpen || !template) return null;

  const placeholders = [
  { key: '{{COMPANY_NAME}}', value: 'TechCorp Inc.' },
  { key: '{{POSITION_TITLE}}', value: 'Frontend Developer' },
  { key: '{{USER_NAME}}', value: 'John Doe' },
  { key: '{{USER_EMAIL}}', value: 'john.doe@email.com' },
  { key: '{{USER_PHONE}}', value: '+1 (555) 123-4567' },
  { key: '{{SKILLS}}', value: 'React, JavaScript, HTML/CSS, Node.js' },
  { key: '{{EXPERIENCE}}', value: '2 years of web development experience with focus on modern frameworks' },
  { key: '{{EDUCATION}}', value: 'Bachelor\'s in Computer Science from State University' },
  { key: '{{DATE}}', value: new Date().toLocaleDateString() }];


  const getPreviewContent = () => {
    let preview = template.content;
    placeholders.forEach((placeholder) => {
      preview = preview.replace(
        new RegExp(placeholder.key.replace(/[{}]/g, '\\$&'), 'g'),
        placeholder.value
      );
    });
    return preview;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative h-full flex flex-col bg-white max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon
                name={template.type === 'resume' ? 'FileText' : 'Mail'}
                size={20}
                className="text-gray-600" />

              <h2 className="text-xl font-semibold text-gray-900">
                {template.name}
              </h2>
            </div>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full capitalize">
              {template.type.replace('-', ' ')}
            </span>
            {template.isDefault &&
            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                Default
              </span>
            }
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              iconName="Edit"
              onClick={() => onEdit(template)}
              size="sm">

              Edit Template
            </Button>
            <Button
              variant="ghost"
              iconName="X"
              onClick={onClose}
              size="sm">

              Close
            </Button>
          </div>
        </div>

        {/* Template Info */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>Modified {formatDate(template.lastModified)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Send" size={16} />
                <span>{template.usageCount} applications</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={16} />
                <span>{template.responseRate}% response rate</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {template.jobTypes.map((type, index) =>
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(type)}`}>

                  {type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-none mx-auto">
            {/* Preview Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-1">
                    Preview with Sample Data
                  </h3>
                  <p className="text-sm text-blue-700">
                    This preview shows how your template will look with actual data. 
                    Placeholders like {{ COMPANY_NAME }} are replaced with sample values.
                  </p>
                </div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed text-base">
                  {getPreviewContent()}
                </pre>
              </div>
            </div>

            {/* Placeholder Reference */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Placeholder Values Used in Preview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {placeholders.map((placeholder, index) =>
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <code className="text-xs text-primary-600 font-mono">
                      {placeholder.key}
                    </code>
                    <span className="text-xs text-gray-600 ml-2 truncate">
                      {placeholder.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Template ID: {template.id} • Created {formatDate(template.createdAt || template.lastModified)}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                iconName="Download"
                size="sm">

                Export
              </Button>
              <Button
                variant="outline"
                iconName="Copy"
                size="sm">

                Duplicate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default TemplatePreview;