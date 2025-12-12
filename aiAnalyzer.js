/**
 * Advanced NLP Text Analyzer
 * Features:
 * - Lexical Analysis (tokenization, POS tagging)
 * - Syntactic Analysis (sentence structure, dependencies)
 * - Semantic Analysis (context, intensity, emotions)
 * - Multi-word phrase detection
 * - Contextual sentiment shifting
 */

// ============================================
// LEXER - Tokenization & Part-of-Speech Tagging
// ============================================

class Token {
  constructor(word, pos, index, isNegated = false) {
    this.word = word.toLowerCase();
    this.original = word;
    this.pos = pos; // Part of speech
    this.index = index;
    this.isNegated = isNegated;
  }
}

// Enhanced keyword dictionaries with intensity scores
const lexicon = {
  mood: {
    // Intensity: 2 (very positive)
    veryPositive: {
      'amazing': 2, 'excellent': 2, 'fantastic': 2, 'wonderful': 2, 'incredible': 2,
      'ecstatic': 2, 'thrilled': 2, 'overjoyed': 2, 'delighted': 2, 'euphoric': 2,
      'blessed': 2, 'grateful': 2, 'phenomenal': 2, 'spectacular': 2, 'magnificent': 2
    },
    // Intensity: 1 (positive)
    positive: {
      'good': 1, 'great': 1, 'nice': 1, 'happy': 1, 'fine': 1, 'okay': 1, 'pleasant': 1,
      'cheerful': 1, 'content': 1, 'satisfied': 1, 'glad': 1, 'better': 1, 'improved': 1,
      'decent': 1, 'alright': 1, 'enjoyable': 1, 'positive': 1, 'upbeat': 1
    },
    // Intensity: -1 (negative)
    negative: {
      'bad': -1, 'sad': -1, 'unhappy': -1, 'disappointed': -1, 'upset': -1, 'down': -1,
      'frustrated': -1, 'annoyed': -1, 'worried': -1, 'anxious': -1, 'nervous': -1,
      'stressed': -1, 'difficult': -1, 'rough': -1, 'tough': -1, 'hard': -1, 'poor': -1
    },
    // Intensity: -2 (very negative)
    veryNegative: {
      'terrible': -2, 'awful': -2, 'horrible': -2, 'miserable': -2, 'depressed': -2,
      'devastating': -2, 'hopeless': -2, 'worst': -2, 'dreadful': -2, 'unbearable': -2,
      'crushing': -2, 'heartbroken': -2, 'agonizing': -2, 'furious': -2, 'enraged': -2
    }
  },
  
  social: {
    veryPositive: {
      'love': 2, 'loved': 2, 'friendship': 2, 'bonding': 2, 'celebration': 2, 'party': 2,
      'gathering': 2, 'reunion': 2, 'connected': 2, 'together': 2, 'supported': 2,
      'welcomed': 2, 'included': 2, 'appreciated': 2, 'cherished': 2
    },
    positive: {
      'friends': 1, 'friend': 1, 'met': 1, 'meeting': 1, 'talked': 1, 'chat': 1, 'coffee': 1,
      'lunch': 1, 'dinner': 1, 'social': 1, 'people': 1, 'colleague': 1, 'colleagues': 1,
      'team': 1, 'family': 1, 'conversation': 1, 'fun': 1, 'enjoyed': 1, 'laughed': 1
    },
    negative: {
      'alone': -1, 'lonely': -1, 'isolated': -1, 'argument': -1, 'disagreement': -1,
      'tension': -1, 'awkward': -1, 'uncomfortable': -1, 'distant': -1, 'fight': -1,
      'fighting': -1, 'conflict': -1, 'misunderstanding': -1
    },
    veryNegative: {
      'abandoned': -2, 'rejected': -2, 'excluded': -2, 'betrayed': -2, 'bullied': -2,
      'hostile': -2, 'toxic': -2, 'hated': -2, 'ignored': -2, 'ostracized': -2
    }
  },
  
  work: {
    veryPositive: {
      'accomplished': 2, 'achievement': 2, 'success': 2, 'successful': 2, 'breakthrough': 2,
      'promotion': 2, 'promoted': 2, 'praised': 2, 'recognized': 2, 'award': 2,
      'excellent': 2, 'outstanding': 2, 'productive': 2, 'efficient': 2, 'completed': 2
    },
    positive: {
      'finished': 1, 'progress': 1, 'working': 1, 'work': 1, 'task': 1, 'project': 1,
      'meeting': 1, 'presentation': 1, 'okay': 1, 'decent': 1, 'job': 1, 'office': 1,
      'business': 1, 'professional': 1, 'organized': 1
    },
    negative: {
      'stressed': -1, 'deadline': -1, 'pressure': -1, 'behind': -1, 'difficult': -1,
      'challenging': -1, 'problem': -1, 'issue': -1, 'struggle': -1, 'struggling': -1,
      'overtime': -1, 'busy': -1, 'hectic': -1, 'confused': -1
    },
    veryNegative: {
      'overwhelming': -2, 'overwhelmed': -2, 'burnout': -2, 'failed': -2, 'failure': -2,
      'disaster': -2, 'impossible': -2, 'crisis': -2, 'nightmare': -2, 'chaos': -2,
      'terrible': -2, 'fired': -2, 'quit': -2
    }
  },
  
  energy: {
    veryPositive: {
      'energized': 2, 'energetic': 2, 'refreshed': 2, 'revitalized': 2, 'pumped': 2,
      'motivated': 2, 'charged': 2, 'invigorated': 2, 'strong': 2, 'powerful': 2,
      'vibrant': 2, 'lively': 2, 'dynamic': 2
    },
    positive: {
      'awake': 1, 'alert': 1, 'active': 1, 'okay': 1, 'fine': 1, 'decent': 1, 'rested': 1,
      'ready': 1, 'good': 1, 'fresh': 1, 'focused': 1
    },
    negative: {
      'tired': -1, 'sleepy': -1, 'drained': -1, 'low': -1, 'sluggish': -1, 'weary': -1,
      'worn': -1, 'fatigued': -1, 'lazy': -1, 'slow': -1
    },
    veryNegative: {
      'exhausted': -2, 'depleted': -2, 'burnt': -2, 'burnout': -2, 'collapse': -2,
      'dead': -2, 'zombie': -2, 'lifeless': -2, 'drained': -2
    }
  }
};

// Multi-word phrases (higher priority)
const phrases = {
  'feeling great': { mood: 2 },
  'feeling good': { mood: 1 },
  'feeling bad': { mood: -1 },
  'feeling terrible': { mood: -2 },
  'burnt out': { work: -2, energy: -2 },
  'burned out': { work: -2, energy: -2 },
  'worked out': { energy: 1 },
  'hanging out': { social: 1 },
  'had fun': { mood: 1, social: 1 },
  'went well': { mood: 1 },
  'going well': { mood: 1 },
  'not good': { mood: -1 },
  'not bad': { mood: 1 },
  'pretty good': { mood: 1 },
  'really good': { mood: 2 },
  'very good': { mood: 2 },
  'super tired': { energy: -2 },
  'extremely tired': { energy: -2 }
};

// Negation words
const negations = ['not', 'no', 'never', 'neither', 'nobody', 'nothing', 
                   "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "isn't", "aren't"];

// Intensifiers
const intensifiers = {
  'very': 1.5, 'really': 1.5, 'extremely': 1.8, 'super': 1.6, 'incredibly': 1.7,
  'absolutely': 1.6, 'totally': 1.5, 'completely': 1.6, 'utterly': 1.7,
  'quite': 1.2, 'pretty': 1.2, 'rather': 1.2, 'somewhat': 0.8, 'slightly': 0.7,
  'a bit': 0.7, 'little': 0.7, 'kinda': 0.8, 'kind of': 0.8
};

// ============================================
// LEXER IMPLEMENTATION
// ============================================

function tokenize(text) {
  // Clean and split text
  const cleaned = text.toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const words = cleaned.split(' ');
  const tokens = [];
  
  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 0) continue;
    
    // Check if previous word is a negation
    const isNegated = i > 0 && negations.includes(words[i - 1]);
    
    // Simple POS tagging (noun, verb, adjective, etc.)
    const pos = guessPartOfSpeech(words[i], i, words);
    
    tokens.push(new Token(words[i], pos, i, isNegated));
  }
  
  return tokens;
}

function guessPartOfSpeech(word, index, words) {
  // Simple heuristic POS tagger
  if (word.endsWith('ing')) return 'VERB';
  if (word.endsWith('ed')) return 'VERB';
  if (word.endsWith('ly')) return 'ADVERB';
  if (intensifiers[word]) return 'INTENSIFIER';
  if (negations.includes(word)) return 'NEGATION';
  
  // Check if it's in our lexicon (likely adjective/noun)
  for (const dimension in lexicon) {
    for (const sentiment in lexicon[dimension]) {
      if (lexicon[dimension][sentiment][word]) {
        return 'ADJECTIVE';
      }
    }
  }
  
  return 'NOUN'; // Default
}

// ============================================
// SYNTACTIC ANALYZER
// ============================================

function parseSentenceStructure(tokens, originalText) {
  const structure = {
    hasMoodWords: false,
    hasSocialWords: false,
    hasWorkWords: false,
    hasEnergyWords: false,
    sentenceType: 'statement', // statement, question, exclamation
    intensity: 1.0,
    context: []
  };
  
  // Detect sentence type
  if (originalText.includes('?')) structure.sentenceType = 'question';
  if (originalText.includes('!')) structure.sentenceType = 'exclamation';
  
  // Detect multi-word phrases first (they have priority)
  const lowerText = originalText.toLowerCase();
  for (const phrase in phrases) {
    if (lowerText.includes(phrase)) {
      const scores = phrases[phrase];
      for (const dim in scores) {
        structure.context.push({ dimension: dim, score: scores[dim], source: 'phrase', phrase });
      }
    }
  }
  
  // Analyze tokens for dimensions and intensity
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const word = token.word;
    
    // Check for intensifiers
    if (intensifiers[word]) {
      structure.intensity = Math.max(structure.intensity, intensifiers[word]);
    }
    
    // Check each dimension
    for (const dimension in lexicon) {
      for (const sentiment in lexicon[dimension]) {
        if (lexicon[dimension][sentiment][word] !== undefined) {
          let score = lexicon[dimension][sentiment][word];
          
          // Apply negation
          if (token.isNegated) {
            score = -score;
          }
          
          // Apply intensity from previous word
          if (i > 0 && intensifiers[tokens[i-1].word]) {
            score = score * intensifiers[tokens[i-1].word];
            score = Math.max(-2, Math.min(2, Math.round(score)));
          }
          
          structure.context.push({
            dimension,
            score,
            word,
            isNegated: token.isNegated,
            source: 'lexicon'
          });
          
          // Mark that this dimension was mentioned
          if (dimension === 'mood') structure.hasMoodWords = true;
          if (dimension === 'social') structure.hasSocialWords = true;
          if (dimension === 'work') structure.hasWorkWords = true;
          if (dimension === 'energy') structure.hasEnergyWords = true;
        }
      }
    }
  }
  
  return structure;
}

// ============================================
// SEMANTIC ANALYZER
// ============================================

function analyzeSemantics(structure) {
  const scores = {
    mood: { total: 0, count: 0 },
    social: { total: 0, count: 0 },
    work: { total: 0, count: 0 },
    energy: { total: 0, count: 0 }
  };
  
  // Aggregate scores from context
  structure.context.forEach(item => {
    scores[item.dimension].total += item.score;
    scores[item.dimension].count++;
  });
  
  // Calculate final scores
  const finalScores = {};
  for (const dimension in scores) {
    if (scores[dimension].count > 0) {
      // Average the scores
      let avg = scores[dimension].total / scores[dimension].count;
      
      // Apply sentence type modifier
      if (structure.sentenceType === 'exclamation' && avg > 0) {
        avg *= 1.2; // Boost positive exclamations
      }
      
      // Clamp to -2 to 2 and round
      finalScores[dimension] = Math.max(-2, Math.min(2, Math.round(avg)));
    } else {
      // No explicit mention - check for implicit context
      finalScores[dimension] = 0;
    }
  }
  
  // Contextual inference
  // If someone mentions work negatively, energy is likely lower
  if (finalScores.work < 0 && scores.energy.count === 0) {
    finalScores.energy = Math.max(-1, finalScores.work);
  }
  
  // If social is very positive, mood likely positive too
  if (finalScores.social >= 1 && scores.mood.count === 0) {
    finalScores.mood = 1;
  }
  
  // If mood is very negative, social might be affected
  if (finalScores.mood <= -1 && scores.social.count === 0) {
    finalScores.social = Math.max(-1, Math.floor(finalScores.mood / 2));
  }
  
  return finalScores;
}

// ============================================
// MAIN ANALYSIS FUNCTION
// ============================================

function analyzeText(text) {
  if (!text || text.trim().length < 5) {
    return { mood: 0, social: 0, work: 0, energy: 0 };
  }
  
  // Step 1: Lexical Analysis (Tokenization)
  const tokens = tokenize(text);
  
  // Step 2: Syntactic Analysis (Parse structure)
  const structure = parseSentenceStructure(tokens, text);
  
  // Step 3: Semantic Analysis (Extract meaning)
  const scores = analyzeSemantics(structure);
  
  console.log('🧠 NLP Analysis:');
  console.log('  Tokens:', tokens.map(t => t.word).join(', '));
  console.log('  Structure:', {
    intensity: structure.intensity,
    type: structure.sentenceType,
    context: structure.context.length + ' contextual clues'
  });
  console.log('  Final Scores:', scores);
  
  return scores;
}

module.exports = { analyzeText };
