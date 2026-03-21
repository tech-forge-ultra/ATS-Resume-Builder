import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 font-sans" style={{ fontSize: '10px', lineHeight: '1.5' }}>
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-1/3 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-5">
          {/* Profile */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mb-3">
              {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('') : 'YN'}
            </div>
            <h1 className="text-xl font-bold">
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">Contact</h2>
            <div className="space-y-2 text-xs">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedIn && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">in</span>
                  </div>
                  <span className="break-all">{personalInfo.linkedIn}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-white/20 px-2 py-0.5 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">Languages</h2>
              {languages.map((lang, idx) => (
                <p key={idx} className="text-xs mb-1">{lang}</p>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <p className="font-semibold text-xs">{cert.name}</p>
                  <p className="text-xs opacity-80">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-6 space-y-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600">★</span>
                </div>
                Profile
              </h2>
              <p className="text-gray-700 pl-8">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600">✦</span>
                </div>
                Experience
              </h2>
              <div className="pl-8 space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-200">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-indigo-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">{exp.location}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start gap-2">
                            <span className="text-indigo-400">›</span>
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
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600">◆</span>
                </div>
                Education
              </h2>
              <div className="pl-8 space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-indigo-200">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className="text-indigo-600">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-500">{edu.endDate}</span>
                    </div>
                    {edu.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600">◈</span>
                </div>
                Projects
              </h2>
              <div className="pl-8 space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="bg-indigo-50 rounded-lg p-3">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-xs text-indigo-600 mb-1">{project.technologies}</p>
                    <p className="text-gray-700 text-xs">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
