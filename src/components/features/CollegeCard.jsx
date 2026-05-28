import { MapPin, GraduationCap, Wallet, Star, Plus, Check, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CollegeCard = ({ college, onToggleCompare, isCompared, compareDisabled }) => {
  const { toggleSave, savedColleges } = useAuth();
  const isSaved = savedColleges?.some(c => c.id === college.id);

  return (
    <div className="relative flex flex-col h-full overflow-hidden transition-all bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md">
      
      {/* Save/Bookmark Button */}
      <button 
        onClick={() => toggleSave(college)}
        className="absolute z-10 p-2 transition-colors rounded-full shadow-sm top-4 right-4 bg-white/80 backdrop-blur hover:bg-slate-100"
        title="Save College"
      >
        <Bookmark 
          size={20} 
          className={isSaved ? "fill-blue-600 text-blue-600" : "text-slate-400"} 
        />
      </button>

      <div className="flex-grow p-6 pt-8">
        <div className="flex items-start justify-between mb-4">
          <div className="pr-4">
            <h3 className="mb-1 text-xl font-bold leading-tight text-slate-900">{college.name}</h3>
            <div className="flex items-center text-sm text-slate-500">
              <MapPin size={16} className="mr-1 text-slate-400" />
              {college.location.city}, {college.location.state}
            </div>
          </div>
          <div className="flex items-center bg-green-50 text-green-700 font-bold px-2.5 py-1 rounded-md text-sm border border-green-200 shrink-0">
            <Star size={16} className="mr-1 fill-green-700" />
            {college.rating}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 mb-5 text-sm rounded-lg bg-slate-50">
          <div>
            <p className="flex items-center mb-1 text-xs font-semibold tracking-wider uppercase text-slate-500">
              <Wallet size={14} className="mr-1.5"/> Fees / Year
            </p>
            <p className="font-semibold text-slate-900">₹{college.fees.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="flex items-center mb-1 text-xs font-semibold tracking-wider uppercase text-slate-500">
              <GraduationCap size={14} className="mr-1.5"/> Avg Package
            </p>
            <p className="font-semibold text-slate-900">{college.placement.average}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {college.courses.map(course => (
            <span key={course} className="px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100 rounded-full bg-blue-50">
              {course}
            </span>
          ))}
        </div>
      </div>
      
      {/* Compare Button Area */}
      <div className="px-6 py-4 mt-auto border-t bg-slate-50 border-slate-100">
        <button 
          onClick={() => onToggleCompare && onToggleCompare(college)}
          disabled={!isCompared && compareDisabled}
          className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${
            isCompared 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isCompared ? (
            <><Check size={18} /> Added to Compare</>
          ) : (
            <><Plus size={18} /> Add to Compare</>
          )}
        </button>
      </div>
    </div>
  );
};