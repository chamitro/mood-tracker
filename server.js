require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { analyzeText } = require('./aiAnalyzer');
const { connectDB, getDB } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory fallback storage
let memoryStorage = { entries: [] };

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper functions
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// Database wrapper functions (works with both MongoDB and in-memory)
async function saveEntry(entry) {
  const db = getDB();
  if (db) {
    await db.collection('entries').insertOne(entry);
  } else {
    memoryStorage.entries.push(entry);
  }
}

async function findEntries(filter) {
  const db = getDB();
  if (db) {
    return await db.collection('entries').find(filter).toArray();
  } else {
    return memoryStorage.entries.filter(entry => {
      return Object.keys(filter).every(key => entry[key] === filter[key]);
    });
  }
}

async function hasPostedToday(userId, date) {
  const db = getDB();
  if (db) {
    const entry = await db.collection('entries').findOne({ userId, date });
    return !!entry;
  } else {
    return memoryStorage.entries.some(e => e.userId === userId && e.date === date);
  }
}

async function getEntriesByCountryAndDateRange(country, startDate, endDate) {
  const db = getDB();
  if (db) {
    return await db.collection('entries').find({
      country,
      date: { $gte: startDate, $lte: endDate }
    }).toArray();
  } else {
    return memoryStorage.entries.filter(entry =>
      entry.country === country &&
      entry.date >= startDate &&
      entry.date <= endDate
    );
  }
}

async function getAllCountries() {
  const db = getDB();
  if (db) {
    const countries = await db.collection('entries').distinct('country');
    return countries.sort();
  } else {
    const countries = [...new Set(memoryStorage.entries.map(e => e.country))];
    return countries.sort();
  }
}

// API Routes

// Submit entry
app.post('/api/submit', async (req, res) => {
  try {
    const { userId, userName, country, text } = req.body;

    if (!userId || !userName || !country || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (text.length < 10) {
      return res.status(400).json({ error: 'Text must be at least 10 characters' });
    }

    const today = getTodayDate();

    // Check if user already posted today
    const alreadyPosted = await hasPostedToday(userId, today);

    if (alreadyPosted) {
      return res.status(429).json({ error: 'You already posted today! Come back tomorrow.' });
    }

    // Analyze with built-in AI (now returns 7 dimensions)
    console.log(`✨ Analyzing entry from ${userName} (${country})...`);
    const scores = analyzeText(text);
    console.log(`📊 AI Scores:`, scores);

    // Save entry with all 7 dimensions
    const entry = {
      userId,
      userName,
      country,
      text,
      date: today,
      timestamp: new Date().toISOString(),
      scores
    };

    await saveEntry(entry);

    res.json({ success: true, scores });

  } catch (error) {
    console.error('❌ Submit error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get statistics for a specific date
app.get('/api/stats/:country/:date', async (req, res) => {
  try {
    const { country, date } = req.params;

    const entries = await findEntries({ country, date });

    if (entries.length === 0) {
      return res.json({
        country,
        date,
        totalEntries: 0,
        averages: { 
          mood: 0, 
          social: 0, 
          work: 0, 
          energy: 0,
          health: 0,
          sleep: 0,
          stress: 0
        },
        distribution: {
          mood: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
          social: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
          work: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
          energy: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
          health: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
          sleep: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
          stress: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 }
        }
      });
    }

    // Calculate statistics for all 7 dimensions
    const sums = { 
      mood: 0, 
      social: 0, 
      work: 0, 
      energy: 0,
      health: 0,
      sleep: 0,
      stress: 0
    };
    
    const distribution = {
      mood: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
      social: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
      work: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
      energy: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
      health: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
      sleep: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 },
      stress: { veryNegative: 0, negative: 0, neutral: 0, positive: 0, veryPositive: 0 }
    };

    entries.forEach(entry => {
      const scores = entry.scores;
      
      // Sum for averages (all 7 dimensions)
      sums.mood += scores.mood || 0;
      sums.social += scores.social || 0;
      sums.work += scores.work || 0;
      sums.energy += scores.energy || 0;
      sums.health += scores.health || 0;
      sums.sleep += scores.sleep || 0;
      sums.stress += scores.stress || 0;

      // Distribution counts for all 7 dimensions
      const dimensions = ['mood', 'social', 'work', 'energy', 'health', 'sleep', 'stress'];
      for (const dimension of dimensions) {
        const score = scores[dimension] || 0;
        if (score === -2) distribution[dimension].veryNegative++;
        else if (score === -1) distribution[dimension].negative++;
        else if (score === 0) distribution[dimension].neutral++;
        else if (score === 1) distribution[dimension].positive++;
        else if (score === 2) distribution[dimension].veryPositive++;
      }
    });

    const totalEntries = entries.length;
    const averages = {
      mood: (sums.mood / totalEntries).toFixed(2),
      social: (sums.social / totalEntries).toFixed(2),
      work: (sums.work / totalEntries).toFixed(2),
      energy: (sums.energy / totalEntries).toFixed(2),
      health: (sums.health / totalEntries).toFixed(2),
      sleep: (sums.sleep / totalEntries).toFixed(2),
      stress: (sums.stress / totalEntries).toFixed(2)
    };

    res.json({
      country,
      date,
      totalEntries,
      averages,
      distribution
    });

  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get monthly statistics
app.get('/api/stats/:country/month/:yearMonth', async (req, res) => {
  try {
    const { country, yearMonth } = req.params;

    const startDate = `${yearMonth}-01`;
    const endDate = `${yearMonth}-31`;

    const entries = await getEntriesByCountryAndDateRange(country, startDate, endDate);

    if (entries.length === 0) {
      return res.json({
        country,
        month: yearMonth,
        totalEntries: 0,
        averages: { 
          mood: 0, 
          social: 0, 
          work: 0, 
          energy: 0,
          health: 0,
          sleep: 0,
          stress: 0
        }
      });
    }

    // Calculate sums for all 7 dimensions
    const sums = { 
      mood: 0, 
      social: 0, 
      work: 0, 
      energy: 0,
      health: 0,
      sleep: 0,
      stress: 0
    };

    entries.forEach(entry => {
      const scores = entry.scores;
      sums.mood += scores.mood || 0;
      sums.social += scores.social || 0;
      sums.work += scores.work || 0;
      sums.energy += scores.energy || 0;
      sums.health += scores.health || 0;
      sums.sleep += scores.sleep || 0;
      sums.stress += scores.stress || 0;
    });

    const totalEntries = entries.length;
    const averages = {
      mood: (sums.mood / totalEntries).toFixed(2),
      social: (sums.social / totalEntries).toFixed(2),
      work: (sums.work / totalEntries).toFixed(2),
      energy: (sums.energy / totalEntries).toFixed(2),
      health: (sums.health / totalEntries).toFixed(2),
      sleep: (sums.sleep / totalEntries).toFixed(2),
      stress: (sums.stress / totalEntries).toFixed(2)
    };

    res.json({
      country,
      month: yearMonth,
      totalEntries,
      averages
    });

  } catch (error) {
    console.error('❌ Monthly stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all countries
app.get('/api/countries', async (req, res) => {
  try {
    const countries = await getAllCountries();
    res.json({ countries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: getDB() ? 'MongoDB' : 'In-Memory',
    timestamp: new Date().toISOString() 
  });
});

// Start server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🌍 MOOD TRACKER IS RUNNING! 🌍     ║
╚═══════════════════════════════════════╝

🚀 Server: http://localhost:${PORT}
💾 Database: ${getDB() ? 'MongoDB ✅' : 'In-Memory ⚠️'}

✨ Tracking 7 Dimensions:
   😊 Mood
   🤝 Social
   💼 Work
   ⚡ Energy
   ❤️ Health
   😴 Sleep
   😰 Stress

Press Ctrl+C to stop
`);
  });
}

startServer();
