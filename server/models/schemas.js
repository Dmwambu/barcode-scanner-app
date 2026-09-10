/*
 * Patent Pending: Barcode Scanner with Intelligent Product Recognition
 * © 2026 Dmwambu. All rights reserved.
 * Unauthorized use and/or duplication of this material without 
 * express and written permission is strictly prohibited.
 */

// This is a placeholder for database models
// In production, connect to MongoDB or PostgreSQL

const productSchema = {
  barcode: String,
  name: String,
  brand: String,
  description: String,
  image: String,
  ingredients: String,
  nutrition: Object,
  createdAt: Date,
  updatedAt: Date
};

const scanHistorySchema = {
  barcode: String,
  productName: String,
  timestamp: Date,
  userId: String
};

module.exports = {
  productSchema,
  scanHistorySchema
};
