import React, { useState } from 'react';
import { Wrench, Plus, X, Sparkles } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

const suggestedSkills = {
  technical: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL',
    'AWS', 'Docker', 'Git', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'
  ],
  soft: [
    'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
    'Time Management', 'Critical Thinking', 'Adaptability', 'Project Management'
  ],
  tools: [
    'VS Code', 'Jira', 'Figma', 'Slack', 'Microsoft Office', 'Google Workspace',
    'Notion', 'Trello', 'Postman', 'Adobe Creative Suite'
  ]
};

export const SkillsForm: React.FC<Props> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState<'technical' | 'soft' | 'tools'>('technical');

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !data.includes(trimmedSkill)) {
      onChange([...data, trimmedSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 md:p-6">
        <h3 className="section-title">
          <Wrench className="w-5 h-5 text-purple-400" />
          Skills
        </h3>

        {/* Add Skill Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="input-field flex-1"
          />
          <button
            onClick={() => addSkill(newSkill)}
            disabled={!newSkill.trim()}
            className="btn-primary disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Current Skills */}
        {data.length > 0 && (
          <div className="mb-6">
            <label className="form-label">Your Skills ({data.length})</label>
            <div className="flex flex-wrap gap-2">
              {data.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="chip-remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Skills */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm font-medium">Suggested Skills</span>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {(['technical', 'soft', 'tools'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`tab-btn whitespace-nowrap text-xs ${
                  activeCategory === category ? 'tab-btn-active' : 'tab-btn-inactive'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Suggested Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {suggestedSkills[activeCategory]
              .filter((skill) => !data.includes(skill))
              .map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-purple-500/20 border border-white/10 
                           hover:border-purple-500/50 rounded-full text-white/70 hover:text-white 
                           text-sm transition-all duration-200"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
