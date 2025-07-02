import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportPanel = ({ onExport, loading = false }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportRange, setExportRange] = useState('30');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getText = (key) => {
    const texts = {
      exportData: {
        en: 'Export Data',
        es: 'Exportar Datos',
        fr: 'Exporter les Données'
      },
      format: {
        en: 'Format',
        es: 'Formato',
        fr: 'Format'
      },
      dateRange: {
        en: 'Date Range',
        es: 'Rango de Fechas',
        fr: 'Plage de Dates'
      },
      export: {
        en: 'Export',
        es: 'Exportar',
        fr: 'Exporter'
      },
      exporting: {
        en: 'Exporting...',
        es: 'Exportando...',
        fr: 'Exportation...'
      },
      last30Days: {
        en: 'Last 30 days',
        es: 'Últimos 30 días',
        fr: '30 derniers jours'
      },
      last90Days: {
        en: 'Last 90 days',
        es: 'Últimos 90 días',
        fr: '90 derniers jours'
      },
      allTime: {
        en: 'All time',
        es: 'Todo el tiempo',
        fr: 'Tout le temps'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: 'FileText' },
    { value: 'excel', label: 'Excel', icon: 'FileSpreadsheet' },
    { value: 'pdf', label: 'PDF', icon: 'FileText' },
    { value: 'json', label: 'JSON', icon: 'Code' }
  ];

  const rangeOptions = [
    { value: '30', label: getText('last30Days') },
    { value: '90', label: getText('last90Days') },
    { value: 'all', label: getText('allTime') }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data based on format
      const mockData = generateMockExportData();
      
      // Create and download file
      downloadFile(mockData, exportFormat);
      
      if (onExport) {
        onExport({ format: exportFormat, range: exportRange });
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateMockExportData = () => {
    const data = [
      {
        date: '2024-01-15',
        company: 'TechCorp Inc',
        position: 'Frontend Developer',
        platform: 'LinkedIn',
        status: 'Applied',
        responseTime: '3 days',
        template: 'Template A'
      },
      {
        date: '2024-01-14',
        company: 'StartupXYZ',
        position: 'Full Stack Intern',
        platform: 'Indeed',
        status: 'Interview',
        responseTime: '1 day',
        template: 'Template B'
      },
      {
        date: '2024-01-13',
        company: 'AI Solutions Ltd',
        position: 'AI Developer',
        platform: 'Glassdoor',
        status: 'Viewed',
        responseTime: '5 days',
        template: 'Template C'
      }
    ];

    return data;
  };

  const downloadFile = (data, format) => {
    let content, mimeType, filename;

    switch (format) {
      case 'csv':
        content = convertToCSV(data);
        mimeType = 'text/csv';
        filename = `job_applications_${exportRange}days.csv`;
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        filename = `job_applications_${exportRange}days.json`;
        break;
      case 'excel': // For demo purposes, we'll export as CSV with Excel extension
        content = convertToCSV(data);
        mimeType = 'application/vnd.ms-excel';
        filename = `job_applications_${exportRange}days.xlsx`;
        break;
      case 'pdf': // For demo purposes, we'll create a simple text file
        content = convertToPDFText(data);
        mimeType = 'application/pdf';
        filename = `job_applications_${exportRange}days.pdf`;
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const convertToPDFText = (data) => {
    let content = 'Job Applications Report\n\n';
    data.forEach((item, index) => {
      content += `Application ${index + 1}:\n`;
      Object.entries(item).forEach(([key, value]) => {
        content += `${key}: ${value}\n`;
      });
      content += '\n';
    });
    return content;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon name="Download" size={20} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{getText('exportData')}</h3>
      </div>

      <div className="space-y-4">
        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('format')}</label>
          <div className="grid grid-cols-2 gap-2">
            {formatOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setExportFormat(option.value)}
                disabled={loading || isExporting}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  exportFormat === option.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:bg-muted text-text-secondary'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">{getText('dateRange')}</label>
          <select
            value={exportRange}
            onChange={(e) => setExportRange(e.target.value)}
            disabled={loading || isExporting}
            className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {rangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Export Button */}
        <Button
          variant="primary"
          onClick={handleExport}
          loading={isExporting}
          disabled={loading}
          fullWidth
          iconName="Download"
          iconPosition="left"
        >
          {isExporting ? getText('exporting') : getText('export')}
        </Button>

        {/* Export Info */}
        <div className="mt-4 p-3 bg-muted bg-opacity-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="mb-1">Export includes:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Application details and timestamps</li>
                <li>Company and position information</li>
                <li>Response rates and status updates</li>
                <li>Template performance metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;