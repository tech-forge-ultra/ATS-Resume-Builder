import React from 'react';
import { PersonalInfo } from '../../types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from 'lucide-react';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="section-card">
      {/* Header */}
      <div className="section-card-header">
        <div className="section-card-icon bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="section-title">Personal Information</h2>
          <p className="section-subtitle">Basic details for your resume header</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="form-label">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g., John Doe"
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="form-label">
            Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="form-label">
            Phone <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="New York, NY"
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="form-label">LinkedIn</label>
          <div className="relative">
            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="url"
              value={data.linkedIn}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Website */}
        <div className="sm:col-span-2">
          <label className="form-label">Website / Portfolio</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="url"
              value={data.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://johndoe.com"
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="sm:col-span-2">
          <label className="form-label flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Professional Summary
          </label>
          <textarea
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Write a brief summary about yourself, your skills, and career objectives. This is usually 2-4 sentences that highlight your key qualifications..."
            rows={4}
            className="input-field resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-500">
              💡 Tip: Keep it concise and impactful
            </p>
            <p className={`text-xs font-medium ${data.summary.length > 450 ? 'text-amber-400' : 'text-slate-500'}`}>
              {data.summary.length}/500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
