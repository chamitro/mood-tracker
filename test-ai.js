const { analyzeText } = require('./aiAnalyzer');

// Test with the user's example
const text = "I lost my dog. Then I went to a party and broke up with boyfriend, but I did not feel bad.";

console.log("Testing AI with:");
console.log(text);
console.log("\n");

const result = analyzeText(text);

console.log("\nRESULT:");
console.log(JSON.stringify(result, null, 2));
