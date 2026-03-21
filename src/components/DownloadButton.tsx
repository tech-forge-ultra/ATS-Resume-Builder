import React, { useState, useRef } from 'react';
import { Download, FileText, File, Loader2, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

interface Props {
  resumeRef: React.RefObject<HTMLDivElement | null>;
  resumeData: ResumeData;
}

export const DownloadButton: React.FC<Props> = ({ resumeRef, resumeData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    setIsOpen(false);
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}_resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    
    setIsDownloading(false);
  };

  const downloadDOCX = async () => {
    setIsDownloading(true);
    setIsOpen(false);
    
    try {
      const { personalInfo, education, experience, skills, projects, certifications, languages } = resumeData;
      
      const children: Paragraph[] = [];
      
      // Name
      children.push(
        new Paragraph({
          children: [new TextRun({ text: personalInfo.fullName || 'Your Name', bold: true, size: 48 })],
          heading: HeadingLevel.TITLE,
          spacing: { after: 200 },
        })
      );
      
      // Contact Info
      const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean);
      if (contactParts.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: contactParts.join(' | '), size: 22 })],
            spacing: { after: 200 },
          })
        );
      }
      
      if (personalInfo.linkedIn || personalInfo.website) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: [personalInfo.linkedIn, personalInfo.website].filter(Boolean).join(' | '), size: 22 })],
            spacing: { after: 400 },
          })
        );
      }
      
      // Summary
      if (personalInfo.summary) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: personalInfo.summary, size: 24 })],
            spacing: { after: 400 },
          })
        );
      }
      
      // Experience
      if (experience.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'PROFESSIONAL EXPERIENCE', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        
        experience.forEach(exp => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true, size: 26 }),
                new TextRun({ text: ` | ${exp.company}`, size: 26 }),
              ],
              spacing: { after: 100 },
            })
          );
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, size: 22, italics: true }),
              ],
              spacing: { after: 100 },
            })
          );
          exp.achievements.forEach(ach => {
            if (ach) {
              children.push(
                new Paragraph({
                  children: [new TextRun({ text: `• ${ach}`, size: 24 })],
                  spacing: { after: 50 },
                })
              );
            }
          });
        });
      }
      
      // Education
      if (education.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'EDUCATION', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        
        education.forEach(edu => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true, size: 26 }),
              ],
              spacing: { after: 100 },
            })
          );
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.institution} | ${edu.startDate} - ${edu.endDate}`, size: 24 }),
              ],
              spacing: { after: 50 },
            })
          );
          if (edu.gpa) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: `GPA: ${edu.gpa}`, size: 22 })],
                spacing: { after: 100 },
              })
            );
          }
        });
      }
      
      // Skills
      if (skills.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'SKILLS', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: skills.join(' • '), size: 24 })],
            spacing: { after: 400 },
          })
        );
      }
      
      // Projects
      if (projects.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'PROJECTS', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        
        projects.forEach(proj => {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: proj.name, bold: true, size: 26 })],
              spacing: { after: 100 },
            })
          );
          if (proj.technologies) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: proj.technologies, size: 22, italics: true })],
                spacing: { after: 100 },
              })
            );
          }
          if (proj.description) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: proj.description, size: 24 })],
                spacing: { after: 100 },
              })
            );
          }
        });
      }
      
      // Certifications
      if (certifications.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'CERTIFICATIONS', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        
        certifications.forEach(cert => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: cert.name, bold: true, size: 24 }),
                new TextRun({ text: ` - ${cert.issuer} (${cert.date})`, size: 24 }),
              ],
              spacing: { after: 100 },
            })
          );
        });
      }
      
      // Languages
      if (languages.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'LANGUAGES', bold: true, size: 28 })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: languages.join(' • '), size: 24 })],
          })
        );
      }
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: children,
        }],
      });
      
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${personalInfo.fullName || 'resume'}_resume.docx`);
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
    
    setIsDownloading(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDownloading}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 font-medium disabled:opacity-50 transition-all"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download Resume
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <button
            onClick={downloadPDF}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-red-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">PDF Format</p>
              <p className="text-xs text-gray-500">Best for sharing</p>
            </div>
          </button>
          <button
            onClick={downloadDOCX}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-t"
          >
            <File className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-gray-900">DOCX Format</p>
              <p className="text-xs text-gray-500">For editing</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
