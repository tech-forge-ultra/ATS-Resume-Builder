import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResumeData, TemplateType, ResumeType, emptyResumeData } from '../types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  template: TemplateType;
  setTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
  resumeType: ResumeType;
  setResumeType: React.Dispatch<React.SetStateAction<ResumeType>>;
  savedResumes: { id: string; name: string; data: ResumeData; date: string }[];
  saveResume: (name: string) => void;
  loadResume: (id: string) => void;
  deleteResume: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [template, setTemplate] = useState<TemplateType>('classic');
  const [resumeType, setResumeType] = useState<ResumeType>('fresher');
  const [savedResumes, setSavedResumes] = useState<{ id: string; name: string; data: ResumeData; date: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedResumes');
    if (saved) {
      setSavedResumes(JSON.parse(saved));
    }
    
    const currentResume = localStorage.getItem('currentResume');
    if (currentResume) {
      setResumeData(JSON.parse(currentResume));
    }
    
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setTemplate(savedTemplate as TemplateType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentResume', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', template);
  }, [template]);

  const saveResume = (name: string) => {
    const newResume = {
      id: Date.now().toString(),
      name,
      data: resumeData,
      date: new Date().toISOString(),
    };
    const updated = [...savedResumes, newResume];
    setSavedResumes(updated);
    localStorage.setItem('savedResumes', JSON.stringify(updated));
  };

  const loadResume = (id: string) => {
    const resume = savedResumes.find(r => r.id === id);
    if (resume) {
      setResumeData(resume.data);
    }
  };

  const deleteResume = (id: string) => {
    const updated = savedResumes.filter(r => r.id !== id);
    setSavedResumes(updated);
    localStorage.setItem('savedResumes', JSON.stringify(updated));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        template,
        setTemplate,
        resumeType,
        setResumeType,
        savedResumes,
        saveResume,
        loadResume,
        deleteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
