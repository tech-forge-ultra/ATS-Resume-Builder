import React, { useState, useEffect } from 'react';
import { Download, FileText, File, X, Check, Loader2, AlertCircle } from 'lucide-react';
import { ResumeData, TemplateType } from '../types/resume';
import { downloadAsPDF, downloadAsDOCX, downloadAsText } from '../utils/downloadUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  template: TemplateType;
}

type DownloadFormat = 'pdf' | 'doc' | 'txt';

export const DownloadPanel: React.FC<Props> = ({ isOpen, onClose, resumeData, template }) => {
  const [downloading, setDownloading] = useState<DownloadFormat | null>(null);
  const [success, setSuccess] = useState<DownloadFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(null);
      setError(null);
      setDownloading(null);
    }
  }, [isOpen]);

  const hasMinimumData = () => {
    return resumeData.personalInfo.fullName && 
           (resumeData.personalInfo.email || resumeData.personalInfo.phone);
  };

  const fileName = (resumeData.personalInfo.fullName || 'My_Resume')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');

  const handleDownload = async (format: DownloadFormat) => {
    if (!hasMinimumData()) {
      setError('Please add at least your name and contact info before downloading.');
      return;
    }

    setDownloading(format);
    setSuccess(null);
    setError(null);

    try {
      switch (format) {
        case 'pdf':
          await downloadAsPDF(resumeData, fileName, template);
          break;
        case 'doc':
          await downloadAsDOCX(resumeData, fileName);
          break;
        case 'txt':
          downloadAsText(resumeData, fileName);
          break;
      }
      setSuccess(format);
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      console.error('Download failed:', err);
      setError(`Failed to download ${format.toUpperCase()}. Please try again.`);
      setTimeout(() => setError(null), 4000);
    } finally {
      setDownloading(null);
    }
  };

  if (!isOpen) return null;

  const formats: { 
    id: DownloadFormat; 
    label: string; 
    icon: React.ElementType; 
    description: string; 
    recommended?: boolean;
    gradient: string;
  }[] = [
    {
      id: 'pdf',
      label: 'PDF Document',
      icon: FileText,
      description: 'Best for sharing and printing. Preserves exact layout.',
      recommended: true,
      gradient: 'from-red-500 to-pink-500',
    },
    {
      id: 'doc',
      label: 'Word Document',
      icon: File,
      description: 'Editable in Microsoft Word and Google Docs.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'txt',
      label: 'Plain Text',
      icon: File,
      description: 'Maximum ATS compatibility for job portals.',
      gradient: 'from-slate-500 to-slate-600',
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content slide-up-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <Download className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-[Poppins]">Download Resume</h2>
              <p className="text-slate-400 text-sm">Choose your preferred format</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-4 bg-red-500/15 border border-red-500/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-5 p-4 bg-green-500/15 border border-green-500/30 rounded-xl flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">
              Your {success.toUpperCase()} has been downloaded successfully!
            </p>
          </div>
        )}

        {/* Download Options */}
        <div className="space-y-3 sm:space-y-4">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => handleDownload(format.id)}
              disabled={downloading !== null}
              className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300
                ${format.recommended 
                  ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/40 hover:border-indigo-500/60' 
                  : 'bg-slate-800/50 border-2 border-slate-700/50 hover:border-slate-600/80 hover:bg-slate-700/50'}
                ${downloading !== null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}
                ${success === format.id ? 'border-green-500/50 bg-green-500/10' : ''}`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0
                ${success === format.id 
                  ? 'bg-green-500/20' 
                  : downloading === format.id 
                    ? 'bg-indigo-500/20' 
                    : `bg-gradient-to-br ${format.gradient} shadow-lg`}`}>
                {downloading === format.id ? (
                  <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
                ) : success === format.id ? (
                  <Check className="w-7 h-7 text-green-400" />
                ) : (
                  <format.icon className="w-7 h-7 text-white" />
                )}
              </div>
              
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-semibold text-base sm:text-lg">{format.label}</h3>
                  {format.recommended && (
                    <span className="text-xs bg-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full font-medium">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 line-clamp-2">{format.description}</p>
              </div>
              
              <div className="flex-shrink-0">
                {success === format.id ? (
                  <span className="text-green-400 text-sm font-semibold">Done!</span>
                ) : (
                  <Download className="w-5 h-5 text-slate-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-blue-300 text-sm flex items-start gap-3">
            <span className="text-xl">💡</span>
            <span>
              <strong className="text-blue-200">Pro tip:</strong> Use PDF for sharing with recruiters. 
              Use TXT format when applying through online job portals for maximum ATS compatibility.
            </span>
          </p>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
          <p className="text-slate-500 text-xs">
            Made with ❤️ by <span className="font-semibold text-indigo-400">Gaurav Vishwas</span>
          </p>
        </div>
      </div>
    </div>
  );
};
