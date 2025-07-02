import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SalaryRangeSection = ({ onSalaryChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(true);
  const [salarySettings, setSalarySettings] = useState({
    currency: 'USD',
    minSalary: 45000,
    maxSalary: 85000,
    salaryType: 'annual', // annual, hourly
    negotiable: true
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

  const currencies = [
    { code: 'USD', symbol: '$', name: { en: 'US Dollar', es: 'Dólar Estadounidense', fr: 'Dollar Américain' } },
    { code: 'EUR', symbol: '€', name: { en: 'Euro', es: 'Euro', fr: 'Euro' } },
    { code: 'GBP', symbol: '£', name: { en: 'British Pound', es: 'Libra Esterlina', fr: 'Livre Sterling' } },
    { code: 'INR', symbol: '₹', name: { en: 'Indian Rupee', es: 'Rupia India', fr: 'Roupie Indienne' } }
  ];

  const salaryRanges = {
    USD: {
      annual: { min: 35000, max: 150000, step: 5000, entry: [45000, 85000] },
      hourly: { min: 15, max: 75, step: 2, entry: [20, 40] }
    },
    EUR: {
      annual: { min: 30000, max: 120000, step: 5000, entry: [40000, 70000] },
      hourly: { min: 12, max: 60, step: 2, entry: [18, 35] }
    },
    GBP: {
      annual: { min: 25000, max: 100000, step: 5000, entry: [35000, 60000] },
      hourly: { min: 10, max: 50, step: 2, entry: [15, 30] }
    },
    INR: {
      annual: { min: 300000, max: 2000000, step: 50000, entry: [400000, 800000] },
      hourly: { min: 200, max: 2000, step: 50, entry: [300, 600] }
    }
  };

  const getText = (key) => {
    const texts = {
      salaryRange: {
        en: 'Salary Range',
        es: 'Rango Salarial',
        fr: 'Fourchette Salariale'
      },
      setSalaryExpectations: {
        en: 'Set your salary expectations and preferences',
        es: 'Establece tus expectativas y preferencias salariales',
        fr: 'Définissez vos attentes et préférences salariales'
      },
      currency: {
        en: 'Currency',
        es: 'Moneda',
        fr: 'Devise'
      },
      salaryType: {
        en: 'Salary Type',
        es: 'Tipo de Salario',
        fr: 'Type de Salaire'
      },
      annual: {
        en: 'Annual',
        es: 'Anual',
        fr: 'Annuel'
      },
      hourly: {
        en: 'Hourly',
        es: 'Por Hora',
        fr: 'Horaire'
      },
      minimum: {
        en: 'Minimum',
        es: 'Mínimo',
        fr: 'Minimum'
      },
      maximum: {
        en: 'Maximum',
        es: 'Máximo',
        fr: 'Maximum'
      },
      negotiable: {
        en: 'Open to negotiation',
        es: 'Abierto a negociación',
        fr: 'Ouvert à la négociation'
      },
      entryLevelRange: {
        en: 'Entry-level range',
        es: 'Rango de nivel inicial',
        fr: 'Fourchette niveau débutant'
      }
    };
    return texts[key]?.[currentLanguage] || texts[key]?.en || key;
  };

  const getCurrentCurrency = () => {
    return currencies.find(c => c.code === salarySettings.currency);
  };

  const getCurrentRange = () => {
    return salaryRanges[salarySettings.currency][salarySettings.salaryType];
  };

  const formatSalary = (amount) => {
    const currency = getCurrentCurrency();
    return `${currency.symbol}${amount.toLocaleString()}`;
  };

  const handleCurrencyChange = (currencyCode) => {
    const newRange = salaryRanges[currencyCode][salarySettings.salaryType];
    const updatedSettings = {
      ...salarySettings,
      currency: currencyCode,
      minSalary: newRange.entry[0],
      maxSalary: newRange.entry[1]
    };
    setSalarySettings(updatedSettings);
    onSalaryChange?.(updatedSettings);
  };

  const handleSalaryTypeChange = (type) => {
    const newRange = salaryRanges[salarySettings.currency][type];
    const updatedSettings = {
      ...salarySettings,
      salaryType: type,
      minSalary: newRange.entry[0],
      maxSalary: newRange.entry[1]
    };
    setSalarySettings(updatedSettings);
    onSalaryChange?.(updatedSettings);
  };

  const handleMinSalaryChange = (e) => {
    const value = parseInt(e.target.value);
    const updatedSettings = {
      ...salarySettings,
      minSalary: value,
      maxSalary: Math.max(value, salarySettings.maxSalary)
    };
    setSalarySettings(updatedSettings);
    onSalaryChange?.(updatedSettings);
  };

  const handleMaxSalaryChange = (e) => {
    const value = parseInt(e.target.value);
    const updatedSettings = {
      ...salarySettings,
      maxSalary: value,
      minSalary: Math.min(value, salarySettings.minSalary)
    };
    setSalarySettings(updatedSettings);
    onSalaryChange?.(updatedSettings);
  };

  const handleNegotiableChange = () => {
    const updatedSettings = {
      ...salarySettings,
      negotiable: !salarySettings.negotiable
    };
    setSalarySettings(updatedSettings);
    onSalaryChange?.(updatedSettings);
  };

  const setEntryLevelRange = () => {
    const range = getCurrentRange();
    const updatedSettings = {
      ...salarySettings,
      minSalary: range.entry[0],
      maxSalary: range.entry[1]
    };
    setSalarySettings(updatedSettings);
    onSalaryChange?.(updatedSettings);
  };

  const currentRange = getCurrentRange();
  const currentCurrency = getCurrentCurrency();

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="DollarSign" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{getText('salaryRange')}</h3>
            <p className="text-sm text-text-secondary">{getText('setSalaryExpectations')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {formatSalary(salarySettings.minSalary)} - {formatSalary(salarySettings.maxSalary)}
          </span>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border p-4 space-y-6">
          {/* Currency and Salary Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getText('currency')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency.code)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      salarySettings.currency === currency.code
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{currency.symbol}</span>
                      <div>
                        <div className="font-medium text-sm">{currency.code}</div>
                        <div className="text-xs opacity-80">{currency.name[currentLanguage]}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getText('salaryType')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSalaryTypeChange('annual')}
                  className={`p-3 rounded-lg border transition-all ${
                    salarySettings.salaryType === 'annual' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
                  }`}
                >
                  <Icon name="Calendar" size={16} className="mb-1" />
                  <div className="text-sm font-medium">{getText('annual')}</div>
                </button>
                <button
                  onClick={() => handleSalaryTypeChange('hourly')}
                  className={`p-3 rounded-lg border transition-all ${
                    salarySettings.salaryType === 'hourly' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300 hover:bg-muted'
                  }`}
                >
                  <Icon name="Clock" size={16} className="mb-1" />
                  <div className="text-sm font-medium">{getText('hourly')}</div>
                </button>
              </div>
            </div>
          </div>

          {/* Salary Range Sliders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-text-primary">
                {getText('minimum')}: {formatSalary(salarySettings.minSalary)}
              </h4>
              <button
                onClick={setEntryLevelRange}
                className="text-sm text-primary hover:text-primary-700 font-medium"
              >
                {getText('entryLevelRange')}
              </button>
            </div>
            
            <input
              type="range"
              min={currentRange.min}
              max={currentRange.max}
              step={currentRange.step}
              value={salarySettings.minSalary}
              onChange={handleMinSalaryChange}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />

            <div className="flex justify-between text-xs text-text-muted">
              <span>{formatSalary(currentRange.min)}</span>
              <span>{formatSalary(currentRange.max)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">
              {getText('maximum')}: {formatSalary(salarySettings.maxSalary)}
            </h4>
            
            <input
              type="range"
              min={currentRange.min}
              max={currentRange.max}
              step={currentRange.step}
              value={salarySettings.maxSalary}
              onChange={handleMaxSalaryChange}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
            />

            <div className="flex justify-between text-xs text-text-muted">
              <span>{formatSalary(currentRange.min)}</span>
              <span>{formatSalary(currentRange.max)}</span>
            </div>
          </div>

          {/* Negotiable Option */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNegotiableChange}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                salarySettings.negotiable
                  ? 'border-primary bg-primary' :'border-secondary-300'
              }`}
            >
              {salarySettings.negotiable && (
                <Icon name="Check" size={12} className="text-white" />
              )}
            </button>
            <label className="text-sm text-text-primary cursor-pointer" onClick={handleNegotiableChange}>
              {getText('negotiable')}
            </label>
          </div>

          {/* Salary Insights */}
          <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={16} className="text-accent mt-0.5" />
              <div>
                <h5 className="font-medium text-accent-600 mb-1">
                  {currentLanguage === 'en' ? 'Market Insights' : 
                   currentLanguage === 'es' ? 'Perspectivas del Mercado' : 
                   'Aperçus du Marché'}
                </h5>
                <p className="text-sm text-accent-700">
                  {currentLanguage === 'en' ? 
                    `Entry-level ${salarySettings.salaryType} positions in your selected categories typically range from ${formatSalary(currentRange.entry[0])} to ${formatSalary(currentRange.entry[1])}. Being open to negotiation can increase your job matches by 23%.` :
                   currentLanguage === 'es' ? 
                    `Las posiciones de nivel inicial ${salarySettings.salaryType === 'annual' ? 'anuales' : 'por hora'} en tus categorías seleccionadas típicamente van de ${formatSalary(currentRange.entry[0])} a ${formatSalary(currentRange.entry[1])}. Estar abierto a negociación puede aumentar tus coincidencias de trabajo en un 23%.` :
                    `Les postes de niveau débutant ${salarySettings.salaryType === 'annual' ? 'annuels' : 'horaires'} dans vos catégories sélectionnées vont généralement de ${formatSalary(currentRange.entry[0])} à ${formatSalary(currentRange.entry[1])}. Être ouvert à la négociation peut augmenter vos correspondances d'emploi de 23%.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryRangeSection;