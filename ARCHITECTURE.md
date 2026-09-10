# Barcode Scanner App - Full Stack

## Project Structure

```
.
├── server/                 # Backend API (Node.js/Express)
│   ├── index.js           # Main server entry point
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment variables template
│   ├── routes/
│   │   ├── barcode.js    # Barcode scanning routes
│   │   └── product.js    # Product lookup routes
│   ├── controllers/
│   │   ├── barcodeController.js  # Barcode logic
│   │   └── productController.js  # Product logic
│   ├── middleware/
│   │   └── validation.js  # Input validation
│   └── models/
│       └── schemas.js     # Database schemas
│
├── client/                 # Web Application (React)
│   ├── src/
│   │   ├── index.js       # React entry point
│   │   ├── App.js         # Main component
│   │   ├── pages/
│   │   │   ├── Scanner.js         # Barcode scanner page
│   │   │   ├── ProductDetail.js   # Product details page
│   │   │   └── History.js         # Scan history page
│   │   ├── styles/
│   │   │   ├── Scanner.css        # Scanner styles
│   │   │   ├── ProductDetail.css  # Product styles
│   │   │   └── History.css        # History styles
│   │   ├── services/
│   │   │   └── api.js    # API client
│   │   ├── config/
│   │   │   └── index.js  # Configuration
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── desktop/                # Desktop Application (Electron)
│   ├── package.json
│   └── public/
│       ├── electron.js    # Electron main process
│       └── preload.js     # Electron preload script
│
├── package.json            # Root package.json
├── README.md              # Project documentation
├── LICENSE                # MIT License with Patent Notice
└── .gitignore

```

## Features

### 🔍 Scanner
- Upload barcode images for automatic detection
- Manual barcode input
- Real-time barcode scanning from camera
- Image processing and analysis

### 📦 Product Information
- Retrieve product details from multiple databases
- Display product images
- Show ingredients and nutrition facts
- Brand and description information

### 📱 Multi-Platform
- **Web**: React-based responsive web application
- **Desktop**: Electron desktop app for Windows, Mac, Linux
- **Backend**: RESTful API powering all platforms

### 💾 History Management
- Track scanned products
- Quick access to previous scans
- Clear scan history option

## Getting Started

### Requirements
- Node.js v14 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dmwambu/barcode-scanner-app.git
cd barcode-scanner-app
```

2. Install dependencies:
```bash
npm run install-all
```

3. Configure environment:
```bash
cd server
cp .env.example .env
```

### Running the Application

**Full Stack:**
```bash
npm start
```

**Backend Only:**
```bash
npm run server
```

**Web App Only:**
```bash
npm run client
```

**Desktop App:**
```bash
npm run desktop
```

## API Documentation

### Barcode Endpoints

#### Decode Barcode
- **POST** `/api/barcode/decode`
- **Body**: `{ image: "base64-encoded-image" }`
- **Response**: `{ success: true, barcode: "045544" }`

#### Get Barcode Info
- **GET** `/api/barcode/info/:barcode`
- **Response**: Product information from database

#### Live Scan
- **POST** `/api/barcode/scan`
- **Body**: `{ frameData: "..." }`
- **Response**: Real-time barcode detection

### Product Endpoints

#### Get Product by Barcode
- **GET** `/api/product/:barcode`
- **Response**: Complete product details with images

#### Search Products
- **GET** `/api/product/search/:query`
- **Response**: List of matching products

#### Save Product
- **POST** `/api/product/save`
- **Body**: Product data
- **Response**: Confirmation of save

## Technologies Used

### Backend
- Node.js
- Express.js
- Axios (HTTP client)
- Jimp (Image processing)
- MongoDB (optional)

### Frontend
- React 18
- React Router v6
- Axios
- HTML5 QRCode

### Desktop
- Electron
- React

## Patent Notice

**Patent Pending:** Automated barcode scanning and intelligent product recognition system

© 2026 Dmwambu. All rights reserved.

Unauthorized use and/or duplication of this material without express and written permission is strictly prohibited.

## License

MIT License - See LICENSE file for details

## Author

**Dmwambu**

---

**Last Updated:** September 10, 2026
