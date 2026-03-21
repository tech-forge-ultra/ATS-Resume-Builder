import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Save, FolderOpen, Trash2, Clock, X } from 'lucide-react';

export const SavedResumes: React.FC = () => {
  const { savedResumes, saveResume, loadResume, deleteResume, resumeData } = useResume();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const handleSave = () => {
    if (resumeName.trim()) {
      saveResume(resumeName.trim());
      setResumeName('');
      setShowSaveModal(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-indigo-600" />
          Saved Resumes
        </h3>
        <button
          onClick={() => setShowSaveModal(true)}
          disabled={!resumeData.personalInfo.fullName}
          className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          Save Current
        </button>
      </div>

      {savedResumes.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <FolderOpen className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">No saved resumes yet</p>
          <p className="text-gray-400 text-xs mt-1">Save your work to access it later</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {savedResumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{resume.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(resume.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => loadResume(resume.id)}
                  className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium"
                >
                  Load
                </button>
                <button
                  onClick={() => deleteResume(resume.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Save Resume</h4>
              <button
                onClick={() => setShowSaveModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder="Enter a name for this resume"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!resumeName.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
