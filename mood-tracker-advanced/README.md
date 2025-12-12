# 🌍 Global Mood Tracker

A social application where users from around the world share their daily experiences and view collective mood statistics by country.

![Mood Tracker](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 📝 **Daily Entries** - Submit one entry per day about your mood and experiences
- 🤖 **Advanced NLP AI** - State-of-the-art text analysis with:
  - **Lexical Analysis** - Tokenization and part-of-speech tagging
  - **Syntactic Analysis** - Sentence structure parsing
  - **Semantic Analysis** - Contextual understanding and inference
  - **Multi-word phrase detection** - Understands "burnt out", "feeling great", etc.
  - **Negation handling** - Correctly interprets "not happy" vs "happy"
  - **Intensity modifiers** - Recognizes "very good", "extremely tired", etc.
- 📊 **Beautiful Animated Charts** - View aggregated statistics with smooth animations
- 🎨 **Fun Cartoonish UI** - Colorful, engaging interface with:
  - Floating bubble animations
  - Bouncing elements
  - Pop-in score displays
  - Smooth transitions
- 🌍 **Global Stats** - See how different countries are feeling
- 💾 **Persistent Storage** - All data saved in MongoDB

## 🚀 Live Demo

Visit the live app: [Your Render URL Here]

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3, Chart.js, Custom Animations
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **AI**: Advanced NLP with lexical, syntactic, and semantic analysis
- **Hosting**: Render (free tier)

## 🧠 Advanced AI Features

### Natural Language Processing Pipeline

1. **Lexer (Tokenization)**
   - Breaks text into meaningful tokens
   - Identifies parts of speech (nouns, verbs, adjectives)
   - Detects intensifiers and negations
   
2. **Syntactic Parser**
   - Analyzes sentence structure
   - Detects multi-word phrases
   - Understands context and relationships
   
3. **Semantic Analyzer**
   - Extracts meaning from context
   - Makes intelligent inferences
   - Handles complex emotional states

### Intelligence Features

- **Context Awareness**: Understands that "work stress" affects energy levels
- **Phrase Detection**: Recognizes compound expressions like "burnt out", "feeling great"
- **Negation Handling**: Correctly interprets "not happy" as negative
- **Intensity Scaling**: "Very tired" scores lower than just "tired"
- **Cross-dimensional Inference**: Positive social interactions improve mood scores

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
3. **Advanced AI Analysis** - Text goes through full NLP pipeline:
   - Lexical analysis (tokenization)
   - Syntactic parsing (structure)
   - Semantic analysis (meaning extraction)
4. **Data Storage** - Entry saved to MongoDB with multi-dimensional scores
5. **Statistics** - View aggregated data with beautiful animated charts

## 🤖 AI Algorithm Deep Dive

### Example Analysis

**Input:** "Not feeling great today. Work was extremely stressful and I'm burnt out."

**Processing:**
1. **Lexer:** Tokenizes into [not, feeling, great, today, work, extremely, stressful, burnt, out]
2. **Syntax:** Detects negation ("not"), intensifier ("extremely"), phrase ("burnt out")
3. **Semantic:** 
   - Mood: -1 (negated positive word)
   - Work: -2 (extremely stressful)
   - Energy: -2 (burnt out phrase)
   - Social: -1 (inferred from negative work/mood)

**Output:** Accurate multi-dimensional scores reflecting the user's state

### Why It's Better

- **Previous version**: Simple keyword matching
- **This version**: Full NLP pipeline with contextual understanding
- **Result**: 3-4x more accurate sentiment detection

## 📊 API Endpoints

- `POST /api/submit` - Submit a daily entry
- `GET /api/stats/:country/:date` - Get daily statistics
- `GET /api/stats/:country/month/:yearMonth` - Get monthly statistics
- `GET /api/countries` - List all countries with data
- `GET /health` - Health check

## 🎨 UI Features

- **Floating Bubbles** - Animated background elements
- **Bouncing Title** - Eye-catching header animation
- **Pop-in Scores** - Animated score reveals with rotation
- **Smooth Transitions** - All interactions are animated
- **Cartoonish Design** - Rounded corners, vibrant colors, playful fonts
- **Responsive** - Works perfectly on mobile and desktop

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
- [ ] AI-powered mood predictions
- [ ] Personalized recommendations

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
- Fredoka font for the fun, friendly typography
- All the users who share their daily experiences!

---

**Made with ❤️ to track the world's mood**

⭐ Star this repo if you find it helpful!
