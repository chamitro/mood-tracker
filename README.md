# 🌍 Global Mood Tracker

A social application where users from around the world share their daily experiences and view collective mood statistics by country.

![Mood Tracker](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 📝 **Daily Entries** - Submit one entry per day about your mood and experiences
- 🤖 **AI Analysis** - Built-in AI analyzes your text across 4 dimensions:
  - Mood (emotional state)
  - Social (quality of interactions)
  - Work (productivity/stress)
  - Energy (physical/mental vitality)
- 📊 **Beautiful Charts** - View aggregated statistics by country
- 🌍 **Global Stats** - See how different countries are feeling
- 💾 **Persistent Storage** - All data saved in MongoDB

## 🚀 Live Demo

Visit the live app: [Your Render URL Here]

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3, Chart.js
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **AI**: Custom keyword-based sentiment analysis
- **Hosting**: Render (free tier)

## 📦 Installation (Local Development)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mood-tracker.git

# Navigate to project directory
cd mood-tracker

# Install dependencies
npm install

# Create .env file (optional for local testing)
cp .env.example .env

# Run the app
npm start
```

Visit `http://localhost:3000` in your browser.

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to Render with MongoDB Atlas.

**Quick summary:**
1. Create free MongoDB Atlas cluster
2. Push code to GitHub
3. Deploy to Render
4. Add MongoDB URI as environment variable

## 📖 How It Works

1. **User Login** - Enter name and country (stored locally)
2. **Daily Entry** - Write a sentence about your day
3. **AI Analysis** - Text is analyzed for sentiment and context
4. **Data Storage** - Entry saved to MongoDB with scores
5. **Statistics** - View aggregated data by country and date

## 🤖 AI Algorithm

The built-in AI uses keyword matching and sentiment analysis:

- **Keyword Dictionaries** - Predefined words for each dimension
- **Negation Handling** - Understands "not happy" vs "happy"
- **Scoring System** - Scores from -2 (very negative) to +2 (very positive)
- **Context Awareness** - Differentiates work, social, and energy contexts

No external API needed - completely self-contained!

## 📊 API Endpoints

- `POST /api/submit` - Submit a daily entry
- `GET /api/stats/:country/:date` - Get daily statistics
- `GET /api/stats/:country/month/:yearMonth` - Get monthly statistics
- `GET /api/countries` - List all countries with data
- `GET /health` - Health check

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

Ideas for future development:

- [ ] User authentication system
- [ ] Email notifications
- [ ] Weekly mood reports
- [ ] Compare countries side-by-side
- [ ] Historical trends over time
- [ ] Mobile app version
- [ ] Multiple languages support
- [ ] Export personal data

## ⚠️ Privacy

- Entries are stored anonymously (only name and country)
- No email or personal information collected
- Data is aggregated for statistics
- Individual entries are not displayed publicly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Your Name - [Your GitHub Profile]

## 🙏 Acknowledgments

- Chart.js for beautiful visualizations
- MongoDB Atlas for free database hosting
- Render for free web hosting
- All the users who share their daily experiences!

---

**Made with ❤️ to track the world's mood**

⭐ Star this repo if you find it helpful!
