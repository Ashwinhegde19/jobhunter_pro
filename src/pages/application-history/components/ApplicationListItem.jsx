import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationListItem = ({ application, currentLanguage, onStatusUpdate, onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState('');

  const getText = (key) => {
    const texts = {
      appliedOn: {
        en: 'Applied on',
        es: 'Aplicado el',
        fr: 'Postulé le'
      },
      salary: {
        en: 'Salary',
        es: 'Salario',
        fr: 'Salaire'
      },
      viewDetails: {
        en: 'View Details',
        es: 'Ver Detalles',
        fr: 'Voir les Détails'
      },
      hideDetails: {
        en: 'Hide Details',
        es: 'Ocultar Detalles',
        fr: 'Masquer les Détails'
      },
      addNote: {
        en: 'Add Note',
        es: 'Agregar Nota',
        fr: 'Ajouter une Note'
      },
      followUp: {
        en: 'Follow Up',
        es: 'Seguimiento',
        fr: 'Suivi'
      },
      withdraw: {
        en: 'Withdraw',
        es: 'Retirar',
        fr: 'Retirer'
      },
      coverLetter: {
        en: 'Cover Letter',
        es: 'Carta de Presentación',
        fr: 'Lettre de Motivation'
      },
      resume: {
        en: 'Resume',
        es: 'Currículum',
        fr: 'CV'
      },
      applicationTimeline: {
        en: 'Application Timeline',
        es: 'Cronología de la Solicitud',
        fr: 'Chronologie de la Candidature'
      },
      saveNote: {
        en: 'Save Note',
        es: 'Guardar Nota',
        fr: 'Enregistrer la Note'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: {
        color: 'bg-primary text-primary-foreground',
        icon: 'Send',
        text: {
          en: 'Submitted',
          es: 'Enviado',
          fr: 'Soumis'
        }
      },
      viewed: {
        color: 'bg-accent text-accent-foreground',
        icon: 'Eye',
        text: {
          en: 'Viewed',
          es: 'Visto',
          fr: 'Vu'
        }
      },
      interview: {
        color: 'bg-success text-success-foreground',
        icon: 'Calendar',
        text: {
          en: 'Interview',
          es: 'Entrevista',
          fr: 'Entretien'
        }
      },
      rejected: {
        color: 'bg-error text-error-foreground',
        icon: 'X',
        text: {
          en: 'Rejected',
          es: 'Rechazado',
          fr: 'Rejeté'
        }
      },
      offer: {
        color: 'bg-success text-success-foreground',
        icon: 'CheckCircle',
        text: {
          en: 'Offer',
          es: 'Oferta',
          fr: 'Offre'
        }
      }
    };
    return configs[status] || configs.submitted;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      currentLanguage === 'en' ? 'en-US' : 
      currentLanguage === 'es' ? 'es-ES' : 'fr-FR',
      { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }
    );
  };

  const formatSalary = (min, max, currency = '$') => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `${currency}${min}k - ${currency}${max}k`;
    if (min) return `${currency}${min}k+`;
    return `Up to ${currency}${max}k`;
  };

  const statusConfig = getStatusConfig(application.status);

  const handleSaveNote = () => {
    if (noteText.trim()) {
      onAddNote(application.id, noteText.trim());
      setNoteText('');
      setShowNoteDialog(false);
    }
  };

  const NoteDialog = () => {
    if (!showNoteDialog) return null;

    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop" onClick={() => setShowNoteDialog(false)} />
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full animate-fade-in">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {getText('addNote')}
              </h3>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={currentLanguage === 'en' ? 'Add your note here...' : 
                            currentLanguage === 'es'? 'Agrega tu nota aquí...' : 'Ajoutez votre note ici...'}
                className="w-full h-32 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex space-x-3 justify-end mt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowNoteDialog(false)}
                >
                  {getText('cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveNote}
                  disabled={!noteText.trim()}
                >
                  {getText('saveNote')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-start space-x-3 mb-3">
            <Image
              src={application.companyLogo}
              alt={`${application.company} logo`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary truncate">
                {application.position}
              </h3>
              <p className="text-sm text-text-secondary truncate">
                {application.company}
              </p>
              <p className="text-xs text-text-muted">
                {getText('appliedOn')} {formatDate(application.appliedDate)}
              </p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusConfig.color}`}>
              <Icon name={statusConfig.icon} size={12} />
              <span>{statusConfig.text[currentLanguage]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {formatSalary(application.salaryMin, application.salaryMax)}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? getText('hideDetails') : getText('viewDetails')}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Image
              src={application.companyLogo}
              alt={`${application.company} logo`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary">
                {application.position}
              </h3>
              <p className="text-sm text-text-secondary">
                {application.company}
              </p>
            </div>
            <div className="text-sm text-text-secondary">
              {formatDate(application.appliedDate)}
            </div>
            <div className="text-sm text-text-secondary">
              {formatSalary(application.salaryMin, application.salaryMax)}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusConfig.color}`}>
              <Icon name={statusConfig.icon} size={14} />
              <span>{statusConfig.text[currentLanguage]}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageSquare"
              onClick={() => setShowNoteDialog(true)}
            >
              {getText('addNote')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Mail"
            >
              {getText('followUp')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-text-primary mb-2">
                  {getText('applicationTimeline')}
                </h4>
                <div className="space-y-2">
                  {application.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        event.type === 'submitted' ? 'bg-primary' :
                        event.type === 'viewed' ? 'bg-accent' :
                        event.type === 'interview'? 'bg-success' : 'bg-error'
                      }`} />
                      <span className="text-text-secondary">
                        {formatDate(event.date)} - {event.description[currentLanguage]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-2">
                  {currentLanguage === 'en' ? 'Application Materials' : 
                   currentLanguage === 'es'? 'Materiales de Solicitud' : 'Matériaux de Candidature'}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="FileText" size={16} className="text-text-secondary" />
                    <span className="text-text-secondary">
                      {getText('coverLetter')}: {application.coverLetterTemplate}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <span className="text-text-secondary">
                      {getText('resume')}: {application.resumeVersion}
                    </span>
                  </div>
                </div>

                {application.notes && application.notes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-text-primary mb-2">
                      {currentLanguage === 'en' ? 'Notes' : 
                       currentLanguage === 'es'? 'Notas' : 'Notes'}
                    </h4>
                    <div className="space-y-2">
                      {application.notes.map((note, index) => (
                        <div key={index} className="bg-muted p-2 rounded text-sm">
                          <p className="text-text-primary">{note.text}</p>
                          <p className="text-xs text-text-muted mt-1">
                            {formatDate(note.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex space-x-2 mt-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageSquare"
                onClick={() => setShowNoteDialog(true)}
                fullWidth
              >
                {getText('addNote')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Mail"
                fullWidth
              >
                {getText('followUp')}
              </Button>
            </div>
          </div>
        )}
      </div>

      <NoteDialog />
    </>
  );
};

export default ApplicationListItem;