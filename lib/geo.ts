export const STATE_ALIASES: Record<string, string> = {
  // exact mappings (or close enough)
  "andhra pradesh": "Andhra Pradesh",
  "arunachal pradesh": "Arunachal Pradesh",
  "assam": "Assam",
  "bihar": "Bihar",
  "chhattisgarh": "Chhattisgarh",
  "goa": "Goa",
  "gujarat": "Gujarat",
  "haryana": "Haryana",
  "himachal pradesh": "Himachal Pradesh",
  "jharkhand": "Jharkhand",
  "karnataka": "Karnataka",
  "bengaluru": "Karnataka",
  "bangalore": "Karnataka",
  "kerala": "Kerala",
  "madhya pradesh": "Madhya Pradesh",
  "maharashtra": "Maharashtra",
  "mumbai": "Maharashtra",
  "pune": "Maharashtra",
  "manipur": "Manipur",
  "meghalaya": "Meghalaya",
  "mizoram": "Mizoram",
  "nagaland": "Nagaland",
  "odisha": "Odisha",
  "punjab": "Punjab",
  "rajasthan": "Rajasthan",
  "sikkim": "Sikkim",
  "tamil nadu": "Tamil Nadu",
  "chennai": "Tamil Nadu",
  "telangana": "Telangana",
  "hyderabad": "Telangana",
  "tripura": "Tripura",
  "uttar pradesh": "Uttar Pradesh",
  "uttarakhand": "Uttarakhand",
  "west bengal": "West Bengal",
  "kolkata": "West Bengal",
  "delhi": "National Capital Territory of Delhi",
  "new delhi": "National Capital Territory of Delhi",
  "jammu and kashmir": "Jammu and Kashmir",
  "ladakh": "Ladakh",
  "puducherry": "Puducherry",
  "chandigarh": "Chandigarh",
  "andaman and nicobar": "Andaman and Nicobar Islands",
  "lakshadweep": "Lakshadweep",
  "dadra and nagar haveli": "Dadra and Nagar Haveli and Daman and Diu",
  "daman and diu": "Dadra and Nagar Haveli and Daman and Diu",
};

/**
 * Very basic NLP to extract an Indian state from a given text (like a news headline).
 */
export function extractState(text: string): string | undefined {
  if (!text) return undefined;
  
  const lowerText = text.toLowerCase();
  
  // Sort aliases by length descending so "Andhra Pradesh" matches before "Andhra" (if we had it)
  const sortedKeywords = Object.keys(STATE_ALIASES).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    // Basic word boundary check
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(lowerText)) {
      return STATE_ALIASES[keyword];
    }
  }

  return undefined;
}
