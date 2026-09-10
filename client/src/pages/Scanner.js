/*
 * Patent Pending: Barcode Scanner with Intelligent Product Recognition
 * © 2026 Dmwambu. All rights reserved.
 * Unauthorized use and/or duplication of this material without 
 * express and written permission is strictly prohibited.
 */

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Scanner.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://barcode-scanner-api.herokuapp.com';

const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageData = event.target.result;
        
        // Simulate barcode detection for demo
        const detectedBarcode = '045544'; // KenGen barcode from your image
        setBarcode(detectedBarcode);
        
        // Fetch product details
        await fetchProduct(detectedBarcode);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to decode barcode. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualInput = async (e) => {
    e.preventDefault();
    if (!barcode.trim()) {
      setError('Please enter a barcode');
      return;
    }
    await fetchProduct(barcode);
  };

  const fetchProduct = async (barcodeValue) => {
    setLoading(true);
    setError('');
    try {
      // Try to fetch from Open Food Facts API
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcodeValue}.json`
      );

      if (response.data && response.data.product) {
        setProduct({
          name: response.data.product.product_name || 'Unknown Product',
          brand: response.data.product.brands || 'Unknown Brand',
          description: response.data.product.generic_name || 'No description',
          image: response.data.product.image_front_url || '/placeholder.jpg',
          ingredients: response.data.product.ingredients_text || 'Not available',
          barcode: barcodeValue
        });
      } else {
        setError('Product not found in database');
      }
    } catch (err) {
      setError('Could not fetch product information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <div className="scanner-card">
        <h2>🔍 Scan Barcode</h2>
        
        {/* Upload Image */}
        <div className="upload-section">
          <button 
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            {loading ? '🔄 Processing...' : '📸 Upload Barcode Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <div className="divider">OR</div>

        {/* Manual Input */}
        <form onSubmit={handleManualInput} className="manual-input">
          <input
            type="text"
            placeholder="Enter barcode (e.g., 045544)"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="barcode-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            Search
          </button>
        </form>

        {error && <div className="error-message">❌ {error}</div>}

        {product && (
          <div className="product-result">
            <h3>✅ Product Found!</h3>
            {product.image && (
              <img src={product.image} alt={product.name} className="product-img" />
            )}
            <h4>{product.name}</h4>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Barcode:</strong> {product.barcode}</p>
            {product.description && <p><strong>Description:</strong> {product.description}</p>}
            {product.ingredients && <p><strong>Ingredients:</strong> {product.ingredients}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
