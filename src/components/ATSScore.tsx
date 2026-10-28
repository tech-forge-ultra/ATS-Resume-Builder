import React, { useMemo } from 'react';
import { ResumeData, ResumeType } from '../types/resume';
import { CheckCircle2, AlertCircle, XCircle, TrendingUp } from 'lucide-react';

interface Props {
  data: ResumeData;
  resumeType: ResumeType;
}

interface ScoreItem {
  label: string;
  score: number;
  maxScore: number;
  status: 'good' | 'warning' | 'error';
  tip: string;
}

export const ATSScore: React.FC<Props> = ({ data, resumeType }) => {
  const { total, items } = useMemo(() => {
    const items: ScoreItem[] = [];
    
    // Contact Info (20 points)
    let contactScore = 0;
    if (data.personalInfo.fullName) contactScore += 5;
    if (data.personalInfo.email) contactScore += 5;
    if (data.personalInfo.phone) contactScore += 5;
    if (data.personalInfo.location) contactScore += 3;
    if (data.personalInfo.linkedIn) contactScore += 2;
    
    items.push({
      label: 'Contact Information',
      score: contactScore,
      maxScore: 20,
      status: contactScore >= 15 ? 'good' : contactScore >= 10 ? 'warning' : 'error',
      tip: contactScore < 20 ? 'Add missing contact details' : 'Complete!',
    });
    
    // Summary (15 points)
    const summaryLength = data.personalInfo.summary.length;
    let summaryScore = 0;
    if (summaryLength > 0) summaryScore += 5;
    if (summaryLength >= 100) summaryScore += 5;
    if (summaryLength >= 200) summaryScore += 5;
    
    items.push({
      label: 'Professional Summary',
      score: summaryScore,
      maxScore: 15,
      status: summaryScore >= 12 ? 'good' : summaryScore >= 8 ? 'warning' : 'error',
      tip: summaryScore < 15 ? 'Write 200+ characters summary' : 'Well written!',
    });
    
    // Experience (25 points)
    let expScore = 0;
    if (data.experience.length > 0) expScore += 10;
    if (data.experience.length >= 2) expScore += 5;
    const hasAchievements = data.experience.some(e => e.achievements.length > 0);
    if (hasAchievements) expScore += 10;
    
    items.push({
      label: 'Work Experience',
      score: expScore,
      maxScore: 25,
      status: expScore >= 20 ? 'good' : expScore >= 10 ? 'warning' : 'error',
      tip: resumeType === 'fresher' && expScore === 0 
        ? 'Add internships or projects' 
        : expScore < 25 ? 'Add achievements with metrics' : 'Strong experience!',
    });
    
    // Education (15 points)
    let eduScore = 0;
    if (data.education.length > 0) eduScore += 10;
    if (data.education.some(e => e.gpa)) eduScore += 3;
    if (data.education.some(e => e.achievements)) eduScore += 2;
    
    items.push({
      label: 'Education',
      score: eduScore,
      maxScore: 15,
      status: eduScore >= 12 ? 'good' : eduScore >= 8 ? 'warning' : 'error',
      tip: eduScore < 15 ? 'Add GPA and achievements' : 'Complete!',
    });
    
    // Skills (15 points)
    let skillScore = 0;
    if (data.skills.length >= 3) skillScore += 5;
    if (data.skills.length >= 6) skillScore += 5;
    if (data.skills.length >= 10) skillScore += 5;
    
    items.push({
      label: 'Skills',
      score: skillScore,
      maxScore: 15,
      status: skillScore >= 12 ? 'good' : skillScore >= 8 ? 'warning' : 'error',
      tip: skillScore < 15 ? `Add ${10 - data.skills.length} more skills` : 'Great variety!',
    });
    
    // Projects (10 points)
    let projScore = 0;
    if (data.projects.length > 0) projScore += 5;
    if (data.projects.length >= 2) projScore += 3;
    if (data.projects.some(p => p.technologies)) projScore += 2;
    
    items.push({
      label: 'Projects',
      score: projScore,
      maxScore: 10,
      status: projScore >= 8 ? 'good' : projScore >= 5 ? 'warning' : 'error',
      tip: projScore < 10 ? 'Add projects with technologies' : 'Impressive!',
    });
    
    const total = items.reduce((sum, item) => sum + item.score, 0);
    return { total, items };
  }, [data, resumeType]);

  const percentage = Math.round(total);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = () => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getStatusIcon = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-bold">ATS Score</h3>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-white/10"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.51} 251`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color-current ${getScoreGradient().split(' ')[0].replace('from-', 'text-')}`} stopColor={percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#eab308' : '#ef4444'} />
                <stop offset="100%" className={`stop-color-current ${getScoreGradient().split(' ')[1].replace('to-', 'text-')}`} stopColor={percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f97316' : '#ec4899'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor()}`}>{percentage}</span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <span className="text-white/80 text-sm">{item.label}</span>
              </div>
              <span className="text-white/60 text-xs">
                {item.score}/{item.maxScore}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${(item.score / item.maxScore) * 100}%`,
                  background: item.status === 'good' 
                    ? 'linear-gradient(to right, #22c55e, #10b981)'
                    : item.status === 'warning'
                    ? 'linear-gradient(to right, #eab308, #f97316)'
                    : 'linear-gradient(to right, #ef4444, #ec4899)'
                }}
              />
            </div>
            {item.status !== 'good' && (
              <p className="text-white/40 text-xs mt-1">{item.tip}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
