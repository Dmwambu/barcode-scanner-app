/*
 * Patent Pending: Barcode Scanner with Intelligent Product Recognition
 * © 2026 Dmwambu. All rights reserved.
 * Unauthorized use and/or duplication of this material without 
 * express and written permission is strictly prohibited.
 */

import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
