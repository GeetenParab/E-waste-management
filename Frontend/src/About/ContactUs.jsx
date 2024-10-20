import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className=" bg-orange-50 py-32 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Send Us a Message Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black-500"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black-500"
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black-500"
              placeholder="Your Phone"
              required
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black-500"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Us Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-orange-600" />
              <span>Nerul, Navi-Mumbai 400706</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-orange-600" />
              <span>+911234567890</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-orange-600" />
              <span>contact@elocate.com</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-500 hover:text-orange-600 text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-500 hover:text-orange-600 text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-500 hover:text-orange-600 text-2xl" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-gray-500 hover:text-orange-600 text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
