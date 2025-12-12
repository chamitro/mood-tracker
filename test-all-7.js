const { analyzeText } = require('./aiAnalyzer');

const text = "I'm sick, can't sleep, feeling stressed and exhausted";

console.log("Testing AI with:");
console.log(text);
console.log("\n");

const result = analyzeText(text);

console.log("\nRESULT:");
console.log(JSON.stringify(result, null, 2));
console.log("\nDoes it have all 7? Let's check:");
console.log("mood:", result.mood);
console.log("social:", result.social);
console.log("work:", result.work);
console.log("energy:", result.energy);
console.log("health:", result.health);
console.log("sleep:", result.sleep);
console.log("stress:", result.stress);
