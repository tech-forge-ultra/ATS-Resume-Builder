import React from 'react';
import { ResumeData, TemplateType } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

interface Props {
  data: ResumeData;
  template: TemplateType;
}

const formatDate = (date: string): string => {
  if (!date) return '';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
};

export const ResumePreview: React.FC<Props> = ({ data, template }) => {
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          header: 'bg-blue-600 text-white p-6',
          accent: 'text-blue-600',
          border: 'border-blue-600',
          section: 'border-l-4 border-blue-600 pl-4',
        };
      case 'minimal':
        return {
          header: 'border-b-2 border-gray-300 pb-4',
          accent: 'text-gray-700',
          border: 'border-gray-300',
          section: '',
        };
      case 'professional':
        return {
          header: 'bg-emerald-700 text-white p-6',
          accent: 'text-emerald-700',
          border: 'border-emerald-700',
          section: 'border-l-4 border-emerald-700 pl-4',
        };
      case 'creative':
        return {
          header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6',
          accent: 'text-purple-600',
          border: 'border-purple-600',
          section: 'border-l-4 border-purple-600 pl-4',
        };
      default: // classic
        return {
          header: 'border-b-2 border-gray-800 pb-4',
          accent: 'text-gray-800',
          border: 'border-gray-800',
          section: '',
        };
    }
  };

  const styles = getTemplateStyles();
  const isModernHeader = ['modern', 'professional', 'creative'].includes(template);

  return (
    <div 
      id="resume-preview" 
      className="bg-white text-gray-900 w-full max-w-[210mm] mx-auto shadow-2xl"
      style={{ minHeight: '297mm' }}
    >
      {/* Header */}
      <div className={styles.header}>
        <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isModernHeader ? 'text-white' : 'text-gray-900'}`}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${isModernHeader ? 'text-white/90' : 'text-gray-600'}`}>
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {data.personalInfo.linkedIn}
            </span>
          )}
          {data.personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {data.personalInfo.website}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className={`text-lg font-bold ${styles.accent} mb-2 uppercase tracking-wide`}>
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={`text-lg font-bold ${styles.accent} mb-3 uppercase tracking-wide`}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className={`${styles.accent} font-medium`}>{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.filter(a => a).map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className={styles.accent}>•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className={styles.section}>
            <h2 className={`text-lg font-bold ${styles.accent} mb-3 uppercase tracking-wide`}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className={`${styles.accent} font-medium`}>{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                  {edu.achievements && (
                    <p className="text-sm text-gray-600 mt-1">{edu.achievements}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className={styles.section}>
            <h2 className={`text-lg font-bold ${styles.accent} mb-2 uppercase tracking-wide`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-sm rounded ${
                    template === 'minimal'
                      ? 'bg-gray-100 text-gray-700'
                      : `bg-${styles.accent.split('-')[1]}-100 ${styles.accent}`
                  }`}
                  style={{
                    backgroundColor: template !== 'minimal' ? 'rgba(0,0,0,0.05)' : undefined,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={`text-lg font-bold ${styles.accent} mb-3 uppercase tracking-wide`}>
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className={`text-sm ${styles.accent} hover:underline`}>
                        {proj.link}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                  {proj.technologies && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {proj.technologies}
                    </p>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {proj.highlights.filter(h => h).map((highlight, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className={styles.accent}>•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section className={styles.section}>
            <h2 className={`text-lg font-bold ${styles.accent} mb-2 uppercase tracking-wide`}>
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <span className="font-medium text-gray-900">{cert.name}</span>
                    <span className="text-gray-600"> - {cert.issuer}</span>
                  </div>
                  <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className={styles.section}>
            <h2 className={`text-lg font-bold ${styles.accent} mb-2 uppercase tracking-wide`}>
              Languages
            </h2>
            <p className="text-sm text-gray-700">{data.languages.join(' • ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};
