# Neuroprompt - AI Prompt Optimizer

> **One-click browser extension that transforms basic prompts into highly effective AI queries for students**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)

## 📖 Overview

Neuroprompt helps students harness the full potential of AI tools by automatically transforming basic prompts into well-structured, effective queries. Works seamlessly with ChatGPT and Google Gemini.

### ✨ Features (MVP - Week 1-4)

- 🚀 **One-Click Optimization** - Transform prompts instantly
- 🔐 **User Authentication** - Secure JWT-based login
- 📊 **Usage Tracking** - Monitor daily enhancement counts
- ⭐ **Favorites System** - Save your best prompts
- 📝 **Enhancement History** - Track all optimizations
- 🔒 **Privacy Controls** - Incognito mode & data management
- 🎨 **Modern UI** - Clean, student-friendly design

## 🏗️ Tech Stack

### Extension
- **React 18** - UI framework
- **Vite** - Build tool
- **CRXJS** - Extension development plugin
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Google Gemini API** - Prompt enhancement

## 📥 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Google AI Studio API key

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd neuro_prompt
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

3. **Setup Extension**
```bash
cd extension
npm install
```

Start extension in development:
```bash
npm run dev
```

4. **Load Extension in Browser**
- Open Microsoft Edge or Chrome
- Navigate to `edge://extensions/` or `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `extension/dist` folder

## 🗂️ Project Structure

```
neuro_prompt/
├── extension/          # Browser extension
│   ├── src/
│   │   ├── popup/     # Extension popup UI
│   │   ├── content/   # Content scripts
│   │   ├── background/# Service worker
│   │   └── utils/     # Helper functions
│   ├── public/
│   │   └── icons/     # Extension icons
│   └── manifest.json  # Extension config
│
└── backend/           # API server
    ├── models/        # Mongoose schemas
    ├── routes/        # API routes
    ├── middleware/    # Auth & error handling
    ├── config/        # Database config
    ├── utils/         # Utilities
    └── server.js      # Entry point
```

## 🛣️ Development Roadmap

### ✅ Week 1: Foundation & Setup (CURRENT)
- [x] Environment setup
- [x] Project initialization
- [ ] Backend authentication
- [ ] Extension auth UI

### Week 2: Core Features
- [ ] Gemini API integration
- [ ] Content script injection
- [ ] Prompt optimization flow

### Week 3: Dashboard & Features
- [ ] History & favorites
- [ ] Popup dashboard UI
- [ ] Privacy controls

### Week 4: Polish & Deployment
- [ ] Error handling
- [ ] UI/UX polish
- [ ] Testing
- [ ] Store submission

## 🚀 Usage

1. **Visit ChatGPT or Gemini**
2. **Type your basic prompt**
3. **Click "Optimize Prompt"** button
4. **Review enhanced prompt**
5. **Submit to AI tool**

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Enhancement
- `POST /api/enhance` - Enhance a prompt
- `GET /api/enhancements` - Get user history
- `PUT /api/enhancements/:id/favorite` - Toggle favorite
- `DELETE /api/enhancements/:id` - Delete enhancement

### User
- `GET /api/user/profile` - Get user profile
- `DELETE /api/user/account` - Delete account

## 🤝 Contributing

This is a learning project! Contributions, issues, and feature requests are welcome.

## 📝 License

This project is [MIT](LICENSE) licensed.

## 🎯 Target Audience

- **Students** (16-25 years old)
- High school through university
- Regular ChatGPT/Gemini users
- Looking to improve AI interaction quality

## 📧 Contact

For questions or feedback, please open an issue.

---

**Built with ❤️ for students learning to leverage AI effectively**
