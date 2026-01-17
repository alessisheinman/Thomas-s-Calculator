import { useState } from 'react';
import { FaDollarSign, FaHome, FaStore, FaPercent } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PizZip from 'pizzip';
import emailjs from '@emailjs/browser';
import logoImage from '../images/Logo.jpg';
import headshotsImage from '../images/headshots.png';
import contactInfoImage from '../images/Contact Information.png';
import sideTextImage from '../images/side text.jpg';
import titleImage from '../images/title.jpg';
import completionTextImage from '../images/Completion Text.jpg';

// EmailJS credentials
const EMAILJS_SERVICE_ID = "service_l9sra7p";
const EMAILJS_TEMPLATE_ID = "template_9uted9z";
const EMAILJS_PUBLIC_KEY = "grMr8mUr0YLCUu5QO";

function App() {
  const [buildingType, setBuildingType] = useState('multifamily');
  const [submarket, setSubmarket] = useState('');
  const [residentialIncome, setResidentialIncome] = useState('');
  const [retailIncome, setRetailIncome] = useState('');
  const [operatingExpenses, setOperatingExpenses] = useState('');
  const [unitCount, setUnitCount] = useState('');
  const [freeMarketPercent, setFreeMarketPercent] = useState(50);
  const [results, setResults] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [buildingAddress, setBuildingAddress] = useState('');

  // Cap rate data from CSV - organized by submarket and free market percentage
  const capRateData = {
    'Lower East Side': {
      100: { low: 0.05, high: 0.06 },
      75: { low: 0.055, high: 0.065 },
      50: { low: 0.06, high: 0.07 },
      25: { low: 0.065, high: 0.075 },
      0: { low: 0.07, high: 0.08 }
    },
    'East Village': {
      100: { low: 0.05, high: 0.06 },
      75: { low: 0.055, high: 0.065 },
      50: { low: 0.06, high: 0.07 },
      25: { low: 0.065, high: 0.075 },
      0: { low: 0.07, high: 0.08 }
    },
    'Chelsea': {
      100: { low: 0.05, high: 0.06 },
      75: { low: 0.055, high: 0.065 },
      50: { low: 0.06, high: 0.07 },
      25: { low: 0.065, high: 0.075 },
      0: { low: 0.07, high: 0.08 }
    },
    'Upper East Side': {
      100: { low: 0.05, high: 0.06 },
      75: { low: 0.055, high: 0.065 },
      50: { low: 0.06, high: 0.07 },
      25: { low: 0.065, high: 0.075 },
      0: { low: 0.07, high: 0.08 }
    },
    'Upper West Side': {
      100: { low: 0.05, high: 0.06 },
      75: { low: 0.055, high: 0.065 },
      50: { low: 0.06, high: 0.07 },
      25: { low: 0.065, high: 0.075 },
      0: { low: 0.07, high: 0.08 }
    },
    'Chinatown': {
      100: { low: 0.055, high: 0.065 },
      75: { low: 0.06, high: 0.07 },
      50: { low: 0.065, high: 0.075 },
      25: { low: 0.07, high: 0.08 },
      0: { low: 0.075, high: 0.085 }
    },
    'Midtown East': {
      100: { low: 0.0525, high: 0.0625 },
      75: { low: 0.0575, high: 0.0675 },
      50: { low: 0.0625, high: 0.0725 },
      25: { low: 0.0675, high: 0.0775 },
      0: { low: 0.0725, high: 0.0825 }
    },
    'Midtown West': {
      100: { low: 0.0525, high: 0.0625 },
      75: { low: 0.0575, high: 0.0675 },
      50: { low: 0.0625, high: 0.0725 },
      25: { low: 0.0675, high: 0.0775 },
      0: { low: 0.0725, high: 0.0825 }
    },
    'West Village': {
      100: { low: 0.0475, high: 0.0575 },
      75: { low: 0.0525, high: 0.0625 },
      50: { low: 0.0575, high: 0.0675 },
      25: { low: 0.0625, high: 0.0725 },
      0: { low: 0.0675, high: 0.0775 }
    },
    'SoHo': {
      100: { low: 0.0475, high: 0.0575 },
      75: { low: 0.0525, high: 0.0625 },
      50: { low: 0.0575, high: 0.0675 },
      25: { low: 0.0625, high: 0.0725 },
      0: { low: 0.0675, high: 0.0775 }
    },
    'TriBeCa': {
      100: { low: 0.0475, high: 0.0575 },
      75: { low: 0.0525, high: 0.0625 },
      50: { low: 0.0575, high: 0.0675 },
      25: { low: 0.0625, high: 0.0725 },
      0: { low: 0.0675, high: 0.0775 }
    },
    'Gramercy': {
      100: { low: 0.05, high: 0.06 },
      75: { low: 0.055, high: 0.065 },
      50: { low: 0.06, high: 0.07 },
      25: { low: 0.065, high: 0.075 },
      0: { low: 0.07, high: 0.08 }
    },
    'Greenwich Village': {
      100: { low: 0.0475, high: 0.0575 },
      75: { low: 0.0525, high: 0.0625 },
      50: { low: 0.0575, high: 0.0675 },
      25: { low: 0.0625, high: 0.0725 },
      0: { low: 0.0675, high: 0.0775 }
    },
    'NoHo': {
      100: { low: 0.0475, high: 0.0575 },
      75: { low: 0.0525, high: 0.0625 },
      50: { low: 0.0575, high: 0.0675 },
      25: { low: 0.0625, high: 0.0725 },
      0: { low: 0.0675, high: 0.0775 }
    }
  };

  const submarkets = Object.keys(capRateData);

  const getCapRateBand = (selectedSubmarket, freeMarket) => {
    const submarketData = capRateData[selectedSubmarket];
    if (!submarketData) {
      return { low: 0.06, high: 0.07, label: 'Default' };
    }

    // Determine which FM bracket to use based on the slider value
    let fmBracket;
    let label;
    if (freeMarket >= 87.5) {
      fmBracket = 100;
      label = '100% Free Market';
    } else if (freeMarket >= 62.5) {
      fmBracket = 75;
      label = '75% Free Market';
    } else if (freeMarket >= 37.5) {
      fmBracket = 50;
      label = '50% Free Market';
    } else if (freeMarket >= 12.5) {
      fmBracket = 25;
      label = '25% Free Market';
    } else {
      fmBracket = 0;
      label = '0% Free Market';
    }

    const rates = submarketData[fmBracket];
    return {
      low: rates.low,
      high: rates.high,
      label: `${selectedSubmarket} - ${label}`
    };
  };

  const calculateValue = async () => {
    // Validate required fields
    if (!submarket) {
      alert('Please select a Submarket');
      return;
    }
    if (!residentialIncome.trim()) {
      alert('Please enter Annual Residential Income');
      return;
    }
    if (!operatingExpenses.trim()) {
      alert('Please enter Annual Operating Expenses');
      return;
    }
    if (buildingType === 'mixed-use' && !retailIncome.trim()) {
      alert('Please enter Annual Retail Income');
      return;
    }
    if (!contactName.trim()) {
      alert('Please enter your Name');
      return;
    }
    if (!buildingAddress.trim()) {
      alert('Please enter the Building Address');
      return;
    }

    const residential = parseFloat(residentialIncome.replace(/,/g, '')) || 0;
    const retail = buildingType === 'mixed-use' ? (parseFloat(retailIncome.replace(/,/g, '')) || 0) : 0;
    const expenses = parseFloat(operatingExpenses.replace(/,/g, '')) || 0;

    const noi = residential + retail - expenses;
    const capBand = getCapRateBand(submarket, freeMarketPercent);

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

    // Generate and email PowerPoint
    await generateAndEmailPowerPoint(valueLow, valueHigh, capBand);
  };

  const clearForm = () => {
    setSubmarket('');
    setResidentialIncome('');
    setRetailIncome('');
    setOperatingExpenses('');
    setUnitCount('');
    setFreeMarketPercent(50);
    setResults(null);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setBuildingAddress('');
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

  const formatName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const generateAndEmailPowerPoint = async (valueLow, valueHigh, capBand) => {
    try {
      // Fetch the template
      const response = await fetch(`${import.meta.env.BASE_URL}template.pptx`);
      const arrayBuffer = await response.arrayBuffer();

      // Load the template with PizZip
      const zip = new PizZip(arrayBuffer);

      // Format the data
      const addressUpper = buildingAddress.toUpperCase();
      const formattedName = formatName(contactName);
      const valueRange = `${formatCurrency(valueHigh)} - ${formatCurrency(valueLow)}`;

      // Get all XML files from the pptx
      const slideFiles = Object.keys(zip.files).filter(name =>
        name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
      );

      // Process each slide
      slideFiles.forEach(fileName => {
        let content = zip.file(fileName).asText();

        // Replace placeholders
        content = content.replace(/INPUT ADDRESS/g, addressUpper);
        content = content.replace(/INPUT NAME/g, formattedName);
        content = content.replace(/INPUT RANGE \(HIGH TO LOW\)/g, valueRange);

        // Update the file in the zip
        zip.file(fileName, content);
      });

      // Generate the PowerPoint as blob
      const pptxBlob = zip.generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      });

      // Upload to Litterbox (temporary file hosting) to get a download link
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('time', '72h'); // File expires after 72 hours
      formData.append('fileToUpload', pptxBlob, `${addressUpper} ANALYSIS.pptx`);

      const uploadResponse = await fetch('https://litterbox.catbox.moe/resources/serverside/llupload.php', {
        method: 'POST',
        body: formData
      });

      const downloadLink = await uploadResponse.text();
      console.log('Litterbox upload result:', downloadLink);

      if (!downloadLink.startsWith('https://')) {
        throw new Error('Failed to upload file: ' + downloadLink);
      }

      // Prepare email data with all form inputs
      const templateParams = {
        from_name: formattedName,
        from_email: contactEmail || 'Not provided',
        phone: contactPhone || 'Not provided',
        property_address: addressUpper,
        submarket: submarket,
        building_type: buildingType === 'mixed-use' ? 'Mixed-Use' : 'Multifamily',
        residential_income: residentialIncome ? `$${residentialIncome}` : 'Not provided',
        retail_income: buildingType === 'mixed-use' ? (retailIncome ? `$${retailIncome}` : 'Not provided') : 'N/A',
        operating_expenses: operatingExpenses ? `$${operatingExpenses}` : 'Not provided',
        unit_count: unitCount || 'Not provided',
        free_market_percent: `${freeMarketPercent}%`,
        download_link: downloadLink
      };

      // Send email via EmailJS
      console.log('Sending email with params:', templateParams);
      const emailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log('Email sent successfully:', emailResult);

    } catch (error) {
      console.error('Error details:', error);
      alert(`Error submitting analysis: ${error.text || error.message || 'Unknown error'}. Please try again or contact support.`);
    }
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
            className="flex justify-center mb-8"
          >
            <img
              src={titleImage}
              alt="Property Value Calculator"
              className="max-w-md w-full h-auto"
            />
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

                  {/* Submarket */}
                  <div>
                    <label htmlFor="submarket" className="block text-sm font-medium text-gray-700 mb-2">
                      Submarket
                    </label>
                    <select
                      id="submarket"
                      value={submarket}
                      onChange={(e) => setSubmarket(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a submarket</option>
                      {submarkets.map((sm) => (
                        <option key={sm} value={sm}>{sm}</option>
                      ))}
                    </select>
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

                  {/* Contact Information */}
                  <div className="border-t border-gray-200 pt-5 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="contactPhone"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="buildingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                          Building Address
                        </label>
                        <input
                          type="text"
                          id="buildingAddress"
                          value={buildingAddress}
                          onChange={(e) => setBuildingAddress(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123 Main St, New York, NY"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={calculateValue}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center justify-center"
                    >
                      Submit
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
              className="h-full flex items-center justify-center"
            >
              {results ? (
                <img
                  src={completionTextImage}
                  alt="Submission Complete"
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <img
                  src={sideTextImage}
                  alt="Market Analysis Info"
                  className="w-full h-auto rounded-lg"
                />
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
