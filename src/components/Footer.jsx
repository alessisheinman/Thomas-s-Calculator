import { FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaCity } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                <FaCity className="text-primary-900 text-2xl" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">Thomas R. Windels</div>
                <div className="text-xs text-primary-400">Marcus & Millichap</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Specializing in Downtown Manhattan commercial real estate. Expert valuations, investment advisory, and market analysis for multifamily and mixed-use properties.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/thomas-windels-341052214/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-accent-400 transition-colors flex items-center gap-2">
                  <FaBuilding className="text-accent-500" />
                  Property Calculator
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-accent-400 transition-colors flex items-center gap-2">
                  <FaEnvelope className="text-accent-500" />
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent-500 mt-1" />
                <span className="text-sm">
                  Marcus & Millichap<br />
                  Downtown Manhattan Office<br />
                  New York, NY 10007
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-accent-500" />
                <a href="tel:+13475632284" className="text-sm hover:text-accent-400 transition-colors">
                  (347) 563-2284
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-accent-500" />
                <a href="mailto:thomas.windels@marcusmillichap.com" className="text-sm hover:text-accent-400 transition-colors">
                  thomas.windels@marcusmillichap.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Thomas R. Windels. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 text-center md:text-right max-w-xl">
              This calculator provides educational estimates only and does not constitute an appraisal or binding offer.
              Actual property values may vary. Consult a licensed professional for formal valuations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
