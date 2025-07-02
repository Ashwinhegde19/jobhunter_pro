import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TemplateEditor = ({ template, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'cover-letter',
    content: '',
    jobTypes: [],
    isDefault: false
  });
  const [activeTab, setActiveTab] = useState('editor');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || '',
        type: template.type || 'cover-letter',
        content: template.content || '',
        jobTypes: template.jobTypes || [],
        isDefault: template.isDefault || false
      });
    } else {
      setFormData({
        name: '',
        type: 'cover-letter',
        content: '',
        jobTypes: [],
        isDefault: false
      });
    }
  }, [template]);

  const placeholders = [
    { key: '{{COMPANY_NAME}}', label: 'Company Name', description: 'Name of the target company' },
    { key: '{{POSITION_TITLE}}', label: 'Position Title', description: 'Job title being applied for' },
    { key: '{{USER_NAME}}', label: 'Your Name', description: 'Your full name' },
    { key: '{{USER_EMAIL}}', label: 'Your Email', description: 'Your email address' },
    { key: '{{USER_PHONE}}', label: 'Your Phone', description: 'Your phone number' },
    { key: '{{SKILLS}}', label: 'Relevant Skills', description: 'Skills matching the job requirements' },
    { key: '{{EXPERIENCE}}', label: 'Experience Summary', description: 'Brief experience overview' },
    { key: '{{EDUCATION}}', label: 'Education', description: 'Educational background' },
    { key: '{{DATE}}', label: 'Current Date', description: 'Today\'s date' }
  ];

  const jobTypeOptions = [
    { value: 'web-developer', label: 'Web Developer' },
    { value: 'full-stack', label: 'Full Stack Developer' },
    { value: 'ai-intern', label: 'AI Intern' },
    { value: 'ai-developer', label: 'AI Developer' },
    { value: 'internship', label: 'General Internship' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobTypeToggle = (jobType) => {
    setFormData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(jobType)
        ? prev.jobTypes.filter(type => type !== jobType)
        : [...prev.jobTypes, jobType]
    }));
  };

  const insertPlaceholder = (placeholder) => {
    const textarea = document.getElementById('template-content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    const newContent = before + placeholder + after;
    handleInputChange('content', newContent);
    
    // Set cursor position after placeholder
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + placeholder.length, start + placeholder.length);
    }, 0);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave({
        ...template,
        ...formData,
        lastModified: new Date().toISOString(),
        preview: formData.content.substring(0, 150) + '...'
      });
      onClose();
    } catch (error) {
      console.error('Failed to save template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getPreviewContent = () => {
    let preview = formData.content;
    placeholders.forEach(placeholder => {
      const sampleData = {
        '{{COMPANY_NAME}}': 'TechCorp Inc.',
        '{{POSITION_TITLE}}': 'Frontend Developer',
        '{{USER_NAME}}': 'John Doe',
        '{{USER_EMAIL}}': 'john.doe@email.com',
        '{{USER_PHONE}}': '+1 (555) 123-4567',
        '{{SKILLS}}': 'React, JavaScript, HTML/CSS',
        '{{EXPERIENCE}}': '2 years of web development experience',
        '{{EDUCATION}}': 'Bachelor\'s in Computer Science',
        '{{DATE}}': new Date().toLocaleDateString()
      };
      preview = preview.replace(new RegExp(placeholder.key.replace(/[{}]/g, '\\$&'), 'g'), sampleData[placeholder.key] || placeholder.key);
    });
    return preview;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">
              {template ? 'Edit Template' : 'Create New Template'}
            </h2>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full capitalize">
              {formData.type.replace('-', ' ')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              iconName="X"
              onClick={onClose}
              size="sm"
            >
              Close
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              onClick={handleSave}
              loading={isSaving}
              size="sm"
            >
              Save Template
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'editor' ?'border-primary-500 text-primary-600 bg-white' :'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon name="Edit" size={16} className="inline mr-2" />
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'preview' ?'border-primary-500 text-primary-600 bg-white' :'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon name="Eye" size={16} className="inline mr-2" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'settings' ?'border-primary-500 text-primary-600 bg-white' :'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon name="Settings" size={16} className="inline mr-2" />
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'editor' && (
            <div className="h-full flex">
              {/* Editor */}
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <Input
                    type="text"
                    placeholder="Template name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="flex-1 p-4">
                  <textarea
                    id="template-content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder={`Enter your ${formData.type.replace('-', ' ')} template content here...\n\nUse placeholders like {{COMPANY_NAME}} and {{POSITION_TITLE}} to personalize applications automatically.`}
                    className="w-full h-full resize-none border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Placeholders Sidebar */}
              <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Available Placeholders
                  </h3>
                  <div className="space-y-2">
                    {placeholders.map((placeholder) => (
                      <button
                        key={placeholder.key}
                        onClick={() => insertPlaceholder(placeholder.key)}
                        className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                      >
                        <div className="font-medium text-sm text-gray-900">
                          {placeholder.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {placeholder.description}
                        </div>
                        <div className="text-xs text-primary-600 mt-1 font-mono">
                          {placeholder.key}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full overflow-y-auto p-6 bg-gray-50">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed">
                      {getPreviewContent()}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Template Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="cover-letter"
                        checked={formData.type === 'cover-letter'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="mr-2"
                      />
                      Cover Letter
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="resume"
                        checked={formData.type === 'resume'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="mr-2"
                      />
                      Resume
                    </label>
                  </div>
                </div>

                {/* Job Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applicable Job Types
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {jobTypeOptions.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.jobTypes.includes(option.value)}
                          onChange={() => handleJobTypeToggle(option.value)}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Default Template */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Set as default template for selected job types
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Default templates will be automatically used for new applications
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;