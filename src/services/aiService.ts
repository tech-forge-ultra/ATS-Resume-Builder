import { ResumeData, Experience } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

const fresherMBAResume: ResumeData = {
  personalInfo: {
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    linkedIn: 'linkedin.com/in/johnsmith',
    website: '',
    summary: 'Ambitious MBA graduate with strong analytical skills and a passion for strategic business development. Proven ability to lead cross-functional teams and drive results through data-driven decision making. Seeking to leverage academic knowledge and internship experience to contribute to organizational growth.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'Columbia Business School',
      degree: 'Master of Business Administration',
      field: 'Finance & Strategy',
      startDate: '2022-08',
      endDate: '2024-05',
      gpa: '3.8',
      achievements: 'Dean\'s List, Case Competition Winner, Finance Club President',
    },
    {
      id: uuidv4(),
      institution: 'State University',
      degree: 'Bachelor of Commerce',
      field: 'Accounting',
      startDate: '2018-08',
      endDate: '2022-05',
      gpa: '3.6',
      achievements: 'Summa Cum Laude, Business Society Vice President',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Morgan Stanley',
      position: 'Summer Associate',
      location: 'New York, NY',
      startDate: '2023-06',
      endDate: '2023-08',
      current: false,
      description: 'Investment Banking Division summer internship focusing on M&A advisory.',
      achievements: [
        'Conducted financial modeling and valuation analysis for 3 M&A transactions worth $500M+',
        'Prepared pitch books and client presentations for Fortune 500 companies',
        'Collaborated with senior bankers on due diligence processes',
      ],
    },
  ],
  skills: ['Financial Modeling', 'Valuation Analysis', 'Excel (Advanced)', 'PowerPoint', 'SQL', 'Bloomberg Terminal', 'Strategic Planning', 'Data Analysis', 'Project Management', 'Team Leadership'],
  projects: [
    {
      id: uuidv4(),
      name: 'Market Entry Strategy for Tech Startup',
      description: 'Developed comprehensive go-to-market strategy for a SaaS startup entering European markets.',
      technologies: 'Market Research, Financial Forecasting, Competitive Analysis',
      link: '',
      highlights: ['Identified $2B market opportunity', 'Presented findings to company executives'],
    },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: 'CFA Level 1',
      issuer: 'CFA Institute',
      date: '2023-12',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English (Native)', 'Spanish (Intermediate)'],
  hobbies: ['Stock Market Analysis', 'Chess', 'Marathon Running'],
};

const mcaGraduateResume: ResumeData = {
  personalInfo: {
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedIn: 'linkedin.com/in/priyasharma',
    website: 'priyasharma.dev',
    summary: 'MCA graduate with hands-on internship experience in full-stack web development. Proficient in React, Node.js, and cloud technologies. Strong problem-solving abilities demonstrated through successful project deliveries and hackathon wins. Eager to contribute to innovative software solutions.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'VIT University',
      degree: 'Master of Computer Applications',
      field: 'Computer Science',
      startDate: '2021-07',
      endDate: '2024-05',
      gpa: '8.9/10',
      achievements: 'Gold Medalist, Published research paper on Machine Learning',
    },
    {
      id: uuidv4(),
      institution: 'Delhi University',
      degree: 'Bachelor of Computer Applications',
      field: 'Computer Science',
      startDate: '2018-07',
      endDate: '2021-05',
      gpa: '8.5/10',
      achievements: 'First Division with Distinction',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'TCS Digital',
      position: 'Software Development Intern',
      location: 'Bangalore, India',
      startDate: '2023-01',
      endDate: '2023-06',
      current: false,
      description: 'Full-stack development internship working on enterprise web applications.',
      achievements: [
        'Developed 5 RESTful APIs using Node.js and Express, improving system efficiency by 30%',
        'Built responsive UI components with React.js, serving 10,000+ daily users',
        'Implemented automated testing using Jest, achieving 85% code coverage',
        'Collaborated with cross-functional teams in Agile environment',
      ],
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Git', 'AWS', 'Docker', 'Python', 'Data Structures', 'Algorithms', 'REST APIs', 'Agile/Scrum'],
  projects: [
    {
      id: uuidv4(),
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment integration and admin dashboard.',
      technologies: 'React, Node.js, MongoDB, Stripe, AWS',
      link: 'github.com/priya/ecommerce',
      highlights: ['Implemented secure payment gateway', 'Built real-time inventory management'],
    },
    {
      id: uuidv4(),
      name: 'AI Chatbot',
      description: 'Machine learning powered chatbot for customer support automation.',
      technologies: 'Python, TensorFlow, Flask, NLP',
      link: 'github.com/priya/chatbot',
      highlights: ['Achieved 92% accuracy in intent classification', 'Reduced support tickets by 40%'],
    },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023-09',
      link: '',
      credentialId: '',
    },
    {
      id: uuidv4(),
      name: 'Meta Front-End Developer',
      issuer: 'Coursera',
      date: '2023-06',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English (Fluent)', 'Hindi (Native)', 'Kannada (Basic)'],
  hobbies: ['Open Source Contributing', 'Tech Blogging', 'Competitive Programming'],
};

const experiencedProfessionalResume: ResumeData = {
  personalInfo: {
    fullName: 'Michael Anderson',
    email: 'michael.anderson@email.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/michaelanderson',
    website: 'michaelanderson.io',
    summary: 'Senior Software Engineer with 7+ years of experience building scalable distributed systems and leading high-performing engineering teams. Expert in cloud architecture, microservices, and DevOps practices. Proven track record of delivering enterprise solutions that drive business growth and improve operational efficiency.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2016-06',
      gpa: '3.9',
      achievements: 'Research Assistant, Published 2 papers on Distributed Systems',
    },
    {
      id: uuidv4(),
      institution: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2010-09',
      endDate: '2014-05',
      gpa: '3.7',
      achievements: 'Honors Program, ACM Club President',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      startDate: '2020-03',
      endDate: '',
      current: true,
      description: 'Leading development of cloud infrastructure services.',
      achievements: [
        'Architected and implemented microservices handling 1M+ requests per second',
        'Led team of 8 engineers, mentoring junior developers and conducting code reviews',
        'Reduced system latency by 40% through optimization of distributed caching layer',
        'Designed and deployed CI/CD pipelines, reducing deployment time by 60%',
      ],
    },
    {
      id: uuidv4(),
      company: 'Facebook',
      position: 'Software Engineer',
      location: 'Menlo Park, CA',
      startDate: '2017-06',
      endDate: '2020-02',
      current: false,
      description: 'Full-stack development for social media platform features.',
      achievements: [
        'Built real-time messaging features used by 500M+ users globally',
        'Implemented A/B testing framework that increased user engagement by 25%',
        'Optimized database queries resulting in 50% reduction in page load times',
      ],
    },
    {
      id: uuidv4(),
      company: 'Amazon',
      position: 'Software Development Engineer',
      location: 'Seattle, WA',
      startDate: '2016-07',
      endDate: '2017-05',
      current: false,
      description: 'Developed backend services for AWS products.',
      achievements: [
        'Contributed to AWS Lambda serverless computing platform',
        'Implemented auto-scaling solutions for high-availability systems',
        'Participated in on-call rotations, resolving critical production issues',
      ],
    },
  ],
  skills: ['Java', 'Go', 'Python', 'Kubernetes', 'Docker', 'AWS', 'GCP', 'Microservices', 'System Design', 'CI/CD', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC', 'Leadership', 'Agile'],
  projects: [
    {
      id: uuidv4(),
      name: 'Open Source Distributed Database',
      description: 'Contributed to a popular open-source distributed database project.',
      technologies: 'Go, Raft Consensus, gRPC',
      link: 'github.com/project/distributed-db',
      highlights: ['Core contributor with 50+ merged PRs', 'Implemented replication features'],
    },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: 'Google Cloud Professional Architect',
      issuer: 'Google Cloud',
      date: '2022-03',
      link: '',
      credentialId: '',
    },
    {
      id: uuidv4(),
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2021-08',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English (Native)', 'Mandarin (Conversational)'],
  hobbies: ['Open Source Development', 'Tech Mentoring', 'Rock Climbing'],
};

export const generateResumeFromPrompt = (prompt: string): ResumeData => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('mba') || lowerPrompt.includes('business') || lowerPrompt.includes('management')) {
    return JSON.parse(JSON.stringify(fresherMBAResume));
  }
  
  if (lowerPrompt.includes('mca') || lowerPrompt.includes('computer') || lowerPrompt.includes('software') || lowerPrompt.includes('developer') || lowerPrompt.includes('intern')) {
    return JSON.parse(JSON.stringify(mcaGraduateResume));
  }
  
  if (lowerPrompt.includes('senior') || lowerPrompt.includes('experience') || lowerPrompt.includes('lead') || lowerPrompt.includes('manager') || lowerPrompt.includes('years')) {
    return JSON.parse(JSON.stringify(experiencedProfessionalResume));
  }
  
  // Default to fresher template
  return JSON.parse(JSON.stringify(mcaGraduateResume));
};

export const suggestSummary = (skills: string[], experience: Experience[]): string => {
  const isExperienced = experience.length > 1;
  const skillsText = skills.slice(0, 5).join(', ');
  
  if (isExperienced) {
    return `Results-driven professional with extensive experience in ${skillsText}. Proven track record of delivering high-impact projects and driving organizational success. Strong analytical and problem-solving abilities combined with excellent communication skills.`;
  }
  
  return `Motivated and detail-oriented recent graduate with strong foundation in ${skillsText}. Eager to apply academic knowledge and practical skills to contribute to team success. Quick learner with excellent adaptability and strong work ethic.`;
};

export const suggestSkills = (field: string): string[] => {
  const fieldLower = field.toLowerCase();
  
  if (fieldLower.includes('computer') || fieldLower.includes('software') || /\bit\b/.test(fieldLower)) {
    return ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'Agile', 'Problem Solving'];
  }
  
  if (fieldLower.includes('business') || fieldLower.includes('mba') || fieldLower.includes('management')) {
    return ['Strategic Planning', 'Financial Analysis', 'Project Management', 'Leadership', 'Excel', 'PowerPoint', 'Data Analysis', 'Communication', 'Negotiation', 'Team Building'];
  }
  
  if (fieldLower.includes('marketing')) {
    return ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Adobe Creative Suite', 'CRM Tools', 'Market Research', 'Brand Management'];
  }
  
  if (fieldLower.includes('data') || fieldLower.includes('analytics')) {
    return ['Python', 'R', 'SQL', 'Machine Learning', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', 'Pandas', 'TensorFlow'];
  }
  
  return ['Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Adaptability', 'Critical Thinking', 'Leadership', 'Microsoft Office', 'Organization', 'Attention to Detail'];
};

export const improveAchievement = (achievement: string): string => {
  const actionVerbs = ['Spearheaded', 'Orchestrated', 'Streamlined', 'Championed', 'Accelerated', 'Transformed', 'Pioneered', 'Optimized'];
  const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
  
  if (!achievement.match(/^\d|increased|decreased|improved|reduced|generated|achieved|delivered/i)) {
    return `${randomVerb} ${achievement.charAt(0).toLowerCase() + achievement.slice(1)}`;
  }
  
  return achievement;
};

export const generateProjectDescription = (name: string, technologies: string): string => {
  return `Developed ${name} utilizing ${technologies}. Implemented key features focusing on user experience and performance optimization. Successfully delivered project meeting all requirements and deadlines.`;
};

export const calculateATSScore = (resume: ResumeData): { score: number; suggestions: string[] } => {
  let score = 0;
  const suggestions: string[] = [];
  
  // Personal Info (20 points)
  if (resume.personalInfo.fullName) score += 4;
  else suggestions.push('Add your full name');
  
  if (resume.personalInfo.email) score += 4;
  else suggestions.push('Add your email address');
  
  if (resume.personalInfo.phone) score += 4;
  else suggestions.push('Add your phone number');
  
  if (resume.personalInfo.location) score += 4;
  else suggestions.push('Add your location');
  
  if (resume.personalInfo.summary && resume.personalInfo.summary.length > 100) score += 4;
  else suggestions.push('Add a detailed professional summary (100+ characters)');
  
  // Education (15 points)
  if (resume.education.length > 0) {
    score += 10;
    if (resume.education.some(e => e.gpa)) score += 5;
  } else {
    suggestions.push('Add your educational background');
  }
  
  // Experience (25 points)
  if (resume.experience.length > 0) {
    score += 15;
    if (resume.experience.some(e => e.achievements.length > 2)) score += 10;
    else suggestions.push('Add more achievements with quantifiable results');
  } else {
    suggestions.push('Add work experience or internships');
  }
  
  // Skills (20 points)
  if (resume.skills.length >= 5) {
    score += 20;
  } else if (resume.skills.length > 0) {
    score += 10;
    suggestions.push('Add more relevant skills (aim for 8-12 skills)');
  } else {
    suggestions.push('Add your technical and soft skills');
  }
  
  // Projects (10 points)
  if (resume.projects.length > 0) {
    score += 10;
  } else {
    suggestions.push('Add relevant projects to showcase your work');
  }
  
  // Certifications (5 points)
  if (resume.certifications.length > 0) {
    score += 5;
  } else {
    suggestions.push('Consider adding relevant certifications');
  }
  
  // LinkedIn (5 points)
  if (resume.personalInfo.linkedIn) {
    score += 5;
  } else {
    suggestions.push('Add your LinkedIn profile URL');
  }
  
  return { score: Math.min(score, 100), suggestions };
};
