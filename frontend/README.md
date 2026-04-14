# 🌍 Carbon Footprint Tracker

A modern, feature-rich React application for tracking personal carbon emissions with **GPS auto-tracking**, **gamification**, and **smart insights**. Built as a final year project for environmental awareness.

![Carbon Tracker](https://img.shields.io/badge/Project-Carbon%20Tracker-27ae60?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

### 📍 GPS Auto-Tracking
- Automatically detects travel mode (walking, cycling, bus, car) based on speed
- Real-time distance calculation using HTML5 Geolocation API
- Zero-emission trips tracked automatically

### 📊 Real-Time Dashboard
- Visual breakdown by category (Travel, Energy, Diet, Shopping)
- Filter by Last 7 Days, 30 Days, or All Time
- Total CO₂e footprint with category-wise distribution

### 📈 Progress & Insights
- **Weekly & Monthly Trends** - Visualize your carbon footprint over time
- **Streak Counter** - Track consecutive days of logging
- **Carbon Offset Calculator** - See how many trees you need to plant
- **Smart Insights** - Personalized tips based on your activity patterns
- **Month-over-Month Comparison** - Track improvement percentage

### 🏆 Gamification
- **6+ Achievements** - Eco Starter, Zero Hero, On Fire, and more
- **Community Leaderboard** - Compare your footprint with others
- **Dynamic Ranking** - Lower CO₂e = Better rank!

### 🌳 Sustainability Features
- Tree offset recommendations (1 tree = 25 kg CO₂e/year)
- Actionable eco-tips for reduction
- Plant-based diet tracking

### 📱 Responsive Design
- Works seamlessly on desktop, tablet, and mobile
- Modern gradient UI with smooth animations
- Offline-capable with localStorage

---

## 🚀 Live Demo

🔗 **[Deployed Link](https://your-app.vercel.app)** *(Update after deployment)*

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | APIs |
|----------|---------|----------|------|
| React 18.2 | Node.js (optional) | MongoDB / localStorage | HTML5 Geolocation |
| React Router v6 | Express (optional) |  |  |
| CSS3 / Flexbox |  |  |  |

**Key Libraries:**
- `react-router-dom` - Client-side routing
- `recharts` / `chart.js` - Data visualization (optional)
- HTML5 Geolocation API - GPS tracking

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Step-by-Step

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/carbon-footprint-tracker.git
cd carbon-footprint-tracker

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 📊 Project Structure
carbon-footprint-tracker/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── AutoCarbonMeter.jsx
│ │ │ └── ...
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── ProgressPage.jsx
│ │ │ └── HistoryPage.jsx
│ │ ├── data/
│ │ │ └── emissionFactors.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── package.json
│ └── vite.config.js
├── README.md
├── .gitignore
└── package.json

text

---

## 🎯 Key Features Explained

### GPS Carbon Meter
Uses HTML5 Geolocation API to:
- Track real-time position updates
- Calculate distance traveled
- Detect travel mode based on speed:
  - 0-6 km/h → 🚶 Walking (0 CO₂e)
  - 6-20 km/h → 🚴 Cycling (0 CO₂e)
  - 20-50 km/h → 🚌 Bus (0.089 kg/km)
  - 50+ km/h → 🚗 Car (0.192 kg/km)

### Emission Factors
Based on Indian government standards:
- **Travel:** Petrol car (0.192), Diesel car (0.171), Bus (0.089), Train (0.041)
- **Energy:** Electricity (0.82), Natural Gas (2.0), LPG (1.5)
- **Diet:** Beef (27.0), Chicken (6.9), Vegetarian (2.5), Vegan (1.5)
- **Shopping:** Clothing (10), Electronics (50)

### Gamification Logic
- **Streak:** Consecutive days with at least one activity
- **Achievements:** Unlock based on milestones (10 activities, 5 zero-emission trips, etc.)
- **Leaderboard:** Dynamic ranking adjusted to user's activity level

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x450/134e5e/ffffff?text=Dashboard+Screenshot)

### GPS Carbon Meter
![GPS Meter](https://via.placeholder.com/800x450/27ae60/ffffff?text=GPS+Carbon+Meter)

### Progress & Insights
![Progress](https://via.placeholder.com/800x450/71b280/ffffff?text=Progress+Page)

*(Replace with actual screenshots after deployment)*

---

## 🔮 Future Enhancements

- [ ] **Weekly Email Reports** - Automated summaries via EmailJS
- [ ] **WhatsApp Sharing** - Share achievements with friends
- [ ] **Carbon Reduction Goals** - Set monthly targets
- [ ] **AI Suggestions** - ML-powered personalized tips
- [ ] **Multi-User Support** - Real backend with authentication
- [ ] **PWA Support** - Install as mobile app
- [ ] **Dark Mode** - Theme toggle

---

## 🤝 Contributing

Contributions are welcome! This is an open-source educational project.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Srishti**  
🎓 Final Year Student  
📍 Ghāziābād, Uttar Pradesh, India

[![GitHub](https://img.shields.io/badge/GitHub-@YOUR_USERNAME-181717?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/YOUR_LINKEDIN)
[![Email](https://img.shields.io/badge/Email-Contact-D44638?style=for-the-badge&logo=gmail)](mailto:your-email@example.com)

---

## 🙏 Acknowledgments

- Emission factors from CPCB (Central Pollution Control Board, India)
- Inspired by global carbon tracking initiatives
- Built for environmental awareness and sustainability

---

## 📊 Project Stats

![Repo Size](https://img.shields.io/github/repo-size/YOUR_USERNAME/carbon-footprint-tracker?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/carbon-footprint-tracker?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/YOUR_USERNAME/carbon-footprint-tracker?style=for-the-badge)

---

