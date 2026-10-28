import { describe, it, expect } from 'vitest';
import { calculateATSScore } from './aiService';
import { emptyResumeData, ResumeData } from '../types/resume';

describe('calculateATSScore', () => {
  it('should score 100 and return no suggestions for a perfect resume', () => {
    const perfectResume: ResumeData = {
      ...emptyResumeData,
      personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        location: 'New York, NY',
        linkedIn: 'linkedin.com/in/johndoe',
        website: '',
        summary: 'A highly motivated and experienced professional with over 10 years of experience in software development. Strong background in creating scalable applications and leading cross-functional teams to deliver high-quality solutions. Expertise in full-stack development, cloud architecture, and agile methodologies.', // > 100 chars
      },
      education: [
        {
          id: '1',
          institution: 'University',
          degree: 'BS',
          field: 'CS',
          startDate: '2010',
          endDate: '2014',
          gpa: '3.8',
          achievements: 'Dean list',
        }
      ],
      experience: [
        {
          id: '1',
          company: 'Company A',
          position: 'Software Engineer',
          location: 'Remote',
          startDate: '2015',
          endDate: '2020',
          current: false,
          description: 'Developed software.',
          achievements: ['Achieved X', 'Improved Y', 'Reduced Z', 'Created W'], // > 2 achievements
        }
      ],
      skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'], // >= 5 skills
      projects: [
        {
          id: '1',
          name: 'Project 1',
          description: 'Desc',
          technologies: 'Tech',
          link: '',
          highlights: [],
        }
      ],
      certifications: [
        {
          id: '1',
          name: 'Cert 1',
          issuer: 'Issuer',
          date: '2020',
          link: '',
          credentialId: '',
        }
      ],
    };

    const result = calculateATSScore(perfectResume);
    expect(result.score).toBe(100);
    expect(result.suggestions).toHaveLength(0);
  });

  it('should score 0 and suggest all missing fields for an empty resume', () => {
    const result = calculateATSScore(emptyResumeData);
    expect(result.score).toBe(0);
    expect(result.suggestions).toEqual([
      'Add your full name',
      'Add your email address',
      'Add your phone number',
      'Add your location',
      'Add a detailed professional summary (100+ characters)',
      'Add your educational background',
      'Add work experience or internships',
      'Add your technical and soft skills',
      'Add relevant projects to showcase your work',
      'Consider adding relevant certifications',
      'Add your LinkedIn profile URL'
    ]);
  });

  it('should calculate partial missing personal info correctly', () => {
    const resume: ResumeData = {
      ...emptyResumeData,
      personalInfo: {
        fullName: 'John Doe',
        email: '',
        phone: '1234567890',
        location: '',
        linkedIn: '', // Missing LinkedIn
        website: '',
        summary: 'Short summary', // <= 100 characters
      }
    };

    // fullName: +4, phone: +4 => 8 points
    const result = calculateATSScore(resume);
    expect(result.score).toBe(8);
    expect(result.suggestions).toContain('Add your email address');
    expect(result.suggestions).toContain('Add your location');
    expect(result.suggestions).toContain('Add a detailed professional summary (100+ characters)');
    expect(result.suggestions).toContain('Add your LinkedIn profile URL');
  });

  it('should calculate education edge cases correctly', () => {
    // Has education, no GPA
    const resumeNoGpa: ResumeData = {
      ...emptyResumeData,
      education: [
        {
          id: '1',
          institution: 'University',
          degree: 'BS',
          field: 'CS',
          startDate: '2010',
          endDate: '2014',
          gpa: '',
          achievements: '',
        }
      ]
    };

    // Education length > 0 (+10)
    let result = calculateATSScore(resumeNoGpa);
    expect(result.score).toBe(10);

    // Has education, has GPA
    const resumeWithGpa: ResumeData = {
      ...emptyResumeData,
      education: [
        {
          id: '1',
          institution: 'University',
          degree: 'BS',
          field: 'CS',
          startDate: '2010',
          endDate: '2014',
          gpa: '3.5',
          achievements: '',
        }
      ]
    };

    // Education length > 0 (+10) + GPA (+5) = 15
    result = calculateATSScore(resumeWithGpa);
    expect(result.score).toBe(15);
  });

  it('should calculate experience edge cases correctly', () => {
    // Experience with <= 2 achievements
    const resumeFewAchievements: ResumeData = {
      ...emptyResumeData,
      experience: [
        {
          id: '1',
          company: 'Company A',
          position: 'Software Engineer',
          location: 'Remote',
          startDate: '2015',
          endDate: '2020',
          current: false,
          description: 'Developed software.',
          achievements: ['Achieved X', 'Improved Y'], // <= 2 achievements
        }
      ]
    };

    // Experience length > 0 (+15)
    let result = calculateATSScore(resumeFewAchievements);
    expect(result.score).toBe(15);
    expect(result.suggestions).toContain('Add more achievements with quantifiable results');

    // Experience with > 2 achievements
    const resumeManyAchievements: ResumeData = {
      ...emptyResumeData,
      experience: [
        {
          id: '1',
          company: 'Company A',
          position: 'Software Engineer',
          location: 'Remote',
          startDate: '2015',
          endDate: '2020',
          current: false,
          description: 'Developed software.',
          achievements: ['Achieved X', 'Improved Y', 'Reduced Z'], // > 2 achievements
        }
      ]
    };

    // Experience length > 0 (+15) + many achievements (+10) = 25
    result = calculateATSScore(resumeManyAchievements);
    expect(result.score).toBe(25);
    expect(result.suggestions).not.toContain('Add more achievements with quantifiable results');
  });

  it('should calculate skills edge cases correctly', () => {
    // 1-4 skills
    const resumeFewSkills: ResumeData = {
      ...emptyResumeData,
      skills: ['Skill 1', 'Skill 2', 'Skill 3']
    };

    let result = calculateATSScore(resumeFewSkills);
    expect(result.score).toBe(10);
    expect(result.suggestions).toContain('Add more relevant skills (aim for 8-12 skills)');

    // >= 5 skills
    const resumeManySkills: ResumeData = {
      ...emptyResumeData,
      skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']
    };

    result = calculateATSScore(resumeManySkills);
    expect(result.score).toBe(20);
    expect(result.suggestions).not.toContain('Add more relevant skills (aim for 8-12 skills)');
  });
});
