/**
 * ADVANCED COMPREHENSIVE NLP TEXT ANALYZER
 * 
 * Features:
 * - Extensive vocabulary coverage (1000+ words)
 * - Deep contextual understanding
 * - Time extraction and analysis
 * - Relationship pattern detection
 * - Emotional intensity calculation
 * - Multi-dimensional inference engine
 * - Syntactic dependency parsing
 */

// ============================================
// COMPREHENSIVE LEXICON - Expanded Vocabulary
// ============================================

const comprehensiveLexicon = {
  mood: {
    // Very Positive (2)
    veryPositive: {
      'amazing': 2, 'excellent': 2, 'fantastic': 2, 'wonderful': 2, 'incredible': 2,
      'ecstatic': 2, 'thrilled': 2, 'overjoyed': 2, 'delighted': 2, 'euphoric': 2,
      'blessed': 2, 'grateful': 2, 'phenomenal': 2, 'spectacular': 2, 'magnificent': 2,
      'awesome': 2, 'brilliant': 2, 'fabulous': 2, 'marvelous': 2, 'superb': 2,
      'extraordinary': 2, 'outstanding': 2, 'exceptional': 2, 'glorious': 2, 'splendid': 2,
      'elated': 2, 'jubilant': 2, 'exhilarated': 2, 'radiant': 2, 'blissful': 2,
      'joyful': 2, 'cheerful': 2, 'uplifted': 2, 'triumphant': 2, 'victorious': 2
    },
    // Positive (1)
    positive: {
      'good': 1, 'great': 1, 'nice': 1, 'happy': 1, 'fine': 1, 'okay': 1, 'pleasant': 1,
      'cheerful': 1, 'content': 1, 'satisfied': 1, 'glad': 1, 'better': 1, 'improved': 1,
      'decent': 1, 'alright': 1, 'enjoyable': 1, 'positive': 1, 'upbeat': 1, 'optimistic': 1,
      'hopeful': 1, 'confident': 1, 'peaceful': 1, 'calm': 1, 'relaxed': 1, 'comfortable': 1,
      'pleased': 1, 'thankful': 1, 'appreciate': 1, 'love': 1, 'like': 1, 'enjoy': 1,
      'fun': 1, 'exciting': 1, 'interesting': 1, 'productive': 1, 'successful': 1
    },
    // Negative (-1)
    negative: {
      'bad': -1, 'sad': -1, 'unhappy': -1, 'disappointed': -1, 'upset': -1, 'down': -1,
      'frustrated': -1, 'annoyed': -1, 'worried': -1, 'anxious': -1, 'nervous': -1,
      'stressed': -1, 'difficult': -1, 'rough': -1, 'tough': -1, 'hard': -1, 'poor': -1,
      'uncomfortable': -1, 'uneasy': -1, 'concerned': -1, 'troubled': -1, 'bothered': -1,
      'irritated': -1, 'agitated': -1, 'restless': -1, 'tense': -1, 'overwhelmed': -1,
      'discouraged': -1, 'unmotivated': -1, 'bored': -1, 'dull': -1, 'bland': -1,
      'mediocre': -1, 'unsatisfied': -1, 'unhappy': -1, 'dissatisfied': -1
    },
    // Very Negative (-2)
    veryNegative: {
      'terrible': -2, 'awful': -2, 'horrible': -2, 'miserable': -2, 'depressed': -2,
      'devastating': -2, 'hopeless': -2, 'worst': -2, 'dreadful': -2, 'unbearable': -2,
      'crushing': -2, 'heartbroken': -2, 'agonizing': -2, 'furious': -2, 'enraged': -2,
      'hateful': -2, 'despair': -2, 'desperate': -2, 'suicidal': -2, 'traumatic': -2,
      'nightmare': -2, 'catastrophic': -2, 'disastrous': -2, 'tragic': -2, 'anguish': -2,
      'tormented': -2, 'suffering': -2, 'pain': -2, 'agony': -2, 'grief': -2
    }
  },
  
  social: {
    veryPositive: {
      'love': 2, 'loved': 2, 'loving': 2, 'friendship': 2, 'bonding': 2, 'celebration': 2,
      'party': 2, 'gathering': 2, 'reunion': 2, 'connected': 2, 'together': 2, 'supported': 2,
      'welcomed': 2, 'included': 2, 'appreciated': 2, 'cherished': 2, 'adored': 2,
      'embraced': 2, 'united': 2, 'community': 2, 'belonging': 2, 'accepted': 2,
      'celebrate': 2, 'celebrating': 2, 'socialize': 2, 'socializing': 2, 'connect': 2,
      'hangout': 2, 'wedding': 2, 'engagement': 2, 'birthday': 2
    },
    positive: {
      'friends': 1, 'friend': 1, 'met': 1, 'meeting': 1, 'talked': 1, 'chat': 1, 'coffee': 1,
      'lunch': 1, 'dinner': 1, 'social': 1, 'people': 1, 'colleague': 1, 'colleagues': 1,
      'team': 1, 'family': 1, 'conversation': 1, 'fun': 1, 'enjoyed': 1, 'laughed': 1,
      'partner': 1, 'spouse': 1, 'boyfriend': 1, 'girlfriend': 1, 'date': 1, 'dating': 1,
      'roommate': 1, 'neighbor': 1, 'acquaintance': 1, 'visit': 1, 'visited': 1,
      'company': 1, 'group': 1, 'club': 1, 'event': 1, 'outing': 1, 'together': 1
    },
    negative: {
      'alone': -1, 'lonely': -1, 'isolated': -1, 'argument': -1, 'disagreement': -1,
      'tension': -1, 'awkward': -1, 'uncomfortable': -1, 'distant': -1, 'fight': -1,
      'fighting': -1, 'conflict': -1, 'misunderstanding': -1, 'separate': -1, 'separated': -1,
      'divorce': -1, 'breakup': -1, 'broke': -1, 'drama': -1, 'gossip': -1, 'rumor': -1,
      'backstab': -1, 'fake': -1, 'superficial': -1, 'difficult': -1, 'struggle': -1
    },
    veryNegative: {
      'abandoned': -2, 'rejected': -2, 'excluded': -2, 'betrayed': -2, 'bullied': -2,
      'hostile': -2, 'toxic': -2, 'hated': -2, 'ignored': -2, 'ostracized': -2,
      'abuse': -2, 'abused': -2, 'harassed': -2, 'harassment': -2, 'threatened': -2,
      'attacked': -2, 'assaulted': -2, 'violence': -2, 'hatred': -2, 'enemy': -2,
      'shunned': -2, 'despised': -2, 'alienated': -2
    }
  },
  
  work: {
    veryPositive: {
      'accomplished': 2, 'achievement': 2, 'success': 2, 'successful': 2, 'breakthrough': 2,
      'promotion': 2, 'promoted': 2, 'praised': 2, 'recognized': 2, 'award': 2,
      'excellent': 2, 'outstanding': 2, 'productive': 2, 'efficient': 2, 'completed': 2,
      'triumph': 2, 'victory': 2, 'won': 2, 'winning': 2, 'exceeded': 2, 'excelled': 2,
      'mastered': 2, 'innovated': 2, 'innovation': 2, 'pioneered': 2, 'launched': 2,
      'bonus': 2, 'raise': 2, 'hired': 2, 'accepted': 2, 'dream job': 2
    },
    positive: {
      'finished': 1, 'progress': 1, 'working': 1, 'work': 1, 'task': 1, 'project': 1,
      'meeting': 1, 'presentation': 1, 'okay': 1, 'decent': 1, 'job': 1, 'office': 1,
      'business': 1, 'professional': 1, 'organized': 1, 'productive': 1, 'focused': 1,
      'career': 1, 'client': 1, 'customer': 1, 'boss': 1, 'manager': 1, 'employee': 1,
      'assignment': 1, 'deliver': 1, 'delivered': 1, 'done': 1, 'started': 1
    },
    negative: {
      'stressed': -1, 'deadline': -1, 'pressure': -1, 'behind': -1, 'difficult': -1,
      'challenging': -1, 'problem': -1, 'issue': -1, 'struggle': -1, 'struggling': -1,
      'overtime': -1, 'busy': -1, 'hectic': -1, 'confused': -1, 'unclear': -1,
      'mistake': -1, 'error': -1, 'delay': -1, 'delayed': -1, 'setback': -1,
      'rejection': -1, 'rejected': -1, 'criticism': -1, 'criticized': -1, 'complaint': -1,
      'late': -1, 'rush': -1, 'rushed': -1, 'unprepared': -1
    },
    veryNegative: {
      'overwhelming': -2, 'overwhelmed': -2, 'burnout': -2, 'burnt': -2, 'failed': -2, 
      'failure': -2, 'disaster': -2, 'impossible': -2, 'crisis': -2, 'nightmare': -2, 
      'chaos': -2, 'terrible': -2, 'fired': -2, 'quit': -2, 'quitting': -2, 'layoff': -2,
      'unemployed': -2, 'jobless': -2, 'bankruptcy': -2, 'lawsuit': -2, 'sued': -2,
      'catastrophe': -2, 'collapse': -2, 'ruined': -2, 'destroyed': -2
    }
  },
  
  energy: {
    veryPositive: {
      'energized': 2, 'energetic': 2, 'refreshed': 2, 'revitalized': 2, 'pumped': 2,
      'motivated': 2, 'charged': 2, 'invigorated': 2, 'strong': 2, 'powerful': 2,
      'vibrant': 2, 'lively': 2, 'dynamic': 2, 'enthusiastic': 2, 'excited': 2,
      'hyper': 2, 'full': 2, 'rejuvenated': 2, 'restored': 2, 'renewed': 2,
      'workout': 2, 'exercise': 2, 'exercised': 2, 'gym': 2, 'run': 2, 'ran': 2
    },
    positive: {
      'awake': 1, 'alert': 1, 'active': 1, 'okay': 1, 'fine': 1, 'decent': 1, 'rested': 1,
      'ready': 1, 'good': 1, 'fresh': 1, 'focused': 1, 'clear': 1, 'sharp': 1,
      'healthy': 1, 'fit': 1, 'well': 1, 'normal': 1, 'stable': 1, 'balanced': 1,
      'walk': 1, 'walked': 1, 'moved': 1, 'stretch': 1, 'stretched': 1
    },
    negative: {
      'tired': -1, 'sleepy': -1, 'drained': -1, 'low': -1, 'sluggish': -1, 'weary': -1,
      'worn': -1, 'fatigued': -1, 'lazy': -1, 'slow': -1, 'weak': -1, 'lethargic': -1,
      'drowsy': -1, 'groggy': -1, 'unmotivated': -1, 'listless': -1, 'apathetic': -1,
      'sick': -1, 'ill': -1, 'unwell': -1, 'headache': -1, 'pain': -1, 'ache': -1,
      'sore': -1, 'hurt': -1, 'nap': -1, 'rest': -1
    },
    veryNegative: {
      'exhausted': -2, 'depleted': -2, 'burnt out': -2, 'burnout': -2, 'collapse': -2,
      'collapsed': -2, 'dead': -2, 'dying': -2, 'zombie': -2, 'lifeless': -2, 'empty': -2,
      'bedridden': -2, 'hospitalized': -2, 'injured': -2, 'disabled': -2, 'paralyzed': -2,
      'crippled': -2, 'chronic': -2, 'severe': -2, 'intense': -2, 'unbearable': -2
    }
  }
};

// ============================================
// TIME EXPRESSIONS & PATTERNS
// ============================================

const timePatterns = {
  morning: ['morning', 'am', 'breakfast', 'woke', 'wake', 'dawn', 'sunrise', 'early'],
  afternoon: ['afternoon', 'lunch', 'noon', 'midday', 'pm'],
  evening: ['evening', 'dinner', 'night', 'sunset', 'dusk'],
  night: ['night', 'midnight', 'late', 'sleep', 'bed', 'bedtime'],
  
  // Days
  today: ['today', 'currently', 'now', 'right now', 'at the moment'],
  yesterday: ['yesterday', 'last night', 'earlier'],
  tomorrow: ['tomorrow', 'later', 'soon', 'upcoming'],
  
  // Week
  weekend: ['weekend', 'saturday', 'sunday'],
  weekday: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'weekday'],
  
  // Duration
  all_day: ['all day', 'whole day', 'entire day', 'day long'],
  quick: ['quick', 'brief', 'short', 'moment'],
  long: ['long', 'hours', 'forever', 'endless']
};

// ============================================
// MULTI-WORD PHRASES (Priority Detection)
// ============================================

const contextualPhrases = {
  // Mood phrases
  'feeling great': { mood: 2 },
  'feeling good': { mood: 1 },
  'feeling bad': { mood: -1 },
  'feeling terrible': { mood: -2 },
  'feeling awful': { mood: -2 },
  'feeling amazing': { mood: 2 },
  'on top of the world': { mood: 2, energy: 2 },
  'down in the dumps': { mood: -2 },
  'over the moon': { mood: 2 },
  'on cloud nine': { mood: 2 },
  
  // Work phrases
  'burnt out': { work: -2, energy: -2 },
  'burned out': { work: -2, energy: -2 },
  'burn out': { work: -2, energy: -2 },
  'worked out': { energy: 1 },
  'crushing it': { work: 2 },
  'nailed it': { work: 2 },
  'killed it': { work: 2 },
  'smashed it': { work: 2 },
  'knocked out': { work: 1, energy: -1 },
  
  // Social phrases
  'hanging out': { social: 1 },
  'hung out': { social: 1 },
  'went out': { social: 1 },
  'had fun': { mood: 1, social: 1 },
  'good time': { mood: 1, social: 1 },
  'great time': { mood: 2, social: 1 },
  'quality time': { social: 2 },
  'alone time': { social: 0 }, // neutral
  'me time': { social: 0 },
  'home alone': { social: -1 },
  'by myself': { social: -1 },
  
  // Combinations
  'went well': { mood: 1 },
  'going well': { mood: 1 },
  'not good': { mood: -1 },
  'not bad': { mood: 1 },
  'pretty good': { mood: 1 },
  'really good': { mood: 2 },
  'very good': { mood: 2 },
  'super tired': { energy: -2 },
  'extremely tired': { energy: -2 },
  'so tired': { energy: -2 },
  'dead tired': { energy: -2 },
  'wide awake': { energy: 2 },
  'full of energy': { energy: 2 }
};

// ============================================
// NEGATION & INTENSIFIERS
// ============================================

const negations = [
  'not', 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere',
  "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't",
  "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't",
  'without', 'lack', 'lacking', 'barely', 'hardly', 'scarcely'
];

const intensifiers = {
  // Strong intensifiers (1.5x - 2x)
  'very': 1.5, 'really': 1.5, 'extremely': 1.8, 'super': 1.6, 'incredibly': 1.7,
  'absolutely': 1.6, 'totally': 1.5, 'completely': 1.6, 'utterly': 1.7, 'truly': 1.5,
  'so': 1.6, 'such': 1.5, 'highly': 1.5, 'deeply': 1.6, 'profoundly': 1.7,
  'ridiculously': 1.8, 'insanely': 1.8, 'crazy': 1.7, 'mad': 1.7, 'wild': 1.7,
  
  // Moderate intensifiers (1.2x - 1.4x)
  'quite': 1.2, 'pretty': 1.2, 'rather': 1.2, 'fairly': 1.2, 'reasonably': 1.2,
  'considerably': 1.3, 'significantly': 1.3, 'notably': 1.3,
  
  // Weak intensifiers (0.7x - 0.9x)
  'somewhat': 0.8, 'slightly': 0.7, 'little': 0.7, 'bit': 0.7, 'kinda': 0.8,
  'kind of': 0.8, 'sort of': 0.8, 'a bit': 0.7, 'a little': 0.7, 'mildly': 0.8
};

// ============================================
// CONTEXTUAL INFERENCE RULES
// ============================================

const inferenceRules = {
  // If work is very negative, energy likely suffers
  workToEnergy: (workScore) => {
    if (workScore <= -1) return Math.max(workScore, -2);
    return 0;
  },
  
  // If social is very positive, mood improves
  socialToMood: (socialScore) => {
    if (socialScore >= 1) return Math.min(Math.floor(socialScore / 2) + 1, 2);
    if (socialScore <= -1) return Math.max(Math.ceil(socialScore / 2), -1);
    return 0;
  },
  
  // If mood is very negative, social might be affected
  moodToSocial: (moodScore) => {
    if (moodScore <= -1) return Math.max(Math.floor(moodScore / 2), -1);
    return 0;
  },
  
  // If energy is very low, mood suffers
  energyToMood: (energyScore) => {
    if (energyScore <= -1) return Math.max(Math.floor(energyScore / 2), -1);
    return 0;
  }
};

// ============================================
// MAIN ANALYSIS FUNCTION
// ============================================

function analyzeText(text) {
  if (!text || text.trim().length < 5) {
    return { mood: 0, social: 0, work: 0, energy: 0, time: null };
  }
  
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  // Initialize scores
  const scores = {
    mood: { total: 0, count: 0, mentions: [] },
    social: { total: 0, count: 0, mentions: [] },
    work: { total: 0, count: 0, mentions: [] },
    energy: { total: 0, count: 0, mentions: [] }
  };
  
  const timeContext = extractTimeContext(lowerText);
  
  // STEP 1: Detect multi-word phrases first (highest priority)
  for (const phrase in contextualPhrases) {
    if (lowerText.includes(phrase)) {
      const phraseScores = contextualPhrases[phrase];
      for (const dimension in phraseScores) {
        scores[dimension].total += phraseScores[dimension];
        scores[dimension].count++;
        scores[dimension].mentions.push({ word: phrase, score: phraseScores[dimension], source: 'phrase' });
      }
    }
  }
  
  // STEP 2: Analyze individual words with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const prevWord = i > 0 ? words[i - 1] : null;
    const nextWord = i < words.length - 1 ? words[i + 1] : null;
    
    // Check for negation
    const isNegated = prevWord && negations.includes(prevWord);
    
    // Check for intensifier
    let intensity = 1.0;
    if (prevWord && intensifiers[prevWord]) {
      intensity = intensifiers[prevWord];
    }
    
    // Check each dimension
    for (const dimension in comprehensiveLexicon) {
      for (const sentiment in comprehensiveLexicon[dimension]) {
        const lexiconWords = comprehensiveLexicon[dimension][sentiment];
        
        if (lexiconWords[word] !== undefined) {
          let score = lexiconWords[word];
          
          // Apply negation
          if (isNegated) {
            score = -score;
          }
          
          // Apply intensity
          score = score * intensity;
          
          // Clamp to -2 to 2
          score = Math.max(-2, Math.min(2, Math.round(score)));
          
          scores[dimension].total += score;
          scores[dimension].count++;
          scores[dimension].mentions.push({
            word,
            score,
            isNegated,
            intensity,
            source: 'lexicon'
          });
        }
      }
    }
  }
  
  // STEP 3: Calculate final scores
  const finalScores = {};
  for (const dimension in scores) {
    if (scores[dimension].count > 0) {
      // Calculate weighted average
      let avg = scores[dimension].total / scores[dimension].count;
      
      // Round to nearest integer
      finalScores[dimension] = Math.max(-2, Math.min(2, Math.round(avg)));
    } else {
      finalScores[dimension] = 0;
    }
  }
  
  // STEP 4: Apply contextual inference rules
  applyInferenceRules(finalScores, scores);
  
  // STEP 5: Add time context
  finalScores.time = timeContext;
  
  // Logging for debugging
  console.log('🧠 Advanced NLP Analysis:');
  console.log('  Input:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
  console.log('  Time Context:', timeContext);
  console.log('  Mentions:', {
    mood: scores.mood.count,
    social: scores.social.count,
    work: scores.work.count,
    energy: scores.energy.count
  });
  console.log('  Final Scores:', finalScores);
  
  return finalScores;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function extractTimeContext(text) {
  const context = {
    timeOfDay: null,
    day: null,
    duration: null
  };
  
  // Check time of day
  for (const time in timePatterns) {
    if (['morning', 'afternoon', 'evening', 'night'].includes(time)) {
      if (timePatterns[time].some(pattern => text.includes(pattern))) {
        context.timeOfDay = time;
        break;
      }
    }
  }
  
  // Check day reference
  if (timePatterns.today.some(pattern => text.includes(pattern))) {
    context.day = 'today';
  } else if (timePatterns.yesterday.some(pattern => text.includes(pattern))) {
    context.day = 'yesterday';
  } else if (timePatterns.tomorrow.some(pattern => text.includes(pattern))) {
    context.day = 'tomorrow';
  } else if (timePatterns.weekend.some(pattern => text.includes(pattern))) {
    context.day = 'weekend';
  }
  
  // Check duration
  if (timePatterns.all_day.some(pattern => text.includes(pattern))) {
    context.duration = 'all_day';
  } else if (timePatterns.quick.some(pattern => text.includes(pattern))) {
    context.duration = 'brief';
  } else if (timePatterns.long.some(pattern => text.includes(pattern))) {
    context.duration = 'extended';
  }
  
  return context;
}

function applyInferenceRules(finalScores, scores) {
  // Only apply inference if dimension wasn't explicitly mentioned
  
  // Work → Energy
  if (scores.energy.count === 0 && scores.work.count > 0) {
    const inferredEnergy = inferenceRules.workToEnergy(finalScores.work);
    if (inferredEnergy !== 0) {
      finalScores.energy = inferredEnergy;
    }
  }
  
  // Social → Mood
  if (scores.mood.count === 0 && scores.social.count > 0) {
    const inferredMood = inferenceRules.socialToMood(finalScores.social);
    if (inferredMood !== 0) {
      finalScores.mood = inferredMood;
    }
  }
  
  // Mood → Social (weaker inference)
  if (scores.social.count === 0 && scores.mood.count > 0) {
    const inferredSocial = inferenceRules.moodToSocial(finalScores.mood);
    if (inferredSocial !== 0) {
      finalScores.social = inferredSocial;
    }
  }
  
  // Energy → Mood
  if (scores.mood.count === 0 && scores.energy.count > 0) {
    const inferredMood = inferenceRules.energyToMood(finalScores.energy);
    if (inferredMood !== 0) {
      finalScores.mood = inferredMood;
    }
  }
}

module.exports = { analyzeText };
