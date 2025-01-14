import React, { useState } from 'react';
import { FaSearch, FaPhone, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Replace with the actual path to your Sidebar component
import Topbar from './Topbar';   // Replace with the actual path to your Topbar component

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs] = useState([
    { id: 1, question: 'How do I add a sale?', answer: 'Go to the Sales Management page, fill in the form, and click "Add Sale".' },
    { id: 2, question: 'How can I edit a sale?', answer: 'Click the "Edit" button next to the sale you want to modify.' },
    { id: 3, question: 'What should I do if I encounter an error?', answer: 'Please contact support using the details provided below.' },
  ]);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-100 flex-1">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaQuestionCircle className="mr-3 text-[#21501a]" /> Help & Support
            </h1>
          </header>

          {/* Search Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Search for Help
            </h2>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 border rounded w-full"
              />
              <button
                className="bg-[#21501a] text-white px-6 py-3 rounded-lg hover:bg-[#2d921e]"
                onClick={() => console.log('Searching for:', searchQuery)}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">FAQs</h2>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="mb-4">
                  <h3 className="font-medium text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No FAQs found for your query.</p>
            )}
          </div>

          {/* Contact Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
            <div className="flex items-center mb-4">
              <FaPhone className="text-[#21501a] mr-3" />
              <span className="text-gray-700">+9476 534 239</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-[#21501a] mr-3" />
              <span className="text-gray-700">harvestbrew@gmail.com</span>
            </div>
            <p className="text-black">
              Our support team is available Monday to Friday, 9 AM - 5 PM.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Help;
