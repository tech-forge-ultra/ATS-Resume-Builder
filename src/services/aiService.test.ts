import { describe, it, expect } from 'vitest';
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
