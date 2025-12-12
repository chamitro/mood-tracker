/**
 * Built-in AI Text Analyzer
 * Uses keyword matching and sentiment analysis
 * No external API needed!
 */

// Keyword dictionaries for each dimension
const keywords = {
  mood: {
    veryPositive: ['amazing', 'excellent', 'fantastic', 'wonderful', 'great', 'awesome', 'happy', 'joyful', 'delighted', 'ecstatic', 'thrilled', 'excited', 'love', 'perfect', 'beautiful', 'brilliant'],
    positive: ['good', 'nice', 'fine', 'okay', 'pleasant', 'satisfied', 'glad', 'cheerful', 'content', 'positive', 'better', 'improved'],
    negative: ['bad', 'sad', 'unhappy', 'disappointed', 'upset', 'frustrated', 'annoyed', 'worried', 'anxious', 'stressed', 'difficult', 'hard', 'tough'],
    veryNegative: ['terrible', 'awful', 'horrible', 'miserable', 'depressed', 'devastating', 'hopeless', 'worst', 'hate', 'angry', 'furious', 'disaster']
  },
  
  social: {
    veryPositive: ['friends', 'party', 'celebration', 'together', 'connected', 'social', 'fun', 'enjoyed', 'laughed', 'bonding', 'hangout', 'gathering'],
    positive: ['talked', 'met', 'chat', 'conversation', 'people', 'colleague', 'team', 'lunch', 'coffee', 'meeting'],
    negative: ['alone', 'lonely', 'isolated', 'argument', 'fight', 'conflict', 'disagreement', 'tension', 'awkward'],
    veryNegative: ['abandoned', 'rejected', 'excluded', 'bullied', 'hostile', 'toxic', 'hated', 'ignored']
  },
  
  work: {
    veryPositive: ['productive', 'accomplished', 'success', 'achieved', 'completed', 'efficient', 'breakthrough', 'promotion', 'praised', 'recognized'],
    positive: ['finished', 'progress', 'working', 'task', 'project', 'meeting', 'presentation', 'okay', 'decent'],
    negative: ['stressed', 'deadline', 'pressure', 'behind', 'difficult', 'challenging', 'problem', 'issue', 'struggle', 'overtime'],
    veryNegative: ['overwhelming', 'burnout', 'failed', 'disaster', 'impossible', 'crisis', 'nightmare', 'terrible']
  },
  
  energy: {
    veryPositive: ['energized', 'refreshed', 'revitalized', 'pumped', 'motivated', 'charged', 'invigorated', 'strong', 'powerful'],
    positive: ['awake', 'alert', 'active', 'okay', 'fine', 'decent', 'rested', 'ready'],
    negative: ['tired', 'sleepy', 'drained', 'low', 'sluggish', 'weary', 'worn', 'fatigued'],
    veryNegative: ['exhausted', 'drained', 'depleted', 'burnt out', 'collapse', 'dead', 'zombie']
  }
};

// Negation words that flip sentiment
const negations = ['not', 'no', 'never', 'neither', 'nobody', 'nothing', "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't"];

/**
 * Analyze text and return scores for all dimensions
 * @param {string} text - User's input text
 * @returns {object} Scores for mood, social, work, energy (-2 to +2)
 */
function analyzeText(text) {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  const scores = {
    mood: 0,
    social: 0,
    work: 0,
    energy: 0
  };

  // Analyze each dimension
  for (const dimension in keywords) {
    let score = 0;
    let matchCount = 0;

    // Check for keywords
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Check if previous word is a negation
      const hasNegation = i > 0 && negations.includes(words[i - 1]);
      
      // Check each sentiment level
      if (keywords[dimension].veryPositive.some(kw => word.includes(kw))) {
        score += hasNegation ? -2 : 2;
        matchCount++;
      } else if (keywords[dimension].positive.some(kw => word.includes(kw))) {
        score += hasNegation ? -1 : 1;
        matchCount++;
      } else if (keywords[dimension].negative.some(kw => word.includes(kw))) {
        score += hasNegation ? 1 : -1;
        matchCount++;
      } else if (keywords[dimension].veryNegative.some(kw => word.includes(kw))) {
        score += hasNegation ? 2 : -2;
        matchCount++;
      }
    }

    // Calculate average score for this dimension
    if (matchCount > 0) {
      scores[dimension] = Math.round(score / matchCount);
    } else {
      // If no keywords found, check for general sentiment
      scores[dimension] = detectGeneralSentiment(lowerText);
    }

    // Clamp scores between -2 and 2
    scores[dimension] = Math.max(-2, Math.min(2, scores[dimension]));
  }

  // Special adjustments based on patterns
  
  // If text is very short and neutral, default to 0
  if (text.length < 20) {
    for (const dimension in scores) {
      if (scores[dimension] === 0) {
        scores[dimension] = 0;
      }
    }
  }

  // If work dimension is 0 but text doesn't mention work, keep it neutral
  if (scores.work === 0 && !containsWorkWords(lowerText)) {
    scores.work = 0;
  }

  // If social is 0 but text doesn't mention people, keep neutral
  if (scores.social === 0 && !containsSocialWords(lowerText)) {
    scores.social = 0;
  }

  return scores;
}

/**
 * Detect general sentiment using common positive/negative words
 */
function detectGeneralSentiment(text) {
  const positiveWords = ['good', 'great', 'nice', 'happy', 'well', 'better', 'best', 'love', 'like', 'enjoy'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'worse', 'worst', 'difficult', 'hard', 'problem'];
  
  let score = 0;
  positiveWords.forEach(word => {
    if (text.includes(word)) score++;
  });
  negativeWords.forEach(word => {
    if (text.includes(word)) score--;
  });
  
  if (score > 0) return 1;
  if (score < 0) return -1;
  return 0;
}

/**
 * Check if text contains work-related words
 */
function containsWorkWords(text) {
  const workWords = ['work', 'job', 'office', 'boss', 'colleague', 'meeting', 'project', 'task', 'deadline', 'client', 'business', 'productivity'];
  return workWords.some(word => text.includes(word));
}

/**
 * Check if text contains social-related words
 */
function containsSocialWords(text) {
  const socialWords = ['friend', 'people', 'person', 'family', 'colleague', 'partner', 'someone', 'together', 'alone', 'social', 'met', 'chat', 'talk'];
  return socialWords.some(word => text.includes(word));
}

module.exports = { analyzeText };
