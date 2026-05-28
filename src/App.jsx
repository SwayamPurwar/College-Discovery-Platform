import { useState, useEffect } from 'react';
import { fetchColleges } from './api/mockService';
import { CollegeCard } from './components/features/CollegeCard';
import { CompareTable } from './components/features/CompareTable';
import { RankPredictor } from './components/features/RankPredictor';
import { Search, Loader2, Compass, Calculator, Bookmark, UserCircle2, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from './context/AuthContext'; 

function App() {
  const [activeTab, setActiveTab] = useState('discover'); 
  const { user, login, logout, savedColleges } = useAuth();
  
  // Data State
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const [compareList, setCompareList] = useState([]);
  
  // Filter & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Trigger 1: When Filters or Tabs change (Reset to Page 1)
  useEffect(() => {
    if (activeTab !== 'discover') return;
    
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchColleges({ search: searchTerm, course: selectedCourse }, 1);
        setColleges(response.data);
        setHasMore(response.hasMore);
        setPage(1);
      } catch (err) {
        setError("Failed to load colleges. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce the search input
    const timeoutId = setTimeout(() => loadInitialData(), 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCourse, activeTab]);

  // Trigger 2: When "Load More" is clicked
  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await fetchColleges({ search: searchTerm, course: selectedCourse }, nextPage);
      
      setColleges(prev => [...prev, ...response.data]); // Append new data
      setHasMore(response.hasMore);
      setPage(nextPage);
    } catch (err) {
      alert("Failed to load more colleges. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleCompare = (college) => {
    if (compareList.find(c => c.id === college.id)) {
      setCompareList(compareList.filter(c => c.id !== college.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, college]);
    } else {
      // Added UX feedback for max limit
      alert("You can only compare up to 3 colleges at a time. Please remove one first."); 
    }
  };

  const handleLogin = () => {
    const email = prompt("Enter your email to login:");
    if (email) login(email);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-16 max-w-6xl px-6 mx-auto">
          <h1 className="text-xl font-extrabold tracking-tight text-blue-600">EduDiscover</h1>
          
          <div className="flex items-center gap-4">
            <div className="hidden p-1 space-x-2 rounded-lg md:flex bg-slate-100">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'discover' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Compass size={16} /> Discover
              </button>
              <button 
                onClick={() => setActiveTab('predictor')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'predictor' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Calculator size={16} /> Predictor
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'saved' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Bookmark size={16} /> Saved ({savedColleges.length})
              </button>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">Hi, {user.name}</span>
                  <button onClick={logout} className="transition-colors text-slate-400 hover:text-red-500" title="Logout">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button onClick={handleLogin} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                  <UserCircle2 size={20} /> Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl p-6 mx-auto md:p-12">
        {activeTab === 'predictor' && <RankPredictor />}
        
        {activeTab === 'saved' && (
          <div>
             <header className="mb-10">
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-slate-900">Your Saved Colleges</h2>
              <p className="text-slate-600">Review your shortlisted programs.</p>
            </header>
            {savedColleges.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedColleges.map(college => (
                  <CollegeCard 
                    key={college.id} 
                    college={college} 
                    onToggleCompare={toggleCompare}
                    isCompared={compareList.some(c => c.id === college.id)}
                    compareDisabled={compareList.length >= 3}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white border border-dashed rounded-xl border-slate-300 text-slate-500">
                You haven't saved any colleges yet. Go to Discover to start saving!
              </div>
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <>
            <header className="mb-10">
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-slate-900">Find Your Perfect College</h2>
              <p className="text-slate-600">Search thousands of programs and compare your top choices.</p>
            </header>
            
            <CompareTable 
              colleges={compareList} 
              onRemove={(id) => setCompareList(compareList.filter(c => c.id !== id))} 
            />
            
            <div className="flex flex-col gap-4 mb-8 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by college name or city..." 
                  className="w-full py-3 pr-4 bg-white border shadow-sm outline-none pl-11 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700 min-w-[150px]"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="All">All Courses</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Tech">B.Tech</option>
              </select>
            </div>

            {error ? (
              <div className="flex flex-col items-center justify-center p-8 text-red-600 border border-red-200 bg-red-50 rounded-xl">
                <AlertCircle className="w-8 h-8 mb-2" />
                <p className="font-medium">{error}</p>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <Loader2 className="w-10 h-10 mb-4 text-blue-500 animate-spin" />
                <p className="font-medium">Searching for colleges...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {colleges.map(college => (
                    <CollegeCard 
                      key={college.id} 
                      college={college} 
                      onToggleCompare={toggleCompare}
                      isCompared={compareList.some(c => c.id === college.id)}
                      compareDisabled={compareList.length >= 3}
                    />
                  ))}
                </div>
                
                {/* Pagination Load More Button */}
                {hasMore && colleges.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <button 
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-2 px-8 py-3 font-semibold transition-colors bg-white border shadow-sm border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 disabled:opacity-50"
                    >
                      {loadingMore ? <Loader2 size={18} className="animate-spin" /> : null}
                      {loadingMore ? 'Loading...' : 'Load More Colleges'}
                    </button>
                  </div>
                )}
                
                {colleges.length === 0 && (
                  <div className="p-12 text-center bg-white border border-dashed col-span-full rounded-xl border-slate-300">
                    <p className="text-lg font-medium text-slate-500">No colleges found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;