import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 p-8 font-serif" style={{ fontSize: '11px', lineHeight: '1.4' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>| {personalInfo.linkedIn}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Professional Summary</h2>
          <p className="text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="italic">{exp.company} | {exp.location}</p>
                </div>
                <span className="text-xs whitespace-nowrap">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.achievements.length > 0 && (
                <ul className="list-disc ml-5 mt-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="italic">{edu.institution}</p>
                </div>
                <span className="text-xs whitespace-nowrap">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.gpa && <p>GPA: {edu.gpa}</p>}
              {edu.achievements && <p className="text-xs">{edu.achievements}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Skills</h2>
          <p>{skills.join(' • ')}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-bold">{project.name}</h3>
                {project.link && <span className="text-xs">{project.link}</span>}
              </div>
              <p className="italic text-xs">{project.technologies}</p>
              <p>{project.description}</p>
              {project.highlights.length > 0 && (
                <ul className="list-disc ml-5">
                  {project.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between">
              <span><strong>{cert.name}</strong> - {cert.issuer}</span>
              <span className="text-xs">{cert.date}</span>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-2">Languages</h2>
          <p>{languages.join(' • ')}</p>
        </section>
      )}
    </div>
  );
};
