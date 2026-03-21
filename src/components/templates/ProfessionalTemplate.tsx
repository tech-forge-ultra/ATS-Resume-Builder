import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 font-sans" style={{ fontSize: '10px', lineHeight: '1.5' }}>
      {/* Header */}
      <header className="bg-gray-800 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.summary && (
              <p className="text-gray-300 text-xs max-w-lg mt-2 leading-relaxed">
                {personalInfo.summary}
              </p>
            )}
          </div>
          <div className="text-right text-xs space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedIn && <p>{personalInfo.linkedIn}</p>}
            {personalInfo.website && <p>{personalInfo.website}</p>}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/3 bg-gray-100 p-5 space-y-5">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 pb-1 border-b-2 border-gray-800">
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 pb-1 border-b-2 border-gray-800">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.field}</p>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-xs font-medium mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 pb-1 border-b-2 border-gray-800">
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <p className="font-bold text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 pb-1 border-b-2 border-gray-800">
                Languages
              </h2>
              {languages.map((lang, idx) => (
                <p key={idx} className="mb-1">{lang}</p>
              ))}
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-5 space-y-5">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 pb-1 border-b-2 border-gray-800">
                Professional Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      <p className="text-gray-500 text-xs">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                  </div>
                  {exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-gray-400 mt-0.5">■</span>
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
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 pb-1 border-b-2 border-gray-800">
                Key Projects
              </h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-xs text-gray-500">{project.link}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{project.technologies}</p>
                  <p className="text-gray-700">{project.description}</p>
                  {project.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-gray-400">■</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
