import React from 'react';
import { Certification } from '../../types/resume';
import { Award, Plus, Trash2, ChevronDown, ChevronUp, Link } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(data[0]?.id || null);

  const addCertification = () => {
    const newCert: Certification = {
      id: uuidv4(),
      name: '',
      issuer: '',
      date: '',
      link: '',
      credentialId: '',
    };
    onChange([...data, newCert]);
    setExpandedId(newCert.id);
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(
      data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">
            <Award className="w-5 h-5 text-purple-400" />
            Certifications
          </h3>
          <button onClick={addCertification} className="btn-primary text-sm py-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No certifications added yet</p>
            <button onClick={addCertification} className="btn-ghost mt-2 mx-auto">
              Add your first certification
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {cert.name || `Certification ${index + 1}`}
                    </p>
                    <p className="text-white/50 text-sm truncate">
                      {cert.issuer || 'No issuer specified'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCertification(cert.id);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedId === cert.id ? (
                      <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                {expandedId === cert.id && (
                  <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
                    <div>
                      <label className="form-label">Certification Name *</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="AWS Solutions Architect"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label">Issuing Organization *</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label">Date Obtained</label>
                      <input
                        type="month"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="form-label">Certificate Link</label>
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="url"
                          value={cert.link}
                          onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                          placeholder="https://credential.example.com/verify/..."
                          className="input-field pl-11"
                        />
                      </div>
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
