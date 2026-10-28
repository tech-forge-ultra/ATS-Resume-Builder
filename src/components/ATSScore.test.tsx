import { test, expect } from 'vitest';
import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { ATSScore } from './ATSScore';
import { ResumeData, ResumeType } from '../types/resume';

const mockData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    location: 'New York, NY',
    linkedIn: 'linkedin.com/in/johndoe',
    summary: 'A highly motivated software engineer with 5 years of experience in building scalable web applications. Proficient in JavaScript, React, and Node.js. Strong problem-solving skills and a passion for learning new technologies.',
    github: '',
    portfolio: ''
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'New York, NY',
      startDate: '2020-01-01',
      endDate: '2023-01-01',
      current: false,
      description: 'Led a team of 5 engineers to build a microservices architecture.',
      achievements: ['Increased system performance by 50%', 'Reduced deployment time by 30%']
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Web Solutions',
      location: 'San Francisco, CA',
      startDate: '2018-01-01',
      endDate: '2020-01-01',
      current: false,
      description: 'Developed frontend applications using React.',
      achievements: ['Implemented new UI design system', 'Fixed 100+ critical bugs']
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      location: 'Boston, MA',
      startDate: '2014-09-01',
      endDate: '2018-05-01',
      gpa: '3.8',
      achievements: ['Dean\'s List', 'Hackathon Winner']
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS', 'GraphQL'],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform using MERN stack.',
      link: 'github.com/johndoe/ecommerce',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js']
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Developed a task management application with real-time updates.',
      link: 'github.com/johndoe/taskapp',
      technologies: ['React', 'Firebase', 'Tailwind CSS']
    }
  ],
  certifications: []
};

test('render ATSScore component benchmark', { timeout: 60000 }, () => {
  const iterations = 5000;

  const start = performance.now();

  // Re-render ATSScore repeatedly to test the useMemo effect.
  // The first render will do the calculation.
  const { rerender } = render(<ATSScore data={mockData} resumeType="experienced" />);

  for (let i = 1; i < iterations; i++) {
    rerender(<ATSScore data={mockData} resumeType="experienced" />);
  }

  const end = performance.now();
  const duration = end - start;

  console.log(`\n--- BENCHMARK RESULTS ---`);
  console.log(`Time taken for ${iterations} re-renders: ${duration.toFixed(2)}ms`);
  console.log(`Average time per re-render: ${(duration / iterations).toFixed(4)}ms`);
  console.log(`-------------------------\n`);

  expect(true).toBe(true);
});
