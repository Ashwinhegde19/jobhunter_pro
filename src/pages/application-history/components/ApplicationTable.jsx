import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationTable = ({ applications, currentLanguage, onStatusUpdate, onBulkAction }) => {
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'desc' });

  const getText = (key) => {
    const texts = {
      selectAll: {
        en: 'Select All',
        es: 'Seleccionar Todo',
        fr: 'Tout Sélectionner'
      },
      company: {
        en: 'Company',
        es: 'Empresa',
        fr: 'Entreprise'
      },
      position: {
        en: 'Position',
        es: 'Puesto',
        fr: 'Poste'
      },
      appliedDate: {
        en: 'Applied Date',
        es: 'Fecha de Solicitud',
        fr: 'Date de Candidature'
      },
      status: {
        en: 'Status',
        es: 'Estado',
        fr: 'Statut'
      },
      salary: {
        en: 'Salary',
        es: 'Salario',
        fr: 'Salaire'
      },
      actions: {
        en: 'Actions',
        es: 'Acciones',
        fr: 'Actions'
      },
      bulkActions: {
        en: 'Bulk Actions',
        es: 'Acciones en Lote',
        fr: 'Actions en Lot'
      },
      markAsViewed: {
        en: 'Mark as Viewed',
        es: 'Marcar como Visto',
        fr: 'Marquer comme Vu'
      },
      withdraw: {
        en: 'Withdraw Selected',
        es: 'Retirar Seleccionados',
        fr: 'Retirer Sélectionnés'
      },
      export: {
        en: 'Export',
        es: 'Exportar',
        fr: 'Exporter'
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (sortConfig.key === 'appliedDate') {
      const aDate = new Date(a.appliedDate);
      const bDate = new Date(b.appliedDate);
      return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
    }
    
    const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
    const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';
    
    if (sortConfig.direction === 'asc') {
      return aValue.localeCompare(bValue);
    }
    return bValue.localeCompare(aValue);
  });

  const handleSelectAll = () => {
    if (selectedApplications.length === applications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(applications.map(app => app.id));
    }
  };

  const handleSelectApplication = (id) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const SortableHeader = ({ sortKey, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortConfig.key === sortKey && (
          <Icon 
            name={sortConfig.direction === 'asc' ? "ChevronUp" : "ChevronDown"} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-surface">
      {/* Bulk Actions Bar */}
      {selectedApplications.length > 0 && (
        <div className="bg-primary-50 border-b border-border p-4 flex items-center justify-between">
          <span className="text-sm text-text-primary">
            {selectedApplications.length} {currentLanguage === 'en' ? 'selected' : 
                                          currentLanguage === 'es' ? 'seleccionados' : 
                                          'sélectionnés'}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => onBulkAction('markViewed', selectedApplications)}
            >
              {getText('markAsViewed')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => onBulkAction('withdraw', selectedApplications)}
            >
              {getText('withdraw')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => onBulkAction('export', selectedApplications)}
            >
              {getText('export')}
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedApplications.length === applications.length && applications.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <SortableHeader sortKey="company">
                {getText('company')}
              </SortableHeader>
              <SortableHeader sortKey="position">
                {getText('position')}
              </SortableHeader>
              <SortableHeader sortKey="appliedDate">
                {getText('appliedDate')}
              </SortableHeader>
              <SortableHeader sortKey="status">
                {getText('status')}
              </SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                {getText('salary')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                {getText('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {sortedApplications.map((application) => {
              const statusConfig = getStatusConfig(application.status);
              return (
                <tr 
                  key={application.id} 
                  className={`hover:bg-muted transition-colors ${
                    selectedApplications.includes(application.id) ? 'bg-primary-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(application.id)}
                      onChange={() => handleSelectApplication(application.id)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={application.companyLogo}
                        alt={`${application.company} logo`}
                        className="w-8 h-8 rounded object-cover flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {application.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-text-primary">
                      {application.position}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {application.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatDate(application.appliedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                      <Icon name={statusConfig.icon} size={12} />
                      <span>{statusConfig.text[currentLanguage]}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatSalary(application.salaryMin, application.salaryMax)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => window.open(application.jobUrl, '_blank')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MessageSquare"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            {currentLanguage === 'en' ? 'No applications found' : 
             currentLanguage === 'es'? 'No se encontraron solicitudes' : 'Aucune candidature trouvée'}
          </h3>
          <p className="text-text-secondary">
            {currentLanguage === 'en' ? 'Your application history will appear here once you start applying for jobs.' : 
             currentLanguage === 'es'? 'Tu historial de solicitudes aparecerá aquí una vez que comiences a aplicar a trabajos.' : 'Votre historique de candidatures apparaîtra ici une fois que vous commencerez à postuler pour des emplois.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationTable;