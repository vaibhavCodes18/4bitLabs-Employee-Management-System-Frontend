import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebookF
} from 'react-icons/fa';

const Contact = () => {
  const [state, handleSubmit] = useForm("xreolprp");

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
                  <p className="text-gray-600">info@4bitLabs.com</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-8">
              <button type="button" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition">
                <FaLinkedin />
              </button>
              <button type="button" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition">
                <FaTwitter />
              </button>
              <button type="button" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition">
                <FaFacebookF />
              </button>
            </div>
          </div>
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            {state.succeeded ? (
               <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center shadow-sm">
                 <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                 <p>Thank you for reaching out. We will get back to you shortly.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input id="name" type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <input id="email" type="email" name="email" placeholder="Email Address" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <input id="subject" type="text" name="subject" placeholder="Enter subject" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <textarea id="message" name="message" rows="4" placeholder="Message" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
                </div>
                {state.errors && state.errors.length > 0 && (
                  <p className="text-red-500 text-sm">Please fix the errors above or check your connection.</p>
                )}
                <button type="submit" disabled={state.submitting} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition w-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
