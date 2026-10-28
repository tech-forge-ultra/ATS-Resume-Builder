import { describe, it, expect } from 'vitest';
import { suggestSkills } from './aiService';

describe('suggestSkills', () => {
  it('should return technology skills for IT related fields', () => {
    const fields = ['computer science', 'Software Engineering', 'IT support'];
    const expectedSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'Agile', 'Problem Solving'];

    fields.forEach(field => {
      expect(suggestSkills(field)).toEqual(expectedSkills);
    });
  });

  it('should return business skills for management/MBA fields', () => {
    const fields = ['business administration', 'MBA', 'Management Consulting'];
    const expectedSkills = ['Strategic Planning', 'Financial Analysis', 'Project Management', 'Leadership', 'Excel', 'PowerPoint', 'Data Analysis', 'Communication', 'Negotiation', 'Team Building'];

    fields.forEach(field => {
      expect(suggestSkills(field)).toEqual(expectedSkills);
    });
  });

  it('should return marketing skills for marketing fields', () => {
    const fields = ['marketing', 'Digital Marketing'];
    const expectedSkills = ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Adobe Creative Suite', 'CRM Tools', 'Market Research', 'Brand Management'];

    fields.forEach(field => {
      expect(suggestSkills(field)).toEqual(expectedSkills);
    });
  });

  it('should return data skills for data/analytics fields', () => {
    const fields = ['data science', 'Data Analytics'];
    const expectedSkills = ['Python', 'R', 'SQL', 'Machine Learning', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', 'Pandas', 'TensorFlow'];

    fields.forEach(field => {
      expect(suggestSkills(field)).toEqual(expectedSkills);
    });
  });

  it('should return default general skills for unmatched fields', () => {
    const fields = ['history', 'Art', 'Unknown'];
    const expectedSkills = ['Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Adaptability', 'Critical Thinking', 'Leadership', 'Microsoft Office', 'Organization', 'Attention to Detail'];

    fields.forEach(field => {
      expect(suggestSkills(field)).toEqual(expectedSkills);
    });
  });

  it('should handle empty strings and whitespace', () => {
    const expectedSkills = ['Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Adaptability', 'Critical Thinking', 'Leadership', 'Microsoft Office', 'Organization', 'Attention to Detail'];

    expect(suggestSkills('')).toEqual(expectedSkills);
    expect(suggestSkills('   ')).toEqual(expectedSkills);
import { suggestSummary } from './aiService';
import type { Experience } from '../types/resume';

describe('suggestSummary', () => {
  const createMockExperience = (overrides?: Partial<Experience>): Experience => ({
    id: '1',
    company: 'Test Company',
    position: 'Developer',
    location: 'Remote',
    startDate: '2020-01',
    endDate: '2023-01',
    current: false,
    description: 'Test description',
    achievements: ['Test achievement'],
    ...overrides,
  });

  it('should return experienced summary when experience length > 1', () => {
    const skills = ['React', 'Node', 'TypeScript'];
    const experience = [
      createMockExperience({ id: '1' }),
      createMockExperience({ id: '2' })
    ];

    const summary = suggestSummary(skills, experience);

    expect(summary).toContain('Results-driven professional with extensive experience in React, Node, TypeScript.');
    expect(summary).toContain('Proven track record of delivering high-impact projects');
  });

  it('should return fresher summary when experience length is 1', () => {
    const skills = ['React', 'Node', 'TypeScript'];
    const experience = [createMockExperience()];

    const summary = suggestSummary(skills, experience);

    expect(summary).toContain('Motivated and detail-oriented recent graduate with strong foundation in React, Node, TypeScript.');
    expect(summary).toContain('Eager to apply academic knowledge and practical skills');
  });

  it('should return fresher summary when experience length is 0', () => {
    const skills = ['React', 'Node', 'TypeScript'];
    const experience: Experience[] = [];

    const summary = suggestSummary(skills, experience);

    expect(summary).toContain('Motivated and detail-oriented recent graduate with strong foundation in React, Node, TypeScript.');
    expect(summary).toContain('Eager to apply academic knowledge and practical skills');
  });

  it('should only include the first 5 skills in the summary', () => {
    const skills = ['React', 'Node', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'];
    const experience: Experience[] = [];

    const summary = suggestSummary(skills, experience);

    expect(summary).toContain('strong foundation in React, Node, TypeScript, AWS, Docker.');
    expect(summary).not.toContain('Kubernetes');
    expect(summary).not.toContain('GraphQL');
  });

  it('should handle an empty skills array', () => {
    const skills: string[] = [];
    const experience: Experience[] = [];

    const summary = suggestSummary(skills, experience);

    expect(summary).toContain('strong foundation in .'); // This follows the current implementation
  });
});
