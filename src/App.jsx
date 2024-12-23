import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './Pages';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-gradient-to-r from-[#1E3A8A] via-[#6366F1] to-[#14B8A6] text-white dark:bg-[#1a1a1a] text-black dark:text-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] dark:border-b-[#444]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-36 py-0" />
        </Link>
        <div className="flex space-x-4">
          <button
            onClick={toggleTheme}
            className="font-inter font-medium bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white dark:text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        </div>
      </header>

      <main className="dark:bg-[#1a1a1a] text-black dark:text-white sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
