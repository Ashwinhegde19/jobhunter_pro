import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import AnalyticsDashboard from "pages/analytics-dashboard";
import ApplicationTemplates from "pages/application-templates";
import ApplicationHistory from "pages/application-history";
import ProfileManagement from "pages/profile-management";
import JobSearchConfiguration from "pages/job-search-configuration";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/application-templates" element={<ApplicationTemplates />} />
        <Route path="/application-history" element={<ApplicationHistory />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/job-search-configuration" element={<JobSearchConfiguration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;