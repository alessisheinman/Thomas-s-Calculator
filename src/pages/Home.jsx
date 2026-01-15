import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaChartLine, FaCalculator, FaCheckCircle, FaStar, FaPhone, FaArrowRight, FaDollarSign, FaPercent, FaHome, FaStore } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const [buildingType, setBuildingType] = useState('multifamily');
  const [residentialIncome, setResidentialIncome] = useState('');
  const [retailIncome, setRetailIncome] = useState('');
  const [operatingExpenses, setOperatingExpenses] = useState('');
  const [unitCount, setUnitCount] = useState('');
  const [freeMarketPercent, setFreeMarketPercent] = useState(50);
  const [results, setResults] = useState(null);

  // Cap rate bands based on free-market percentage
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

  const features = [
    {
      icon: <FaBuilding className="text-3xl" />,
      title: 'Downtown Manhattan Expert',
      description: 'Specialized knowledge of the Downtown market and its unique characteristics',
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Market Analysis',
      description: 'Data-driven valuations based on current market conditions and trends',
    },
    {
      icon: <FaCalculator className="text-3xl" />,
      title: 'Accurate Estimates',
      description: 'Cap rate bands calibrated for Downtown Manhattan multifamily and mixed-use',
    },
  ];

  const stats = [
    { number: '$500M+', label: 'Transaction Volume' },
    { number: '15+', label: 'Years Experience' },
    { number: '200+', label: 'Properties Sold' },
    { number: '5.0', label: 'Client Rating' },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[85vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-24"
            >
              <div className="inline-flex items-center gap-2 text-primary-600 mb-6">
                <span className="w-8 h-[2px] bg-accent-500" />
                <span className="text-sm font-semibold tracking-wide uppercase">Downtown Manhattan Specialist</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Property Value
                <span className="block text-primary-600">Calculator</span>
              </h1>

              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
                Estimate your building's value based on Net Operating Income (NOI) and current Downtown Manhattan cap rates.
                Get instant, data-driven insights for your investment decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 font-semibold text-lg"
                >
                  <FaCalculator />
                  Use Calculator
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg border-2 border-gray-200"
                >
                  <FaPhone className="text-primary-600" />
                  Get Consultation
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
                {stats.slice(0, 3).map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-1">{stat.number}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Image Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50" />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/80" />

              {/* Floating Card */}
              <div className="absolute bottom-12 left-0 -translate-x-1/4 bg-white p-6 rounded-2xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                    <FaStar className="text-accent-500" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Marcus & Millichap</div>
                    <div className="text-sm text-gray-500">Senior Investment Associate</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Specialized in Downtown Manhattan commercial real estate investments
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-primary-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary-500">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-4 py-4 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <div className="text-white/80">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-primary-100 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-primary-600 mb-4">
              <span className="w-8 h-[2px] bg-accent-500" />
              <span className="text-sm font-semibold tracking-wide uppercase">NOI to Value Estimator</span>
              <span className="w-8 h-[2px] bg-accent-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculate Your Property Value
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your building's income and expenses to get an estimated value range
              based on current Downtown Manhattan market cap rates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                <div className="space-y-6">
                  {/* Building Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Building Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBuildingType('multifamily')}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          buildingType === 'multifamily'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
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
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <FaStore />
                        Mixed-Use
                      </button>
                    </div>
                  </div>

                  {/* Annual Income */}
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
                        className="input-field pl-10"
                        placeholder="500,000"
                      />
                    </div>
                  </div>

                  {/* Retail Income (only for mixed-use) */}
                  {buildingType === 'mixed-use' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
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
                          className="input-field pl-10"
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
                        className="input-field pl-10"
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
                      className="input-field"
                      placeholder="20"
                    />
                  </div>

                  {/* Free Market Percentage Slider */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Free Market Units: <span className="text-primary-600 font-bold">{freeMarketPercent}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={freeMarketPercent}
                      onChange={(e) => setFreeMarketPercent(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0% (All Stabilized)</span>
                      <span>100% (All Free Market)</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={calculateValue}
                      className="flex-1 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <FaCalculator />
                      Calculate
                    </button>
                    <button
                      onClick={clearForm}
                      className="px-6 py-4 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {results ? (
                <>
                  {/* NOI Card */}
                  <div className="bg-primary-900 p-8 rounded-2xl text-white">
                    <div className="text-primary-300 text-sm font-semibold uppercase tracking-wide mb-2">
                      Net Operating Income (NOI)
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-4">
                      {formatCurrency(results.noi)}
                    </div>
                    <div className="space-y-2 text-sm text-primary-200">
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
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                      Estimated Property Value
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {formatCurrency(results.valueLow)} - {formatCurrency(results.valueHigh)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-600 mb-6">
                      <FaPercent />
                      <span>
                        Cap Rate: {formatPercent(results.capRateLow)} - {formatPercent(results.capRateHigh)}
                      </span>
                    </div>
                    <div className="bg-accent-50 border-l-4 border-accent-500 p-4 rounded-r-lg">
                      <div className="font-semibold text-gray-900">{results.capRateLabel}</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on {freeMarketPercent}% free-market unit mix in Downtown Manhattan
                      </p>
                    </div>
                  </div>

                  {/* CTA Card */}
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 rounded-2xl text-white">
                    <h3 className="font-bold text-lg mb-2">Want a Professional Valuation?</h3>
                    <p className="text-primary-100 text-sm mb-4">
                      Get an expert opinion on your property's value with a comprehensive market analysis.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                    >
                      Contact Me
                      <FaArrowRight />
                    </Link>
                  </div>
                </>
              ) : (
                /* Placeholder when no results */
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                    <FaCalculator className="text-primary-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Property Details</h3>
                  <p className="text-gray-500 max-w-sm">
                    Fill in the income and expense information on the left to see your estimated property value.
                  </p>

                  {/* Info boxes */}
                  <div className="mt-8 space-y-4 w-full">
                    <div className="bg-gray-50 p-4 rounded-lg text-left">
                      <div className="font-semibold text-gray-700 text-sm">How it works:</div>
                      <p className="text-gray-500 text-sm mt-1">
                        NOI = Total Income - Operating Expenses<br />
                        Value = NOI / Cap Rate
                      </p>
                    </div>
                    <div className="bg-accent-50 p-4 rounded-lg text-left">
                      <div className="font-semibold text-gray-700 text-sm">Cap Rates</div>
                      <p className="text-gray-500 text-sm mt-1">
                        Cap rates vary based on the free-market unit mix, reflecting risk and rent growth potential.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Learn Your Property's True Value?</h3>
              <p className="text-primary-200">Get expert guidance for your next investment decision.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+12125551234"
                className="px-8 py-3 bg-accent-500 text-primary-900 rounded-lg hover:bg-accent-400 transition-colors font-semibold flex items-center gap-2"
              >
                <FaPhone />
                Call Now
              </a>
              <Link
                to="/contact"
                className="px-8 py-3 text-white rounded-lg hover:bg-primary-600 transition-all font-semibold border border-white/30"
              >
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
