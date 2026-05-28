import { X, CheckCircle2 } from 'lucide-react';

export const CompareTable = ({ colleges, onRemove }) => {
  if (colleges.length === 0) return null;

  return (
    <div className="mb-10 overflow-hidden bg-white border border-blue-100 shadow-md rounded-xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 bg-blue-50">
        <h2 className="text-xl font-bold text-blue-900">
          Comparing Colleges ({colleges.length}/3)
        </h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Scroll horizontally if needed
        </span>
      </div>
      
      <div className="p-6 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {colleges.map((college) => (
            <div key={college.id} className="relative p-5 border rounded-lg w-72 border-slate-200 bg-slate-50">
              <button 
                onClick={() => onRemove(college.id)}
                className="absolute transition-colors top-3 right-3 text-slate-400 hover:text-red-500"
                title="Remove from comparison"
              >
                <X size={20} />
              </button>
              
              <h3 className="pr-6 mb-4 text-lg font-bold text-slate-900 h-14 line-clamp-2">
                {college.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">Location</p>
                  <p className="font-medium text-slate-800">{college.location.city}, {college.location.state}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">Fees</p>
                  <p className="font-medium text-slate-800">₹{college.fees.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">Rating</p>
                  <p className="flex items-center gap-1 font-medium text-slate-800">
                    {college.rating} / 5.0
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">Avg Placement</p>
                  <p className="font-medium text-green-700 text-slate-800">{college.placement.average}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wider uppercase text-slate-500">Courses</p>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.map(course => (
                      <span key={course} className="flex items-center gap-1 px-2 py-1 text-xs bg-white border rounded border-slate-200">
                        <CheckCircle2 size={12} className="text-blue-500"/> {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};