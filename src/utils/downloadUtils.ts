import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData, Experience, Education, Project, Certification } from '../types/resume';

// Generate a printable resume HTML - Full A4 Page
const generatePrintableHTML = (data: ResumeData, template: string): string => {
  const getStyles = () => {
    switch (template) {
      case 'modern':
        return { headerBg: '#2563eb', accent: '#2563eb', headerText: '#ffffff' };
      case 'professional':
        return { headerBg: '#047857', accent: '#047857', headerText: '#ffffff' };
      case 'creative':
        return { headerBg: '#7c3aed', accent: '#7c3aed', headerText: '#ffffff' };
      case 'minimal':
        return { headerBg: '#f1f5f9', accent: '#334155', headerText: '#1e293b' };
      case 'executive':
        return { headerBg: '#1e293b', accent: '#1e293b', headerText: '#ffffff' };
      default:
        return { headerBg: '#2563eb', accent: '#2563eb', headerText: '#ffffff' };
    }
  };

  const styles = getStyles();

  const formatDate = (date: string): string => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return `
    <div id="pdf-resume" style="
      width: 794px;
      min-height: 1123px;
      background: white;
      font-family: Arial, Helvetica, sans-serif;
      color: #1f2937;
      box-sizing: border-box;
    ">
      <!-- Header -->
      <div style="
        background: ${styles.headerBg};
        padding: 40px 50px;
        color: ${styles.headerText};
      ">
        <h1 style="
          font-size: 32px;
          font-weight: bold;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        ">${data.personalInfo.fullName || 'Your Name'}</h1>
        
        <div style="font-size: 14px; opacity: 0.95;">
          ${[
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
          ].filter(Boolean).join('  •  ')}
        </div>
        
        ${(data.personalInfo.linkedIn || data.personalInfo.website) ? `
          <div style="font-size: 13px; margin-top: 8px; opacity: 0.85;">
            ${[data.personalInfo.linkedIn, data.personalInfo.website].filter(Boolean).join('  •  ')}
          </div>
        ` : ''}
      </div>
      
      <!-- Content -->
      <div style="padding: 35px 50px;">
        
        <!-- Summary -->
        ${data.personalInfo.summary ? `
          <div style="margin-bottom: 28px;">
            <h2 style="
              font-size: 16px;
              font-weight: bold;
              color: ${styles.accent};
              margin: 0 0 12px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-bottom: 3px solid ${styles.accent};
              padding-bottom: 8px;
            ">Professional Summary</h2>
            <p style="
              font-size: 13px;
              line-height: 1.7;
              color: #374151;
              margin: 0;
            ">${data.personalInfo.summary}</p>
          </div>
        ` : ''}
        
        <!-- Experience -->
        ${data.experience.length > 0 && data.experience[0].company ? `
          <div style="margin-bottom: 28px;">
            <h2 style="
              font-size: 16px;
              font-weight: bold;
              color: ${styles.accent};
              margin: 0 0 16px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-bottom: 3px solid ${styles.accent};
              padding-bottom: 8px;
            ">Work Experience</h2>
            ${data.experience.filter(exp => exp.company).map((exp: Experience) => `
              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
                  <h3 style="font-size: 15px; font-weight: bold; color: #1f2937; margin: 0;">${exp.position}</h3>
                  <span style="font-size: 12px; color: #6b7280; white-space: nowrap;">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                </div>
                <p style="font-size: 14px; color: ${styles.accent}; margin: 5px 0 10px 0; font-weight: 600;">
                  ${exp.company}${exp.location ? ` | ${exp.location}` : ''}
                </p>
                ${exp.description ? `<p style="font-size: 13px; color: #4b5563; margin: 0 0 10px 0; line-height: 1.6;">${exp.description}</p>` : ''}
                ${exp.achievements.filter(a => a).length > 0 ? `
                  <ul style="margin: 10px 0 0 0; padding-left: 22px; font-size: 13px; color: #4b5563; line-height: 1.7;">
                    ${exp.achievements.filter(a => a).map(a => `<li style="margin: 5px 0;">${a}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <!-- Education -->
        ${data.education.length > 0 && data.education[0].institution ? `
          <div style="margin-bottom: 28px;">
            <h2 style="
              font-size: 16px;
              font-weight: bold;
              color: ${styles.accent};
              margin: 0 0 16px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-bottom: 3px solid ${styles.accent};
              padding-bottom: 8px;
            ">Education</h2>
            ${data.education.filter(edu => edu.institution).map((edu: Education) => `
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
                  <h3 style="font-size: 15px; font-weight: bold; color: #1f2937; margin: 0;">
                    ${edu.degree}${edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <span style="font-size: 12px; color: #6b7280;">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
                </div>
                <p style="font-size: 14px; color: ${styles.accent}; margin: 5px 0 0 0; font-weight: 600;">
                  ${edu.institution}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </p>
                ${edu.achievements ? `<p style="font-size: 13px; color: #4b5563; margin: 8px 0 0 0; line-height: 1.6;">${edu.achievements}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <!-- Skills -->
        ${data.skills.length > 0 && data.skills[0] ? `
          <div style="margin-bottom: 28px;">
            <h2 style="
              font-size: 16px;
              font-weight: bold;
              color: ${styles.accent};
              margin: 0 0 16px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-bottom: 3px solid ${styles.accent};
              padding-bottom: 8px;
            ">Skills</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${data.skills.filter(s => s).map(skill => `
                <span style="
                  background: ${styles.accent}18;
                  color: ${styles.accent};
                  padding: 8px 16px;
                  border-radius: 6px;
                  font-size: 13px;
                  font-weight: 600;
                  border: 1px solid ${styles.accent}40;
                ">${skill}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Projects -->
        ${data.projects.length > 0 && data.projects[0].name ? `
          <div style="margin-bottom: 28px;">
            <h2 style="
              font-size: 16px;
              font-weight: bold;
              color: ${styles.accent};
              margin: 0 0 16px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-bottom: 3px solid ${styles.accent};
              padding-bottom: 8px;
            ">Projects</h2>
            ${data.projects.filter(p => p.name).map((proj: Project) => `
              <div style="margin-bottom: 18px;">
                <h3 style="font-size: 15px; font-weight: bold; color: #1f2937; margin: 0 0 6px 0;">
                  ${proj.name}
                  ${proj.link ? ` <span style="font-size: 12px; color: ${styles.accent}; font-weight: normal;">(${proj.link})</span>` : ''}
                </h3>
                <p style="font-size: 13px; color: #4b5563; margin: 0 0 8px 0; line-height: 1.6;">${proj.description}</p>
                ${proj.technologies ? `<p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;"><strong>Technologies:</strong> ${proj.technologies}</p>` : ''}
                ${proj.highlights.filter(h => h).length > 0 ? `
                  <ul style="margin: 8px 0 0 0; padding-left: 22px; font-size: 13px; color: #4b5563; line-height: 1.6;">
                    ${proj.highlights.filter(h => h).map(h => `<li style="margin: 4px 0;">${h}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <!-- Certifications -->
        ${data.certifications.length > 0 && data.certifications[0].name ? `
          <div style="margin-bottom: 28px;">
            <h2 style="
              font-size: 16px;
              font-weight: bold;
              color: ${styles.accent};
              margin: 0 0 16px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-bottom: 3px solid ${styles.accent};
              padding-bottom: 8px;
            ">Certifications</h2>
            ${data.certifications.filter(c => c.name).map((cert: Certification) => `
              <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                <div>
                  <span style="font-size: 14px; font-weight: bold; color: #1f2937;">${cert.name}</span>
                  <span style="font-size: 13px; color: #6b7280;"> - ${cert.issuer}</span>
                  ${cert.credentialId ? `<span style="font-size: 12px; color: #9ca3af;"> (ID: ${cert.credentialId})</span>` : ''}
                </div>
                <span style="font-size: 12px; color: #6b7280;">${formatDate(cert.date)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
      </div>
    </div>
  `;
};

export const downloadAsPDF = async (
  resumeData: ResumeData, 
  fileName: string, 
  template: string = 'modern'
): Promise<void> => {
  // Create container
  const container = document.createElement('div');
  container.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    background: white;
  `;
  container.innerHTML = generatePrintableHTML(resumeData, template);
  document.body.appendChild(container);

  try {
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 300));

    const targetElement = container.querySelector('#pdf-resume') as HTMLElement;
    
    if (!targetElement) {
      throw new Error('Could not find resume element');
    }

    // Create canvas
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: targetElement.scrollHeight,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [794, 1123], // A4 in pixels at 96 DPI
      hotfixes: ['px_scaling'],
    });

    const pdfWidth = 794;
    const pdfHeight = 1123;
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Scale image to fit PDF width
    const scale = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * scale;
    
    // Add pages as needed
    let yPosition = 0;
    let pageCount = 0;
    
    while (yPosition < scaledHeight) {
      if (pageCount > 0) {
        pdf.addPage([794, 1123]);
      }
      
      // Add the full image, positioned to show current page section
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        -yPosition,
        pdfWidth,
        scaledHeight
      );
      
      yPosition += pdfHeight;
      pageCount++;
      
      if (pageCount > 5) break; // Safety limit
    }

    pdf.save(`${fileName}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};

export const downloadAsDOCX = async (resumeData: ResumeData, fileName: string): Promise<void> => {
  const formatDate = (date: string): string => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; }
  h1 { font-size: 24pt; margin-bottom: 8px; color: #1a1a1a; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
  h2 { font-size: 13pt; border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-top: 20px; margin-bottom: 10px; color: #2563eb; text-transform: uppercase; letter-spacing: 1px; }
  h3 { font-size: 12pt; margin-bottom: 3px; color: #1a1a1a; }
  p { margin: 5px 0; }
  ul { margin: 5px 0; padding-left: 20px; }
  li { margin: 3px 0; }
  .contact { color: #555; font-size: 10pt; margin-bottom: 15px; }
  .job-title { color: #2563eb; font-weight: bold; margin: 3px 0; }
  .date { color: #666; font-size: 10pt; float: right; }
  .skills { margin: 5px 0; }
  .skill { display: inline-block; background: #e8f0fe; padding: 3px 10px; margin: 3px; border-radius: 3px; font-size: 10pt; }
</style>
</head>
<body>

<h1>${resumeData.personalInfo.fullName || 'Your Name'}</h1>
<p class="contact">
  ${[
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
    resumeData.personalInfo.linkedIn,
    resumeData.personalInfo.website
  ].filter(Boolean).join(' | ')}
</p>

${resumeData.personalInfo.summary ? `
<h2>Professional Summary</h2>
<p>${resumeData.personalInfo.summary}</p>
` : ''}

${resumeData.experience.length > 0 && resumeData.experience[0].company ? `
<h2>Work Experience</h2>
${resumeData.experience.filter(e => e.company).map(exp => `
<p><strong>${exp.position}</strong> <span class="date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span></p>
<p class="job-title">${exp.company}${exp.location ? ` | ${exp.location}` : ''}</p>
${exp.description ? `<p>${exp.description}</p>` : ''}
${exp.achievements.filter(a => a).length > 0 ? `
<ul>
  ${exp.achievements.filter(a => a).map(a => `<li>${a}</li>`).join('')}
</ul>
` : ''}
`).join('<br>')}
` : ''}

${resumeData.education.length > 0 && resumeData.education[0].institution ? `
<h2>Education</h2>
${resumeData.education.filter(e => e.institution).map(edu => `
<p><strong>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</strong> <span class="date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span></p>
<p class="job-title">${edu.institution}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
${edu.achievements ? `<p>${edu.achievements}</p>` : ''}
`).join('<br>')}
` : ''}

${resumeData.skills.length > 0 && resumeData.skills[0] ? `
<h2>Skills</h2>
<p class="skills">
  ${resumeData.skills.filter(s => s).map(skill => `<span class="skill">${skill}</span>`).join(' ')}
</p>
` : ''}

${resumeData.projects.length > 0 && resumeData.projects[0].name ? `
<h2>Projects</h2>
${resumeData.projects.filter(p => p.name).map(proj => `
<p><strong>${proj.name}</strong>${proj.link ? ` <span style="font-size:10pt">(${proj.link})</span>` : ''}</p>
<p>${proj.description}</p>
${proj.technologies ? `<p><em>Technologies: ${proj.technologies}</em></p>` : ''}
${proj.highlights.filter(h => h).length > 0 ? `
<ul>
  ${proj.highlights.filter(h => h).map(h => `<li>${h}</li>`).join('')}
</ul>
` : ''}
`).join('<br>')}
` : ''}

${resumeData.certifications.length > 0 && resumeData.certifications[0].name ? `
<h2>Certifications</h2>
${resumeData.certifications.filter(c => c.name).map(cert => `
<p><strong>${cert.name}</strong> - ${cert.issuer} <span class="date">${formatDate(cert.date)}</span></p>
${cert.credentialId ? `<p style="font-size:10pt;color:#666">Credential ID: ${cert.credentialId}</p>` : ''}
`).join('')}
` : ''}

</body>
</html>
`;

  const blob = new Blob([htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadAsText = (resumeData: ResumeData, fileName: string): void => {
  const formatDate = (date: string): string => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  let text = '';
  
  // Header
  text += `${'='.repeat(60)}\n`;
  text += `${resumeData.personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}\n`;
  text += `${'='.repeat(60)}\n\n`;
  
  // Contact
  const contact = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location
  ].filter(Boolean).join(' | ');
  if (contact) text += `${contact}\n`;
  
  const links = [
    resumeData.personalInfo.linkedIn,
    resumeData.personalInfo.website
  ].filter(Boolean).join(' | ');
  if (links) text += `${links}\n`;
  text += '\n';
  
  // Summary
  if (resumeData.personalInfo.summary) {
    text += `PROFESSIONAL SUMMARY\n${'-'.repeat(40)}\n`;
    text += `${resumeData.personalInfo.summary}\n\n`;
  }
  
  // Experience
  if (resumeData.experience.length > 0 && resumeData.experience[0].company) {
    text += `WORK EXPERIENCE\n${'-'.repeat(40)}\n`;
    resumeData.experience.filter(e => e.company).forEach(exp => {
      text += `\n${exp.position}\n`;
      text += `${exp.company}${exp.location ? ` | ${exp.location}` : ''}\n`;
      text += `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}\n`;
      if (exp.description) text += `${exp.description}\n`;
      exp.achievements.filter(a => a).forEach(a => {
        text += `  • ${a}\n`;
      });
    });
    text += '\n';
  }
  
  // Education
  if (resumeData.education.length > 0 && resumeData.education[0].institution) {
    text += `EDUCATION\n${'-'.repeat(40)}\n`;
    resumeData.education.filter(e => e.institution).forEach(edu => {
      text += `\n${edu.degree}${edu.field ? ` in ${edu.field}` : ''}\n`;
      text += `${edu.institution}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}\n`;
      text += `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}\n`;
      if (edu.achievements) text += `${edu.achievements}\n`;
    });
    text += '\n';
  }
  
  // Skills
  if (resumeData.skills.length > 0 && resumeData.skills[0]) {
    text += `SKILLS\n${'-'.repeat(40)}\n`;
    text += resumeData.skills.filter(s => s).join(' | ') + '\n\n';
  }
  
  // Projects
  if (resumeData.projects.length > 0 && resumeData.projects[0].name) {
    text += `PROJECTS\n${'-'.repeat(40)}\n`;
    resumeData.projects.filter(p => p.name).forEach(proj => {
      text += `\n${proj.name}${proj.link ? ` (${proj.link})` : ''}\n`;
      text += `${proj.description}\n`;
      if (proj.technologies) text += `Technologies: ${proj.technologies}\n`;
      proj.highlights.filter(h => h).forEach(h => {
        text += `  • ${h}\n`;
      });
    });
    text += '\n';
  }
  
  // Certifications
  if (resumeData.certifications.length > 0 && resumeData.certifications[0].name) {
    text += `CERTIFICATIONS\n${'-'.repeat(40)}\n`;
    resumeData.certifications.filter(c => c.name).forEach(cert => {
      text += `\n${cert.name} - ${cert.issuer}\n`;
      text += `${formatDate(cert.date)}\n`;
      if (cert.credentialId) text += `Credential ID: ${cert.credentialId}\n`;
    });
  }

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
