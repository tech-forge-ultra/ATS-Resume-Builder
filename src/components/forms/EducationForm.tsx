import React from 'react';
import { Education } from '../../types/resume';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(data[0]?.id || null);

  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: '',
    };
    onChange([...data, newEdu]);
    setExpandedId(newEdu.id);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            Education
          </h3>
          <button onClick={addEducation} className="btn-primary text-sm py-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No education added yet</p>
            <button onClick={addEducation} className="btn-ghost mt-2 mx-auto">
              Add your first education
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((edu, index) => (
              <div
                key={edu.id}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {edu.institution || `Education ${index + 1}`}
                    </p>
                    <p className="text-white/50 text-sm truncate">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(edu.id);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedId === edu.id ? (
                      <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                {expandedId === edu.id && (
                  <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
                    <div>
                      <label className="form-label">Institution *</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Degree *</label>
                        <select
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select Degree</option>
                          <option value="High School">High School</option>
                          <option value="Associate's">Associate's</option>
                          <option value="Bachelor's">Bachelor's</option>
                          <option value="Master's">Master's</option>
                          <option value="MBA">MBA</option>
                          <option value="Ph.D.">Ph.D.</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Certificate">Certificate</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="Computer Science"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="form-label">Start Date</label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="form-label">End Date</label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="form-label">GPA</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          placeholder="3.8/4.0"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Achievements / Relevant Coursework</label>
                      <textarea
                        value={edu.achievements}
                        onChange={(e) => updateEducation(edu.id, 'achievements', e.target.value)}
                        placeholder="Dean's List, Relevant courses, Academic achievements..."
                        rows={3}
                        className="input-field resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
