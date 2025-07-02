import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import JobPreferencesSection from './components/JobPreferencesSection';
import DocumentsSection from './components/DocumentsSection';
import AccountSettingsSection from './components/AccountSettingsSection';
import Icon from '../../components/AppIcon';


const ProfileManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    memberSince: "January 2024",
    lastUpdated: "2 hours ago",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  // Mock personal information data
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    portfolio: "https://alexjohnson.dev",
    summary: `Passionate full-stack developer with experience in React, Node.js, and cloud technologies. \nSeeking opportunities to contribute to innovative projects and grow within a collaborative team environment. \n\nStrong problem-solving skills and commitment to writing clean, maintainable code.`,
    skills: [
      "JavaScript", "React", "Node.js", "Python", "TypeScript", 
      "MongoDB", "PostgreSQL", "AWS", "Docker", "Git"
    ]
  });

  // Mock job preferences data
  const [jobPreferences, setJobPreferences] = useState({
    targetRoles: ["Full Stack Developer", "Frontend Developer", "Backend Developer"],
    salary: {
      min: 70000,
      max: 120000,
      currency: "USD"
    },
    locations: ["San Francisco, CA", "Remote", "New York, NY"],
    workArrangement: "hybrid",
    experienceLevel: "Entry Level (0-1 years)",
    availability: "immediate",
    companySizes: ["Startup (1-50 employees)", "Small (51-200 employees)"],
    industries: ["Technology", "E-commerce", "Finance"]
  });

  // Mock documents data
  const [documents, setDocuments] = useState({
    resume: {
      id: 1,
      name: "Alex_Johnson_Resume.pdf",
      type: "application/pdf",
      size: 245760,
      uploadDate: "2024-11-15T10:30:00Z",
      url: "/documents/resume.pdf"
    },
    coverLetterTemplates: [
      {
        id: 1,
        name: "General Cover Letter",
        content: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the [Position Title] role at [Company Name]. As a passionate full-stack developer with hands-on experience in modern web technologies, I am excited about the opportunity to contribute to your team.\n\nMy technical skills include proficiency in JavaScript, React, Node.js, and various database technologies. I have successfully completed several projects that demonstrate my ability to build scalable web applications from concept to deployment.\n\nI am particularly drawn to [Company Name] because of [specific reason related to company/role]. I believe my enthusiasm for learning and problem-solving approach would make me a valuable addition to your development team.\n\nThank you for considering my application. I look forward to discussing how I can contribute to your team's success.\n\nBest regards,\nAlex Johnson`,
        createdDate: "2024-11-10T14:20:00Z"
      },
      {
        id: 2,
        name: "Startup-focused Template",
        content: `Dear [Hiring Manager Name],\n\nI am excited to apply for the [Position Title] position at [Company Name]. As someone who thrives in fast-paced, innovative environments, I am drawn to the startup ecosystem and the opportunity to make a meaningful impact.\n\nWith my background in full-stack development and experience with agile methodologies, I understand the importance of wearing multiple hats and adapting quickly to changing requirements. My recent projects have involved building MVPs and scaling applications as user bases grew.\n\nI am particularly interested in [Company Name] because [specific startup-related reason]. I believe my combination of technical skills and entrepreneurial mindset would be valuable as you continue to grow and evolve.\n\nI would love the opportunity to discuss how I can contribute to your team's mission and help drive your product forward.\n\nBest regards,\nAlex Johnson`,
        createdDate: "2024-11-12T09:15:00Z"
      }
    ],
    portfolioLinks: [
      {
        id: 1,
        title: "E-commerce Platform",
        url: "https://github.com/alexjohnson/ecommerce-platform",
        description: "Full-stack e-commerce application built with React, Node.js, and MongoDB",
        createdDate: "2024-11-08T16:45:00Z"
      },
      {
        id: 2,
        title: "Task Management App",
        url: "https://taskmanager-demo.netlify.app",
        description: "React-based task management application with real-time updates",
        createdDate: "2024-11-05T11:30:00Z"
      }
    ]
  });

  // Mock account settings data
  const [accountSettings, setAccountSettings] = useState({
    notifications: {
      email: true,
      push: true,
      jobAlerts: true,
      weeklyReports: false,
      systemUpdates: true
    },
    automation: {
      schedule: "daily",
      dailyLimit: 25,
      rateLimiting: true,
      autoRetry: true
    },
    privacy: {
      profileVisibility: "recruiters",
      dataSharing: false,
      twoFactorAuth: false
    }
  });

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
      profileManagement: {
        en: 'Profile Management',
        es: 'Gestión de Perfil',
        fr: 'Gestion du Profil'
      },
      personalInfo: {
        en: 'Personal Info',
        es: 'Info Personal',
        fr: 'Info Personnelle'
      },
      jobPreferences: {
        en: 'Job Preferences',
        es: 'Preferencias',
        fr: 'Préférences'
      },
      documents: {
        en: 'Documents',
        es: 'Documentos',
        fr: 'Documents'
      },
      accountSettings: {
        en: 'Account Settings',
        es: 'Configuración',
        fr: 'Paramètres'
      },
      lastSaved: {
        en: 'Last saved',
        es: 'Guardado por última vez',
        fr: 'Dernière sauvegarde'
      },
      autoSaving: {
        en: 'Auto-saving...',
        es: 'Guardando automáticamente...',
        fr: 'Sauvegarde automatique...'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const sections = [
    { id: 'personal', label: getText('personalInfo'), icon: 'User' },
    { id: 'preferences', label: getText('jobPreferences'), icon: 'Briefcase' },
    { id: 'documents', label: getText('documents'), icon: 'FileText' },
    { id: 'settings', label: getText('accountSettings'), icon: 'Settings' }
  ];

  const handleAutoSave = async (data, type) => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    handleAutoSave(updatedProfile, 'profile');
  };

  const handlePersonalInfoUpdate = (updatedInfo) => {
    setPersonalInfo(updatedInfo);
    handleAutoSave(updatedInfo, 'personalInfo');
  };

  const handleJobPreferencesUpdate = (updatedPreferences) => {
    setJobPreferences(updatedPreferences);
    handleAutoSave(updatedPreferences, 'jobPreferences');
  };

  const handleDocumentsUpdate = (updatedDocuments) => {
    setDocuments(updatedDocuments);
    handleAutoSave(updatedDocuments, 'documents');
  };

  const handleAccountSettingsUpdate = (updatedSettings) => {
    setAccountSettings(updatedSettings);
    handleAutoSave(updatedSettings, 'accountSettings');
  };

  const handlePhotoUpdate = (newPhotoUrl) => {
    const updatedProfile = { ...userProfile, profilePhoto: newPhotoUrl };
    setUserProfile(updatedProfile);
    handleAutoSave(updatedProfile, 'profile');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            personalInfo={personalInfo}
            onUpdate={handlePersonalInfoUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'preferences':
        return (
          <JobPreferencesSection
            jobPreferences={jobPreferences}
            onUpdate={handleJobPreferencesUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'documents':
        return (
          <DocumentsSection
            documents={documents}
            onUpdate={handleDocumentsUpdate}
            currentLanguage={currentLanguage}
          />
        );
      case 'settings':
        return (
          <AccountSettingsSection
            accountSettings={accountSettings}
            onUpdate={handleAccountSettingsUpdate}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return (
          <PersonalInfoSection
            personalInfo={personalInfo}
            onUpdate={handlePersonalInfoUpdate}
            currentLanguage={currentLanguage}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{getText('profileManagement')} - JobHunter Pro</title>
        <meta name="description" content="Manage your profile, job preferences, documents, and account settings for optimal automated job application performance." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:pl-64 pt-nav min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <ProfileHeader
              userProfile={userProfile}
              onPhotoUpdate={handlePhotoUpdate}
              currentLanguage={currentLanguage}
            />

            {/* Auto-save Status */}
            {(isSaving || lastSaved) && (
              <div className="mb-6 flex items-center justify-center">
                <div className="bg-surface border border-border rounded-lg px-4 py-2 flex items-center space-x-2">
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-text-secondary">{getText('autoSaving')}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm text-text-secondary">
                        {getText('lastSaved')}: {lastSaved?.toLocaleTimeString()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Desktop Sidebar Navigation */}
              <div className="hidden lg:block">
                <div className="bg-surface border border-border rounded-lg p-4 sticky top-24">
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-primary-50 text-primary border-l-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                        }`}
                      >
                        <Icon name={section.icon} size={18} />
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Mobile Section Selector */}
              <div className="lg:hidden mb-6">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <select
                    value={activeSection}
                    onChange={(e) => setActiveSection(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {renderSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileManagement;