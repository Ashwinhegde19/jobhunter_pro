import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TemplateFilters = ({ onFilterChange, onSortChange, totalCount }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    jobType: 'all',
    sortBy: 'lastModified',
    sortOrder: 'desc'
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy, sortOrder = filters.sortOrder) => {
    const newFilters = { ...filters, sortBy, sortOrder };
    setFilters(newFilters);
    onSortChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      type: 'all',
      jobType: 'all',
      sortBy: 'lastModified',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = filters.search || filters.type !== 'all' || filters.jobType !== 'all';

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Main Filter Bar */}
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Quick Filters */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <Input
                type="search"
                placeholder="Search templates..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Type Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleFilterChange('type', 'all')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filters.type === 'all' ?'bg-primary-100 text-primary-800 border border-primary-200' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => handleFilterChange('type', 'cover-letter')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filters.type === 'cover-letter'
                    ? 'bg-primary-100 text-primary-800 border border-primary-200' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Cover Letters
              </button>
              <button
                onClick={() => handleFilterChange('type', 'resume')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filters.type === 'resume' ?'bg-primary-100 text-primary-800 border border-primary-200' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Resumes
              </button>
            </div>
          </div>

          {/* Sort and Actions */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleSortChange(sortBy, sortOrder);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="lastModified-desc">Recently Modified</option>
                <option value="lastModified-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="usageCount-desc">Most Used</option>
                <option value="responseRate-desc">Best Performance</option>
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
              />
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Filters
            </Button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-gray-500">
          {totalCount} template{totalCount !== 1 ? 's' : ''} found
          {hasActiveFilters && ' (filtered)'}
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Job Types</option>
                <option value="web-developer">Web Developer</option>
                <option value="full-stack">Full Stack Developer</option>
                <option value="ai-intern">AI Intern</option>
                <option value="ai-developer">AI Developer</option>
                <option value="internship">General Internship</option>
              </select>
            </div>

            {/* Performance Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Performance
              </label>
              <select
                value={filters.performance || 'all'}
                onChange={(e) => handleFilterChange('performance', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Performance</option>
                <option value="high">High Response Rate (&gt;20%)</option>
                <option value="medium">Medium Response Rate (10-20%)</option>
                <option value="low">Low Response Rate (&lt;10%)</option>
                <option value="unused">Never Used</option>
              </select>
            </div>

            {/* Usage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usage
              </label>
              <select
                value={filters.usage || 'all'}
                onChange={(e) => handleFilterChange('usage', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Templates</option>
                <option value="frequently-used">Frequently Used (&gt;10)</option>
                <option value="occasionally-used">Occasionally Used (1-10)</option>
                <option value="unused">Never Used</option>
                <option value="default">Default Templates</option>
              </select>
            </div>
          </div>

          {/* Filter Tags */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {filters.search && (
                  <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    Search: "{filters.search}"
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="ml-1 hover:text-primary-900"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                )}
                {filters.type !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    Type: {filters.type.replace('-', ' ')}
                    <button
                      onClick={() => handleFilterChange('type', 'all')}
                      className="ml-1 hover:text-primary-900"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                )}
                {filters.jobType !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    Job: {filters.jobType.replace('-', ' ')}
                    <button
                      onClick={() => handleFilterChange('jobType', 'all')}
                      className="ml-1 hover:text-primary-900"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateFilters;