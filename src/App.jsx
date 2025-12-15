import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost, Login, Signup, MyGallery, Leaderboard } from './Pages';
import MouseFollower from './components/MouseFollower';
import NeuralBackground from './components/NeuralBackground';
import { AuthProvider, useAuth } from './context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "text-white font-bold" : "text-gray-300 hover:text-white font-medium";

  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-7xl glass-nav rounded-2xl flex justify-between items-center sm:px-8 px-4 py-3 z-50 transition-all duration-300 hover:bg-[#050511]/40">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-24 object-contain" />
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/" className={`${isActive('/')} text-sm transition-colors hidden sm:block`}>Community Showcase</Link>
        <Link to="/leaderboard" className={`${isActive('/leaderboard')} text-sm transition-colors hidden sm:block`}>Leaderboard</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-white font-medium text-sm">{user.name}</span>
              <span className="text-neon-blue text-xs font-bold">{user.coins} Coins</span>
            </div>
            <Link to="/my-gallery" className={`${isActive('/my-gallery')} text-sm transition-colors`}>My Gallery</Link>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Logout
            </button>
            <Link
              to="/create-post"
              className="font-outfit font-medium bg-gradient-to-r from-neon-blue to-neon-purple text-white px-6 py-2 rounded-full hover:shadow-neon transition-all duration-300 transform hover:scale-105"
            >
              Create
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className={`${isActive('/login')} transition-colors px-4 py-2`}>Login</Link>
            <Link
              to="/signup"
              className="font-outfit font-medium bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="relative min-h-screen text-white overflow-hidden selection:bg-neon-pink selection:text-white">
          <NeuralBackground />
          <MouseFollower />

          <Navbar />

          <main className="relative z-10 w-full sm:p-8 px-4 py-8 min-h-[calc(100vh-73px)] pt-32 sm:pt-36">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/my-gallery" element={<MyGallery />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
