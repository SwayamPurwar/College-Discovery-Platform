import { useState } from 'react';
import { Calculator, Loader2 } from 'lucide-react';
import { predictColleges } from '../../api/mockService';
import { CollegeCard } from './CollegeCard';

export const RankPredictor = ({ compareList = [], onToggleCompare }) => {
  const [exam, setExam] = useState('NIMCET');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!rank) return;
    
    setLoading(true);
    const matchedColleges = await predictColleges(exam, rank);
    setResults(matchedColleges);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-8 mb-10 bg-white border shadow-sm rounded-2xl border-slate-200">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
          <div className="p-3 text-blue-600 bg-blue-100 rounded-lg">
            <Calculator size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">College Predictor</h2>
            <p className="text-sm text-slate-500">Enter your exam details to see your likely matches.</p>
          </div>
        </div>

        <form onSubmit={handlePredict} className="flex flex-col items-end gap-4 md:flex-row">
          <div className="flex-1 w-full">
            <label className="block mb-2 text-sm font-semibold text-slate-700">Select Exam</label>
            <select 
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="NIMCET">NIMCET</option>
              <option value="CUET">CUET (Percentile)</option>
              <option value="JEE">JEE Mains</option>
            </select>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block mb-2 text-sm font-semibold text-slate-700">Your Rank / Score</label>
            <input 
              type="number" 
              placeholder="e.g., 1500"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full px-4 py-3 border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[160px]"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Find Matches'}
          </button>
        </form>
      </div>

      {/* Results Area */}
      {results !== null && !loading && (
        <div>
          <h3 className="pb-2 mb-6 text-xl font-bold border-b text-slate-800">
            Predicted Matches ({results.length})
          </h3>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {results.map(college => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  onToggleCompare={onToggleCompare}
                  isCompared={compareList.some(c => c.id === college.id)}
                  compareDisabled={compareList.length >= 3}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white border border-dashed rounded-xl border-slate-300 text-slate-500">
              No colleges found matching this rank criteria. Try a different rank.
            </div>
          )}
        </div>
      )}
    </div>
  );
};