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
          <h1>⚡ KenGen Barcode Scanner</h1>
          <p>Scan barcodes to identify products instantly</p>
        </header>
        <Routes>
          <Route path="/" element={<Scanner />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;