import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentsSection = ({ documents, onUpdate, currentLanguage }) => {
  const [dragOver, setDragOver] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);

  const getText = (key) => {
    const texts = {
      documents: {
        en: 'Documents & Templates',
        es: 'Documentos y Plantillas',
        fr: 'Documents et Modèles'
      },
      resume: {
        en: 'Resume/CV',
        es: 'Currículum',
        fr: 'CV'
      },
      coverLetters: {
        en: 'Cover Letter Templates',
        es: 'Plantillas de Carta de Presentación',
        fr: 'Modèles de Lettre de Motivation'
      },
      portfolio: {
        en: 'Portfolio Links',
        es: 'Enlaces de Portafolio',
        fr: 'Liens Portfolio'
      },
      uploadResume: {
        en: 'Upload Resume',
        es: 'Subir Currículum',
        fr: 'Télécharger CV'
      },
      dragDropResume: {
        en: 'Drag & drop your resume here, or click to browse',
        es: 'Arrastra y suelta tu currículum aquí, o haz clic para explorar',
        fr: 'Glissez-déposez votre CV ici, ou cliquez pour parcourir'
      },
      addTemplate: {
        en: 'Add Template',
        es: 'Agregar Plantilla',
        fr: 'Ajouter Modèle'
      },
      templateName: {
        en: 'Template Name',
        es: 'Nombre de Plantilla',
        fr: 'Nom du Modèle'
      },
      templateContent: {
        en: 'Template Content',
        es: 'Contenido de Plantilla',
        fr: 'Contenu du Modèle'
      },
      addPortfolioLink: {
        en: 'Add Portfolio Link',
        es: 'Agregar Enlace de Portafolio',
        fr: 'Ajouter Lien Portfolio'
      },
      linkTitle: {
        en: 'Link Title',
        es: 'Título del Enlace',
        fr: 'Titre du Lien'
      },
      linkUrl: {
        en: 'URL',
        es: 'URL',
        fr: 'URL'
      },
      preview: {
        en: 'Preview',
        es: 'Vista Previa',
        fr: 'Aperçu'
      },
      download: {
        en: 'Download',
        es: 'Descargar',
        fr: 'Télécharger'
      },
      delete: {
        en: 'Delete',
        es: 'Eliminar',
        fr: 'Supprimer'
      },
      edit: {
        en: 'Edit',
        es: 'Editar',
        fr: 'Modifier'
      },
      save: {
        en: 'Save',
        es: 'Guardar',
        fr: 'Sauvegarder'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      },
      lastUpdated: {
        en: 'Last updated',
        es: 'Última actualización',
        fr: 'Dernière mise à jour'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setDragOver(type);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], type);
    }
  };

  const handleFileUpload = (file, type) => {
    // Simulate file upload
    const newDocument = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file)
    };

    if (type === 'resume') {
      onUpdate({
        ...documents,
        resume: newDocument
      });
    }
  };

  const ResumeUpload = () => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setIsUploading(true);
        setTimeout(() => {
          handleFileUpload(file, 'resume');
          setIsUploading(false);
        }, 1500);
      }
    };

    return (
      <div className="space-y-4">
        {documents.resume ? (
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{documents.resume.name}</h4>
                  <p className="text-sm text-text-secondary">
                    {getText('lastUpdated')}: {new Date(documents.resume.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => setPreviewDocument(documents.resume)}
                >
                  {getText('preview')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                >
                  {getText('download')}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onUpdate({...documents, resume: null})}
                >
                  {getText('delete')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver === 'resume' ?'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-muted'
            }`}
            onDragOver={(e) => handleDragOver(e, 'resume')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'resume')}
          >
            {isUploading ? (
              <div className="space-y-3">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-text-secondary">Uploading resume...</p>
              </div>
            ) : (
              <>
                <Icon name="Upload" size={48} className="text-text-muted mx-auto mb-4" />
                <p className="text-text-primary font-medium mb-2">{getText('dragDropResume')}</p>
                <p className="text-sm text-text-secondary mb-4">PDF, DOC, DOCX up to 10MB</p>
                <label className="inline-block">
                  <Button variant="primary" iconName="Upload">
                    {getText('uploadResume')}
                  </Button>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const CoverLetterTemplates = () => {
    const [isAddingTemplate, setIsAddingTemplate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });
    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleAddTemplate = () => {
      if (newTemplate.name.trim() && newTemplate.content.trim()) {
        const template = {
          id: Date.now(),
          name: newTemplate.name,
          content: newTemplate.content,
          createdDate: new Date().toISOString()
        };
        
        onUpdate({
          ...documents,
          coverLetterTemplates: [...documents.coverLetterTemplates, template]
        });
        
        setNewTemplate({ name: '', content: '' });
        setIsAddingTemplate(false);
      }
    };

    const handleEditTemplate = (template) => {
      const updatedTemplates = documents.coverLetterTemplates.map(t =>
        t.id === template.id ? template : t
      );
      
      onUpdate({
        ...documents,
        coverLetterTemplates: updatedTemplates
      });
      
      setEditingTemplate(null);
    };

    const handleDeleteTemplate = (templateId) => {
      const updatedTemplates = documents.coverLetterTemplates.filter(t => t.id !== templateId);
      onUpdate({
        ...documents,
        coverLetterTemplates: updatedTemplates
      });
    };

    return (
      <div className="space-y-4">
        {documents.coverLetterTemplates.map((template) => (
          <div key={template.id} className="border border-border rounded-lg p-4">
            {editingTemplate?.id === template.id ? (
              <div className="space-y-3">
                <Input
                  type="text"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  placeholder={getText('templateName')}
                />
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({...editingTemplate, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={getText('templateContent')}
                />
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEditTemplate(editingTemplate)}
                  >
                    {getText('save')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingTemplate(null)}
                  >
                    {getText('cancel')}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-text-primary">{template.name}</h4>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Edit"
                      onClick={() => setEditingTemplate(template)}
                    >
                      {getText('edit')}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      {getText('delete')}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-text-secondary line-clamp-3">
                  {template.content}
                </p>
                <p className="text-xs text-text-muted mt-2">
                  Created: {new Date(template.createdDate).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        ))}

        {isAddingTemplate ? (
          <div className="border border-border rounded-lg p-4 space-y-3">
            <Input
              type="text"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
              placeholder={getText('templateName')}
            />
            <textarea
              value={newTemplate.content}
              onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder={getText('templateContent')}
            />
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddTemplate}
              >
                {getText('save')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingTemplate(false);
                  setNewTemplate({ name: '', content: '' });
                }}
              >
                {getText('cancel')}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            iconName="Plus"
            onClick={() => setIsAddingTemplate(true)}
            fullWidth
          >
            {getText('addTemplate')}
          </Button>
        )}
      </div>
    );
  };

  const PortfolioLinks = () => {
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [newLink, setNewLink] = useState({ title: '', url: '', description: '' });

    const handleAddLink = () => {
      if (newLink.title.trim() && newLink.url.trim()) {
        const link = {
          id: Date.now(),
          title: newLink.title,
          url: newLink.url,
          description: newLink.description,
          createdDate: new Date().toISOString()
        };
        
        onUpdate({
          ...documents,
          portfolioLinks: [...documents.portfolioLinks, link]
        });
        
        setNewLink({ title: '', url: '', description: '' });
        setIsAddingLink(false);
      }
    };

    const handleDeleteLink = (linkId) => {
      const updatedLinks = documents.portfolioLinks.filter(l => l.id !== linkId);
      onUpdate({
        ...documents,
        portfolioLinks: updatedLinks
      });
    };

    return (
      <div className="space-y-4">
        {documents.portfolioLinks.map((link) => (
          <div key={link.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{link.title}</h4>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-600 text-sm break-all"
                >
                  {link.url}
                </a>
                {link.description && (
                  <p className="text-sm text-text-secondary mt-1">{link.description}</p>
                )}
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  Visit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => handleDeleteLink(link.id)}
                >
                  {getText('delete')}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {isAddingLink ? (
          <div className="border border-border rounded-lg p-4 space-y-3">
            <Input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink({...newLink, title: e.target.value})}
              placeholder={getText('linkTitle')}
            />
            <Input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
              placeholder={getText('linkUrl')}
            />
            <Input
              type="text"
              value={newLink.description}
              onChange={(e) => setNewLink({...newLink, description: e.target.value})}
              placeholder="Description (optional)"
            />
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddLink}
              >
                {getText('save')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingLink(false);
                  setNewLink({ title: '', url: '', description: '' });
                }}
              >
                {getText('cancel')}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            iconName="Plus"
            onClick={() => setIsAddingLink(true)}
            fullWidth
          >
            {getText('addPortfolioLink')}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Section Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-warning" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            {getText('documents')}
          </h2>
        </div>
      </div>

      {/* Section Content */}
      <div className="p-6 space-y-8">
        {/* Resume Section */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            {getText('resume')}
          </h3>
          <ResumeUpload />
        </div>

        {/* Cover Letter Templates */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            {getText('coverLetters')}
          </h3>
          <CoverLetterTemplates />
        </div>

        {/* Portfolio Links */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">
            {getText('portfolio')}
          </h3>
          <PortfolioLinks />
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop" />
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">
                  {previewDocument.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setPreviewDocument(null)}
                />
              </div>
              <div className="p-4 h-96 bg-muted flex items-center justify-center">
                <p className="text-text-secondary">Document preview would appear here</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentsSection;