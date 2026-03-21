import React from 'react';
import { Experience } from '../../types/resume';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(data[0]?.id || null);

  const addExperience = () => {
    const newExp: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    onChange([...data, newExp]);
    setExpandedId(newExp.id);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addAchievement = (id: string) => {
    const exp = data.find((e) => e.id === id);
    if (exp) {
      updateExperience(id, 'achievements', [...exp.achievements, '']);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const exp = data.find((e) => e.id === id);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const exp = data.find((e) => e.id === id);
    if (exp) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">
            <Briefcase className="w-5 h-5 text-purple-400" />
            Work Experience
          </h3>
          <button onClick={addExperience} className="btn-primary text-sm py-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No experience added yet</p>
            <button onClick={addExperience} className="btn-ghost mt-2 mx-auto">
              Add your first experience
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((exp, index) => (
              <div
                key={exp.id}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {exp.position || `Experience ${index + 1}`}
                    </p>
                    <p className="text-white/50 text-sm truncate">
                      {exp.company} {exp.current && '(Current)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.id);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedId === exp.id ? (
                      <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                {expandedId === exp.id && (
                  <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Job Title *</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          placeholder="Software Engineer"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="form-label">Company *</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Tech Company Inc."
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="New York, NY"
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Start Date</label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="form-label">End Date</label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="input-field disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-white/80">I currently work here</span>
                    </label>

                    <div>
                      <label className="form-label">Job Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Brief description of your role..."
                        rows={2}
                        className="input-field resize-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="form-label mb-0">Key Achievements</label>
                        <button
                          onClick={() => addAchievement(exp.id)}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                      {exp.achievements.length === 0 ? (
                        <p className="text-white/40 text-sm">
                          Add bullet points to highlight your achievements
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-purple-400 mt-3">•</span>
                              <input
                                type="text"
                                value={achievement}
                                onChange={(e) => updateAchievement(exp.id, i, e.target.value)}
                                placeholder="Increased sales by 20%..."
                                className="input-field flex-1"
                              />
                              <button
                                onClick={() => removeAchievement(exp.id, i)}
                                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg mt-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
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
