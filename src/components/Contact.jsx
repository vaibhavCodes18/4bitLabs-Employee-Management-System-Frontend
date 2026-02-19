import React from 'react'
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebookF
} from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Have questions? Reach out to our team and we’ll get back to you promptly.
            </p>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-center items-start md:space-x-12 space-y-8 md:space-y-0">
            <div className="flex-1 max-w-md mx-auto md:mx-0">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Visit Us</h4>
                    <p className="text-gray-600">123 Tech Park, Silicon Valley, CA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FaPhoneAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FaEnvelope className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@4bitlabs.com</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-start space-x-4 mt-8">
                <a href="#" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition">
                  <FaLinkedin />
                </a>
                <a href="#" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition">
                  <FaFacebookF />
                </a>
              </div>
            </div>
            <div className="flex-1 max-w-md mx-auto md:mx-0">
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <textarea rows="4" placeholder="Message" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition w-full shadow-md">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Contact
