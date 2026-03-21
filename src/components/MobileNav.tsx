import React from 'react';
import { 
  UserCircle, 
  GraduationCap, 
  Briefcase, 
  Wrench,
  FolderOpen,
  Eye,
  Sparkles,
  Award
} from 'lucide-react';

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onPreviewToggle: () => void;
  onAIToggle: () => void;
  showPreview: boolean;
}

const navItems = [
  { id: 'personal', icon: UserCircle, label: 'Info', color: 'text-blue-400' },
  { id: 'education', icon: GraduationCap, label: 'Edu', color: 'text-green-400' },
  { id: 'experience', icon: Briefcase, label: 'Work', color: 'text-orange-400' },
  { id: 'skills', icon: Wrench, label: 'Skills', color: 'text-purple-400' },
  { id: 'projects', icon: FolderOpen, label: 'Projects', color: 'text-pink-400' },
];

export const MobileNav: React.FC<MobileNavProps> = ({
  activeSection,
  onSectionChange,
  onPreviewToggle,
  onAIToggle,
  showPreview
}) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav md:hidden">
        <div className="flex items-center justify-around w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? item.color : ''}`} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
          <button
            onClick={onPreviewToggle}
            className={`nav-item ${showPreview ? 'active' : ''}`}
          >
            <Eye className={`w-5 h-5 ${showPreview ? 'text-cyan-400' : ''}`} />
            <span>Preview</span>
          </button>
        </div>
      </nav>

      {/* Floating AI Button */}
      <button
        onClick={onAIToggle}
        className="fixed right-4 bottom-28 md:hidden z-40 w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl shadow-purple-500/40 flex items-center justify-center text-white active:scale-90 transition-all duration-200 hover:shadow-purple-500/60"
        aria-label="AI Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    </>
  );
};

interface DesktopSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const allNavItems = [
  { id: 'personal', icon: UserCircle, label: 'Personal Info', color: 'from-blue-500 to-cyan-500' },
  { id: 'education', icon: GraduationCap, label: 'Education', color: 'from-green-500 to-emerald-500' },
  { id: 'experience', icon: Briefcase, label: 'Experience', color: 'from-orange-500 to-amber-500' },
  { id: 'skills', icon: Wrench, label: 'Skills', color: 'from-purple-500 to-pink-500' },
  { id: 'projects', icon: FolderOpen, label: 'Projects', color: 'from-red-500 to-rose-500' },
  { id: 'certifications', icon: Award, label: 'Certifications', color: 'from-yellow-500 to-orange-500' },
];

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="hidden md:block desktop-sidebar w-60 flex-shrink-0">
      <div className="glass-card p-4">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider px-3 py-2 mb-2">
          Resume Sections
        </h3>
        <div className="space-y-1">
          {allNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <span className="truncate font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Developer Credit in Sidebar */}
      <div className="mt-5 text-center">
        <p className="text-slate-600 text-xs">
          Designed by <span className="font-semibold text-indigo-400/80">Gaurav Vishwas</span>
        </p>
      </div>
    </div>
  );
};
