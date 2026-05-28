import colleges from '../data/colleges.json';

// Simulate network delay to test loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchColleges = async (filters = {}, page = 1, limit = 6) => {
  await delay(600); 
  
  let results = [...colleges];

  // 1. Apply Search Filter
  if (filters.search) {
    const query = filters.search.toLowerCase();
    results = results.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.location.city.toLowerCase().includes(query)
    );
  }
  
  // 2. Apply Course Filter
  if (filters.course && filters.course !== 'All') {
    results = results.filter(c => c.courses.includes(filters.course));
  }

  // 3. Apply Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedResults = results.slice(startIndex, endIndex);

  return {
    data: paginatedResults,
    hasMore: endIndex < results.length
  };
};

export const predictColleges = async (exam, userRank) => {
  await delay(800); 
  const numericRank = parseInt(userRank, 10);
  
  return colleges.filter(college => {
    const collegeCutoff = college.cutoffs?.[exam];
    if (!collegeCutoff) return false;
    return numericRank <= collegeCutoff; 
  }).sort((a, b) => (a.cutoffs[exam] - b.cutoffs[exam]));
};