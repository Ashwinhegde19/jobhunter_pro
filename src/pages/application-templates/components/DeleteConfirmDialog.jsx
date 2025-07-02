import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmDialog = ({ template, isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen || !template) return null;

  const handleConfirm = () => {
    onConfirm(template.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="Trash2" size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Template
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-4">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={template.type === 'resume' ? 'FileText' : 'Mail'} 
                  size={16} 
                  className="text-gray-600" 
                />
                <div>
                  <p className="font-medium text-gray-900">{template.name}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {template.type.replace('-', ' ')} template
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this template? This will permanently remove:
            </p>

            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-gray-400" />
                <span>Template content and formatting</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-gray-400" />
                <span>Usage statistics ({template.usageCount} applications)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-gray-400" />
                <span>Performance data ({template.responseRate}% response rate)</span>
              </li>
              {template.isDefault && (
                <li className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={14} className="text-amber-500" />
                  <span className="text-amber-700">Default template status</span>
                </li>
              )}
            </ul>

            {template.isDefault && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Default Template Warning
                    </p>
                    <p className="text-sm text-amber-700">
                      This is a default template. Deleting it may affect automated job applications 
                      for {template.jobTypes.join(', ')} positions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {template.usageCount > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Usage History Preserved
                    </p>
                    <p className="text-sm text-blue-700">
                      Applications already sent with this template will remain in your history, 
                      but the template content will no longer be available.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <div className="flex space-x-3 justify-end">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirm}
                loading={isDeleting}
                iconName="Trash2"
              >
                {isDeleting ? 'Deleting...' : 'Delete Template'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;