import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaCheckCircle, FaBuilding, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-accent-400 mb-6">
              <span className="w-8 h-[2px] bg-accent-500" />
              <span className="text-sm font-semibold tracking-wide uppercase">Get In Touch</span>
              <span className="w-8 h-[2px] bg-accent-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Discuss Your Property
            </h1>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              Whether you're looking to sell, buy, or simply understand your property's value,
              I'm here to help with expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Profile Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">TW</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Thomas R. Windels</h3>
                    <p className="text-gray-500">Senior Investment Associate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-accent-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Marcus & Millichap</div>
                    <div className="text-sm text-gray-500">Downtown Manhattan Office</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specializing in multifamily and mixed-use properties in Downtown Manhattan.
                  Over 15 years of experience helping clients maximize their real estate investments.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <a
                  href="tel:+13475632284"
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold text-gray-900">(347) 563-2284</div>
                  </div>
                </a>

                <a
                  href="mailto:thomas.windels@marcusmillichap.com"
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold text-gray-900 text-sm">thomas.windels@marcusmillichap.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Office</div>
                    <div className="font-semibold text-gray-900">Downtown Manhattan, NY 10007</div>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/thomas-windels-341052214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaLinkedin className="text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">LinkedIn</div>
                    <div className="font-semibold text-gray-900">Connect with me</div>
                  </div>
                </a>
              </div>

              {/* Response Time */}
              <div className="bg-accent-50 p-6 rounded-xl border border-accent-100">
                <div className="flex items-center gap-3 mb-2">
                  <FaClock className="text-accent-600" />
                  <span className="font-semibold text-gray-900">Quick Response</span>
                </div>
                <p className="text-gray-600 text-sm">
                  I typically respond to inquiries within 24 hours during business days.
                </p>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-green-600 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Thank you for reaching out. I'll review your message and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', propertyType: '', message: '' });
                      }}
                      className="mt-8 text-primary-600 font-semibold hover:text-primary-700"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                      <p className="text-gray-600">
                        Fill out the form below and I'll get back to you as soon as possible.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="(347) 563-2284"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="input-field"
                        >
                          <option value="">Select property type</option>
                          <option value="multifamily">Multifamily</option>
                          <option value="mixed-use">Mixed-Use</option>
                          <option value="retail">Retail</option>
                          <option value="office">Office</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="input-field resize-none"
                          placeholder="Tell me about your property or what you're looking for..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 font-semibold text-lg"
                      >
                        Send Message
                      </button>

                      <p className="text-sm text-gray-500 text-center">
                        Your information is kept confidential and never shared.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Downtown Manhattan Office</h3>
              <p className="text-primary-200">
                Serving property owners and investors throughout Lower Manhattan
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-accent-500 text-primary-900 rounded-lg hover:bg-accent-400 transition-colors font-semibold flex items-center gap-2"
            >
              <FaMapMarkerAlt />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
