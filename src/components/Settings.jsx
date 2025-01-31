import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaSave, FaCogs, FaKey, FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import Sidebar from './Sidebar'; 
import Topbar from './Topbar';

const Settings = () => {
  const [settings, setSettings] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '/path/to/default/avatar.jpg',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    theme: 'light',
    security: {
      twoFactor: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleToggleNotification = (type) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const handleSave = () => {
    alert('Settings have been saved successfully!');
    // Add logic to save the settings to your backend here
  };

  const handleAvatarChange = () => {
    // Placeholder for avatar change functionality, can be a modal or another component
    alert('Change avatar functionality');
  };

  return (
    <div className="flex font-kulim">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-100 flex-1">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaCogs className="mr-3 text-[#21501a]" /> Settings
            </h1>
          </header>

          {/* User Settings Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <FaUser className="mr-2 text-[#21501a]" /> User Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={settings.username}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={settings.password}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* Notifications Settings Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <FaBell className="mr-2 text-[#21501a]" /> Notifications
            </h2>
            <div className="space-y-4">
              {Object.keys(settings.notifications).map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={type}
                    checked={settings.notifications[type]}
                    onChange={() => handleToggleNotification(type)}
                    className="mr-3"
                  />
                  <label htmlFor={type} className="text-gray-700 capitalize">
                    {type} notifications
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Settings Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <FaRegUserCircle className="mr-2 text-[#21501a]" /> Appearance Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={() => handleThemeChange('light')}
                  className="mr-3"
                />
                <label htmlFor="light" className="text-gray-700">Light Theme</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={() => handleThemeChange('dark')}
                  className="mr-3"
                />
                <label htmlFor="dark" className="text-gray-700">Dark Theme</label>
              </div>
            </div>
          </div>

          {/* Security Settings Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <FaKey className="mr-2 text-[#21501a]" /> Security Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={settings.security.twoFactor}
                  onChange={() => setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      twoFactor: !prev.security.twoFactor,
                    },
                  }))}
                  className="mr-3"
                />
                <label htmlFor="twoFactor" className="text-gray-700">Enable Two-Factor Authentication</label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              onClick={handleSave}
              className="bg-[#21501a] text-white px-6 py-3 rounded-lg hover:bg-[#2d921e] flex items-center"
            >
              <FaSave className="mr-2" /> Save Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
