/**
 * COMPLETE EMOTIONAL INTELLIGENCE ANALYZER
 * 
 * Analyzes 7 dimensions with smart context understanding:
 * 1. Mood - Overall emotional state
 * 2. Social - Relationships and interactions
 * 3. Work - Career and productivity
 * 4. Energy - Physical vitality
 * 5. Health - Physical/mental health
 * 6. Sleep - Sleep quality
 * 7. Stress - Anxiety and pressure
 */

// ============================================
// EMOTIONAL LEXICON
// ============================================

const emotions = {
  veryPositive: ['amazing', 'incredible', 'fantastic', 'wonderful', 'spectacular', 'perfect',
                 'excellent', 'brilliant', 'best', 'greatest', 'ecstatic', 'thrilled', 'love'],
  positive: ['good', 'great', 'nice', 'happy', 'glad', 'fine', 'okay', 'better', 'fun',
             'enjoy', 'like', 'pleased', 'calm', 'relaxed', 'peaceful', 'hopeful'],
  negative: ['bad', 'sad', 'unhappy', 'upset', 'disappointed', 'frustrated', 'annoyed',
             'worried', 'anxious', 'stressed', 'difficult', 'tired', 'bored', 'lonely'],
  veryNegative: ['terrible', 'horrible', 'awful', 'worst', 'miserable', 'depressed', 'hopeless',
                 'hate', 'broken', 'devastating', 'crushed', 'nightmare', 'unbearable']
};

// Major life events detection
const majorEvents = {
  loss: ['lost my dog', 'lost my cat', 'lost my pet', 'dog died', 'cat died', 'pet died',
         'passed away', 'died', 'death of', 'funeral', 'lost my friend'],
  breakup: ['broke up', 'breaking up', 'broke up with', 'dumped me', 'left me', 'divorce'],
  crisis: ['want to die', 'wanna die', 'kill myself', 'suicide', 'end it all', 'no point'],
  achievement: ['got promoted', 'best day', 'happiest day', 'dream come true', 'succeeded'],
  health: ['went to hospital', 'in hospital', 'emergency room', 'diagnosed', 'surgery']
};

// Dimension keywords
const dimensionWords = {
  social: ['friend', 'friends', 'family', 'party', 'social', 'people', 'boyfriend', 'girlfriend',
           'alone', 'lonely', 'together', 'relationship', 'partner'],
  work: ['work', 'job', 'office', 'project', 'meeting', 'deadline', 'boss', 'colleague',
         'fired', 'promoted', 'career'],
  energy: ['tired', 'exhausted', 'energized', 'drained', 'energetic', 'pumped', 'motivated',
           'workout', 'exercise', 'weak', 'strong'],
  health: ['sick', 'ill', 'healthy', 'doctor', 'hospital', 'pain', 'hurt', 'injury', 'fit',
           'unwell', 'disease', 'fever', 'headache'],
  sleep: ['sleep', 'slept', 'sleeping', 'insomnia', 'nightmare', 'rest', 'bed', 'awake',
          'sleepy', 'drowsy'],
  stress: ['stressed', 'stress', 'anxiety', 'anxious', 'worried', 'panic', 'overwhelmed',
           'pressure', 'calm', 'relaxed', 'peaceful']
};

// ============================================
// MAIN ANALYSIS
// ============================================

function analyzeText(text) {
  if (!text || text.trim().length < 5) {
    return { mood: 0, social: 0, work: 0, energy: 0, health: 0, sleep: 0, stress: 0, time: null };
  }

  console.log('\n🧠 === EMOTIONAL INTELLIGENCE ANALYSIS ===');
  console.log('📝 Input:', text);

  const lower = text.toLowerCase();
  const words = lower.split(/\s+/).map(w => w.replace(/[.,!?;:]/g, ''));

  // Detect major events
  const events = detectEvents(lower);
  console.log('🎯 Major Events:', events);

  // Check for contradictions ("but did not feel bad")
  const hasContradiction = /but.*(did not|didn't|don't|not).*(feel|felt).*(bad|sad|upset|terrible)/i.test(text)
    || /but.*(i'm|i am|im).*(okay|fine|good|alright|happy)/i.test(text);
  console.log('🔄 Contradiction:', hasContradiction);

  // Detect dimensions
  const dims = detectDimensions(lower);
  console.log('📊 Dimensions:', dims);

  // Analyze emotional words
  let emotionScore = 0;
  let emotionCount = 0;
  
  words.forEach(word => {
    if (emotions.veryPositive.includes(word)) { emotionScore += 2; emotionCount++; }
    else if (emotions.positive.includes(word)) { emotionScore += 1; emotionCount++; }
    else if (emotions.negative.includes(word)) { emotionScore -= 1; emotionCount++; }
    else if (emotions.veryNegative.includes(word)) { emotionScore -= 2; emotionCount++; }
  });

  console.log('💭 Emotion Score:', emotionScore, 'from', emotionCount, 'words');

  // Calculate scores
  const scores = calculateScores(events, hasContradiction, emotionScore, emotionCount, dims, lower);

  console.log('✅ Final Scores:', scores);
  console.log('='.repeat(50) + '\n');

  return scores;
}

// ============================================
// EVENT DETECTION
// ============================================

function detectEvents(text) {
  return {
    hasLoss: majorEvents.loss.some(e => text.includes(e)),
    hasBreakup: majorEvents.breakup.some(e => text.includes(e)),
    hasCrisis: majorEvents.crisis.some(e => text.includes(e)),
    hasAchievement: majorEvents.achievement.some(e => text.includes(e)),
    hasHealthCrisis: majorEvents.health.some(e => text.includes(e))
  };
}

// ============================================
// DIMENSION DETECTION
// ============================================

function detectDimensions(text) {
  const dims = {};
  for (const dim in dimensionWords) {
    dims[dim] = dimensionWords[dim].some(word => text.includes(word));
  }
  return dims;
}

// ============================================
// SCORE CALCULATION
// ============================================

function calculateScores(events, hasContradiction, emotionScore, emotionCount, dims, text) {
  const scores = {
    mood: 0,
    social: 0,
    work: 0,
    energy: 0,
    health: 0,
    sleep: 0,
    stress: 0,
    time: extractTime(text)
  };

  // Calculate base mood from major events
  let moodBase = 0;

  if (events.hasLoss) moodBase -= 3;
  if (events.hasBreakup) moodBase -= 3;
  if (events.hasCrisis) moodBase -= 4;
  if (events.hasHealthCrisis) moodBase -= 2;
  if (events.hasAchievement) moodBase += 3;

  // Apply contradiction reduction
  if (hasContradiction && moodBase < 0) {
    console.log('🔄 Applying contradiction: reducing negative by 60%');
    moodBase = Math.round(moodBase * 0.4);
  }

  // Add emotional word influence
  if (emotionCount > 0) {
    moodBase += emotionScore / emotionCount;
  }

  // Set mood
  scores.mood = clamp(Math.round(moodBase));

  // SOCIAL
  if (dims.social || events.hasBreakup || events.hasLoss) {
    if (events.hasBreakup) {
      scores.social = hasContradiction ? -1 : -2;
    } else if (events.hasLoss) {
      scores.social = hasContradiction ? -1 : -2;
    } else {
      scores.social = clamp(Math.round(moodBase * 0.7));
    }
  }

  // WORK
  if (dims.work) {
    scores.work = clamp(Math.round(moodBase * 0.6));
  }

  // ENERGY
  if (dims.energy) {
    // Check for specific energy words
    if (text.includes('exhausted') || text.includes('drained') || text.includes('dead tired')) {
      scores.energy = -2;
    } else if (text.includes('tired') || text.includes('weary') || text.includes('fatigued')) {
      scores.energy = -1;
    } else if (text.includes('energized') || text.includes('pumped') || text.includes('energetic')) {
      scores.energy = 2;
    } else {
      scores.energy = clamp(Math.round(moodBase * 0.5));
    }
  }

  // HEALTH
  if (dims.health || events.hasHealthCrisis || events.hasCrisis) {
    if (events.hasCrisis) {
      scores.health = -2;
    } else if (events.hasHealthCrisis) {
      scores.health = -2;
    } else if (text.includes('sick') || text.includes('ill') || text.includes('pain')) {
      scores.health = -1;
    } else if (text.includes('healthy') || text.includes('fit') || text.includes('well')) {
      scores.health = 1;
    } else {
      scores.health = clamp(Math.round(moodBase * 0.5));
    }
  }

  // SLEEP
  if (dims.sleep) {
    if (text.includes('can\'t sleep') || text.includes('couldn\'t sleep') || text.includes('insomnia')) {
      scores.sleep = -2;
    } else if (text.includes('didn\'t sleep') || text.includes('no sleep')) {
      scores.sleep = -2;
    } else if (text.includes('tired') || text.includes('exhausted')) {
      scores.sleep = -1;
    } else if (text.includes('slept well') || text.includes('great sleep') || text.includes('rested')) {
      scores.sleep = 2;
    } else {
      scores.sleep = clamp(Math.round(moodBase * 0.5));
    }
  }

  // STRESS
  if (dims.stress || moodBase < -1) {
    if (text.includes('panic') || text.includes('overwhelmed') || text.includes('breakdown')) {
      scores.stress = -2;
    } else if (text.includes('stressed') || text.includes('anxious') || text.includes('worried')) {
      scores.stress = -1;
    } else if (text.includes('calm') || text.includes('relaxed') || text.includes('peaceful')) {
      scores.stress = 2;
    } else if (moodBase < -1) {
      scores.stress = -1;
    }
  }

  // Cross-dimensional inference
  if (scores.sleep <= -1 && scores.energy === 0) scores.energy = -1;
  if (scores.health <= -1 && scores.energy === 0) scores.energy = -1;
  if (scores.stress <= -1 && scores.health === 0) scores.health = -1;

  return scores;
}

// ============================================
// HELPERS
// ============================================

function clamp(val) {
  return Math.max(-2, Math.min(2, val));
}

function extractTime(text) {
  const ctx = { timeOfDay: null, day: null, duration: null };
  
  if (text.includes('morning')) ctx.timeOfDay = 'morning';
  else if (text.includes('afternoon')) ctx.timeOfDay = 'afternoon';
  else if (text.includes('evening')) ctx.timeOfDay = 'evening';
  else if (text.includes('night')) ctx.timeOfDay = 'night';
  
  if (text.includes('today')) ctx.day = 'today';
  else if (text.includes('yesterday')) ctx.day = 'yesterday';
  else if (text.includes('tomorrow')) ctx.day = 'tomorrow';
  
  return ctx;
}

module.exports = { analyzeText };
