import { useState } from 'react';
import { FaCalculator, FaDollarSign, FaHome, FaStore, FaPercent } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logoImage from '../images/Logo.jpg';
import headshotsImage from '../images/headshots.png';
import contactInfoImage from '../images/Contact Information.png';

function App() {
  const [buildingType, setBuildingType] = useState('multifamily');
  const [residentialIncome, setResidentialIncome] = useState('');
  const [retailIncome, setRetailIncome] = useState('');
  const [operatingExpenses, setOperatingExpenses] = useState('');
  const [unitCount, setUnitCount] = useState('');
  const [freeMarketPercent, setFreeMarketPercent] = useState(50);
  const [results, setResults] = useState(null);

  const getCapRateBand = (freeMarket) => {
    if (freeMarket >= 80) return { low: 0.045, high: 0.055, label: 'Mostly Free Market (80%+)' };
    if (freeMarket >= 60) return { low: 0.05, high: 0.06, label: 'Majority Free Market (60-79%)' };
    if (freeMarket >= 40) return { low: 0.055, high: 0.065, label: 'Mixed Portfolio (40-59%)' };
    if (freeMarket >= 20) return { low: 0.06, high: 0.07, label: 'Majority Stabilized (20-39%)' };
    return { low: 0.065, high: 0.08, label: 'Mostly Stabilized (<20%)' };
  };

  const calculateValue = () => {
    const residential = parseFloat(residentialIncome.replace(/,/g, '')) || 0;
    const retail = buildingType === 'mixed-use' ? (parseFloat(retailIncome.replace(/,/g, '')) || 0) : 0;
    const expenses = parseFloat(operatingExpenses.replace(/,/g, '')) || 0;

    const noi = residential + retail - expenses;
    const capBand = getCapRateBand(freeMarketPercent);

    const valueLow = noi / capBand.high;
    const valueHigh = noi / capBand.low;

    setResults({
      noi,
      capRateLow: capBand.low,
      capRateHigh: capBand.high,
      capRateLabel: capBand.label,
      valueLow,
      valueHigh,
      residential,
      retail,
      expenses,
    });
  };

  const clearForm = () => {
    setResidentialIncome('');
    setRetailIncome('');
    setOperatingExpenses('');
    setUnitCount('');
    setFreeMarketPercent(50);
    setResults(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value) => {
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#002854' }}>
      {/* Minimalistic Header */}
      <header className="py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <img
              src={logoImage}
              alt="Windels Real Estate"
              className="h-16 sm:h-20 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Headshots Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={headshotsImage}
              alt="Team Headshots"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Property Value Calculator
            </h2>
            <p className="text-gray-300">
              Estimate your property value based on NOI and current cap rates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white p-6 sm:p-8 rounded-xl">
                <div className="space-y-5">
                  {/* Building Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBuildingType('multifamily')}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          buildingType === 'multifamily'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <FaHome />
                        Multifamily
                      </button>
                      <button
                        type="button"
                        onClick={() => setBuildingType('mixed-use')}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          buildingType === 'mixed-use'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <FaStore />
                        Mixed-Use
                      </button>
                    </div>
                  </div>

                  {/* Annual Residential Income */}
                  <div>
                    <label htmlFor="residentialIncome" className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Residential Income
                    </label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="residentialIncome"
                        value={residentialIncome}
                        onChange={(e) => setResidentialIncome(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="500,000"
                      />
                    </div>
                  </div>

                  {/* Retail Income (only for mixed-use) */}
                  {buildingType === 'mixed-use' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label htmlFor="retailIncome" className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Retail Income
                      </label>
                      <div className="relative">
                        <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="retailIncome"
                          value={retailIncome}
                          onChange={(e) => setRetailIncome(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="100,000"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Operating Expenses */}
                  <div>
                    <label htmlFor="operatingExpenses" className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Operating Expenses
                    </label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="operatingExpenses"
                        value={operatingExpenses}
                        onChange={(e) => setOperatingExpenses(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="200,000"
                      />
                    </div>
                  </div>

                  {/* Unit Count */}
                  <div>
                    <label htmlFor="unitCount" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Units (Optional)
                    </label>
                    <input
                      type="number"
                      id="unitCount"
                      value={unitCount}
                      onChange={(e) => setUnitCount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>

                  {/* Free Market Percentage Slider */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Free Market Units: <span className="text-blue-600 font-bold">{freeMarketPercent}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={freeMarketPercent}
                      onChange={(e) => setFreeMarketPercent(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0% (All Stabilized)</span>
                      <span>100% (All Free Market)</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={calculateValue}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <FaCalculator />
                      Calculate
                    </button>
                    <button
                      onClick={clearForm}
                      className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {results ? (
                <>
                  {/* NOI Card */}
                  <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-white">
                    <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide mb-2">
                      Net Operating Income (NOI)
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4">
                      {formatCurrency(results.noi)}
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Residential Income:</span>
                        <span className="text-white">{formatCurrency(results.residential)}</span>
                      </div>
                      {buildingType === 'mixed-use' && (
                        <div className="flex justify-between">
                          <span>Retail Income:</span>
                          <span className="text-white">{formatCurrency(results.retail)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Operating Expenses:</span>
                        <span className="text-white">-{formatCurrency(results.expenses)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Value Estimate Card */}
                  <div className="bg-white p-6 rounded-xl">
                    <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                      Estimated Property Value
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      <span className="block sm:inline">{formatCurrency(results.valueLow)}</span>
                      <span className="hidden sm:inline"> - </span>
                      <span className="block sm:hidden text-lg text-gray-500 font-normal">to</span>
                      <span className="block sm:inline">{formatCurrency(results.valueHigh)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
                      <FaPercent />
                      <span>
                        Cap Rate: {formatPercent(results.capRateLow)} - {formatPercent(results.capRateHigh)}
                      </span>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <div className="font-semibold text-gray-900">{results.capRateLabel}</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on {freeMarketPercent}% free-market unit mix in Downtown Manhattan
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white/10 backdrop-blur p-8 rounded-xl h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <FaCalculator className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Enter Your Property Details</h3>
                  <p className="text-gray-300 max-w-sm">
                    Fill in the income and expense information to see your estimated property value.
                  </p>
                  <div className="mt-6 space-y-3 w-full text-left">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="font-semibold text-white text-sm">How it works:</div>
                      <p className="text-gray-300 text-sm mt-1">
                        NOI = Total Income - Operating Expenses<br />
                        Value = NOI / Cap Rate
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src={contactInfoImage}
              alt="Contact Information"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;
