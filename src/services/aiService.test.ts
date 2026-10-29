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
  });
});
