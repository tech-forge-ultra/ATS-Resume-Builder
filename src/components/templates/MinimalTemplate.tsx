import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 p-8 font-sans" style={{ fontSize: '10px', lineHeight: '1.5' }}>
      {/* Header - Minimal and clean */}
      <header className="mb-6">
        <h1 className="text-3xl font-light tracking-wide mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-gray-600 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex gap-3 text-gray-500 text-xs mt-1">
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.website && <span>•</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-500">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{exp.company}, {exp.location}</p>
              {exp.achievements.length > 0 && (
                <ul className="space-y-1 text-gray-700">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.endDate}</span>
              </div>
              {edu.gpa && <p className="text-gray-500 text-xs mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
          <p className="text-gray-700">{skills.join('  ·  ')}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.link && <span className="text-xs text-gray-500">{project.link}</span>}
              </div>
              <p className="text-xs text-gray-500 mb-1">{project.technologies}</p>
              <p className="text-gray-700">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Languages */}
      <div className="grid grid-cols-2 gap-6">
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <p className="font-medium text-gray-900">{cert.name}</p>
                <p className="text-xs text-gray-500">{cert.issuer}, {cert.date}</p>
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Languages</h2>
            {languages.map((lang, idx) => (
              <p key={idx} className="text-gray-700">{lang}</p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};
