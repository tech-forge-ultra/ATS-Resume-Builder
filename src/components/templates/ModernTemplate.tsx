import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontSize: '10px', lineHeight: '1.5' }}>
      {/* Header with accent color */}
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs opacity-90">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
        </div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blue-600"></span>
              About Me
            </h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-5">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-blue-600"></span>
                  Experience
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-4 pl-4 border-l-2 border-blue-200">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-xs">{exp.location}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-blue-600"></span>
                  Projects
                </h2>
                {projects.map((project) => (
                  <div key={project.id} className="mb-3 pl-4 border-l-2 border-blue-200">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-xs text-blue-600">{project.technologies}</p>
                    <p className="text-gray-700 mt-1">{project.description}</p>
                    {project.highlights.length > 0 && (
                      <ul className="mt-1">
                        {project.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-5">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">Skills</h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                    <p className="text-blue-600 text-xs">{edu.field}</p>
                    <p className="text-gray-600 text-xs">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-bold text-xs text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">Languages</h2>
                <div className="space-y-1">
                  {languages.map((lang, idx) => (
                    <p key={idx} className="text-xs">{lang}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
