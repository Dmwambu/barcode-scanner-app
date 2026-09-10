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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const fileInputRef = useRef(null);
  const imageUploadRef = useRef(null);
  const navigate = useNavigate();

  // Sample data for demo - KenGen Barcode 045544
  const sampleProducts = {
    '045544': {
      barcodeNo: '045544',
      brandModel: 'Lenovo ThinkBook 14 G2 ITL',
      description: 'Laptop',
      serialNumber: 'MP25BENT',
      category: 'Electronics',
      quantity: '1 Unit',
      manufacturingCountry: 'China'
    }
  };

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
        const detectedBarcode = '045544';
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

  const handleProductImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, {
          src: event.target.result,
          name: files[i].name,
          uploadedAt: new Date().toLocaleString()
        }]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const deleteImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
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
      // Check if barcode exists in sample data
      if (sampleProducts[barcodeValue]) {
        const sampleData = sampleProducts[barcodeValue];
        setProduct({
          barcodeNo: sampleData.barcodeNo,
          brandModel: sampleData.brandModel,
          description: sampleData.description,
          serialNumber: sampleData.serialNumber,
          category: sampleData.category,
          quantity: sampleData.quantity,
          manufacturingCountry: sampleData.manufacturingCountry
        });
        setActiveTab('details');
        setUploadedImages([]); // Reset images for new product
      } else {
        // Try to fetch from Open Food Facts API as fallback
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcodeValue}.json`
        );

        if (response.data && response.data.product) {
          setProduct({
            barcodeNo: barcodeValue,
            brandModel: response.data.product.brands || 'Unknown Brand',
            description: response.data.product.generic_name || 'No description',
            serialNumber: response.data.product.code || 'N/A',
            category: response.data.product.categories || 'Not specified',
            quantity: response.data.product.quantity || 'N/A',
            manufacturingCountry: response.data.product.manufacturing_countries || 'Not specified'
          });
          setActiveTab('details');
          setUploadedImages([]);
        } else {
          setError('Product not found in database. Try barcode: 045544');
        }
      }
    } catch (err) {
      setError('Could not fetch product information. Try barcode: 045544');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-container">
      <div className="scanner-card">
        <div className="scanner-header">
          <div className="kengen-logo">⚡</div>
          <h2>KenGen Barcode Scanner</h2>
          <p className="tagline">Scan to Identify & Verify</p>
        </div>
        
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
            <div className="result-header">
              <h3>✅ Product Found!</h3>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                📋 Details
              </button>
              <button 
                className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`}
                onClick={() => setActiveTab('images')}
              >
                🖼️ Images ({uploadedImages.length})
              </button>
            </div>

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="product-details">
                <div className="detail-item">
                  <span className="label">KenGen Barcode No:</span>
                  <span className="value barcode-value">{product.barcodeNo}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Brand & Model:</span>
                  <span className="value">{product.brandModel}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Description:</span>
                  <span className="value">{product.description}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Serial Number:</span>
                  <span className="value serial-value">{product.serialNumber}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Category:</span>
                  <span className="value">{product.category}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Quantity:</span>
                  <span className="value">{product.quantity}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Country of Origin:</span>
                  <span className="value">{product.manufacturingCountry}</span>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="images-tab">
                <div className="upload-images-section">
                  <button 
                    className="upload-images-btn"
                    onClick={() => imageUploadRef.current?.click()}
                  >
                    ➕ Add Product Images
                  </button>
                  <input
                    ref={imageUploadRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleProductImageUpload}
                    style={{ display: 'none' }}
                  />
                  <p className="upload-hint">You can upload multiple images of the product</p>
                </div>

                {uploadedImages.length > 0 ? (
                  <div className="uploaded-images-grid">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="image-card">
                        <img src={img.src} alt={`Product ${index + 1}`} className="uploaded-img" />
                        <div className="image-info">
                          <p className="image-name">{img.name}</p>
                          <p className="image-date">{img.uploadedAt}</p>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteImage(index)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-images">
                    <p>📷 No images uploaded yet</p>
                    <p>Click the button above to add product images</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
