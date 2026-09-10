/*
 * Patent Pending: Barcode Scanner with Intelligent Product Recognition
 * © 2026 Dmwambu. All rights reserved.
 * Unauthorized use and/or duplication of this material without 
 * express and written permission is strictly prohibited.
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scanner from './pages/Scanner';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23FF6B35'/%3E%3Cpath d='M100 30 L130 80 L100 100 L130 120 L100 170 Q70 150 70 100 Q70 50 100 30' fill='%236B2D8C'/%3E%3Cpath d='M100 60 L105 75 L95 75 Z' fill='white'/%3E%3C/svg%3E" 
            alt="KenGen Logo" 
            className="app-header-logo"
          />
          <h1>KenGen Barcode Scanner</h1>
          <p>Energy for the nation</p>
        </header>
        <Routes>
          <Route path="/" element={<Scanner />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
