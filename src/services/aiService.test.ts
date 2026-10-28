import { describe, it, expect } from 'vitest';
import { generateResumeFromPrompt } from './aiService';

describe('aiService - generateResumeFromPrompt', () => {
  it('should return the fresher MBA resume structure when prompt includes "mba"', () => {
    const resume = generateResumeFromPrompt('I need an mba resume');
    expect(resume.personalInfo.fullName).toBe('John Smith');
  });

  it('should return the fresher MBA resume structure when prompt includes "business"', () => {
    const resume = generateResumeFromPrompt('business analyst role');
    expect(resume.personalInfo.fullName).toBe('John Smith');
  });

  it('should return the MCA graduate resume structure when prompt includes "mca"', () => {
    const resume = generateResumeFromPrompt('mca student looking for internship');
    expect(resume.personalInfo.fullName).toBe('Priya Sharma');
  });

  it('should return the experienced professional resume structure when prompt includes "senior"', () => {
    const resume = generateResumeFromPrompt('senior role');
    expect(resume.personalInfo.fullName).toBe('Michael Anderson');
  });

  it('should return the default resume structure (MCA Graduate) when prompt does not match any specific keywords', () => {
    // The code currently returns mcaGraduateResume as default, although the comment says fresher template.
    const resume = generateResumeFromPrompt('random prompt');
    expect(resume.personalInfo.fullName).toBe('Priya Sharma');
  });

  it('should be case insensitive', () => {
    const resumeMba = generateResumeFromPrompt('MBA');
    expect(resumeMba.personalInfo.fullName).toBe('John Smith');

    const resumeSenior = generateResumeFromPrompt('SENIOR ROLE');
    expect(resumeSenior.personalInfo.fullName).toBe('Michael Anderson');
  });
});
