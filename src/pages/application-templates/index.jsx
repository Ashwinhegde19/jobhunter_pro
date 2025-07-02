import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TemplateCard from './components/TemplateCard';
import TemplateEditor from './components/TemplateEditor';
import TemplateFilters from './components/TemplateFilters';
import TemplatePreview from './components/TemplatePreview';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import TemplateStats from './components/TemplateStats';

const ApplicationTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    search: '',
    type: 'all',
    jobType: 'all',
    sortBy: 'lastModified',
    sortOrder: 'desc'
  });

  // Mock data for templates
  useEffect(() => {
    const mockTemplates = [
      {
        id: 1,
        name: "Frontend Developer Cover Letter",
        type: "cover-letter",
        content: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the {{POSITION_TITLE}} position at {{COMPANY_NAME}}. With my background in modern web development and passion for creating exceptional user experiences, I am excited about the opportunity to contribute to your team.\n\nAs a dedicated developer with {{EXPERIENCE}}, I have developed proficiency in {{SKILLS}}. My educational background includes {{EDUCATION}}, which has provided me with a solid foundation in computer science principles and software development best practices.\n\nI am particularly drawn to {{COMPANY_NAME}} because of your commitment to innovation and user-centered design. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success.\n\nThank you for considering my application. I look forward to hearing from you.\n\nSincerely,\n{{USER_NAME}}\n{{USER_EMAIL}}\n{{USER_PHONE}}`,
        preview: "Dear Hiring Manager, I am writing to express my strong interest in the Frontend Developer position at your company. With my background in modern web development...",
        jobTypes: ["web-developer", "full-stack"],
        lastModified: "2024-01-15T10:30:00Z",
        createdAt: "2024-01-10T09:00:00Z",
        usageCount: 45,
        responseRate: 18,
        isDefault: true
      },
      {
        id: 2,
        name: "AI Internship Application",
        type: "cover-letter",
        content: `Dear {{COMPANY_NAME}} Team,\n\nI am excited to apply for the {{POSITION_TITLE}} internship at {{COMPANY_NAME}}. As a passionate student pursuing {{EDUCATION}} with a keen interest in artificial intelligence and machine learning, I am eager to contribute to your innovative projects.\n\nDuring my academic journey, I have gained experience in {{SKILLS}} and have worked on several projects involving natural language processing, computer vision, and data analysis. My coursework has provided me with a strong foundation in algorithms, statistics, and programming.\n\nI am particularly impressed by {{COMPANY_NAME}}'s work in AI research and development. The opportunity to learn from your experienced team while contributing to cutting-edge projects aligns perfectly with my career goals.\n\nI would be thrilled to discuss how my academic background and enthusiasm for AI can benefit your team. Thank you for considering my application.\n\nBest regards,\n{{USER_NAME}}\n{{USER_EMAIL}}\n{{USER_PHONE}}`,
        preview: "Dear Team, I am excited to apply for the AI internship position. As a passionate student with keen interest in artificial intelligence...",
        jobTypes: ["ai-intern", "internship"],
        lastModified: "2024-01-12T14:20:00Z",
        createdAt: "2024-01-08T11:15:00Z",
        usageCount: 23,
        responseRate: 25,
        isDefault: false
      },
      {
        id: 3,
        name: "Full Stack Developer Resume",
        type: "resume",
        content: `{{USER_NAME}}\n{{USER_EMAIL}} | {{USER_PHONE}}\n\nPROFESSIONAL SUMMARY\n{{EXPERIENCE}} with expertise in full-stack web development. Proficient in modern JavaScript frameworks, backend technologies, and database management. Passionate about creating scalable, user-friendly applications.\n\nTECHNICAL SKILLS\n{{SKILLS}}\n\nEDUCATION\n{{EDUCATION}}\n\nPROJECTS\n• E-commerce Platform: Built a full-stack e-commerce application using React, Node.js, and MongoDB\n• Task Management App: Developed a collaborative task management tool with real-time updates\n• Portfolio Website: Created a responsive portfolio showcasing development projects\n\nEXPERIENCE\nFreelance Web Developer (2023 - Present)\n• Developed custom websites for small businesses\n• Collaborated with clients to understand requirements and deliver solutions\n• Maintained and updated existing web applications`,
        preview: "Professional Summary: Full-stack web developer with expertise in modern JavaScript frameworks, backend technologies, and database management...",
        jobTypes: ["full-stack", "web-developer"],
        lastModified: "2024-01-10T16:45:00Z",
        createdAt: "2024-01-05T13:30:00Z",
        usageCount: 67,
        responseRate: 22,
        isDefault: true
      },
      {
        id: 4,
        name: "Entry Level Developer Template",
        type: "cover-letter",
        content: `Dear Hiring Team,\n\nI am writing to apply for the {{POSITION_TITLE}} position at {{COMPANY_NAME}}. As a recent graduate with {{EDUCATION}} and a passion for software development, I am excited about the opportunity to begin my career with your organization.\n\nAlthough I am new to the professional world, I have dedicated significant time to learning {{SKILLS}} through coursework, personal projects, and online learning platforms. I am eager to apply my knowledge in a real-world environment and continue growing as a developer.\n\nWhat attracts me to {{COMPANY_NAME}} is your reputation for fostering junior talent and commitment to innovation. I am confident that my enthusiasm, willingness to learn, and fresh perspective would be valuable additions to your team.\n\nI would welcome the opportunity to discuss how I can contribute to your projects. Thank you for considering my application.\n\nSincerely,\n{{USER_NAME}}\n{{USER_EMAIL}}\n{{USER_PHONE}}`,
        preview: "Dear Hiring Team, I am writing to apply for the position. As a recent graduate with passion for software development...",
        jobTypes: ["web-developer", "internship"],
        lastModified: "2024-01-08T11:15:00Z",
        createdAt: "2024-01-03T10:00:00Z",
        usageCount: 12,
        responseRate: 15,
        isDefault: false
      },
      {
        id: 5,
        name: "AI Developer Professional",
        type: "cover-letter",
        content: `Dear {{COMPANY_NAME}} Hiring Manager,\n\nI am excited to submit my application for the {{POSITION_TITLE}} role at {{COMPANY_NAME}}. With {{EXPERIENCE}} in artificial intelligence and machine learning, I am passionate about developing innovative AI solutions that solve real-world problems.\n\nMy expertise includes {{SKILLS}}, with particular strength in deep learning frameworks, natural language processing, and computer vision. I have successfully implemented AI models that have improved efficiency and accuracy in various applications.\n\nI am impressed by {{COMPANY_NAME}}'s commitment to advancing AI technology and its practical applications. The opportunity to work on cutting-edge AI projects while collaborating with a talented team of researchers and engineers is exactly what I am seeking in my next role.\n\nI would be delighted to discuss how my technical skills and passion for AI can contribute to your team's success. Thank you for your consideration.\n\nBest regards,\n{{USER_NAME}}\n{{USER_EMAIL}}\n{{USER_PHONE}}`,
        preview: "Dear Hiring Manager, I am excited to submit my application for the AI Developer role. With experience in artificial intelligence and machine learning...",
        jobTypes: ["ai-developer"],
        lastModified: "2024-01-05T09:30:00Z",
        createdAt: "2023-12-28T14:20:00Z",
        usageCount: 8,
        responseRate: 30,
        isDefault: false
      }
    ];

    setTemplates(mockTemplates);
    setFilteredTemplates(mockTemplates);
  }, []);

  // Filter and sort templates
  useEffect(() => {
    let filtered = [...templates];

    // Apply search filter
    if (currentFilters.search) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        template.content.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }

    // Apply type filter
    if (currentFilters.type !== 'all') {
      filtered = filtered.filter(template => template.type === currentFilters.type);
    }

    // Apply job type filter
    if (currentFilters.jobType !== 'all') {
      filtered = filtered.filter(template => 
        template.jobTypes.includes(currentFilters.jobType)
      );
    }

    // Apply performance filter
    if (currentFilters.performance) {
      switch (currentFilters.performance) {
        case 'high':
          filtered = filtered.filter(template => template.responseRate > 20);
          break;
        case 'medium':
          filtered = filtered.filter(template => template.responseRate >= 10 && template.responseRate <= 20);
          break;
        case 'low':
          filtered = filtered.filter(template => template.responseRate < 10);
          break;
        case 'unused':
          filtered = filtered.filter(template => template.usageCount === 0);
          break;
      }
    }

    // Apply usage filter
    if (currentFilters.usage) {
      switch (currentFilters.usage) {
        case 'frequently-used':
          filtered = filtered.filter(template => template.usageCount > 10);
          break;
        case 'occasionally-used':
          filtered = filtered.filter(template => template.usageCount >= 1 && template.usageCount <= 10);
          break;
        case 'unused':
          filtered = filtered.filter(template => template.usageCount === 0);
          break;
        case 'default':
          filtered = filtered.filter(template => template.isDefault);
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (currentFilters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'usageCount':
          aValue = a.usageCount;
          bValue = b.usageCount;
          break;
        case 'responseRate':
          aValue = a.responseRate;
          bValue = b.responseRate;
          break;
        case 'lastModified':
        default:
          aValue = new Date(a.lastModified);
          bValue = new Date(b.lastModified);
          break;
      }

      if (currentFilters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredTemplates(filtered);
  }, [templates, currentFilters]);

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setIsEditorOpen(true);
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDuplicate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      lastModified: new Date().toISOString(),
      usageCount: 0,
      responseRate: 0,
      isDefault: false
    };
    
    setTemplates(prev => [duplicatedTemplate, ...prev]);
  };

  const handleDelete = (template) => {
    setTemplateToDelete(template);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async (templateId) => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
    } catch (error) {
      console.error('Failed to delete template:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveTemplate = (templateData) => {
    if (selectedTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t.id === selectedTemplate.id ? { ...templateData, id: selectedTemplate.id } : t
      ));
    } else {
      // Create new template
      const newTemplate = {
        ...templateData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        usageCount: 0,
        responseRate: 0
      };
      setTemplates(prev => [newTemplate, ...prev]);
    }
  };

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  const handleSortChange = (sortConfig) => {
    setCurrentFilters(prev => ({
      ...prev,
      sortBy: sortConfig.sortBy,
      sortOrder: sortConfig.sortOrder
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Application Templates
                </h1>
                <p className="text-gray-600 mt-1">
                  Create and manage customized resume and cover letter templates for automated applications
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  size="sm"
                >
                  Export All
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={handleCreateNew}
                >
                  Create New Template
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <TemplateStats templates={templates} />

          {/* Filters */}
          <TemplateFilters
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            totalCount={filteredTemplates.length}
          />

          {/* Templates Grid */}
          <div className="mt-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileText" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {templates.length === 0 ? 'No templates yet' : 'No templates match your filters'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {templates.length === 0 
                    ? 'Create your first template to get started with automated applications' :'Try adjusting your search criteria or filters'
                  }
                </p>
                {templates.length === 0 && (
                  <Button
                    variant="primary"
                    iconName="Plus"
                    onClick={handleCreateNew}
                  >
                    Create Your First Template
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onEdit={handleEdit}
                    onPreview={handlePreview}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <TemplateEditor
        template={selectedTemplate}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setSelectedTemplate(null);
        }}
        onSave={handleSaveTemplate}
      />

      <TemplatePreview
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedTemplate(null);
        }}
        onEdit={handleEdit}
      />

      <DeleteConfirmDialog
        template={templateToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setTemplateToDelete(null);
        }}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default ApplicationTemplates;