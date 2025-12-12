/**
 * ADVANCED EMOTIONAL INTELLIGENCE ANALYZER
 * 
 * This AI understands:
 * - Major life events have STRONG emotional weight
 * - Multiple events compound or conflict
 * - "But" statements show emotional contrast
 * - Negations change everything: "did not feel bad" after bad events is significant
 * - Overall emotional arc of the story
 */

// ============================================
// EMOTIONAL WEIGHT SYSTEM
// ============================================

const emotionalWords = {
  // EXTREME POSITIVE (score: 2)
  extremePositive: [
    'amazing', 'incredible', 'fantastic', 'wonderful', 'spectacular', 'phenomenal',
    'extraordinary', 'magnificent', 'brilliant', 'exceptional', 'outstanding',
    'perfect', 'excellent', 'superb', 'marvelous', 'fabulous', 'glorious',
    'ecstatic', 'thrilled', 'overjoyed', 'elated', 'euphoric', 'blissful',
    'best', 'greatest', 'finest', 'ultimate', 'heaven', 'blessed'
  ],
  
  // POSITIVE (score: 1)
  positive: [
    'good', 'great', 'nice', 'happy', 'glad', 'pleased', 'satisfied',
    'fine', 'okay', 'better', 'improved', 'pleasant', 'enjoyable', 'fun',
    'exciting', 'interesting', 'cheerful', 'content', 'comfortable',
    'peaceful', 'calm', 'relaxed', 'hopeful', 'optimistic', 'confident',
    'love', 'loved', 'like', 'enjoy', 'appreciate'
  ],
  
  // NEGATIVE (score: -1)
  negative: [
    'bad', 'sad', 'unhappy', 'upset', 'disappointed', 'frustrated',
    'annoyed', 'irritated', 'worried', 'anxious', 'nervous', 'stressed',
    'difficult', 'hard', 'tough', 'rough', 'uncomfortable', 'uneasy',
    'tired', 'bored', 'lonely', 'alone', 'down', 'low'
  ],
  
  // EXTREME NEGATIVE (score: -2)
  extremeNegative: [
    'terrible', 'horrible', 'awful', 'dreadful', 'worst', 'disastrous',
    'devastating', 'catastrophic', 'tragic', 'miserable', 'depressed',
    'hopeless', 'desperate', 'crushed', 'shattered', 'broken', 'destroyed',
    'hate', 'hated', 'despise', 'furious', 'enraged', 'agonizing',
    'unbearable', 'excruciating', 'traumatic', 'nightmare', 'agony'
  ]
};

// MAJOR LIFE EVENTS - These have HEAVY weight (±3 internally, capped at ±2 for output)
const majorEvents = {
  veryNegative: {
    // Loss of loved ones/pets
    loss: ['lost my dog', 'lost my cat', 'lost my pet', 'dog died', 'cat died', 'pet died',
           'died', 'passed away', 'death of', 'lost my friend', 'lost my parent', 
           'lost my mom', 'lost my dad', 'funeral'],
    
    // Relationship endings
    breakup: ['broke up', 'breaking up', 'ended relationship', 'broke up with', 
              'dumped me', 'left me', 'divorce', 'separated'],
    
    // Health crises
    crisis: ['want to die', 'wanna die', 'kill myself', 'suicide', 'end it all',
             'hospital', 'emergency room', 'diagnosed with', 'cancer'],
    
    // Career disasters
    jobLoss: ['got fired', 'lost my job', 'laid off', 'unemployed'],
    
    weight: -3
  },
  
  positive: {
    // Achievements & celebrations
    achievement: ['got promoted', 'got hired', 'accepted', 'graduated', 
                  'won', 'victory', 'succeeded'],
    
    // Relationships
    relationship: ['got engaged', 'getting married', 'fell in love', 'said yes',
                  'best day', 'happiest day', 'dream come true'],
    
    weight: 3
  }
};

// Context indicators
const dimensionKeywords = {
  social: ['friend', 'friends', 'family', 'people', 'party', 'social', 'together', 
           'alone', 'lonely', 'boyfriend', 'girlfriend', 'partner', 'relationship',
           'met', 'hangout', 'gathering'],
  
  work: ['work', 'job', 'office', 'project', 'meeting', 'deadline', 'boss',
         'colleague', 'career', 'business', 'presentation'],
  
  energy: ['tired', 'exhausted', 'energized', 'drained', 'energetic', 'pumped',
           'motivated', 'energy', 'workout', 'exercise'],
  
  health: ['sick', 'healthy', 'ill', 'doctor', 'hospital', 'pain', 'hurt',
           'injury', 'fit', 'well', 'unwell'],
  
  sleep: ['sleep', 'slept', 'sleeping', 'insomnia', 'rest', 'tired',
          'exhausted', 'awake', 'bed', 'nightmare'],
  
  stress: ['stressed', 'stress', 'anxiety', 'anxious', 'worried', 'pressure',
           'overwhelmed', 'panic', 'calm', 'relaxed', 'peaceful']
};

// ============================================
// SMART TEXT ANALYSIS
// ============================================

function analyzeText(text) {
  if (!text || text.trim().length < 5) {
    return { mood: 0, social: 0, work: 0, energy: 0, health: 0, sleep: 0, stress: 0, time: null };
  }
  
  console.log('\n🧠 === EMOTIONAL INTELLIGENCE ANALYSIS ===');
  console.log('📝 Input:', text);
  
  const lower = text.toLowerCase();
  
  // STEP 1: Detect major life events (HIGHEST PRIORITY)
  const events = detectMajorEvents(lower);
  console.log('🎯 Major Events:', events);
  
  // STEP 2: Check for emotional contradictions (like "but did not feel bad")
  const hasContradiction = detectContradiction(lower);
  console.log('🔄 Contradiction:', hasContradiction);
  
  // STEP 3: Analyze emotional words throughout text
  const emotionalAnalysis = analyzeEmotionalWords(lower);
  console.log('💭 Emotional Words:', emotionalAnalysis);
  
  // STEP 4: Detect which dimensions are present
  const dimensions = detectDimensions(lower);
  console.log('📊 Dimensions:', dimensions);
  
  // STEP 5: Calculate final scores
  const scores = calculateFinalScores(events, hasContradiction, emotionalAnalysis, dimensions);
  
  console.log('✅ Final Scores:', scores);
  console.log('='.repeat(50) + '\n');
  
  return scores;
}

// ============================================
// MAJOR EVENT DETECTION
// ============================================

function detectMajorEvents(text) {
  const detectedEvents = {
    hasLoss: false,
    hasBreakup: false,
    hasCrisis: false,
    hasJobLoss: false,
    hasAchievement: false,
    hasRelationshipHigh: false,
    totalNegativeWeight: 0,
    totalPositiveWeight: 0
  };
  
  // Check negative events
  majorEvents.veryNegative.loss.forEach(phrase => {
    if (text.includes(phrase)) {
      detectedEvents.hasLoss = true;
      detectedEvents.totalNegativeWeight += 3;
    }
  });
  
  majorEvents.veryNegative.breakup.forEach(phrase => {
    if (text.includes(phrase)) {
      detectedEvents.hasBreakup = true;
      detectedEvents.totalNegativeWeight += 3;
    }
  });
  
  majorEvents.veryNegative.crisis.forEach(phrase => {
    if (text.includes(phrase)) {
      detectedEvents.hasCrisis = true;
      detectedEvents.totalNegativeWeight += 4; // Extra weight for crisis
    }
  });
  
  majorEvents.veryNegative.jobLoss.forEach(phrase => {
    if (text.includes(phrase)) {
      detectedEvents.hasJobLoss = true;
      detectedEvents.totalNegativeWeight += 3;
    }
  });
  
  // Check positive events
  majorEvents.positive.achievement.forEach(phrase => {
    if (text.includes(phrase)) {
      detectedEvents.hasAchievement = true;
      detectedEvents.totalPositiveWeight += 3;
    }
  });
  
  majorEvents.positive.relationship.forEach(phrase => {
    if (text.includes(phrase)) {
      detectedEvents.hasRelationshipHigh = true;
      detectedEvents.totalPositiveWeight += 3;
    }
  });
  
  return detectedEvents;
}

// ============================================
// CONTRADICTION DETECTION
// ============================================

function detectContradiction(text) {
  // Check for patterns like "but did not feel bad" or "but I'm okay"
  const contradictionPatterns = [
    /but.*(?:did not|didn't|don't|not).*(?:feel|felt).*bad/i,
    /but.*(?:did not|didn't|don't|not).*(?:sad|upset|depressed|terrible)/i,
    /but.*(?:i'm|i am|im).*(?:okay|fine|good|alright)/i,
    /but.*(?:felt|feel|feeling).*(?:okay|fine|good|alright|better)/i,
    /but.*(?:happy|glad|relieved|peaceful)/i
  ];
  
  for (const pattern of contradictionPatterns) {
    if (pattern.test(text)) {
      return {
        exists: true,
        reducesNegativeImpact: true
      };
    }
  }
  
  return { exists: false, reducesNegativeImpact: false };
}

// ============================================
// EMOTIONAL WORD ANALYSIS
// ============================================

function analyzeEmotionalWords(text) {
  const words = text.split(/\s+/);
  let score = 0;
  let count = 0;
  
  words.forEach(word => {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    
    if (emotionalWords.extremePositive.includes(cleanWord)) {
      score += 2;
      count++;
    } else if (emotionalWords.positive.includes(cleanWord)) {
      score += 1;
      count++;
    } else if (emotionalWords.negative.includes(cleanWord)) {
      score -= 1;
      count++;
    } else if (emotionalWords.extremeNegative.includes(cleanWord)) {
      score -= 2;
      count++;
    }
  });
  
  return { totalScore: score, count: count };
}

// ============================================
// DIMENSION DETECTION
// ============================================

function detectDimensions(text) {
  const detected = {
    social: false,
    work: false,
    energy: false,
    health: false,
    sleep: false,
    stress: false
  };
  
  for (const dim in dimensionKeywords) {
    detected[dim] = dimensionKeywords[dim].some(keyword => text.includes(keyword));
  }
  
  return detected;
}

// ============================================
// FINAL SCORE CALCULATION
// ============================================

function calculateFinalScores(events, contradiction, emotionalAnalysis, dimensions) {
  const scores = {
    mood: 0,
    social: 0,
    work: 0,
    energy: 0,
    health: 0,
    sleep: 0,
    stress: 0,
    time: null
  };
  
  // Start with event-based scoring (MOST IMPORTANT)
  let moodBase = 0;
  
  // Add up all major events
  if (events.hasLoss) moodBase -= 3;
  if (events.hasBreakup) moodBase -= 3;
  if (events.hasCrisis) moodBase -= 4;
  if (events.hasJobLoss) moodBase -= 3;
  if (events.hasAchievement) moodBase += 3;
  if (events.hasRelationshipHigh) moodBase += 3;
  
  // Apply contradiction reduction
  if (contradiction.exists && contradiction.reducesNegativeImpact && moodBase < 0) {
    console.log('🔄 Applying contradiction: reducing negative impact by 60%');
    moodBase = Math.round(moodBase * 0.4); // Reduce negative by 60%
  }
  
  // Add emotional words influence (smaller weight than events)
  const emotionalInfluence = emotionalAnalysis.count > 0 
    ? emotionalAnalysis.totalScore / emotionalAnalysis.count 
    : 0;
  
  moodBase += emotionalInfluence;
  
  // Clamp to -2 to 2
  scores.mood = Math.max(-2, Math.min(2, Math.round(moodBase)));
  
  // Dimension-specific scoring
  
  // SOCIAL
  if (dimensions.social || events.hasBreakup || events.hasLoss) {
    if (events.hasBreakup) {
      scores.social = contradiction.reducesNegativeImpact ? -1 : -2;
    } else if (events.hasLoss) {
      scores.social = contradiction.reducesNegativeImpact ? -1 : -2;
    } else if (events.hasRelationshipHigh) {
      scores.social = 2;
    } else {
      scores.social = Math.max(-2, Math.min(2, Math.round(moodBase * 0.7)));
    }
  }
  
  // WORK
  if (dimensions.work || events.hasJobLoss) {
    if (events.hasJobLoss) {
      scores.work = -2;
    } else {
      scores.work = Math.max(-2, Math.min(2, Math.round(moodBase * 0.6)));
    }
  }
  
  // ENERGY
  if (dimensions.energy) {
    scores.energy = Math.max(-2, Math.min(2, Math.round(moodBase * 0.5)));
  }
  
  // HEALTH
  if (dimensions.health || events.hasCrisis) {
    if (events.hasCrisis) {
      scores.health = -2;
    } else {
      scores.health = Math.max(-2, Math.min(2, Math.round(moodBase * 0.5)));
    }
  }
  
  // SLEEP
  if (dimensions.sleep) {
    scores.sleep = Math.max(-2, Math.min(2, Math.round(moodBase * 0.5)));
  }
  
  // STRESS (inverse of mood for negative situations)
  if (dimensions.stress || moodBase < 0) {
    if (moodBase < -1) {
      scores.stress = contradiction.reducesNegativeImpact ? -1 : -2;
    } else if (moodBase < 0) {
      scores.stress = -1;
    } else if (moodBase > 1) {
      scores.stress = 1; // Low stress when very happy
    }
  }
  
  return scores;
}

module.exports = { analyzeText };
