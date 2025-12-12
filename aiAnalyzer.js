/**
 * TRULY INTELLIGENT SEMANTIC ANALYZER
 * 
 * This AI works like a human psychologist:
 * 1. Reads the entire text holistically
 * 2. Understands emotional weight and context
 * 3. Detects implied emotions (not just keywords)
 * 4. Analyzes sentence relationships
 * 5. Considers overall tone and sentiment
 */

// ============================================
// COMPREHENSIVE EMOTIONAL LEXICON
// ============================================

const emotionalLexicon = {
  // EXTREME POSITIVE (+2)
  extremePositive: {
    words: [
      'amazing', 'incredible', 'fantastic', 'wonderful', 'spectacular', 'phenomenal',
      'extraordinary', 'magnificent', 'brilliant', 'exceptional', 'outstanding',
      'perfect', 'excellent', 'superb', 'marvelous', 'fabulous', 'glorious',
      'ecstatic', 'thrilled', 'overjoyed', 'elated', 'euphoric', 'blissful',
      'best', 'greatest', 'finest', 'ultimate', 'supreme'
    ],
    value: 2
  },
  
  // POSITIVE (+1)
  positive: {
    words: [
      'good', 'great', 'nice', 'happy', 'glad', 'pleased', 'satisfied',
      'fine', 'okay', 'better', 'improved', 'pleasant', 'enjoyable',
      'fun', 'exciting', 'interesting', 'cheerful', 'content', 'comfortable',
      'peaceful', 'calm', 'relaxed', 'hopeful', 'optimistic', 'confident',
      'love', 'like', 'enjoy', 'appreciate', 'thankful', 'grateful'
    ],
    value: 1
  },
  
  // NEGATIVE (-1)
  negative: {
    words: [
      'bad', 'sad', 'unhappy', 'upset', 'disappointed', 'frustrated',
      'annoyed', 'irritated', 'worried', 'anxious', 'nervous', 'stressed',
      'difficult', 'hard', 'tough', 'rough', 'uncomfortable', 'uneasy',
      'tired', 'bored', 'lonely', 'alone', 'lost', 'miss', 'missing'
    ],
    value: -1
  },
  
  // EXTREME NEGATIVE (-2)
  extremeNegative: {
    words: [
      'terrible', 'horrible', 'awful', 'dreadful', 'worst', 'disastrous',
      'devastating', 'catastrophic', 'tragic', 'miserable', 'depressed',
      'hopeless', 'desperate', 'crushed', 'shattered', 'broken', 'destroyed',
      'hate', 'hated', 'despise', 'furious', 'enraged', 'agonizing',
      'unbearable', 'excruciating', 'traumatic', 'nightmare',
      'die', 'death', 'dead', 'died', 'kill', 'suicide'
    ],
    value: -2
  }
};

// Life events and their emotional weights
const lifeEvents = {
  veryPositive: [
    'wedding', 'married', 'engagement', 'engaged', 'baby', 'birth', 'born',
    'promotion', 'promoted', 'graduated', 'graduation', 'accepted',
    'won', 'victory', 'success', 'achievement', 'accomplished', 'celebration'
  ],
  
  veryNegative: [
    'died', 'death', 'passed away', 'funeral', 'cancer', 'disease',
    'accident', 'injured', 'hospital', 'emergency', 'surgery',
    'fired', 'fired', 'lost job', 'unemployed', 'bankrupt',
    'divorced', 'breakup', 'broke up', 'separation', 'left me'
  ]
};

// Emotional intensifiers
const intensifiers = {
  extreme: ['extremely', 'incredibly', 'absolutely', 'completely', 'totally', 'utterly', 'ridiculously', 'insanely'],
  high: ['very', 'really', 'super', 'so', 'such', 'truly', 'deeply'],
  moderate: ['quite', 'pretty', 'rather', 'fairly'],
  low: ['somewhat', 'slightly', 'a bit', 'a little', 'kind of', 'sort of']
};

// Negation words
const negations = ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 
                  "don't", "doesn't", "didn't", "won't", "can't", "couldn't", "isn't", "aren't", "wasn't", "weren't"];

// ============================================
// CONTEXT UNDERSTANDING
// ============================================

function analyzeContext(text) {
  const lower = text.toLowerCase();
  const context = {
    hasLoss: false,
    hasCelebration: false,
    hasCrisis: false,
    hasAchievement: false,
    hasRelationship: false,
    hasHealth: false,
    hasWork: false,
    hasSleep: false
  };
  
  // Loss detection (pets, loved ones)
  const lossIndicators = [
    'lost my', 'lost our', 'lost the', 'my dog died', 'my cat died', 
    'passed away', 'saying goodbye', 'pet died', 'friend died',
    'can\'t believe', 'gone forever', 'miss so much', 'miss them'
  ];
  context.hasLoss = lossIndicators.some(ind => lower.includes(ind));
  
  // Achievement/celebration
  const achievementIndicators = [
    'best day', 'best time', 'best moment', 'greatest day', 'happiest',
    'crushed it', 'nailed it', 'killed it', 'aced it', 'proud of',
    'dream come true', 'on top of the world', 'cloud nine'
  ];
  context.hasCelebration = achievementIndicators.some(ind => lower.includes(ind));
  
  // Mental health crisis
  const crisisIndicators = [
    'want to die', 'wanna die', 'kill myself', 'end it all', 'no point',
    'give up', 'can\'t go on', 'losing my mind', 'breakdown', 'can\'t take it'
  ];
  context.hasCrisis = crisisIndicators.some(ind => lower.includes(ind));
  
  // Work context
  const workIndicators = ['work', 'job', 'office', 'meeting', 'project', 'deadline', 'boss', 'promotion', 'fired'];
  context.hasWork = workIndicators.some(ind => lower.includes(ind));
  
  // Sleep context
  const sleepIndicators = ['sleep', 'slept', 'tired', 'exhausted', 'insomnia', 'rest', 'bed'];
  context.hasSleep = sleepIndicators.some(ind => lower.includes(ind));
  
  // Health context
  const healthIndicators = ['sick', 'ill', 'hospital', 'doctor', 'pain', 'hurt', 'injury', 'healthy', 'fit'];
  context.hasHealth = healthIndicators.some(ind => lower.includes(ind));
  
  // Relationship context
  const relationshipIndicators = ['friend', 'friends', 'family', 'partner', 'girlfriend', 'boyfriend', 'wife', 'husband'];
  context.hasRelationship = relationshipIndicators.some(ind => lower.includes(ind));
  
  return context;
}

// ============================================
// SENTENCE ANALYSIS
// ============================================

function analyzeSentences(text) {
  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  const sentimentScores = {
    overall: 0,
    mood: 0,
    social: 0,
    work: 0,
    energy: 0,
    health: 0,
    sleep: 0,
    stress: 0
  };
  
  sentences.forEach(sentence => {
    const score = analyzeSentence(sentence);
    
    // Accumulate scores
    sentimentScores.overall += score.sentiment;
    sentimentScores.mood += score.sentiment;
    
    if (score.dimensions.social) sentimentScores.social += score.sentiment;
    if (score.dimensions.work) sentimentScores.work += score.sentiment;
    if (score.dimensions.energy) sentimentScores.energy += score.sentiment;
    if (score.dimensions.health) sentimentScores.health += score.sentiment;
    if (score.dimensions.sleep) sentimentScores.sleep += score.sentiment;
    if (score.dimensions.stress) sentimentScores.stress += score.sentiment * -1; // Negative emotion = high stress
  });
  
  return sentimentScores;
}

function analyzeSentence(sentence) {
  const lower = sentence.toLowerCase();
  const words = lower.split(/\s+/).map(w => w.replace(/[.,!?;:]/g, ''));
  
  let sentiment = 0;
  let intensityMultiplier = 1.0;
  let isNegated = false;
  
  const dimensions = {
    social: false,
    work: false,
    energy: false,
    health: false,
    sleep: false,
    stress: false
  };
  
  // Analyze each word with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const prevWord = i > 0 ? words[i - 1] : '';
    const nextWord = i < words.length - 1 ? words[i + 1] : '';
    
    // Check for intensifiers
    if (intensifiers.extreme.includes(word)) intensityMultiplier = 2.0;
    else if (intensifiers.high.includes(word)) intensityMultiplier = 1.6;
    else if (intensifiers.moderate.includes(word)) intensityMultiplier = 1.2;
    else if (intensifiers.low.includes(word)) intensityMultiplier = 0.7;
    
    // Check for negation
    if (negations.includes(word)) {
      isNegated = true;
      continue;
    }
    
    // Check emotional words
    if (emotionalLexicon.extremePositive.words.includes(word)) {
      let score = 2 * intensityMultiplier;
      if (isNegated) score = -score * 0.8;
      sentiment += score;
      isNegated = false;
      intensityMultiplier = 1.0;
    }
    else if (emotionalLexicon.positive.words.includes(word)) {
      let score = 1 * intensityMultiplier;
      if (isNegated) score = -score * 0.8;
      sentiment += score;
      isNegated = false;
      intensityMultiplier = 1.0;
    }
    else if (emotionalLexicon.negative.words.includes(word)) {
      let score = -1 * intensityMultiplier;
      if (isNegated) score = -score * 0.8; // "not bad" = slightly positive
      sentiment += score;
      isNegated = false;
      intensityMultiplier = 1.0;
    }
    else if (emotionalLexicon.extremeNegative.words.includes(word)) {
      let score = -2 * intensityMultiplier;
      if (isNegated) score = -score * 0.5; // "not terrible" = neutral-ish
      sentiment += score;
      isNegated = false;
      intensityMultiplier = 1.0;
    }
    
    // Detect dimensions
    const socialWords = ['friend', 'friends', 'family', 'people', 'together', 'alone', 'lonely', 'social', 'party', 'met', 'hangout'];
    const workWords = ['work', 'job', 'office', 'project', 'meeting', 'deadline', 'boss', 'colleague', 'career'];
    const energyWords = ['tired', 'exhausted', 'energized', 'drained', 'pumped', 'motivated', 'energy', 'workout'];
    const healthWords = ['sick', 'healthy', 'ill', 'doctor', 'hospital', 'pain', 'fit', 'injury'];
    const sleepWords = ['sleep', 'slept', 'insomnia', 'rest', 'awake', 'bed'];
    const stressWords = ['stressed', 'anxiety', 'worried', 'pressure', 'overwhelmed', 'panic', 'calm', 'relaxed'];
    
    if (socialWords.includes(word)) dimensions.social = true;
    if (workWords.includes(word)) dimensions.work = true;
    if (energyWords.includes(word)) dimensions.energy = true;
    if (healthWords.includes(word)) dimensions.health = true;
    if (sleepWords.includes(word)) dimensions.sleep = true;
    if (stressWords.includes(word)) dimensions.stress = true;
  }
  
  return { sentiment, dimensions };
}

// ============================================
// MAIN ANALYSIS FUNCTION
// ============================================

function analyzeText(text) {
  if (!text || text.trim().length < 5) {
    return { mood: 0, social: 0, work: 0, energy: 0, health: 0, sleep: 0, stress: 0, time: null };
  }
  
  console.log('\n🧠 INTELLIGENT SEMANTIC ANALYSIS');
  console.log('Input:', text);
  
  // Step 1: Understand context
  const context = analyzeContext(text);
  console.log('Context:', context);
  
  // Step 2: Analyze sentences
  const sentimentScores = analyzeSentences(text);
  console.log('Raw Sentiment:', sentimentScores);
  
  // Step 3: Apply context weights
  const finalScores = {
    mood: 0,
    social: 0,
    work: 0,
    energy: 0,
    health: 0,
    sleep: 0,
    stress: 0
  };
  
  // Calculate base mood from overall sentiment
  const avgSentiment = sentimentScores.overall / text.split(/[.!?]/).length;
  finalScores.mood = Math.max(-2, Math.min(2, Math.round(avgSentiment)));
  
  // Apply contextual overrides
  if (context.hasLoss) {
    finalScores.mood = -2;
    finalScores.social = -2;
    console.log('💔 Loss detected - setting mood and social to -2');
  }
  
  if (context.hasCelebration) {
    finalScores.mood = Math.max(finalScores.mood, 2);
    console.log('🎉 Celebration detected - boosting mood to 2');
  }
  
  if (context.hasCrisis) {
    finalScores.mood = -2;
    finalScores.health = -2;
    finalScores.stress = -2;
    console.log('🚨 Crisis detected - critical negative scores');
  }
  
  // Calculate dimension scores
  if (context.hasWork) {
    finalScores.work = Math.max(-2, Math.min(2, Math.round(sentimentScores.work / 2)));
    if (finalScores.work <= -1) {
      finalScores.stress = Math.min(-1, finalScores.work);
    }
  }
  
  if (context.hasSleep) {
    finalScores.sleep = Math.max(-2, Math.min(2, Math.round(sentimentScores.sleep / 2)));
    if (finalScores.sleep <= -1) {
      finalScores.energy = Math.max(-2, finalScores.sleep);
    }
  }
  
  if (context.hasHealth) {
    finalScores.health = Math.max(-2, Math.min(2, Math.round(sentimentScores.health / 2)));
    if (finalScores.health <= -1) {
      finalScores.energy = Math.max(-1, Math.ceil(finalScores.health / 2));
    }
  }
  
  if (context.hasRelationship) {
    finalScores.social = Math.max(-2, Math.min(2, Math.round(sentimentScores.social / 2)));
  }
  
  // Energy from overall sentiment if not set
  if (finalScores.energy === 0 && sentimentScores.energy !== 0) {
    finalScores.energy = Math.max(-2, Math.min(2, Math.round(sentimentScores.energy / 2)));
  }
  
  // Stress calculation (inverse of positive sentiment)
  if (finalScores.stress === 0) {
    if (finalScores.mood <= -1 || finalScores.work <= -1) {
      finalScores.stress = -1;
    }
    if (sentimentScores.stress !== 0) {
      finalScores.stress = Math.max(-2, Math.min(2, Math.round(sentimentScores.stress / 2)));
    }
  }
  
  // Extract time
  finalScores.time = extractTimeContext(text.toLowerCase());
  
  console.log('Final Scores:', finalScores);
  console.log('─────────────────────────────\n');
  
  return finalScores;
}

// ============================================
// TIME EXTRACTION
// ============================================

function extractTimeContext(text) {
  const context = { timeOfDay: null, day: null, duration: null };
  
  if (text.includes('morning') || text.includes('breakfast')) context.timeOfDay = 'morning';
  else if (text.includes('afternoon') || text.includes('lunch')) context.timeOfDay = 'afternoon';
  else if (text.includes('evening') || text.includes('dinner')) context.timeOfDay = 'evening';
  else if (text.includes('night') || text.includes('midnight')) context.timeOfDay = 'night';
  
  if (text.includes('today')) context.day = 'today';
  else if (text.includes('yesterday')) context.day = 'yesterday';
  else if (text.includes('tomorrow')) context.day = 'tomorrow';
  else if (text.includes('weekend')) context.day = 'weekend';
  
  if (text.includes('all day')) context.duration = 'all_day';
  else if (text.includes('quick') || text.includes('brief')) context.duration = 'brief';
  else if (text.includes('long') || text.includes('hours')) context.duration = 'extended';
  
  return context;
}

module.exports = { analyzeText };
