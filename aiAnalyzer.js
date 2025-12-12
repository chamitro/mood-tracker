/**
 * COMPREHENSIVE NLP TEXT ANALYZER
 * 
 * Analyzes 7 dimensions:
 * 1. Mood - Overall emotional state
 * 2. Social - Relationships and interactions
 * 3. Work - Career and productivity
 * 4. Energy - Physical and mental vitality
 * 5. Health - Physical and mental health status
 * 6. Sleep - Sleep quality and patterns
 * 7. Stress - Anxiety and pressure levels
 */

// ============================================
// COMPREHENSIVE LEXICON - All English Words
// ============================================

const lexicon = {
  mood: {
    veryPositive: {
      // Joy & Happiness
      'amazing': 2, 'excellent': 2, 'fantastic': 2, 'wonderful': 2, 'incredible': 2,
      'ecstatic': 2, 'thrilled': 2, 'overjoyed': 2, 'delighted': 2, 'euphoric': 2,
      'blessed': 2, 'grateful': 2, 'phenomenal': 2, 'spectacular': 2, 'magnificent': 2,
      'awesome': 2, 'brilliant': 2, 'fabulous': 2, 'marvelous': 2, 'superb': 2,
      'elated': 2, 'jubilant': 2, 'exhilarated': 2, 'radiant': 2, 'blissful': 2,
      'joyful': 2, 'triumphant': 2, 'victorious': 2, 'glorious': 2, 'heavenly': 2,
      'perfect': 2, 'paradise': 2, 'divine': 2, 'magical': 2, 'extraordinary': 2
    },
    positive: {
      'good': 1, 'great': 1, 'nice': 1, 'happy': 1, 'fine': 1, 'okay': 1, 'pleasant': 1,
      'cheerful': 1, 'content': 1, 'satisfied': 1, 'glad': 1, 'better': 1, 'improved': 1,
      'decent': 1, 'alright': 1, 'enjoyable': 1, 'positive': 1, 'upbeat': 1, 'optimistic': 1,
      'hopeful': 1, 'confident': 1, 'peaceful': 1, 'calm': 1, 'relaxed': 1, 'comfortable': 1,
      'pleased': 1, 'thankful': 1, 'appreciate': 1, 'love': 1, 'like': 1, 'enjoy': 1,
      'fun': 1, 'exciting': 1, 'interesting': 1
    },
    negative: {
      'bad': -1, 'sad': -1, 'unhappy': -1, 'disappointed': -1, 'upset': -1, 'down': -1,
      'frustrated': -1, 'annoyed': -1, 'worried': -1, 'anxious': -1, 'nervous': -1,
      'stressed': -1, 'difficult': -1, 'rough': -1, 'tough': -1, 'hard': -1, 'poor': -1,
      'uncomfortable': -1, 'uneasy': -1, 'concerned': -1, 'troubled': -1, 'bothered': -1,
      'irritated': -1, 'agitated': -1, 'restless': -1, 'tense': -1, 'overwhelmed': -1,
      'discouraged': -1, 'unmotivated': -1, 'bored': -1, 'dull': -1, 'gloomy': -1,
      'blue': -1, 'melancholy': -1, 'somber': -1, 'moody': -1
    },
    veryNegative: {
      // Extreme sadness & despair
      'terrible': -2, 'awful': -2, 'horrible': -2, 'miserable': -2, 'depressed': -2,
      'devastating': -2, 'hopeless': -2, 'worst': -2, 'dreadful': -2, 'unbearable': -2,
      'crushing': -2, 'heartbroken': -2, 'agonizing': -2, 'furious': -2, 'enraged': -2,
      'hateful': -2, 'despair': -2, 'desperate': -2, 'suicidal': -2, 'traumatic': -2,
      'nightmare': -2, 'catastrophic': -2, 'disastrous': -2, 'tragic': -2, 'anguish': -2,
      'tormented': -2, 'suffering': -2, 'pain': -2, 'agony': -2, 'grief': -2,
      // Dark thoughts
      'die': -2, 'death': -2, 'dead': -2, 'kill': -2, 'suicide': -2, 'end': -2,
      'worthless': -2, 'useless': -2, 'hate': -2, 'broken': -2, 'empty': -2,
      'numb': -2, 'void': -2, 'darkness': -2, 'hell': -2
    }
  },
  
  social: {
    veryPositive: {
      'love': 2, 'loved': 2, 'loving': 2, 'friendship': 2, 'bonding': 2, 'celebration': 2,
      'party': 2, 'gathering': 2, 'reunion': 2, 'connected': 2, 'together': 2, 'supported': 2,
      'welcomed': 2, 'included': 2, 'appreciated': 2, 'cherished': 2, 'adored': 2,
      'embraced': 2, 'united': 2, 'community': 2, 'belonging': 2, 'accepted': 2,
      'wedding': 2, 'engagement': 2, 'birthday': 2, 'anniversary': 2
    },
    positive: {
      'friends': 1, 'friend': 1, 'met': 1, 'meeting': 1, 'talked': 1, 'chat': 1, 'coffee': 1,
      'lunch': 1, 'dinner': 1, 'social': 1, 'people': 1, 'colleague': 1, 'colleagues': 1,
      'team': 1, 'family': 1, 'conversation': 1, 'fun': 1, 'enjoyed': 1, 'laughed': 1,
      'partner': 1, 'spouse': 1, 'boyfriend': 1, 'girlfriend': 1, 'date': 1, 'dating': 1,
      'roommate': 1, 'neighbor': 1, 'visit': 1, 'visited': 1, 'hangout': 1, 'group': 1
    },
    negative: {
      'alone': -1, 'lonely': -1, 'isolated': -1, 'argument': -1, 'disagreement': -1,
      'tension': -1, 'awkward': -1, 'uncomfortable': -1, 'distant': -1, 'fight': -1,
      'fighting': -1, 'conflict': -1, 'misunderstanding': -1, 'separate': -1, 'separated': -1,
      'divorce': -1, 'breakup': -1, 'broke': -1, 'drama': -1, 'gossip': -1
    },
    veryNegative: {
      'abandoned': -2, 'rejected': -2, 'excluded': -2, 'betrayed': -2, 'bullied': -2,
      'hostile': -2, 'toxic': -2, 'hated': -2, 'ignored': -2, 'ostracized': -2,
      'abuse': -2, 'abused': -2, 'harassed': -2, 'harassment': -2, 'threatened': -2,
      'attacked': -2, 'violence': -2, 'hatred': -2, 'enemy': -2, 'shunned': -2
    }
  },
  
  work: {
    veryPositive: {
      'accomplished': 2, 'achievement': 2, 'success': 2, 'successful': 2, 'breakthrough': 2,
      'promotion': 2, 'promoted': 2, 'praised': 2, 'recognized': 2, 'award': 2,
      'excellent': 2, 'outstanding': 2, 'productive': 2, 'efficient': 2, 'completed': 2,
      'triumph': 2, 'victory': 2, 'won': 2, 'winning': 2, 'exceeded': 2, 'excelled': 2,
      'mastered': 2, 'innovated': 2, 'launched': 2, 'bonus': 2, 'raise': 2, 'hired': 2
    },
    positive: {
      'finished': 1, 'progress': 1, 'working': 1, 'work': 1, 'task': 1, 'project': 1,
      'meeting': 1, 'presentation': 1, 'job': 1, 'office': 1, 'business': 1, 
      'professional': 1, 'organized': 1, 'focused': 1, 'career': 1, 'client': 1,
      'done': 1, 'deliver': 1, 'delivered': 1
    },
    negative: {
      'stressed': -1, 'deadline': -1, 'pressure': -1, 'behind': -1, 'difficult': -1,
      'challenging': -1, 'problem': -1, 'issue': -1, 'struggle': -1, 'struggling': -1,
      'overtime': -1, 'busy': -1, 'hectic': -1, 'confused': -1, 'mistake': -1,
      'error': -1, 'delay': -1, 'delayed': -1, 'setback': -1, 'rejection': -1,
      'rejected': -1, 'criticism': -1, 'criticized': -1, 'late': -1, 'rush': -1
    },
    veryNegative: {
      'overwhelming': -2, 'overwhelmed': -2, 'burnout': -2, 'burnt': -2, 'failed': -2,
      'failure': -2, 'disaster': -2, 'impossible': -2, 'crisis': -2, 'nightmare': -2,
      'chaos': -2, 'fired': -2, 'quit': -2, 'quitting': -2, 'layoff': -2,
      'unemployed': -2, 'jobless': -2, 'bankruptcy': -2, 'sued': -2, 'collapse': -2
    }
  },
  
  energy: {
    veryPositive: {
      'energized': 2, 'energetic': 2, 'refreshed': 2, 'revitalized': 2, 'pumped': 2,
      'motivated': 2, 'charged': 2, 'invigorated': 2, 'strong': 2, 'powerful': 2,
      'vibrant': 2, 'lively': 2, 'dynamic': 2, 'enthusiastic': 2, 'excited': 2,
      'hyper': 2, 'rejuvenated': 2, 'restored': 2, 'renewed': 2, 'alive': 2,
      'workout': 2, 'exercise': 2, 'exercised': 2, 'gym': 2, 'run': 2, 'ran': 2
    },
    positive: {
      'awake': 1, 'alert': 1, 'active': 1, 'rested': 1, 'ready': 1, 'good': 1,
      'fresh': 1, 'focused': 1, 'clear': 1, 'sharp': 1, 'healthy': 1, 'fit': 1,
      'well': 1, 'normal': 1, 'stable': 1, 'balanced': 1, 'walk': 1, 'walked': 1
    },
    negative: {
      'tired': -1, 'sleepy': -1, 'drained': -1, 'low': -1, 'sluggish': -1, 'weary': -1,
      'worn': -1, 'fatigued': -1, 'lazy': -1, 'slow': -1, 'weak': -1, 'lethargic': -1,
      'drowsy': -1, 'groggy': -1, 'unmotivated': -1, 'listless': -1, 'apathetic': -1
    },
    veryNegative: {
      'exhausted': -2, 'depleted': -2, 'burnt out': -2, 'burnout': -2, 'collapse': -2,
      'collapsed': -2, 'dead': -2, 'dying': -2, 'zombie': -2, 'lifeless': -2, 'empty': -2,
      'drained': -2, 'wiped': -2, 'shattered': -2
    }
  },
  
  // NEW CATEGORY: Health
  health: {
    veryPositive: {
      'healthy': 2, 'fit': 2, 'strong': 2, 'robust': 2, 'vigorous': 2, 'thriving': 2,
      'recovered': 2, 'healed': 2, 'cured': 2, 'wellness': 2, 'vitality': 2,
      'energetic': 2, 'athletic': 2, 'muscular': 2
    },
    positive: {
      'well': 1, 'fine': 1, 'okay': 1, 'good': 1, 'better': 1, 'improving': 1,
      'recovering': 1, 'healing': 1, 'stable': 1, 'normal': 1, 'decent': 1
    },
    negative: {
      'sick': -1, 'ill': -1, 'unwell': -1, 'cold': -1, 'flu': -1, 'fever': -1,
      'headache': -1, 'pain': -1, 'ache': -1, 'sore': -1, 'hurt': -1, 'injury': -1,
      'injured': -1, 'weak': -1, 'nauseous': -1, 'dizzy': -1, 'cough': -1,
      'allergies': -1, 'infection': -1
    },
    veryNegative: {
      'hospital': -2, 'hospitalized': -2, 'emergency': -2, 'surgery': -2, 'diagnosed': -2,
      'disease': -2, 'cancer': -2, 'chronic': -2, 'severe': -2, 'critical': -2,
      'disabled': -2, 'paralyzed': -2, 'terminal': -2, 'dying': -2, 'bedridden': -2
    }
  },
  
  // NEW CATEGORY: Sleep
  sleep: {
    veryPositive: {
      'well-rested': 2, 'refreshed': 2, 'rejuvenated': 2, 'great sleep': 2,
      'slept well': 2, 'perfect sleep': 2, 'amazing sleep': 2, 'deep sleep': 2
    },
    positive: {
      'rested': 1, 'slept': 1, 'sleep': 1, 'nap': 1, 'napped': 1, 'rest': 1,
      'okay sleep': 1, 'decent sleep': 1, 'enough sleep': 1
    },
    negative: {
      'tired': -1, 'sleepy': -1, 'drowsy': -1, 'groggy': -1, 'yawn': -1,
      'need sleep': -1, 'little sleep': -1, 'not enough sleep': -1,
      'bad sleep': -1, 'poor sleep': -1, 'restless': -1
    },
    veryNegative: {
      'insomnia': -2, 'sleepless': -2, 'no sleep': -2, 'cant sleep': -2,
      'exhausted': -2, 'sleep deprived': -2, 'nightmare': -2, 'nightmares': -2,
      'up all night': -2, 'didnt sleep': -2
    }
  },
  
  // NEW CATEGORY: Stress
  stress: {
    veryPositive: {
      'relaxed': 2, 'calm': 2, 'peaceful': 2, 'tranquil': 2, 'serene': 2,
      'carefree': 2, 'zen': 2, 'stress-free': 2, 'unburdened': 2, 'at ease': 2
    },
    positive: {
      'okay': 1, 'fine': 1, 'manageable': 1, 'stable': 1, 'balanced': 1,
      'comfortable': 1, 'coping': 1, 'handling': 1
    },
    negative: {
      'stressed': -1, 'stress': -1, 'anxious': -1, 'anxiety': -1, 'worried': -1,
      'worry': -1, 'nervous': -1, 'tense': -1, 'pressure': -1, 'pressured': -1,
      'overwhelmed': -1, 'frazzled': -1, 'frantic': -1, 'rushed': -1
    },
    veryNegative: {
      'panic': -2, 'panicking': -2, 'panic attack': -2, 'breakdown': -2,
      'breaking down': -2, 'cant cope': -2, 'unbearable': -2, 'crushing': -2,
      'suffocating': -2, 'drowning': -2, 'crisis': -2
    }
  }
};

// ============================================
// CRITICAL PHRASES - High Priority Detection
// ============================================

const criticalPhrases = {
  // Suicidal/harmful thoughts
  'want to die': { mood: -2, health: -2, stress: -2 },
  'wanna die': { mood: -2, health: -2, stress: -2 },
  'wish i was dead': { mood: -2, health: -2, stress: -2 },
  'kill myself': { mood: -2, health: -2, stress: -2 },
  'end it all': { mood: -2, health: -2, stress: -2 },
  'no point': { mood: -2, stress: -2 },
  'give up': { mood: -2, stress: -1 },
  'cant go on': { mood: -2, stress: -2 },
  'no hope': { mood: -2, stress: -2 },
  
  // Mental health crises
  'panic attack': { stress: -2, health: -2 },
  'mental breakdown': { mood: -2, stress: -2, health: -2 },
  'nervous breakdown': { mood: -2, stress: -2, health: -2 },
  'cant cope': { stress: -2, mood: -1 },
  'losing my mind': { mood: -2, stress: -2 },
  
  // Work burnout
  'burnt out': { work: -2, energy: -2, stress: -2 },
  'burned out': { work: -2, energy: -2, stress: -2 },
  'burn out': { work: -2, energy: -2, stress: -2 },
  
  // Positive phrases
  'feeling great': { mood: 2 },
  'feeling amazing': { mood: 2 },
  'on top of the world': { mood: 2, energy: 2 },
  'best day ever': { mood: 2 },
  'couldn\'t be better': { mood: 2 },
  'life is good': { mood: 2 },
  
  // Social
  'hanging out': { social: 1 },
  'quality time': { social: 2 },
  'had fun': { mood: 1, social: 1 },
  'great time': { mood: 2, social: 1 },
  'home alone': { social: -1 },
  'all alone': { social: -2, mood: -1 },
  
  // Work
  'crushing it': { work: 2 },
  'nailed it': { work: 2 },
  'killed it': { work: 2 },
  
  // Sleep
  'slept well': { sleep: 2, energy: 1 },
  'great sleep': { sleep: 2, energy: 1 },
  'no sleep': { sleep: -2, energy: -2 },
  'cant sleep': { sleep: -2, stress: -1 },
  'up all night': { sleep: -2, energy: -1 }
};

// ============================================
// NEGATIONS & INTENSIFIERS
// ============================================

const negations = [
  'not', 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere',
  "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't",
  "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't",
  'without', 'lack', 'lacking', 'barely', 'hardly', 'scarcely'
];

const intensifiers = {
  'very': 1.5, 'really': 1.5, 'extremely': 1.8, 'super': 1.6, 'incredibly': 1.7,
  'absolutely': 1.6, 'totally': 1.5, 'completely': 1.6, 'utterly': 1.7, 'truly': 1.5,
  'so': 1.6, 'such': 1.5, 'highly': 1.5, 'deeply': 1.6, 'profoundly': 1.7,
  'ridiculously': 1.8, 'insanely': 1.8, 'crazy': 1.7, 'mad': 1.7,
  'quite': 1.2, 'pretty': 1.2, 'rather': 1.2, 'fairly': 1.2,
  'somewhat': 0.8, 'slightly': 0.7, 'little': 0.7, 'bit': 0.7, 'kinda': 0.8
};

// ============================================
// MAIN ANALYSIS FUNCTION
// ============================================

function analyzeText(text) {
  if (!text || text.trim().length < 5) {
    return { mood: 0, social: 0, work: 0, energy: 0, health: 0, sleep: 0, stress: 0, time: null };
  }
  
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  // Initialize scores for all dimensions
  const scores = {
    mood: { total: 0, count: 0 },
    social: { total: 0, count: 0 },
    work: { total: 0, count: 0 },
    energy: { total: 0, count: 0 },
    health: { total: 0, count: 0 },
    sleep: { total: 0, count: 0 },
    stress: { total: 0, count: 0 }
  };
  
  // STEP 1: Check critical phrases FIRST (highest priority)
  for (const phrase in criticalPhrases) {
    if (lowerText.includes(phrase)) {
      const phraseScores = criticalPhrases[phrase];
      for (const dimension in phraseScores) {
        scores[dimension].total += phraseScores[dimension] * 2; // Double weight for critical phrases
        scores[dimension].count++;
      }
    }
  }
  
  // STEP 2: Analyze individual words with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const prevWord = i > 0 ? words[i - 1] : null;
    
    // Check for negation
    const isNegated = prevWord && negations.includes(prevWord);
    
    // Check for intensifier
    let intensity = 1.0;
    if (prevWord && intensifiers[prevWord]) {
      intensity = intensifiers[prevWord];
    }
    
    // Check each dimension
    for (const dimension in lexicon) {
      for (const sentiment in lexicon[dimension]) {
        const lexiconWords = lexicon[dimension][sentiment];
        
        if (lexiconWords[word] !== undefined) {
          let score = lexiconWords[word];
          
          // Apply negation
          if (isNegated) score = -score;
          
          // Apply intensity
          score = score * intensity;
          
          // Clamp to -2 to 2
          score = Math.max(-2, Math.min(2, Math.round(score)));
          
          scores[dimension].total += score;
          scores[dimension].count++;
        }
      }
    }
  }
  
  // STEP 3: Calculate final scores
  const finalScores = {};
  for (const dimension in scores) {
    if (scores[dimension].count > 0) {
      let avg = scores[dimension].total / scores[dimension].count;
      finalScores[dimension] = Math.max(-2, Math.min(2, Math.round(avg)));
    } else {
      finalScores[dimension] = 0;
    }
  }
  
  // STEP 4: Apply contextual inference
  applyInferenceRules(finalScores, scores);
  
  // STEP 5: Extract time context
  finalScores.time = extractTimeContext(lowerText);
  
  console.log('🧠 Advanced NLP Analysis:');
  console.log('  Input:', text.substring(0, 100));
  console.log('  Final Scores:', finalScores);
  
  return finalScores;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function extractTimeContext(text) {
  const context = { timeOfDay: null, day: null, duration: null };
  
  // Time of day
  if (text.includes('morning') || text.includes('breakfast') || text.includes('am')) {
    context.timeOfDay = 'morning';
  } else if (text.includes('afternoon') || text.includes('lunch') || text.includes('noon')) {
    context.timeOfDay = 'afternoon';
  } else if (text.includes('evening') || text.includes('dinner') || text.includes('sunset')) {
    context.timeOfDay = 'evening';
  } else if (text.includes('night') || text.includes('midnight') || text.includes('pm')) {
    context.timeOfDay = 'night';
  }
  
  // Day reference
  if (text.includes('today') || text.includes('now')) {
    context.day = 'today';
  } else if (text.includes('yesterday')) {
    context.day = 'yesterday';
  } else if (text.includes('tomorrow')) {
    context.day = 'tomorrow';
  } else if (text.includes('weekend') || text.includes('saturday') || text.includes('sunday')) {
    context.day = 'weekend';
  }
  
  // Duration
  if (text.includes('all day') || text.includes('whole day')) {
    context.duration = 'all_day';
  } else if (text.includes('quick') || text.includes('brief') || text.includes('moment')) {
    context.duration = 'brief';
  } else if (text.includes('long') || text.includes('hours') || text.includes('forever')) {
    context.duration = 'extended';
  }
  
  return context;
}

function applyInferenceRules(finalScores, scores) {
  // Work stress → affects stress & energy
  if (scores.work.count > 0 && finalScores.work <= -1) {
    if (scores.stress.count === 0) finalScores.stress = Math.max(-2, finalScores.work);
    if (scores.energy.count === 0) finalScores.energy = Math.max(-1, Math.ceil(finalScores.work / 2));
  }
  
  // Bad sleep → affects energy & mood
  if (scores.sleep.count > 0 && finalScores.sleep <= -1) {
    if (scores.energy.count === 0) finalScores.energy = Math.max(-2, finalScores.sleep);
    if (scores.mood.count === 0) finalScores.mood = Math.max(-1, Math.ceil(finalScores.sleep / 2));
  }
  
  // High stress → affects health & mood
  if (scores.stress.count > 0 && finalScores.stress <= -1) {
    if (scores.health.count === 0) finalScores.health = Math.max(-1, Math.ceil(finalScores.stress / 2));
    if (scores.mood.count === 0) finalScores.mood = Math.max(-2, finalScores.stress);
  }
  
  // Bad health → affects energy & mood
  if (scores.health.count > 0 && finalScores.health <= -1) {
    if (scores.energy.count === 0) finalScores.energy = Math.max(-2, finalScores.health);
    if (scores.mood.count === 0) finalScores.mood = Math.max(-1, Math.ceil(finalScores.health / 2));
  }
  
  // Social → affects mood
  if (scores.social.count > 0) {
    if (finalScores.social >= 1 && scores.mood.count === 0) {
      finalScores.mood = 1;
    } else if (finalScores.social <= -1 && scores.mood.count === 0) {
      finalScores.mood = Math.max(-1, Math.ceil(finalScores.social / 2));
    }
  }
}

module.exports = { analyzeText };
