/*
 * Patent Pending: Barcode Scanner with Intelligent Product Recognition
 * © 2026 Dmwambu. All rights reserved.
 * Unauthorized use and/or duplication of this material without 
 * express and written permission is strictly prohibited.
 */

// Environment configuration
const config = {
  development: {
    apiUrl: 'http://localhost:5000',
    environment: 'development'
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://api.barcode-scanner.com',
    environment: 'production'
  }
};

const currentConfig = config[process.env.NODE_ENV || 'development'];

export default currentConfig;
