// Placeholder for AI analysis service
// TODO: Integrate with OpenAI / Gemini API

exports.analyzeCarPhotos = async (photoUrls) => {
  // Mock analysis result
  return {
    overallScore: 78,
    riskLevel: 'medium',
    issues: [
      { location: 'Right fender', type: 'Scratch', severity: 'cosmetic', estimatedRepairCost: 150 },
    ],
  };
};

exports.generateChatResponse = async (messages, reportContext) => {
  // Mock AI response
  return 'Based on the report, the asking price is $1,200 below market average due to the scratched fender. Yes, you have room to negotiate.';
};
