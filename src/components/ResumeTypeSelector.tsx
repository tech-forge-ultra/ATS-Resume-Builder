import React from 'react';
import { ResumeType } from '../types/resume';
import { GraduationCap, Briefcase, Check } from 'lucide-react';

interface Props {
  selected: ResumeType;
  onSelect: (type: ResumeType) => void;
}

export const ResumeTypeSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Resume Type</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onSelect('fresher')}
          className={`relative p-4 rounded-xl border-2 transition-all text-left ${
            selected === 'fresher'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {selected === 'fresher' && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              selected === 'fresher' ? 'bg-indigo-100' : 'bg-gray-100'
            }`}>
              <GraduationCap className={`w-6 h-6 ${
                selected === 'fresher' ? 'text-indigo-600' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Fresher</h4>
              <p className="text-xs text-gray-500">New graduates & entry-level</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('experienced')}
          className={`relative p-4 rounded-xl border-2 transition-all text-left ${
            selected === 'experienced'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {selected === 'experienced' && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              selected === 'experienced' ? 'bg-indigo-100' : 'bg-gray-100'
            }`}>
              <Briefcase className={`w-6 h-6 ${
                selected === 'experienced' ? 'text-indigo-600' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Experienced</h4>
              <p className="text-xs text-gray-500">2+ years of experience</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
