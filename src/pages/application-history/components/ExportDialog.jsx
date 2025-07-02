import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportDialog = ({ isOpen, onClose, onExport, currentLanguage, totalApplications }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'all',
    includeNotes: true,
    includeTimeline: false,
    customDateStart: '',
    customDateEnd: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  const getText = (key) => {
    const texts = {
      exportApplications: {
        en: 'Export Applications',
        es: 'Exportar Solicitudes',
        fr: 'Exporter les Candidatures'
      },
      exportFormat: {
        en: 'Export Format',
        es: 'Formato de Exportación',
        fr: 'Format d\'Exportation'
      },
      dateRange: {
        en: 'Date Range',
        es: 'Rango de Fechas',
        fr: 'Plage de Dates'
      },
      allTime: {
        en: 'All Time',
        es: 'Todo el Tiempo',
        fr: 'Toute la Période'
      },
      last30Days: {
        en: 'Last 30 Days',
        es: 'Últimos 30 Días',
        fr: '30 Derniers Jours'
      },
      last90Days: {
        en: 'Last 90 Days',
        es: 'Últimos 90 Días',
        fr: '90 Derniers Jours'
      },
      customRange: {
        en: 'Custom Range',
        es: 'Rango Personalizado',
        fr: 'Plage Personnalisée'
      },
      startDate: {
        en: 'Start Date',
        es: 'Fecha de Inicio',
        fr: 'Date de Début'
      },
      endDate: {
        en: 'End Date',
        es: 'Fecha de Fin',
        fr: 'Date de Fin'
      },
      includeOptions: {
        en: 'Include Options',
        es: 'Opciones de Inclusión',
        fr: 'Options d\'Inclusion'
      },
      includeNotes: {
        en: 'Include Notes',
        es: 'Incluir Notas',
        fr: 'Inclure les Notes'
      },
      includeTimeline: {
        en: 'Include Timeline',
        es: 'Incluir Cronología',
        fr: 'Inclure la Chronologie'
      },
      exportSummary: {
        en: 'Export Summary',
        es: 'Resumen de Exportación',
        fr: 'Résumé d\'Exportation'
      },
      totalApplications: {
        en: 'Total Applications',
        es: 'Solicitudes Totales',
        fr: 'Candidatures Totales'
      },
      estimatedFileSize: {
        en: 'Estimated File Size',
        es: 'Tamaño de Archivo Estimado',
        fr: 'Taille de Fichier Estimée'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler'
      },
      exportData: {
        en: 'Export Data',
        es: 'Exportar Datos',
        fr: 'Exporter les Données'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({ ...prev, [key]: value }));
  };

  const getEstimatedFileSize = () => {
    const baseSize = totalApplications * 0.5; // KB per application
    const notesMultiplier = exportConfig.includeNotes ? 1.5 : 1;
    const timelineMultiplier = exportConfig.includeTimeline ? 2 : 1;
    const totalSize = baseSize * notesMultiplier * timelineMultiplier;
    
    if (totalSize < 1024) {
      return `${Math.round(totalSize)} KB`;
    }
    return `${(totalSize / 1024).toFixed(1)} MB`;
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportConfig);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop" onClick={onClose} />
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">
                {getText('exportApplications')}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>

            {/* Export Format */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getText('exportFormat')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['csv', 'json', 'xlsx'].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleConfigChange('format', format)}
                    className={`p-2 rounded-md text-sm font-medium transition-colors ${
                      exportConfig.format === format
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary hover:bg-secondary-100'
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getText('dateRange')}
              </label>
              <select
                value={exportConfig.dateRange}
                onChange={(e) => handleConfigChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">{getText('allTime')}</option>
                <option value="30">{getText('last30Days')}</option>
                <option value="90">{getText('last90Days')}</option>
                <option value="custom">{getText('customRange')}</option>
              </select>

              {exportConfig.dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">
                      {getText('startDate')}
                    </label>
                    <Input
                      type="date"
                      value={exportConfig.customDateStart}
                      onChange={(e) => handleConfigChange('customDateStart', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">
                      {getText('endDate')}
                    </label>
                    <Input
                      type="date"
                      value={exportConfig.customDateEnd}
                      onChange={(e) => handleConfigChange('customDateEnd', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Include Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getText('includeOptions')}
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exportConfig.includeNotes}
                    onChange={(e) => handleConfigChange('includeNotes', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{getText('includeNotes')}</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exportConfig.includeTimeline}
                    onChange={(e) => handleConfigChange('includeTimeline', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{getText('includeTimeline')}</span>
                </label>
              </div>
            </div>

            {/* Export Summary */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                {getText('exportSummary')}
              </h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>{getText('totalApplications')}:</span>
                  <span>{totalApplications}</span>
                </div>
                <div className="flex justify-between">
                  <span>{getText('estimatedFileSize')}:</span>
                  <span>{getEstimatedFileSize()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 justify-end">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isExporting}
              >
                {getText('cancel')}
              </Button>
              <Button
                variant="primary"
                onClick={handleExport}
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
              >
                {getText('exportData')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportDialog;