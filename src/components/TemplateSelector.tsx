import React from 'react';
import { TemplateType } from '../types/resume';
import { Check, Palette, X, Star, Sparkles } from 'lucide-react';

interface Props {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const templates: { id: TemplateType; name: string; description: string; color: string; popular?: boolean }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with blue accent',
    color: 'from-blue-600 to-indigo-700',
    popular: true,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional corporate layout',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant',
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Executive green style',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique gradient design',
    color: 'from-purple-600 to-pink-600',
  },
];

export const TemplateSelector: React.FC<Props> = ({
  selectedTemplate,
  onSelectTemplate,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content slide-up-enter"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-[Poppins]">Choose Template</h2>
              <p className="text-slate-400 text-sm">5 ATS-friendly designs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                onSelectTemplate(template.id);
                onClose();
              }}
              className={`relative p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 text-left active:scale-95
                ${selectedTemplate === template.id
                  ? 'border-indigo-500 bg-indigo-500/15 shadow-xl shadow-indigo-500/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-700/50'
                }`}
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-orange-500/30">
                  <Star className="w-2.5 h-2.5" fill="currentColor" />
                  Popular
                </div>
              )}
              
              {/* Template Preview */}
              <div className={`h-24 sm:h-28 rounded-xl bg-gradient-to-br ${template.color} mb-3 relative overflow-hidden shadow-md`}>
                <div className="absolute inset-1.5 sm:inset-2 bg-white rounded-lg">
                  {/* Header simulation */}
                  <div className={`h-5 bg-gradient-to-r ${template.color} rounded-t-lg`} />
                  {/* Content simulation */}
                  <div className="p-2">
                    <div className="h-2 w-10 bg-slate-300 rounded mb-1.5" />
                    <div className="h-1.5 w-14 bg-slate-200 rounded mb-1" />
                    <div className="h-1.5 w-12 bg-slate-200 rounded" />
                    <div className="border-t border-slate-200 my-2" />
                    <div className="flex gap-1">
                      <div className="h-1.5 flex-1 bg-slate-200 rounded" />
                      <div className="h-1.5 flex-1 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{template.name}</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-tight">{template.description}</p>

              {/* Selected Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 left-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
          <p className="text-emerald-400 text-sm flex items-start gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              All templates are <strong>ATS-optimized</strong> with proper headings, readable fonts, and clean layouts for maximum compatibility with applicant tracking systems.
            </span>
          </p>
        </div>

        {/* Developer Credit */}
        <div className="mt-4 text-center">
          <p className="text-slate-600 text-xs">
            Designed by <span className="font-semibold text-indigo-400/80">Gaurav Vishwas</span>
          </p>
        </div>
      </div>
    </div>
  );
};
