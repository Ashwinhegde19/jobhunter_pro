import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ApplicationSummaryHeader from './components/ApplicationSummaryHeader';
import ApplicationFilters from './components/ApplicationFilters';
import ApplicationListItem from './components/ApplicationListItem';
import ApplicationTable from './components/ApplicationTable';
import ExportDialog from './components/ExportDialog';

const ApplicationHistory = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock applications data
  const [applications] = useState([
    {
      id: 1,
      company: "TechCorp Solutions",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      position: "Frontend Developer Intern",
      location: "San Francisco, CA",
      appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "interview",
      salaryMin: 60,
      salaryMax: 80,
      jobUrl: "https://example.com/job1",
      coverLetterTemplate: "Tech Internship Template",
      resumeVersion: "Frontend Resume v2.1",
      timeline: [
        {
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          type: "submitted",
          description: {
            en: "Application submitted",
            es: "Solicitud enviada",
            fr: "Candidature soumise"
          }
        },
        {
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          type: "viewed",
          description: {
            en: "Application viewed by recruiter",
            es: "Solicitud vista por reclutador",
            fr: "Candidature vue par le recruteur"
          }
        },
        {
          date: new Date(Date.now() - 4 * 60 * 60 * 1000),
          type: "interview",
          description: {
            en: "Interview scheduled for tomorrow",
            es: "Entrevista programada para mañana",
            fr: "Entretien programmé pour demain"
          }
        }
      ],
      notes: [
        {
          text: "Great company culture, really excited about this opportunity!",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 2,
      company: "StartupXYZ",
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
      position: "Full Stack Developer",
      location: "Remote",
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "viewed",
      salaryMin: 70,
      salaryMax: 90,
      jobUrl: "https://example.com/job2",
      coverLetterTemplate: "Remote Work Template",
      resumeVersion: "Full Stack Resume v1.8",
      timeline: [
        {
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          type: "submitted",
          description: {
            en: "Application submitted",
            es: "Solicitud enviada",
            fr: "Candidature soumise"
          }
        },
        {
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          type: "viewed",
          description: {
            en: "Application viewed by hiring manager",
            es: "Solicitud vista por gerente de contratación",
            fr: "Candidature vue par le responsable du recrutement"
          }
        }
      ],
      notes: []
    },
    {
      id: 3,
      company: "AI Innovations Inc",
      companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center",
      position: "Machine Learning Intern",
      location: "Boston, MA",
      appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "submitted",
      salaryMin: 50,
      salaryMax: 65,
      jobUrl: "https://example.com/job3",
      coverLetterTemplate: "AI/ML Template",
      resumeVersion: "AI Resume v1.2",
      timeline: [
        {
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          type: "submitted",
          description: {
            en: "Application submitted",
            es: "Solicitud enviada",
            fr: "Candidature soumise"
          }
        }
      ],
      notes: []
    },
    {
      id: 4,
      company: "WebDev Agency",
      companyLogo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=100&h=100&fit=crop&crop=center",
      position: "Junior Web Developer",
      location: "New York, NY",
      appliedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: "rejected",
      salaryMin: 55,
      salaryMax: 70,
      jobUrl: "https://example.com/job4",
      coverLetterTemplate: "Junior Developer Template",
      resumeVersion: "Web Dev Resume v2.0",
      timeline: [
        {
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          type: "submitted",
          description: {
            en: "Application submitted",
            es: "Solicitud enviada",
            fr: "Candidature soumise"
          }
        },
        {
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
          type: "viewed",
          description: {
            en: "Application reviewed",
            es: "Solicitud revisada",
            fr: "Candidature examinée"
          }
        },
        {
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          type: "rejected",
          description: {
            en: "Application rejected - position filled",
            es: "Solicitud rechazada - puesto ocupado",
            fr: "Candidature rejetée - poste pourvu"
          }
        }
      ],
      notes: [
        {
          text: "Position was filled internally. Good feedback on portfolio though.",
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 5,
      company: "Future Tech Labs",
      companyLogo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=center",
      position: "React Developer",
      location: "Austin, TX",
      appliedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      status: "offer",
      salaryMin: 75,
      salaryMax: 95,
      jobUrl: "https://example.com/job5",
      coverLetterTemplate: "React Specialist Template",
      resumeVersion: "React Resume v1.5",
      timeline: [
        {
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          type: "submitted",
          description: {
            en: "Application submitted",
            es: "Solicitud enviada",
            fr: "Candidature soumise"
          }
        },
        {
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          type: "viewed",
          description: {
            en: "Application reviewed",
            es: "Solicitud revisada",
            fr: "Candidature examinée"
          }
        },
        {
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
          type: "interview",
          description: {
            en: "First interview completed",
            es: "Primera entrevista completada",
            fr: "Premier entretien terminé"
          }
        },
        {
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          type: "offer",
          description: {
            en: "Job offer received",
            es: "Oferta de trabajo recibida",
            fr: "Offre d'emploi reçue"
          }
        }
      ],
      notes: [
        {
          text: "Excellent interview process. Team seems very collaborative.",
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
        },
        {
          text: "Offer includes equity and great benefits package!",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        }
      ]
    }
  ]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredApplications(applications);
    }, 1000);

    return () => clearTimeout(timer);
  }, [applications]);

  const handleFiltersChange = (filters) => {
    let filtered = [...applications];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(searchTerm) ||
        app.position.toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const days = parseInt(filters.dateRange);
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(app => new Date(app.appliedDate) >= cutoffDate);
    }

    // Category filter
    if (filters.category !== 'all') {
      const categoryKeywords = {
        'web-developer': ['web developer', 'frontend', 'front-end'],
        'full-stack': ['full stack', 'fullstack'],
        'ai-ml': ['machine learning', 'ai', 'artificial intelligence', 'ml'],
        'internship': ['intern', 'internship']
      };
      
      const keywords = categoryKeywords[filters.category] || [];
      filtered = filtered.filter(app => 
        keywords.some(keyword => 
          app.position.toLowerCase().includes(keyword)
        )
      );
    }

    // Company filter
    if (filters.company) {
      const companyTerm = filters.company.toLowerCase();
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(companyTerm)
      );
    }

    setFilteredApplications(filtered);
  };

  const handleStatusUpdate = (applicationId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating application ${applicationId} to status: ${newStatus}`);
  };

  const handleAddNote = (applicationId, noteText) => {
    // In a real app, this would make an API call
    console.log(`Adding note to application ${applicationId}: ${noteText}`);
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Performing bulk action ${action} on applications:`, selectedIds);
    
    switch (action) {
      case 'export':
        setShowExportDialog(true);
        break;
      case 'markViewed':
        // Update status for selected applications
        break;
      case 'withdraw':
        // Withdraw selected applications
        break;
      default:
        break;
    }
  };

  const handleExport = async (exportConfig) => {
    // Simulate export process
    console.log('Exporting applications with config:', exportConfig);
    
    // In a real app, this would generate and download the file
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock download
    const data = filteredApplications.map(app => ({
      company: app.company,
      position: app.position,
      appliedDate: app.appliedDate.toISOString(),
      status: app.status,
      salary: `$${app.salaryMin}k - $${app.salaryMax}k`,
      ...(exportConfig.includeNotes && { notes: app.notes.map(n => n.text).join('; ') })
    }));
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${new Date().toISOString().split('T')[0]}.${exportConfig.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getText = (key) => {
    const texts = {
      listView: {
        en: 'List View',
        es: 'Vista de Lista',
        fr: 'Vue Liste'
      },
      tableView: {
        en: 'Table View',
        es: 'Vista de Tabla',
        fr: 'Vue Tableau'
      },
      exportAll: {
        en: 'Export All',
        es: 'Exportar Todo',
        fr: 'Tout Exporter'
      },
      refresh: {
        en: 'Refresh',
        es: 'Actualizar',
        fr: 'Actualiser'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-secondary">
                  {currentLanguage === 'en' ? 'Loading application history...' : 
                   currentLanguage === 'es' ? 'Cargando historial de solicitudes...' : 
                   'Chargement de l\'historique des candidatures...'}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          {/* Summary Header */}
          <ApplicationSummaryHeader 
            applications={applications}
            currentLanguage={currentLanguage}
          />

          {/* Filters */}
          <ApplicationFilters 
            onFiltersChange={handleFiltersChange}
            currentLanguage={currentLanguage}
          />

          {/* View Controls */}
          <div className="bg-surface border-b border-border px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">
                  {filteredApplications.length} {currentLanguage === 'en' ? 'applications' : 
                                                 currentLanguage === 'es'? 'solicitudes' : 'candidatures'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => window.location.reload()}
                >
                  {getText('refresh')}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => setShowExportDialog(true)}
                >
                  {getText('exportAll')}
                </Button>

                {/* View Mode Toggle */}
                <div className="hidden lg:flex border border-border rounded-md">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      viewMode === 'table' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Table" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Applications List/Table */}
          <div className="p-4 lg:p-6">
            {viewMode === 'list' || window.innerWidth < 1024 ? (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <ApplicationListItem
                    key={application.id}
                    application={application}
                    currentLanguage={currentLanguage}
                    onStatusUpdate={handleStatusUpdate}
                    onAddNote={handleAddNote}
                  />
                ))}
              </div>
            ) : (
              <ApplicationTable
                applications={filteredApplications}
                currentLanguage={currentLanguage}
                onStatusUpdate={handleStatusUpdate}
                onBulkAction={handleBulkAction}
              />
            )}
          </div>

          {/* Bottom Padding for Mobile Navigation */}
          <div className="h-20 lg:hidden" />
        </main>
      </div>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
        currentLanguage={currentLanguage}
        totalApplications={filteredApplications.length}
      />
    </div>
  );
};

export default ApplicationHistory;