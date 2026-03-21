import React from 'react';
import { Project } from '../../types/resume';
import { FolderOpen, Plus, Trash2, ChevronDown, ChevronUp, X, Link } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(data[0]?.id || null);

  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      highlights: [],
    };
    onChange([...data, newProject]);
    setExpandedId(newProject.id);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      data.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  const addHighlight = (id: string) => {
    const proj = data.find((p) => p.id === id);
    if (proj) {
      updateProject(id, 'highlights', [...proj.highlights, '']);
    }
  };

  const updateHighlight = (id: string, index: number, value: string) => {
    const proj = data.find((p) => p.id === id);
    if (proj) {
      const newHighlights = [...proj.highlights];
      newHighlights[index] = value;
      updateProject(id, 'highlights', newHighlights);
    }
  };

  const removeHighlight = (id: string, index: number) => {
    const proj = data.find((p) => p.id === id);
    if (proj) {
      const newHighlights = proj.highlights.filter((_, i) => i !== index);
      updateProject(id, 'highlights', newHighlights);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">
            <FolderOpen className="w-5 h-5 text-purple-400" />
            Projects
          </h3>
          <button onClick={addProject} className="btn-primary text-sm py-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No projects added yet</p>
            <button onClick={addProject} className="btn-ghost mt-2 mx-auto">
              Add your first project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((proj, index) => (
              <div
                key={proj.id}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {proj.name || `Project ${index + 1}`}
                    </p>
                    <p className="text-white/50 text-sm truncate">
                      {proj.technologies || 'No technologies specified'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(proj.id);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedId === proj.id ? (
                      <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                {expandedId === proj.id && (
                  <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
                    <div>
                      <label className="form-label">Project Name *</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                        placeholder="E-commerce Platform"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label">Description *</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                        placeholder="Brief description of the project..."
                        rows={3}
                        className="input-field resize-none"
                      />
                    </div>

                    <div>
                      <label className="form-label">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                        placeholder="React, Node.js, MongoDB, AWS"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label">Project Link</label>
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="url"
                          value={proj.link}
                          onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                          placeholder="https://github.com/username/project"
                          className="input-field pl-11"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="form-label mb-0">Key Highlights</label>
                        <button
                          onClick={() => addHighlight(proj.id)}
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                      {proj.highlights.length === 0 ? (
                        <p className="text-white/40 text-sm">
                          Add bullet points to highlight key features
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {proj.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-purple-400 mt-3">•</span>
                              <input
                                type="text"
                                value={highlight}
                                onChange={(e) => updateHighlight(proj.id, i, e.target.value)}
                                placeholder="Implemented user authentication..."
                                className="input-field flex-1"
                              />
                              <button
                                onClick={() => removeHighlight(proj.id, i)}
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
