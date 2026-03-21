import React, { useState } from 'react';
import { Sparkles, Send, X, User, Briefcase, Lightbulb, Zap, RefreshCw } from 'lucide-react';
import { ResumeData, ResumeType } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeType: ResumeType;
  currentData: ResumeData;
  onApplyData: (data: ResumeData) => void;
}

const quickPrompts = [
  { icon: User, label: 'Fresher MBA Student', prompt: 'Generate resume for fresher MBA student' },
  { icon: Briefcase, label: 'MCA Graduate', prompt: 'Generate resume for MCA graduate with internship' },
  { icon: Zap, label: 'Software Developer', prompt: 'Generate resume for experienced software developer' },
  { icon: Lightbulb, label: 'Data Scientist', prompt: 'Generate resume for data science professional' },
];

const generateFresherMBA = (): ResumeData => ({
  personalInfo: {
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    linkedIn: 'linkedin.com/in/priyasharma',
    website: '',
    summary: 'Ambitious MBA graduate with strong foundation in business management, marketing, and financial analysis. Eager to leverage academic knowledge and internship experience to contribute to organizational growth. Excellent communication and analytical skills with a passion for strategic planning and market research.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'Indian Institute of Management (IIM)',
      degree: 'MBA',
      field: 'Marketing & Finance',
      startDate: '2022-07',
      endDate: '2024-05',
      gpa: '3.7/4.0',
      achievements: 'Dean\'s List, Case Study Competition Winner',
    },
    {
      id: uuidv4(),
      institution: 'Delhi University',
      degree: 'Bachelor\'s',
      field: 'Commerce',
      startDate: '2018-07',
      endDate: '2021-05',
      gpa: '8.5/10',
      achievements: 'Gold Medalist, Business Club President',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Deloitte Consulting',
      position: 'Summer Intern',
      location: 'Mumbai, India',
      startDate: '2023-05',
      endDate: '2023-07',
      current: false,
      description: 'Supported consulting team in market research and strategy development',
      achievements: [
        'Conducted market analysis for 3 Fortune 500 clients',
        'Created financial models resulting in 15% cost reduction recommendations',
        'Presented findings to senior leadership team',
      ],
    },
  ],
  skills: [
    'Financial Analysis', 'Market Research', 'Strategic Planning', 'Data Analysis',
    'Microsoft Excel', 'PowerPoint', 'Tableau', 'SPSS', 'Leadership', 'Communication',
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'Market Entry Strategy for Tech Startup',
      description: 'Developed comprehensive market entry strategy for a fintech startup targeting Indian market',
      technologies: 'Market Research, Financial Modeling, Competitive Analysis',
      link: '',
      highlights: ['Analyzed market size of $2B', 'Recommended go-to-market strategy'],
    },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: 'Google Analytics Certification',
      issuer: 'Google',
      date: '2023-08',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English', 'Hindi'],
  hobbies: ['Reading', 'Public Speaking'],
});

const generateMCAGraduate = (): ResumeData => ({
  personalInfo: {
    fullName: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 87654 32109',
    location: 'Bangalore, India',
    linkedIn: 'linkedin.com/in/rahulkumar',
    website: 'github.com/rahulkumar',
    summary: 'Recent MCA graduate with hands-on internship experience in full-stack development. Proficient in React, Node.js, and cloud technologies. Strong problem-solving abilities with a passion for building scalable web applications. Looking to contribute to innovative tech projects.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'National Institute of Technology',
      degree: 'Master\'s',
      field: 'Computer Applications (MCA)',
      startDate: '2021-07',
      endDate: '2024-05',
      gpa: '8.8/10',
      achievements: 'Technical Club Lead, Hackathon Winner',
    },
    {
      id: uuidv4(),
      institution: 'State University',
      degree: 'Bachelor\'s',
      field: 'Computer Science',
      startDate: '2018-07',
      endDate: '2021-05',
      gpa: '8.2/10',
      achievements: 'Best Project Award',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'TechCorp Solutions',
      position: 'Software Developer Intern',
      location: 'Bangalore, India',
      startDate: '2023-06',
      endDate: '2023-12',
      current: false,
      description: 'Developed and maintained web applications using React and Node.js',
      achievements: [
        'Built responsive dashboard reducing load time by 40%',
        'Implemented RESTful APIs serving 10,000+ daily requests',
        'Collaborated with team using Agile methodology',
        'Fixed 50+ production bugs improving system stability',
      ],
    },
  ],
  skills: [
    'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Python', 'SQL', 'MongoDB',
    'Git', 'AWS', 'Docker', 'REST APIs', 'Agile/Scrum',
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment integration',
      technologies: 'React, Node.js, MongoDB, Stripe',
      link: 'github.com/rahulkumar/ecommerce',
      highlights: [
        'Implemented secure authentication system',
        'Integrated Razorpay payment gateway',
        'Deployed on AWS with auto-scaling',
      ],
    },
    {
      id: uuidv4(),
      name: 'Task Management System',
      description: 'Real-time collaborative task management tool',
      technologies: 'React, Firebase, Material-UI',
      link: 'github.com/rahulkumar/taskmanager',
      highlights: [
        'Real-time updates using WebSocket',
        'Role-based access control',
      ],
    },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023-10',
      link: '',
      credentialId: '',
    },
    {
      id: uuidv4(),
      name: 'React Developer Certificate',
      issuer: 'Meta',
      date: '2023-05',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English', 'Hindi'],
  hobbies: ['Open Source', 'Tech Blogging'],
});

const generateSoftwareDeveloper = (): ResumeData => ({
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Senior Software Engineer with 5+ years of experience building scalable applications. Expert in React, TypeScript, and cloud-native technologies. Led teams of 8+ developers, delivered 20+ production applications, and reduced system latency by 60%. Passionate about clean code, mentorship, and driving engineering excellence.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'Stanford University',
      degree: 'Master\'s',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2018-06',
      gpa: '3.9/4.0',
      achievements: 'Research Assistant, Published 2 papers',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Leading development of cloud infrastructure tools',
      achievements: [
        'Architected microservices platform serving 1M+ daily users',
        'Reduced deployment time by 70% through CI/CD optimization',
        'Mentored 5 junior engineers, 3 promoted within 1 year',
        'Led migration to Kubernetes saving $200K annually',
      ],
    },
    {
      id: uuidv4(),
      company: 'Meta',
      position: 'Software Engineer',
      location: 'Menlo Park, CA',
      startDate: '2018-07',
      endDate: '2021-02',
      current: false,
      description: 'Developed features for Facebook Marketplace',
      achievements: [
        'Built real-time notification system reaching 500M users',
        'Improved page load performance by 45%',
        'Implemented A/B testing framework used by 50+ teams',
      ],
    },
  ],
  skills: [
    'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'Kubernetes', 'AWS', 'GCP',
    'PostgreSQL', 'Redis', 'GraphQL', 'System Design', 'Team Leadership',
  ],
  projects: [],
  certifications: [
    {
      id: uuidv4(),
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2022-05',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English', 'Spanish'],
  hobbies: ['Open Source', 'Tech Speaking'],
});

const generateDataScientist = (): ResumeData => ({
  personalInfo: {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    linkedIn: 'linkedin.com/in/sarahchen',
    website: 'github.com/sarahchen',
    summary: 'Data Scientist with 4+ years of experience in machine learning, predictive modeling, and data analytics. Developed ML models that increased revenue by $5M. Expert in Python, TensorFlow, and big data technologies. Published researcher with strong communication skills for translating complex insights to stakeholders.',
  },
  education: [
    {
      id: uuidv4(),
      institution: 'MIT',
      degree: 'Master\'s',
      field: 'Data Science',
      startDate: '2017-09',
      endDate: '2019-05',
      gpa: '3.95/4.0',
      achievements: 'Thesis: Deep Learning for Time Series Forecasting',
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Netflix',
      position: 'Senior Data Scientist',
      location: 'Los Gatos, CA',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: 'Leading recommendation systems team',
      achievements: [
        'Improved recommendation accuracy by 25% using deep learning',
        'Built real-time ML pipeline processing 1B+ events daily',
        'Led team of 4 data scientists on personalization projects',
        'Reduced model training time by 60% through optimization',
      ],
    },
    {
      id: uuidv4(),
      company: 'Amazon',
      position: 'Data Scientist',
      location: 'Seattle, WA',
      startDate: '2019-06',
      endDate: '2021-05',
      current: false,
      description: 'Developed ML models for supply chain optimization',
      achievements: [
        'Created demand forecasting model saving $10M annually',
        'Built anomaly detection system reducing fraud by 30%',
        'Implemented NLP pipeline for customer review analysis',
      ],
    },
  ],
  skills: [
    'Python', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'Machine Learning',
    'Deep Learning', 'NLP', 'Computer Vision', 'A/B Testing', 'Statistics',
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'Open Source NLP Library',
      description: 'Contributed to popular NLP library with 10K+ GitHub stars',
      technologies: 'Python, Transformers, PyTorch',
      link: 'github.com/sarahchen/nlp-toolkit',
      highlights: ['Added multilingual support', '500+ monthly downloads'],
    },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2021-03',
      link: '',
      credentialId: '',
    },
  ],
  languages: ['English', 'Mandarin'],
  hobbies: ['Research', 'Kaggle Competitions'],
});

export const AIAssistant: React.FC<Props> = ({
  isOpen,
  onClose,
  resumeType,
  currentData,
  onApplyData,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleQuickPrompt = async (promptText: string) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let generatedData: ResumeData;
    
    if (promptText.toLowerCase().includes('mba')) {
      generatedData = generateFresherMBA();
    } else if (promptText.toLowerCase().includes('mca')) {
      generatedData = generateMCAGraduate();
    } else if (promptText.toLowerCase().includes('software')) {
      generatedData = generateSoftwareDeveloper();
    } else if (promptText.toLowerCase().includes('data')) {
      generatedData = generateDataScientist();
    } else {
      generatedData = resumeType === 'fresher' ? generateFresherMBA() : generateSoftwareDeveloper();
    }
    
    onApplyData(generatedData);
    setIsGenerating(false);
    onClose();
  };

  const handleCustomPrompt = async () => {
    if (!prompt.trim()) return;
    await handleQuickPrompt(prompt);
  };

  const analyzeMissingSections = () => {
    const missing: string[] = [];
    
    if (!currentData.personalInfo.fullName) missing.push('Add your full name');
    if (!currentData.personalInfo.email) missing.push('Add your email address');
    if (!currentData.personalInfo.summary) missing.push('Write a professional summary');
    if (currentData.education.length === 0) missing.push('Add your education details');
    if (currentData.skills.length < 5) missing.push('Add more skills (at least 5 recommended)');
    if (resumeType === 'experienced' && currentData.experience.length === 0) {
      missing.push('Add your work experience');
    }
    if (currentData.projects.length === 0) missing.push('Add some projects to showcase');
    
    setSuggestions(missing);
  };

  React.useEffect(() => {
    if (isOpen) {
      analyzeMissingSections();
    }
  }, [isOpen, currentData]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content slide-up-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-[Poppins]">AI Assistant</h2>
              <p className="text-slate-400 text-sm">Let AI help build your resume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="mb-6">
          <h3 className="text-slate-300 text-sm font-semibold mb-3">⚡ Quick Generate</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                onClick={() => handleQuickPrompt(item.prompt)}
                disabled={isGenerating}
                className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-indigo-500/15 
                         border-2 border-slate-700 hover:border-indigo-500/50 rounded-xl 
                         text-slate-300 hover:text-white text-sm transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="truncate font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="mb-6">
          <h3 className="text-slate-300 text-sm font-semibold mb-3">✍️ Custom Prompt</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomPrompt()}
              placeholder="e.g., 'Civil engineer with 3 years experience'"
              className="input-field flex-1"
              disabled={isGenerating}
            />
            <button
              onClick={handleCustomPrompt}
              disabled={isGenerating || !prompt.trim()}
              className="btn-primary px-5 disabled:opacity-50"
            >
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h3 className="text-amber-400 text-sm font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Suggestions to Improve
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-amber-400 mt-1">→</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl">
              <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
              <span className="text-white font-medium">Generating your resume...</span>
            </div>
          </div>
        )}

        {/* Developer Credit */}
        <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
          <p className="text-slate-600 text-xs">
            AI powered by <span className="font-semibold text-indigo-400/80">Gaurav Vishwas</span>
          </p>
        </div>
      </div>
    </div>
  );
};
