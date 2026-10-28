import React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// ─── Types ───────────────────────────────────────────────────────
interface Education { degree: string; school: string; year: string; gpa: string; location: string }
interface Experience { company: string; role: string; duration: string; location: string; description: string }
interface Project { name: string; tech: string; description: string }
interface Certificate { name: string; issuer: string; date: string; id: string }
interface ResumeData {
  name: string; title: string; email: string; phone: string; location: string
  linkedin: string; github: string; website: string; summary: string; photo: string
  education: Education[]; experience: Experience[]
  skills: string[]; projects: Project[]; certificates: Certificate[]
  languages: string[]
}
interface FontSettings {
  nameSize: number       // 20–48
  titleSize: number      // 10–22
  bodySize: number       // 9–18
  sectionSize: number    // 10–20
  contactSize: number    // 9–16
  lineHeight: number     // 1.2–2.2
  sectionSpacing: number // 8–32
  pagePadding: number    // 20–70
}
const DEFAULT_FONT: FontSettings = {
  nameSize: 34, titleSize: 16, bodySize: 13, sectionSize: 14,
  contactSize: 13, lineHeight: 1.8, sectionSpacing: 22, pagePadding: 44
}

const EMPTY: ResumeData = {
  name: '', title: '', email: '', phone: '', location: '',
  linkedin: '', github: '', website: '', summary: '', photo: '',
  education: [{ degree: '', school: '', year: '', gpa: '', location: '' }],
  experience: [{ company: '', role: '', duration: '', location: '', description: '' }],
  skills: [], projects: [{ name: '', tech: '', description: '' }],
  certificates: [{ name: '', issuer: '', date: '', id: '' }],
  languages: []
}

// ─── Templates ───────────────────────────────────────────────────
const TEMPLATES = [
  { id: 't1',  name: 'Classic Blue',     color: '#1e3a5f', accent: '#2563eb', bg: '#f0f7ff', desc: 'Centered header, blue ruled lines', layout: 'classic' },
  { id: 't2',  name: 'Navy Executive',   color: '#0f172a', accent: '#475569', bg: '#f8fafc', desc: 'Dark navy sidebar, corporate', layout: 'sidebar-left' },
  { id: 't3',  name: 'Emerald Modern',   color: '#064e3b', accent: '#10b981', bg: '#ecfdf5', desc: 'Green gradient top bar', layout: 'topbar' },
  { id: 't4',  name: 'Purple Creative',  color: '#3b0764', accent: '#7c3aed', bg: '#faf5ff', desc: 'Bold purple right sidebar', layout: 'sidebar-right' },
  { id: 't5',  name: 'Minimal Sans',     color: '#111827', accent: '#374151', bg: '#ffffff', desc: 'Ultra-clean, timeless design', layout: 'minimal' },
  { id: 't6',  name: 'Crimson Bold',     color: '#7f1d1d', accent: '#dc2626', bg: '#fef2f2', desc: 'Bold red accent, strong headers', layout: 'topbar' },
  { id: 't7',  name: 'Teal Professional',color: '#134e4a', accent: '#0d9488', bg: '#f0fdfa', desc: 'Teal accents, modern look', layout: 'sidebar-left' },
  { id: 't8',  name: 'Indigo Split',     color: '#1e1b4b', accent: '#6366f1', bg: '#eef2ff', desc: 'Two-tone header, split layout', layout: 'split' },
  { id: 't9',  name: 'Gold Prestige',    color: '#451a03', accent: '#d97706', bg: '#fffbeb', desc: 'Gold serif, premium elegance', layout: 'classic' },
  { id: 't10', name: 'Midnight Dark',    color: '#c7d2fe', accent: '#818cf8', bg: '#1e1b4b', desc: 'Dark theme, light text, bold', layout: 'dark' },
  { id: 't11', name: 'Sky Fresh',        color: '#0c4a6e', accent: '#0ea5e9', bg: '#f0f9ff', desc: 'Sky blue, clean pill skills', layout: 'topbar' },
  { id: 't12', name: 'Forest Sidebar',   color: '#14532d', accent: '#16a34a', bg: '#f0fdf4', desc: 'Deep green left sidebar', layout: 'sidebar-left' },
  { id: 't13', name: 'Rose Elegant',     color: '#500724', accent: '#e11d48', bg: '#fff1f2', desc: 'Rose accent, feminine elegance', layout: 'sidebar-right' },
  { id: 't14', name: 'Orange Dynamic',   color: '#431407', accent: '#ea580c', bg: '#fff7ed', desc: 'Orange highlights, dynamic feel', layout: 'topbar' },
  { id: 't15', name: 'Slate Corporate',  color: '#0f172a', accent: '#64748b', bg: '#f8fafc', desc: 'Sophisticated slate grays', layout: 'split' },
]

// ─── ATS Score ───────────────────────────────────────────────────
function getATS(r: ResumeData) {
  let s = 0
  if (r.name) s += 10; if (r.email) s += 8; if (r.phone) s += 8
  if (r.summary && r.summary.length > 50) s += 12
  if (r.experience.some(e => e.company)) s += 15
  if (r.education.some(e => e.school)) s += 10
  if (r.skills.length >= 5) s += 12; else if (r.skills.length > 0) s += 6
  if (r.projects.some(p => p.name)) s += 10
  if (r.certificates.some(c => c.name)) s += 8
  if (r.linkedin) s += 4; if (r.github) s += 3
  return Math.min(s, 100)
}

// ─── Resume Template Component ────────────────────────────────────
function ResumeTemplate({ data, templateId, scale = 1, fontSettings }: { data: ResumeData; templateId: string; scale?: number; fontSettings?: FontSettings }) {
  const t = TEMPLATES.find(x => x.id === templateId) || TEMPLATES[0]
  const S = (v: number) => Math.round(v * scale)
  const F = fontSettings || DEFAULT_FONT
  const fs = {
    name: S(F.nameSize), title: S(F.titleSize), contact: S(F.contactSize), sectionHead: S(F.sectionSize),
    jobTitle: S(F.bodySize + 2), company: S(F.bodySize + 1), body: S(F.bodySize), small: S(F.bodySize - 1), skill: S(F.bodySize - 1),
    photoSize: S(90), sidebarPhotoSize: S(100),
    lh: F.lineHeight, spacing: S(F.sectionSpacing), pad: S(F.pagePadding)
  }

  const contactLine = [data.email, data.phone, data.location].filter(Boolean).join('  |  ')
  const linkLine = [
    data.linkedin ? `linkedin.com/in/${data.linkedin}` : '',
    data.github ? `github.com/${data.github}` : '',
    data.website || ''
  ].filter(Boolean).join('  |  ')

  const sectionTitle = (title: string, color: string, accent: string) => (
    <div style={{ marginBottom: S(10) }}>
      <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color, letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: S(6), borderBottom: `2.5px solid ${accent}`, fontFamily: 'Arial,sans-serif' }}>{title}</div>
    </div>
  )

  const expBlock = (e: Experience) => e.company ? (
    <div style={{ marginBottom: S(16) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
        <div>
          <div style={{ fontSize: fs.jobTitle, fontWeight: 700, color: '#111', fontFamily: 'Arial,sans-serif' }}>{e.role}</div>
          <div style={{ fontSize: fs.company, fontWeight: 600, color: t.accent, fontFamily: 'Arial,sans-serif' }}>{e.company}{e.location ? ' — ' + e.location : ''}</div>
        </div>
        <div style={{ fontSize: fs.small, color: '#64748b', whiteSpace: 'nowrap', fontFamily: 'Arial,sans-serif' }}>{e.duration}</div>
      </div>
      {e.description ? <div style={{ fontSize: fs.body, color: '#374151', marginTop: S(6), lineHeight: 1.7, fontFamily: 'Arial,sans-serif' }}>{e.description}</div> : null}
    </div>
  ) : null

  const eduBlock = (e: Education) => e.school ? (
    <div style={{ marginBottom: S(16) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
        <div>
          <div style={{ fontSize: fs.jobTitle, fontWeight: 700, color: '#111', fontFamily: 'Arial,sans-serif' }}>{e.degree}</div>
          <div style={{ fontSize: fs.company, color: t.accent, fontWeight: 600, fontFamily: 'Arial,sans-serif' }}>{e.school}{e.location ? ' — ' + e.location : ''}</div>
          {e.gpa ? <div style={{ fontSize: fs.small, color: '#64748b', fontFamily: 'Arial,sans-serif' }}>GPA: {e.gpa}</div> : null}
        </div>
        <div style={{ fontSize: fs.small, color: '#64748b', whiteSpace: 'nowrap', fontFamily: 'Arial,sans-serif' }}>{e.year}</div>
      </div>
    </div>
  ) : null

  const projBlock = (p: Project) => p.name ? (
    <div style={{ marginBottom: S(16) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
        <div style={{ fontSize: fs.jobTitle, fontWeight: 700, color: '#111', fontFamily: 'Arial,sans-serif' }}>{p.name}</div>
        {p.tech ? <div style={{ fontSize: fs.small, color: t.accent, fontStyle: 'italic', fontFamily: 'Arial,sans-serif' }}>{p.tech}</div> : null}
      </div>
      {p.description ? <div style={{ fontSize: fs.body, color: '#374151', marginTop: S(5), lineHeight: 1.7, fontFamily: 'Arial,sans-serif' }}>{p.description}</div> : null}
    </div>
  ) : null

  const certBlock = (c: Certificate) => c.name ? (
    <div style={{ marginBottom: S(12), display: 'flex', alignItems: 'flex-start', gap: S(8) }}>
      <span style={{ color: t.accent, fontSize: fs.body, marginTop: 1 }}>▸</span>
      <div>
        <span style={{ fontSize: fs.body, fontWeight: 700, color: '#111', fontFamily: 'Arial,sans-serif' }}>{c.name}</span>
        {c.issuer ? <span style={{ fontSize: fs.small, color: t.accent, fontWeight: 600, fontFamily: 'Arial,sans-serif' }}> — {c.issuer}</span> : null}
        {c.date ? <span style={{ fontSize: fs.small, color: '#64748b', fontFamily: 'Arial,sans-serif' }}> · {c.date}</span> : null}
      </div>
    </div>
  ) : null

  const skillPills = (skills: string[], pillBg: string, pillColor: string) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: S(8) }}>
      {skills.map((sk, i) => (
        <span key={i} style={{ background: pillBg, color: pillColor, padding: `${S(5)}px ${S(14)}px`, borderRadius: 100, fontSize: fs.skill, fontWeight: 600, fontFamily: 'Arial,sans-serif' }}>{sk}</span>
      ))}
    </div>
  )

  // photo helper kept for future use
  void ((size: number) => data.photo ? `<img src="${data.photo}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover" />` : '')

  // ─── Classic Layout ───────────────────────────────────────────
  if (t.layout === 'classic' || t.layout === 'minimal') {
    const isGold = t.id === 't9'
    const fontStack = isGold ? 'Georgia,serif' : 'Arial,sans-serif'
    return (
      <div style={{ width: '100%', background: t.bg, minHeight: '100%', fontFamily: fontStack, padding: `${fs.pad}px ${S(fs.pad + 8)}px` }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: S(26), paddingBottom: S(20), borderBottom: `2.5px solid ${t.accent}` }}>
          {data.photo && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: S(14) }}><img src={data.photo} style={{ width: fs.photoSize, height: fs.photoSize, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${t.accent}` }} /></div>}
          <div style={{ fontSize: fs.name, fontWeight: 900, color: t.color, letterSpacing: isGold ? '1px' : '0', fontFamily: fontStack }}>{data.name || 'Your Name'}</div>
          {data.title && <div style={{ fontSize: fs.title, color: t.accent, fontWeight: 600, marginTop: S(6), fontFamily: fontStack }}>{data.title}</div>}
          {contactLine && <div style={{ fontSize: fs.contact, color: '#4b5563', marginTop: S(10), fontFamily: fontStack }}>{contactLine}</div>}
          {linkLine && <div style={{ fontSize: fs.contact, color: t.accent, marginTop: S(5), fontWeight: 600, fontFamily: fontStack }}>{linkLine}</div>}
        </div>
        {/* Content */}
        {data.summary && <div style={{ marginBottom: fs.spacing }}>
          {sectionTitle('Professional Summary', t.color, t.accent)}
          <div style={{ fontSize: fs.body, color: '#374151', lineHeight: fs.lh, fontFamily: fontStack }}>{data.summary}</div>
        </div>}

        {data.experience.some(e => e.company) && <div style={{ marginBottom: fs.spacing }}>
          {sectionTitle('Experience', t.color, t.accent)}
          {data.experience.map((e, i) => <React.Fragment key={i}>{expBlock(e)}</React.Fragment>)}
        </div>}
        {data.education.some(e => e.school) && <div style={{ marginBottom: fs.spacing }}>
          {sectionTitle('Education', t.color, t.accent)}
          {data.education.map((e, i) => <React.Fragment key={i}>{eduBlock(e)}</React.Fragment>)}
        </div>}
        {data.skills.length > 0 && <div style={{ marginBottom: fs.spacing }}>
          {sectionTitle('Skills', t.color, t.accent)}
          {skillPills(data.skills, `rgba(37,99,235,0.1)`, t.accent)}
        </div>}
        {data.projects.some(p => p.name) && <div style={{ marginBottom: fs.spacing }}>
          {sectionTitle('Projects', t.color, t.accent)}
          {data.projects.map((p, i) => <React.Fragment key={i}>{projBlock(p)}</React.Fragment>)}
        </div>}
        {data.certificates.some(c => c.name) && <div style={{ marginBottom: fs.spacing }}>
          {sectionTitle('Certifications', t.color, t.accent)}
          {data.certificates.map((c, i) => <React.Fragment key={i}>{certBlock(c)}</React.Fragment>)}
        </div>}
        {data.languages.length > 0 && <div>
          {sectionTitle('Languages', t.color, t.accent)}
          {skillPills(data.languages, `rgba(100,116,139,0.1)`, '#374151')}
        </div>}
      </div>
    )
  }

  // ─── Sidebar Left Layout ──────────────────────────────────────
  if (t.layout === 'sidebar-left') {
    const sideW = S(260)
    const sideStyle: React.CSSProperties = { width: sideW, minWidth: sideW, background: t.color, padding: `${fs.pad}px ${S(26)}px`, display: 'flex', flexDirection: 'column', gap: fs.spacing }
    const mainStyle: React.CSSProperties = { flex: 1, padding: `${fs.pad}px ${S(30)}px`, background: t.bg, overflowY: 'hidden' }
    const sideSecTitle = (title: string) => (
      <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}55`, paddingBottom: S(6), marginBottom: S(12), fontFamily: 'Arial,sans-serif' }}>{title}</div>
    )
    const textW = 'rgba(255,255,255,0.9)'
    const textWMuted = 'rgba(255,255,255,0.6)'
    return (
      <div style={{ width: '100%', minHeight: '100%', display: 'flex', fontFamily: 'Arial,sans-serif' }}>
        {/* Sidebar */}
        <div style={sideStyle}>
          {data.photo && <div style={{ display: 'flex', justifyContent: 'center' }}><img src={data.photo} style={{ width: fs.sidebarPhotoSize, height: fs.sidebarPhotoSize, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${t.accent}` }} /></div>}
          <div>
            <div style={{ fontSize: fs.name, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{data.name || 'Your Name'}</div>
            {data.title && <div style={{ fontSize: fs.title, color: t.accent, fontWeight: 600, marginTop: S(6) }}>{data.title}</div>}
          </div>
          <div>
            {sideSecTitle('Contact')}
            {data.email && <div style={{ fontSize: fs.contact, color: textW, marginBottom: S(7) }}>📧 {data.email}</div>}
            {data.phone && <div style={{ fontSize: fs.contact, color: textW, marginBottom: S(7) }}>📱 {data.phone}</div>}
            {data.location && <div style={{ fontSize: fs.contact, color: textW, marginBottom: S(7) }}>📍 {data.location}</div>}
            {data.linkedin && <div style={{ fontSize: fs.contact, color: t.accent, marginBottom: S(7) }}>🔗 {data.linkedin}</div>}
            {data.github && <div style={{ fontSize: fs.contact, color: t.accent, marginBottom: S(7) }}>💻 {data.github}</div>}
          </div>
          {data.skills.length > 0 && <div>
            {sideSecTitle('Skills')}
            {data.skills.map((sk, i) => <div key={i} style={{ fontSize: fs.body, color: textW, marginBottom: S(7), display: 'flex', alignItems: 'center', gap: S(8) }}><span style={{ color: t.accent }}>▸</span>{sk}</div>)}
          </div>}
          {data.languages.length > 0 && <div>
            {sideSecTitle('Languages')}
            {data.languages.map((l, i) => <div key={i} style={{ fontSize: fs.body, color: textW, marginBottom: S(6) }}>{l}</div>)}
          </div>}
          {data.certificates.some(c => c.name) && <div>
            {sideSecTitle('Certifications')}
            {data.certificates.filter(c => c.name).map((c, i) => <div key={i} style={{ marginBottom: S(12) }}>
              <div style={{ fontSize: fs.body, fontWeight: 700, color: textW }}>{c.name}</div>
              {c.issuer && <div style={{ fontSize: fs.small, color: textWMuted }}>{c.issuer}</div>}
            </div>)}
          </div>}
        </div>
        {/* Main */}
        <div style={mainStyle}>
          {data.summary && <div style={{ marginBottom: fs.spacing }}>
            {sectionTitle('Summary', t.color, t.accent)}
            <div style={{ fontSize: fs.body, color: '#374151', lineHeight: fs.lh }}>{data.summary}</div>
          </div>}
          {data.experience.some(e => e.company) && <div style={{ marginBottom: fs.spacing }}>
            {sectionTitle('Experience', t.color, t.accent)}
            {data.experience.map((e, i) => <React.Fragment key={i}>{expBlock(e)}</React.Fragment>)}
          </div>}
          {data.education.some(e => e.school) && <div style={{ marginBottom: fs.spacing }}>
            {sectionTitle('Education', t.color, t.accent)}
            {data.education.map((e, i) => <React.Fragment key={i}>{eduBlock(e)}</React.Fragment>)}
          </div>}
          {data.projects.some(p => p.name) && <div>
            {sectionTitle('Projects', t.color, t.accent)}
            {data.projects.map((p, i) => <React.Fragment key={i}>{projBlock(p)}</React.Fragment>)}
          </div>}
        </div>
      </div>
    )
  }

  // ─── Sidebar Right Layout ─────────────────────────────────────
  if (t.layout === 'sidebar-right') {
    const sideW = S(250)
    const sideSecTitle = (title: string) => (
      <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '1.5px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}55`, paddingBottom: S(6), marginBottom: S(12), fontFamily: 'Arial,sans-serif' }}>{title}</div>
    )
    return (
      <div style={{ width: '100%', minHeight: '100%', display: 'flex', fontFamily: 'Arial,sans-serif', background: t.bg }}>
        {/* Main */}
        <div style={{ flex: 1, padding: `${fs.pad}px ${S(30)}px` }}>
          <div style={{ marginBottom: fs.spacing, paddingBottom: S(20), borderBottom: `3px solid ${t.accent}` }}>
            {data.photo && <div style={{ marginBottom: S(14) }}><img src={data.photo} style={{ width: fs.photoSize, height: fs.photoSize, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${t.accent}` }} /></div>}
            <div style={{ fontSize: fs.name, fontWeight: 900, color: t.color }}>{data.name || 'Your Name'}</div>
            {data.title && <div style={{ fontSize: fs.title, color: t.accent, fontWeight: 600, marginTop: S(6) }}>{data.title}</div>}
          </div>
          {data.summary && <div style={{ marginBottom: fs.spacing }}>
            {sectionTitle('Summary', t.color, t.accent)}
            <div style={{ fontSize: fs.body, color: '#374151', lineHeight: fs.lh }}>{data.summary}</div>
          </div>}
          {data.experience.some(e => e.company) && <div style={{ marginBottom: fs.spacing }}>
            {sectionTitle('Experience', t.color, t.accent)}
            {data.experience.map((e, i) => <React.Fragment key={i}>{expBlock(e)}</React.Fragment>)}
          </div>}
          {data.education.some(e => e.school) && <div style={{ marginBottom: fs.spacing }}>
            {sectionTitle('Education', t.color, t.accent)}
            {data.education.map((e, i) => <React.Fragment key={i}>{eduBlock(e)}</React.Fragment>)}
          </div>}
          {data.projects.some(p => p.name) && <div>
            {sectionTitle('Projects', t.color, t.accent)}
            {data.projects.map((p, i) => <React.Fragment key={i}>{projBlock(p)}</React.Fragment>)}
          </div>}
        </div>
        {/* Right Sidebar */}
        <div style={{ width: sideW, minWidth: sideW, background: t.color, padding: `${fs.pad}px ${S(24)}px` }}>
          {data.email && <div style={{ marginBottom: fs.spacing }}>
            {sideSecTitle('Contact')}
            <div style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.9)', marginBottom: S(7) }}>{data.email}</div>
            {data.phone && <div style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.9)', marginBottom: S(7) }}>{data.phone}</div>}
            {data.location && <div style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.9)', marginBottom: S(7) }}>{data.location}</div>}
            {data.linkedin && <div style={{ fontSize: fs.contact, color: t.accent, marginBottom: S(7) }}>{data.linkedin}</div>}
            {data.github && <div style={{ fontSize: fs.contact, color: t.accent }}>{data.github}</div>}
          </div>}
          {data.skills.length > 0 && <div style={{ marginBottom: fs.spacing }}>
            {sideSecTitle('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: S(6) }}>
              {data.skills.map((sk, i) => <span key={i} style={{ background: `${t.accent}44`, color: '#fff', padding: `${S(4)}px ${S(10)}px`, borderRadius: '100px', fontSize: fs.skill, fontWeight: 600 }}>{sk}</span>)}
            </div>
          </div>}
          {data.certificates.some(c => c.name) && <div style={{ marginBottom: fs.spacing }}>
            {sideSecTitle('Certifications')}
            {data.certificates.filter(c => c.name).map((c, i) => <div key={i} style={{ marginBottom: S(12) }}>
              <div style={{ fontSize: fs.body, fontWeight: 700, color: '#fff' }}>{c.name}</div>
              {c.issuer && <div style={{ fontSize: fs.small, color: t.accent }}>{c.issuer}</div>}
              {c.date && <div style={{ fontSize: fs.small, color: 'rgba(255,255,255,0.55)' }}>{c.date}</div>}
            </div>)}
          </div>}
          {data.languages.length > 0 && <div>
            {sideSecTitle('Languages')}
            {data.languages.map((l, i) => <div key={i} style={{ fontSize: fs.body, color: 'rgba(255,255,255,0.9)', marginBottom: S(7) }}>{l}</div>)}
          </div>}
        </div>
      </div>
    )
  }

  // ─── Top Bar Layout ───────────────────────────────────────────
  if (t.layout === 'topbar') {
    return (
      <div style={{ width: '100%', minHeight: '100%', fontFamily: 'Arial,sans-serif', background: t.bg }}>
        {/* Top Bar */}
        <div style={{ background: `linear-gradient(135deg, ${t.color} 0%, ${t.accent}cc 100%)`, padding: `${fs.pad}px ${S(48)}px`, display: 'flex', alignItems: 'center', gap: S(24) }}>
          {data.photo && <img src={data.photo} style={{ width: fs.photoSize, height: fs.photoSize, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', flexShrink: 0 }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: fs.name, fontWeight: 900, color: '#fff', letterSpacing: '0.5px' }}>{data.name || 'Your Name'}</div>
            {data.title && <div style={{ fontSize: fs.title, color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginTop: S(6) }}>{data.title}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${S(6)}px ${S(20)}px`, marginTop: S(12) }}>
              {data.email && <span style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.9)' }}>✉ {data.email}</span>}
              {data.phone && <span style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.9)' }}>📱 {data.phone}</span>}
              {data.location && <span style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.9)' }}>📍 {data.location}</span>}
              {data.linkedin && <span style={{ fontSize: fs.contact, color: 'rgba(255,255,255,1)' }}>🔗 {data.linkedin}</span>}
              {data.github && <span style={{ fontSize: fs.contact, color: 'rgba(255,255,255,1)' }}>💻 {data.github}</span>}
            </div>
          </div>
        </div>
        {/* Body - 2 col */}
        <div style={{ display: 'flex', padding: `${fs.spacing}px ${S(36)}px`, gap: S(30) }}>
          {/* Left col */}
          <div style={{ flex: 1 }}>
            {data.summary && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Summary', t.color, t.accent)}
              <div style={{ fontSize: fs.body, color: '#374151', lineHeight: fs.lh }}>{data.summary}</div>
            </div>}
            {data.experience.some(e => e.company) && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Experience', t.color, t.accent)}
              {data.experience.map((e, i) => <React.Fragment key={i}>{expBlock(e)}</React.Fragment>)}
            </div>}
            {data.projects.some(p => p.name) && <div>
              {sectionTitle('Projects', t.color, t.accent)}
              {data.projects.map((p, i) => <React.Fragment key={i}>{projBlock(p)}</React.Fragment>)}
            </div>}
          </div>
          {/* Right col */}
          <div style={{ width: S(240), flexShrink: 0 }}>
            {data.education.some(e => e.school) && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Education', t.color, t.accent)}
              {data.education.map((e, i) => <React.Fragment key={i}>{eduBlock(e)}</React.Fragment>)}
            </div>}
            {data.skills.length > 0 && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Skills', t.color, t.accent)}
              {skillPills(data.skills, `${t.accent}22`, t.accent)}
            </div>}
            {data.certificates.some(c => c.name) && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Certifications', t.color, t.accent)}
              {data.certificates.map((c, i) => <React.Fragment key={i}>{certBlock(c)}</React.Fragment>)}
            </div>}
            {data.languages.length > 0 && <div>
              {sectionTitle('Languages', t.color, t.accent)}
              {skillPills(data.languages, '#f1f5f9', '#374151')}
            </div>}
          </div>
        </div>
      </div>
    )
  }

  // ─── Split Layout ─────────────────────────────────────────────
  if (t.layout === 'split') {
    return (
      <div style={{ width: '100%', minHeight: '100%', fontFamily: 'Arial,sans-serif', background: t.bg }}>
        {/* Split Header */}
        <div style={{ display: 'flex', minHeight: S(110) }}>
          <div style={{ background: t.color, flex: 1, padding: `${fs.pad}px ${S(28)}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {data.photo && <img src={data.photo} style={{ width: fs.photoSize, height: fs.photoSize, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', marginBottom: S(10) }} />}
            <div style={{ fontSize: fs.name, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{data.name || 'Your Name'}</div>
            {data.title && <div style={{ fontSize: fs.title, color: t.accent, fontWeight: 600, marginTop: S(4) }}>{data.title}</div>}
          </div>
          <div style={{ background: t.accent, width: S(220), padding: `${fs.pad}px ${S(20)}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {data.email && <div style={{ fontSize: fs.contact, color: '#fff', marginBottom: S(5) }}>✉ {data.email}</div>}
            {data.phone && <div style={{ fontSize: fs.contact, color: '#fff', marginBottom: S(5) }}>📱 {data.phone}</div>}
            {data.location && <div style={{ fontSize: fs.contact, color: '#fff', marginBottom: S(5) }}>📍 {data.location}</div>}
            {data.linkedin && <div style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.85)', marginBottom: S(4) }}>🔗 {data.linkedin}</div>}
            {data.github && <div style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.85)' }}>💻 {data.github}</div>}
          </div>
        </div>
        {/* Body */}
        <div style={{ display: 'flex', padding: `${fs.spacing}px ${S(36)}px`, gap: S(30) }}>
          <div style={{ flex: 1 }}>
            {data.summary && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Summary', t.color, t.accent)}
              <div style={{ fontSize: fs.body, color: '#374151', lineHeight: fs.lh }}>{data.summary}</div>
            </div>}
            {data.experience.some(e => e.company) && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Experience', t.color, t.accent)}
              {data.experience.map((e, i) => <React.Fragment key={i}>{expBlock(e)}</React.Fragment>)}
            </div>}
            {data.projects.some(p => p.name) && <div>
              {sectionTitle('Projects', t.color, t.accent)}
              {data.projects.map((p, i) => <React.Fragment key={i}>{projBlock(p)}</React.Fragment>)}
            </div>}
          </div>
          <div style={{ width: S(240), flexShrink: 0 }}>
            {data.education.some(e => e.school) && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Education', t.color, t.accent)}
              {data.education.map((e, i) => <React.Fragment key={i}>{eduBlock(e)}</React.Fragment>)}
            </div>}
            {data.skills.length > 0 && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Skills', t.color, t.accent)}
              {skillPills(data.skills, `${t.accent}22`, t.accent)}
            </div>}
            {data.certificates.some(c => c.name) && <div style={{ marginBottom: fs.spacing }}>
              {sectionTitle('Certifications', t.color, t.accent)}
              {data.certificates.map((c, i) => <React.Fragment key={i}>{certBlock(c)}</React.Fragment>)}
            </div>}
            {data.languages.length > 0 && <div>
              {sectionTitle('Languages', t.color, t.accent)}
              {skillPills(data.languages, '#f1f5f9', '#374151')}
            </div>}
          </div>
        </div>
      </div>
    )
  }

  // ─── Dark Layout ──────────────────────────────────────────────
  if (t.layout === 'dark') {
    return (
      <div style={{ width: '100%', minHeight: '100%', background: '#1e1b4b', fontFamily: 'Arial,sans-serif', padding: `${fs.pad}px ${S(52)}px` }}>
        <div style={{ textAlign: 'center', marginBottom: fs.spacing, paddingBottom: S(24), borderBottom: `2px solid ${t.accent}55` }}>
          {data.photo && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: S(16) }}><img src={data.photo} style={{ width: fs.photoSize, height: fs.photoSize, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${t.accent}` }} /></div>}
          <div style={{ fontSize: fs.name, fontWeight: 900, color: '#e2e8f0', letterSpacing: '1px' }}>{data.name || 'Your Name'}</div>
          {data.title && <div style={{ fontSize: fs.title, color: t.accent, fontWeight: 600, marginTop: S(6) }}>{data.title}</div>}
          {contactLine && <div style={{ fontSize: fs.contact, color: 'rgba(255,255,255,0.6)', marginTop: S(10) }}>{contactLine}</div>}
          {linkLine && <div style={{ fontSize: fs.contact, color: t.accent, marginTop: S(5) }}>{linkLine}</div>}
        </div>
        {data.summary && <div style={{ marginBottom: fs.spacing }}>
          <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Summary</div>
          <div style={{ fontSize: fs.body, color: 'rgba(255,255,255,0.8)', lineHeight: fs.lh }}>{data.summary}</div>
        </div>}
        {data.experience.some(e => e.company) && <div style={{ marginBottom: fs.spacing }}>
          <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Experience</div>
          {data.experience.filter(e => e.company).map((e, i) => <div key={i} style={{ marginBottom: fs.spacing }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: fs.jobTitle, fontWeight: 700, color: '#e2e8f0' }}>{e.role}</div>
                <div style={{ fontSize: fs.company, color: t.accent, fontWeight: 600 }}>{e.company}</div>
              </div>
              <div style={{ fontSize: fs.small, color: 'rgba(255,255,255,0.45)' }}>{e.duration}</div>
            </div>
            {e.description && <div style={{ fontSize: fs.body, color: 'rgba(255,255,255,0.7)', marginTop: S(6), lineHeight: fs.lh }}>{e.description}</div>}
          </div>)}
        </div>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: S(30) }}>
          <div>
            {data.education.some(e => e.school) && <div style={{ marginBottom: fs.spacing }}>
              <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Education</div>
              {data.education.filter(e => e.school).map((e, i) => <div key={i} style={{ marginBottom: S(12) }}>
                <div style={{ fontSize: fs.jobTitle, fontWeight: 700, color: '#e2e8f0' }}>{e.degree}</div>
                <div style={{ fontSize: fs.company, color: t.accent }}>{e.school}</div>
                <div style={{ fontSize: fs.small, color: 'rgba(255,255,255,0.45)' }}>{e.year}</div>
              </div>)}
            </div>}
            {data.projects.some(p => p.name) && <div>
              <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Projects</div>
              {data.projects.filter(p => p.name).map((p, i) => <div key={i} style={{ marginBottom: S(12) }}>
                <div style={{ fontSize: fs.jobTitle, fontWeight: 700, color: '#e2e8f0' }}>{p.name}</div>
                {p.tech && <div style={{ fontSize: fs.small, color: t.accent }}>{p.tech}</div>}
                {p.description && <div style={{ fontSize: fs.body, color: 'rgba(255,255,255,0.7)', lineHeight: fs.lh }}>{p.description}</div>}
              </div>)}
            </div>}
          </div>
          <div>
            {data.skills.length > 0 && <div style={{ marginBottom: fs.spacing }}>
              <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: S(8) }}>
                {data.skills.map((sk, i) => <span key={i} style={{ background: `${t.accent}22`, color: t.accent, padding: `${S(5)}px ${S(12)}px`, borderRadius: '100px', fontSize: fs.skill, fontWeight: 600 }}>{sk}</span>)}
              </div>
            </div>}
            {data.certificates.some(c => c.name) && <div style={{ marginBottom: fs.spacing }}>
              <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Certifications</div>
              {data.certificates.filter(c => c.name).map((c, i) => <div key={i} style={{ marginBottom: S(10) }}>
                <div style={{ fontSize: fs.body, fontWeight: 700, color: '#e2e8f0' }}>{c.name}</div>
                {c.issuer && <div style={{ fontSize: fs.small, color: t.accent }}>{c.issuer}</div>}
              </div>)}
            </div>}
            {data.languages.length > 0 && <div>
              <div style={{ fontSize: fs.sectionHead, fontWeight: 800, color: t.accent, letterSpacing: '2px', textTransform: 'uppercase', borderBottom: `1.5px solid ${t.accent}44`, paddingBottom: S(6), marginBottom: S(10) }}>Languages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: S(8) }}>
                {data.languages.map((l, i) => <span key={i} style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', padding: `${S(5)}px ${S(12)}px`, borderRadius: '100px', fontSize: fs.skill }}>{l}</span>)}
              </div>
            </div>}
          </div>
        </div>
      </div>
    )
  }

  return <div>Select a template</div>
}

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<'welcome' | 'type' | 'builder'>('welcome')
  const [resumeType, setResumeType] = useState<'fresher' | 'experienced'>('fresher')
  const [resumeData, setResumeData] = useState<ResumeData>(EMPTY)
  const [templateId, setTemplateId] = useState('t1')
  const [activeTab, setActiveTab] = useState(0)
  const [modal, setModal] = useState<null | 'templates' | 'ai' | 'download' | 'guide' | 'preview'>(null)
  const [dlState, setDlState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [dlMsg, setDlMsg] = useState('')
  const [skillInput, setSkillInput] = useState('')
  const [langInput, setLangInput] = useState('')
  const [fontSettings, setFontSettings] = useState<FontSettings>(DEFAULT_FONT)
  const [showFontPanel, setShowFontPanel] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const pdfRef = useRef<HTMLDivElement>(null)

  const updFont = (key: keyof FontSettings, val: number) =>
    setFontSettings(prev => ({ ...prev, [key]: val }))

  const ats = getATS(resumeData)
  const atsColor = ats >= 75 ? '#10b981' : ats >= 50 ? '#f59e0b' : '#ef4444'
  const atsLabel = ats >= 75 ? 'Excellent' : ats >= 50 ? 'Good' : 'Needs Work'

  // Prevent scroll on modal open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  const upd = useCallback((field: keyof ResumeData, val: unknown) =>
    setResumeData(p => ({ ...p, [field]: val })), [])

  // Photo upload
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => upd('photo', ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  // Education
  const updEdu = (i: number, f: keyof Education, v: string) =>
    upd('education', resumeData.education.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const addEdu = () => upd('education', [...resumeData.education, { degree: '', school: '', year: '', gpa: '', location: '' }])
  const remEdu = (i: number) => upd('education', resumeData.education.filter((_, idx) => idx !== i))

  // Experience
  const updExp = (i: number, f: keyof Experience, v: string) =>
    upd('experience', resumeData.experience.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const addExp = () => upd('experience', [...resumeData.experience, { company: '', role: '', duration: '', location: '', description: '' }])
  const remExp = (i: number) => upd('experience', resumeData.experience.filter((_, idx) => idx !== i))

  // Projects
  const updProj = (i: number, f: keyof Project, v: string) =>
    upd('projects', resumeData.projects.map((p, idx) => idx === i ? { ...p, [f]: v } : p))
  const addProj = () => upd('projects', [...resumeData.projects, { name: '', tech: '', description: '' }])
  const remProj = (i: number) => upd('projects', resumeData.projects.filter((_, idx) => idx !== i))

  // Certificates
  const updCert = (i: number, f: keyof Certificate, v: string) =>
    upd('certificates', resumeData.certificates.map((c, idx) => idx === i ? { ...c, [f]: v } : c))
  const addCert = () => upd('certificates', [...resumeData.certificates, { name: '', issuer: '', date: '', id: '' }])
  const remCert = (i: number) => upd('certificates', resumeData.certificates.filter((_, idx) => idx !== i))

  // Skills
  const addSkill = (sk: string) => {
    const v = sk.trim(); if (!v || resumeData.skills.includes(v)) return
    upd('skills', [...resumeData.skills, v]); setSkillInput('')
  }
  const remSkill = (i: number) => upd('skills', resumeData.skills.filter((_, idx) => idx !== i))

  // Languages
  const addLang = (l: string) => {
    const v = l.trim(); if (!v || resumeData.languages.includes(v)) return
    upd('languages', [...resumeData.languages, v]); setLangInput('')
  }
  const remLang = (i: number) => upd('languages', resumeData.languages.filter((_, idx) => idx !== i))

  // AI Fill
  const aiFill = (profile: number) => {
    const profiles: ResumeData[] = [
      {
        name: 'Priya Sharma', title: 'MBA Graduate | Business Analyst', email: 'priya.sharma@email.com',
        phone: '+91 98765 43210', location: 'Mumbai, Maharashtra', linkedin: 'priyasharma', github: '',
        website: '', photo: '',
        summary: 'Ambitious MBA graduate specializing in Business Analytics and Strategy with strong analytical and leadership skills. Proven ability to drive data-driven decisions and manage cross-functional projects. Seeking to leverage academic excellence and internship experience to contribute to organizational growth.',
        education: [
          { degree: 'MBA – Business Analytics', school: 'IIM Ahmedabad', year: '2022 – 2024', gpa: '8.9/10', location: 'Ahmedabad, Gujarat' },
          { degree: 'B.Com (Honours)', school: 'Delhi University', year: '2019 – 2022', gpa: '8.2/10', location: 'New Delhi' }
        ],
        experience: [
          { company: 'Deloitte India', role: 'Business Analyst Intern', duration: 'May 2023 – Jul 2023', location: 'Mumbai', description: 'Analyzed client financial data to identify cost optimization opportunities saving ₹12L annually. Built Excel dashboards and Power BI reports for C-suite presentations. Assisted in digital transformation strategy for 3 FMCG clients.' },
          { company: 'KPMG India', role: 'Strategy Intern', duration: 'Dec 2022 – Jan 2023', location: 'Bangalore', description: 'Conducted market research and competitive analysis for entry into new markets. Prepared detailed reports on industry trends that informed client strategic planning.' }
        ],
        skills: ['Business Analysis', 'Power BI', 'Excel Advanced', 'SQL', 'Python', 'Project Management', 'Strategic Planning', 'Financial Modeling', 'Data Visualization', 'JIRA'],
        projects: [
          { name: 'Market Expansion Strategy – FMCG', tech: 'Excel, Power BI, R', description: 'Developed comprehensive go-to-market strategy for tier-2 city expansion, projecting 35% revenue growth over 2 years.' },
          { name: 'HR Analytics Dashboard', tech: 'Python, Tableau', description: 'Built HR analytics platform to reduce employee attrition by 18% through predictive modeling and early intervention alerts.' }
        ],
        certificates: [
          { name: 'Google Data Analytics Professional', issuer: 'Google', date: 'Jan 2024', id: 'GDA-2024' },
          { name: 'PMP Certification', issuer: 'PMI', date: 'Mar 2024', id: 'PMP-2024' }
        ],
        languages: ['English', 'Hindi', 'Marathi']
      },
      {
        name: 'Rahul Kumar', title: 'Full Stack Developer | React & Node.js', email: 'rahul.kumar@email.com',
        phone: '+91 87654 32109', location: 'Bangalore, India', linkedin: 'rahulkumar', github: 'rahulkumar',
        website: 'rahulkumar.dev', photo: '',
        summary: 'MCA graduate and passionate Full Stack Developer with hands-on experience in React, Node.js, and cloud technologies. Built 5+ production applications serving 1000+ daily users. Strong problem-solving skills with expertise in modern web development practices and agile methodologies.',
        education: [
          { degree: 'MCA – Computer Applications', school: 'NIT Trichy', year: '2021 – 2024', gpa: '8.6/10', location: 'Trichy, TN' },
          { degree: 'BCA – Computer Applications', school: 'Pune University', year: '2018 – 2021', gpa: '8.1/10', location: 'Pune, MH' }
        ],
        experience: [
          { company: 'TCS', role: 'Software Developer Intern', duration: 'Jan 2024 – Jun 2024', location: 'Bangalore', description: 'Developed RESTful APIs using Node.js and Express serving 50K+ daily requests. Built responsive React dashboards improving user engagement by 35%. Optimized database queries reducing load time by 40%.' },
          { company: 'Infosys BPM', role: 'Jr. Developer Intern', duration: 'Jun 2023 – Aug 2023', location: 'Pune', description: 'Created automation scripts in Python reducing manual data processing time by 60%. Contributed to migrating legacy systems to modern React architecture.' }
        ],
        skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'GraphQL', 'Redux', 'Express.js'],
        projects: [
          { name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB, Stripe', description: 'Full-stack e-commerce with React frontend and Node.js backend. Handles 1000+ daily users with payment integration, auth, and admin dashboard.' },
          { name: 'Task Management App', tech: 'React, Socket.io, PostgreSQL', description: 'Real-time collaborative task manager with drag-and-drop, notifications, and WebSocket live updates.' }
        ],
        certificates: [
          { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2024', id: 'AWS-SA-2024' },
          { name: 'Meta Front-End Developer', issuer: 'Meta', date: '2023', id: 'META-FE-2023' }
        ],
        languages: ['English', 'Hindi', 'Tamil']
      },
      {
        name: 'Anjali Mehta', title: 'Senior Data Scientist | ML Engineer', email: 'anjali.mehta@email.com',
        phone: '+91 99887 76655', location: 'Hyderabad, India', linkedin: 'anjalimehta', github: 'anjalimehta',
        website: '', photo: '',
        summary: '5+ years experienced Data Scientist specializing in Machine Learning, NLP, and predictive analytics. Led teams of 8+ engineers delivering AI solutions with $2M+ cost savings. Expert in Python, TensorFlow, and cloud-based ML pipelines. Published researcher with 3 conference papers.',
        education: [
          { degree: 'M.Tech – Data Science & AI', school: 'IIT Hyderabad', year: '2016 – 2018', gpa: '9.1/10', location: 'Hyderabad' },
          { degree: 'B.Tech – Computer Science', school: 'BITS Pilani', year: '2012 – 2016', gpa: '8.7/10', location: 'Pilani, Rajasthan' }
        ],
        experience: [
          { company: 'Microsoft India', role: 'Senior Data Scientist', duration: 'Aug 2021 – Present', location: 'Hyderabad', description: 'Lead ML team of 8 engineers building NLP models for Azure Cognitive Services used by 500K+ enterprises. Developed recommendation engine increasing user retention by 28%. Mentored 5 junior data scientists.' },
          { company: 'Flipkart', role: 'Data Scientist', duration: 'Jun 2019 – Jul 2021', location: 'Bangalore', description: 'Built demand forecasting models reducing inventory costs by ₹8 crore annually. Deployed real-time fraud detection system with 99.2% accuracy serving 50M+ transactions daily.' },
          { company: 'Amazon', role: 'Data Analyst', duration: 'Jul 2018 – May 2019', location: 'Bangalore', description: 'Analyzed customer behavior data for product recommendations, driving 22% increase in cross-sell revenue.' }
        ],
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'Spark', 'AWS SageMaker', 'Kubernetes', 'MLflow', 'NLP', 'Computer Vision', 'Statistics'],
        projects: [
          { name: 'Real-Time Fraud Detection', tech: 'Python, Kafka, Spark, ML', description: 'Built distributed fraud detection pipeline processing 10M+ transactions/day with 99.2% precision at sub-50ms latency.' },
          { name: 'NLP Customer Support Bot', tech: 'BERT, FastAPI, Redis', description: 'Deployed conversational AI handling 70% of customer queries autonomously, saving 200+ agent-hours weekly.' }
        ],
        certificates: [
          { name: 'AWS ML Specialty', issuer: 'Amazon Web Services', date: '2023', id: 'AWS-ML-2023' },
          { name: 'TensorFlow Developer', issuer: 'Google', date: '2022', id: 'TF-DEV-2022' },
          { name: 'PMP', issuer: 'PMI', date: '2021', id: 'PMP-2021' }
        ],
        languages: ['English', 'Hindi', 'Gujarati']
      }
    ]
    setResumeData(profiles[profile])
    setModal(null)
  }

  // PDF Download
  const downloadPDF = useCallback(async () => {
    setDlState('loading')
    setDlMsg('Preparing your resume...')
    try {
      // A4 at 96dpi = 794 x 1122px
      const PDF_W = 794
      const PDF_H = 1122

      const container = document.createElement('div')
      container.style.cssText = `
        position:fixed;left:-9999px;top:0;
        width:${PDF_W}px;
        min-height:${PDF_H}px;
        background:white;
        z-index:-1;
        overflow:hidden;
      `
      document.body.appendChild(container)
      const root = ReactDOM.createRoot(container)
      root.render(<ResumeTemplate data={resumeData} templateId={templateId} scale={1} fontSettings={fontSettings} />)
      setDlMsg('Rendering resume...')
      await new Promise(r => setTimeout(r, 2000))
      setDlMsg('Generating PDF...')

      // Force container to exactly A4 height
      container.style.height = `${PDF_H}px`

      const canvas = await html2canvas(container, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: PDF_W,
        height: PDF_H,
        windowWidth: PDF_W,
        windowHeight: PDF_H,
        logging: false,
        imageTimeout: 15000,
      })
      root.unmount()
      document.body.removeChild(container)

      const imgData = canvas.toDataURL('image/png', 1.0)
      // A4 in mm: 210 x 297
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()   // 210mm
      const pdfH = pdf.internal.pageSize.getHeight()  // 297mm

      // Always fill the full page - stretch to fill entire A4
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH)

      const fname = (resumeData.name || 'Resume').replace(/\s+/g, '_')
      pdf.save(`${fname}_Resume.pdf`)
      setDlState('done')
      setDlMsg('✅ PDF Downloaded Successfully!')
      setTimeout(() => { setDlState('idle'); setModal(null) }, 2000)
    } catch (e) {
      console.error(e)
      setDlState('error')
      setDlMsg('Download failed. Please try again.')
      setTimeout(() => setDlState('idle'), 3000)
    }
  }, [resumeData, templateId])

  // Scale for preview
  const getPreviewScale = () => {
    const panelW = window.innerWidth > 1200 ? window.innerWidth - 520 - 48 : window.innerWidth - 460 - 48
    return Math.min((panelW) / 794, 1)
  }

  const previewScale = getPreviewScale()

  const TABS = [
    { label: 'Personal', icon: '👤' },
    { label: 'Education', icon: '🎓' },
    { label: 'Experience', icon: '💼' },
    { label: 'Skills', icon: '⚡' },
    { label: 'Projects', icon: '🚀' },
    { label: 'Certificates', icon: '🏆' },
  ]

  const QUICK_SKILLS = {
    'Tech': ['JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker'],
    'Business': ['Excel', 'Power BI', 'Tableau', 'JIRA', 'Salesforce', 'SAP', 'PowerPoint', 'Data Analysis'],
    'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Team Player', 'Time Management', 'Critical Thinking'],
  }

  const QUICK_CERTS = ['AWS Solutions Architect', 'Google Analytics', 'PMP', 'Scrum Master', 'Meta Front-End Developer', 'TensorFlow Developer']

  // Welcome Screen
  if (screen === 'welcome') return (
    <div className="welcome-bg">
      <div className="welcome-orb welcome-orb-1" />
      <div className="welcome-orb welcome-orb-2" />
      <div className="welcome-orb welcome-orb-3" />
      <div className="welcome-card">
        <div className="welcome-badge animate-fadeIn">
          <span>✨</span> AI-Powered Resume Builder
        </div>
        <h1 className="welcome-title">
          Build Your Perfect<br />
          <span className="welcome-title-gradient">ATS-Friendly Resume</span>
        </h1>
        <p className="welcome-subtitle">
          Create professional, ATS-optimized resumes in minutes with AI assistance. 
          15 stunning templates, live preview, and instant PDF download.
        </p>
        <div className="welcome-features">
          {[
            { icon: '🤖', title: 'AI-Powered', desc: 'Auto-fill resume with AI profiles' },
            { icon: '📊', title: 'ATS Score', desc: 'Real-time ATS compatibility check' },
            { icon: '🎨', title: '15 Templates', desc: 'Professional ATS-friendly designs' },
            { icon: '⚡', title: 'Instant PDF', desc: 'Download PDF in one click' },
          ].map((f, i) => (
            <div key={i} className="welcome-feature-card" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
              <span className="welcome-feature-icon" style={{ animationDelay: `${i * 0.3}s` }}>{f.icon}</span>
              <div className="welcome-feature-title">{f.title}</div>
              <div className="welcome-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
        <div className="welcome-cta">
          <button className="btn-primary-glow" onClick={() => setScreen('type')}>
            🚀 Start Building Resume
          </button>
          <button className="btn-ghost-glow" onClick={() => setModal('guide')}>
            📖 Setup Guide
          </button>
        </div>
      </div>
      <div className="welcome-credit">Developed with ❤️ by Gaurav Vishwas</div>

      {/* Guide Modal */}
      {modal === 'guide' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="modal-header">
              <div className="modal-title">📖 Setup & Deployment Guide</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="guide-steps">
                {[
                  { num: '1', title: '🖥️ Run Locally', desc: 'Install Node.js from nodejs.org, then run:', code: 'npm install\nnpm run dev\n# Open http://localhost:5173' },
                  { num: '2', title: '📦 Build for Production', desc: 'Build the optimized production files:', code: 'npm run build\n# Output in dist/ folder' },
                  { num: '3', title: '🌐 Deploy to Vercel (Easiest)', desc: 'Push to GitHub, then connect to Vercel.com → Import → Deploy. Get a free URL instantly!', code: 'git init && git add .\ngit commit -m "Initial commit"\n# Connect at vercel.com' },
                  { num: '4', title: '📄 GitHub Pages', desc: 'Enable Pages in GitHub Settings → Pages → Source: GitHub Actions', code: 'git push origin main\n# Enable in Settings → Pages' },
                ].map((step, i) => (
                  <div className="guide-step" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="guide-step-num">{step.num}</div>
                    <div className="guide-step-content">
                      <div className="guide-step-title">{step.title}</div>
                      <div className="guide-step-desc">{step.desc}</div>
                      <div className="guide-code">{step.code}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Type Selection Screen
  if (screen === 'type') return (
    <div className="type-bg">
      <button className="type-back-btn" onClick={() => setScreen('welcome')}>← Back</button>
      <div className="type-header">
        <div className="type-header-badge">🎯 Choose Your Resume Type</div>
        <h2 className="type-title">What's your career stage?</h2>
        <p className="type-subtitle">We'll tailor the experience to match your background</p>
      </div>
      <div className="type-cards">
        {[
          {
            cls: 'fresher', type: 'fresher' as const, icon: '🎓', title: 'Fresher / Student',
            sub: 'Just starting your career journey? Perfect for graduates and students.',
            features: ['Education-first layout', 'Internship & projects focus', 'Skills-based format', 'AI profile for freshers', 'ATS optimized for entry-level']
          },
          {
            cls: 'experienced', type: 'experienced' as const, icon: '💼', title: 'Experienced Professional',
            sub: '2+ years of work experience? Showcase your achievements and impact.',
            features: ['Experience-first layout', 'Achievement-focused sections', 'Leadership highlights', 'AI profile for professionals', 'ATS optimized for senior roles']
          }
        ].map((c, i) => (
          <div key={i} className={`type-card ${c.cls}`} style={{ animationDelay: `${i * 0.15}s` }}
            onClick={() => { setResumeType(c.type); setScreen('builder') }}>
            <div className="type-card-icon">{c.icon}</div>
            <div className="type-card-title">{c.title}</div>
            <div className="type-card-subtitle">{c.sub}</div>
            <div className="type-card-features">
              {c.features.map((f, j) => (
                <div key={j} className="type-card-feature">
                  <div className="type-card-feature-dot">✓</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, color: '#94a3b8', fontSize: 13 }}>Developed with ❤️ by Gaurav Vishwas</div>
    </div>
  )

  // ─── Builder Screen ──────────────────────────────────────────
  return (
    <div className="builder-root">
      {/* Header */}
      <header className="builder-header">
        <div className="header-logo">
          <div className="header-logo-icon">📄</div>
          <div>
            <div className="header-logo-text">ResumeAI</div>
            <span className="header-logo-sub">by Gaurav Vishwas</span>
          </div>
        </div>
        <div className="header-center">
          <div className="header-type-badge" style={{ background: resumeType === 'fresher' ? 'rgba(99,102,241,0.1)' : 'rgba(16,185,129,0.1)', color: resumeType === 'fresher' ? '#6366f1' : '#10b981' }}>
            {resumeType === 'fresher' ? '🎓' : '💼'} <span>{resumeType === 'fresher' ? 'Fresher' : 'Experienced'}</span>
          </div>
          <div className="header-ats-score">
            <div className="ats-dot" style={{ background: atsColor }} />
            <span style={{ color: atsColor, fontWeight: 700 }}>ATS {ats}%</span>
            <span style={{ color: '#94a3b8', fontWeight: 400 }}>{atsLabel}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="hdr-btn hdr-btn-ghost" onClick={() => setModal('templates')}>🎨 <span>Templates</span></button>
          <button className="hdr-btn hdr-btn-primary" onClick={() => setModal('ai')}>🤖 <span>AI Fill</span></button>
          <button className="hdr-btn hdr-btn-success" onClick={() => { setDlState('idle'); setModal('download') }}>⬇️ <span>Download PDF</span></button>
          <button className="hdr-btn hdr-btn-ghost" onClick={() => setScreen('type')} style={{ fontSize: 18, padding: '8px 10px' }}>←</button>
        </div>
      </header>

      {/* Builder Body */}
      <div className="builder-body">
        {/* Form Panel */}
        <div className="form-panel">
          <div className="form-tabs">
            {TABS.map((tab, i) => (
              <button key={i} className={`form-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
                <span className="form-tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="form-content">
            {/* Personal Info */}
            {activeTab === 0 && (
              <div className="animate-fadeIn">
                {/* Photo */}
                <div className="photo-upload-area" onClick={() => fileRef.current?.click()}>
                  <div className="photo-circle">
                    {resumeData.photo ? <img src={resumeData.photo} alt="photo" /> : '📷'}
                  </div>
                  <div className="photo-info">
                    <div className="photo-info-title">{resumeData.photo ? '✅ Photo Added' : 'Upload Profile Photo'}</div>
                    <div className="photo-info-desc">Optional · JPG, PNG · Max 5MB · Circular crop</div>
                    <div className="photo-btns">
                      <button className="photo-btn-upload" onClick={e => { e.stopPropagation(); fileRef.current?.click() }}>
                        {resumeData.photo ? '🔄 Change' : '📤 Upload'}
                      </button>
                      {resumeData.photo && <button className="photo-btn-remove" onClick={e => { e.stopPropagation(); upd('photo', '') }}>🗑 Remove</button>}
                    </div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Full Name *</label>
                    <input className="field-input" placeholder="e.g. Rahul Kumar" value={resumeData.name} onChange={e => upd('name', e.target.value)} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Job Title</label>
                    <input className="field-input" placeholder="e.g. Software Developer" value={resumeData.title} onChange={e => upd('title', e.target.value)} />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Email *</label>
                    <input className="field-input" type="email" placeholder="you@email.com" value={resumeData.email} onChange={e => upd('email', e.target.value)} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Phone *</label>
                    <input className="field-input" placeholder="+91 98765 43210" value={resumeData.phone} onChange={e => upd('phone', e.target.value)} />
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label">Location</label>
                  <input className="field-input" placeholder="City, State, Country" value={resumeData.location} onChange={e => upd('location', e.target.value)} />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">LinkedIn Username</label>
                    <input className="field-input" placeholder="yourname" value={resumeData.linkedin} onChange={e => upd('linkedin', e.target.value)} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">GitHub Username</label>
                    <input className="field-input" placeholder="yourname" value={resumeData.github} onChange={e => upd('github', e.target.value)} />
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label">Portfolio Website</label>
                  <input className="field-input" placeholder="yourportfolio.com" value={resumeData.website} onChange={e => upd('website', e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Professional Summary</label>
                  <textarea className="field-textarea" rows={4} placeholder="Write 3-4 lines about your professional background, key skills, and career goals..." value={resumeData.summary} onChange={e => upd('summary', e.target.value)} />
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === 1 && (
              <div className="animate-fadeIn">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">🎓 Education {i + 1}</div>
                      {resumeData.education.length > 1 && <button className="btn-remove-card" onClick={() => remEdu(i)}>✕</button>}
                    </div>
                    <div className="field-group">
                      <label className="field-label">Degree / Course</label>
                      <input className="field-input" placeholder="e.g. B.Tech in Computer Science" value={edu.degree} onChange={e => updEdu(i, 'degree', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">School / University</label>
                      <input className="field-input" placeholder="e.g. IIT Delhi" value={edu.school} onChange={e => updEdu(i, 'school', e.target.value)} />
                    </div>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Year</label>
                        <input className="field-input" placeholder="2020 – 2024" value={edu.year} onChange={e => updEdu(i, 'year', e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">GPA / Percentage</label>
                        <input className="field-input" placeholder="8.5 / 10 or 85%" value={edu.gpa} onChange={e => updEdu(i, 'gpa', e.target.value)} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Location</label>
                      <input className="field-input" placeholder="City, State" value={edu.location} onChange={e => updEdu(i, 'location', e.target.value)} />
                    </div>
                  </div>
                ))}
                <button className="btn-add-section" onClick={addEdu}>+ Add Education</button>
              </div>
            )}

            {/* Experience */}
            {activeTab === 2 && (
              <div className="animate-fadeIn">
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">💼 Experience {i + 1}</div>
                      {resumeData.experience.length > 1 && <button className="btn-remove-card" onClick={() => remExp(i)}>✕</button>}
                    </div>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Company *</label>
                        <input className="field-input" placeholder="e.g. Google" value={exp.company} onChange={e => updExp(i, 'company', e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Role / Position *</label>
                        <input className="field-input" placeholder="e.g. Software Engineer" value={exp.role} onChange={e => updExp(i, 'role', e.target.value)} />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Duration</label>
                        <input className="field-input" placeholder="Jan 2023 – Present" value={exp.duration} onChange={e => updExp(i, 'duration', e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Location</label>
                        <input className="field-input" placeholder="City, Country" value={exp.location} onChange={e => updExp(i, 'location', e.target.value)} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Description & Achievements</label>
                      <textarea className="field-textarea" rows={3} placeholder="Describe your responsibilities and achievements. Use action verbs like: Led, Built, Improved, Reduced, Increased..." value={exp.description} onChange={e => updExp(i, 'description', e.target.value)} />
                    </div>
                  </div>
                ))}
                <button className="btn-add-section" onClick={addExp}>+ Add Experience</button>
              </div>
            )}

            {/* Skills */}
            {activeTab === 3 && (
              <div className="animate-fadeIn">
                <div className="field-group">
                  <label className="field-label">Your Skills</label>
                  <div className="skills-tags">
                    {resumeData.skills.map((sk, i) => (
                      <div key={i} className="skill-tag">
                        {sk}
                        <button className="skill-tag-remove" onClick={() => remSkill(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="skill-input-row">
                    <input className="field-input" placeholder="Type a skill and press Enter or +" value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)} />
                    <button className="btn-add-skill" onClick={() => addSkill(skillInput)}>+ Add</button>
                  </div>
                </div>
                {Object.entries(QUICK_SKILLS).map(([cat, skills]) => (
                  <div key={cat} className="field-group">
                    <div className="quick-add-label">Quick Add — {cat}</div>
                    <div className="quick-add-chips">
                      {skills.map(sk => (
                        <button key={sk} className="quick-chip"
                          style={{ background: resumeData.skills.includes(sk) ? 'rgba(99,102,241,0.1)' : '', color: resumeData.skills.includes(sk) ? '#6366f1' : '' }}
                          onClick={() => resumeData.skills.includes(sk) ? remSkill(resumeData.skills.indexOf(sk)) : addSkill(sk)}>
                          {resumeData.skills.includes(sk) ? '✓ ' : '+ '}{sk}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="field-group" style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                  <label className="field-label">Languages</label>
                  <div className="skills-tags">
                    {resumeData.languages.map((l, i) => (
                      <div key={i} className="skill-tag" style={{ background: 'rgba(100,116,139,0.1)', borderColor: 'rgba(100,116,139,0.2)', color: '#334155' }}>
                        {l}<button className="skill-tag-remove" onClick={() => remLang(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="skill-input-row">
                    <input className="field-input" placeholder="e.g. English, Hindi, Tamil" value={langInput}
                      onChange={e => setLangInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addLang(langInput)} />
                    <button className="btn-add-skill" style={{ background: '#475569' }} onClick={() => addLang(langInput)}>+ Add</button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects */}
            {activeTab === 4 && (
              <div className="animate-fadeIn">
                {resumeData.projects.map((proj, i) => (
                  <div key={i} className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">🚀 Project {i + 1}</div>
                      {resumeData.projects.length > 1 && <button className="btn-remove-card" onClick={() => remProj(i)}>✕</button>}
                    </div>
                    <div className="field-group">
                      <label className="field-label">Project Name *</label>
                      <input className="field-input" placeholder="e.g. E-Commerce Platform" value={proj.name} onChange={e => updProj(i, 'name', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Technologies Used</label>
                      <input className="field-input" placeholder="e.g. React, Node.js, MongoDB" value={proj.tech} onChange={e => updProj(i, 'tech', e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Description</label>
                      <textarea className="field-textarea" rows={3} placeholder="Describe what the project does, your role, and the impact/results..." value={proj.description} onChange={e => updProj(i, 'description', e.target.value)} />
                    </div>
                  </div>
                ))}
                <button className="btn-add-section" onClick={addProj}>+ Add Project</button>
              </div>
            )}

            {/* Certificates */}
            {activeTab === 5 && (
              <div className="animate-fadeIn">
                <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(251,191,36,0.05))', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#92400e' }}>
                  🏆 <strong>Tip:</strong> Certificates increase your ATS score by 8+ points and stand out to recruiters!
                </div>
                <div className="field-group">
                  <div className="quick-add-label">Quick Add Popular Certs</div>
                  <div className="quick-add-chips">
                    {QUICK_CERTS.map(cert => (
                      <button key={cert} className="quick-chip" onClick={() => {
                        if (!resumeData.certificates.some(c => c.name === cert))
                          upd('certificates', [...resumeData.certificates, { name: cert, issuer: '', date: '', id: '' }])
                      }}>+ {cert}</button>
                    ))}
                  </div>
                </div>
                {resumeData.certificates.map((cert, i) => (
                  <div key={i} className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">🏆 Certificate {i + 1}</div>
                      {resumeData.certificates.length > 1 && <button className="btn-remove-card" onClick={() => remCert(i)}>✕</button>}
                    </div>
                    <div className="field-group">
                      <label className="field-label">Certificate Name *</label>
                      <input className="field-input" placeholder="e.g. AWS Solutions Architect" value={cert.name} onChange={e => updCert(i, 'name', e.target.value)} />
                    </div>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Issuing Organisation</label>
                        <input className="field-input" placeholder="e.g. Amazon Web Services" value={cert.issuer} onChange={e => updCert(i, 'issuer', e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Issue Date</label>
                        <input className="field-input" placeholder="e.g. Jan 2024" value={cert.date} onChange={e => updCert(i, 'date', e.target.value)} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Credential ID</label>
                      <input className="field-input" placeholder="e.g. AWS-SA-12345" value={cert.id} onChange={e => updCert(i, 'id', e.target.value)} />
                    </div>
                  </div>
                ))}
                <button className="btn-add-section" onClick={addCert}>+ Add Certificate</button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="preview-panel">
          <div className="preview-header">
            <div className="preview-title">
              <div className="preview-live-dot" />
              Live Preview
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="preview-scale-info">Scale {Math.round(previewScale * 100)}%</div>
              <div className="preview-scale-info" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }}>{TEMPLATES.find(t => t.id === templateId)?.name}</div>
            </div>
          </div>
          <div className="preview-scroll">
            <div className="preview-wrapper" style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }}>
              <ResumeTemplate data={resumeData} templateId={templateId} scale={1} fontSettings={fontSettings} />
            </div>
          </div>
          {/* Font Settings Button */}
          <button
            onClick={() => setShowFontPanel(p => !p)}
            title="Edit Font Size & Spacing — Works on ALL Templates"
            style={{
              position: 'absolute', bottom: 18, right: 18, zIndex: 20,
              width: 48, height: 48, borderRadius: '50%',
              background: showFontPanel ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'white',
              color: showFontPanel ? 'white' : '#6366f1',
              border: `2px solid ${showFontPanel ? '#6366f1' : '#c7d2fe'}`,
              cursor: 'pointer', fontSize: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: showFontPanel ? '0 8px 28px rgba(99,102,241,0.55)' : '0 4px 18px rgba(99,102,241,0.22)',
              transform: showFontPanel ? 'rotate(30deg) scale(1.08)' : 'rotate(0deg) scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)'
            }}
          >⚙️</button>

          {/* Font Settings Panel */}
          {showFontPanel && (
            <div style={{
              position: 'absolute', bottom: 76, right: 18, zIndex: 30,
              background: 'white', borderRadius: 20,
              boxShadow: '0 16px 56px rgba(0,0,0,0.18), 0 2px 12px rgba(99,102,241,0.12)',
              border: '1.5px solid #e0e7ff', padding: '18px 20px', width: 315,
              animation: 'fadeInUp 0.25s ease'
            }}>
              {/* Panel Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 18 }}>⚙️</span> Font & Spacing
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => setFontSettings(DEFAULT_FONT)} style={{ fontSize: 11, color: '#6366f1', background: 'rgba(99,102,241,0.08)', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>↺ Reset</button>
                  <button onClick={() => setShowFontPanel(false)} style={{ fontSize: 12, color: '#94a3b8', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontWeight: 700, width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
              </div>

              {/* Applies to all templates badge */}
              <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '7px 12px', marginBottom: 14, fontSize: 11.5, color: '#4f46e5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🎨</span> Works on ALL {TEMPLATES.length} templates in real-time!
              </div>

              {/* Sliders */}
              {([
                { key: 'nameSize',       label: 'Name Size',       icon: '👤', min: 18, max: 52, step: 1,   unit: 'px', color: '#6366f1' },
                { key: 'titleSize',      label: 'Job Title',       icon: '💼', min: 10, max: 24, step: 1,   unit: 'px', color: '#8b5cf6' },
                { key: 'sectionSize',    label: 'Section Heading', icon: '📌', min: 9,  max: 22, step: 1,   unit: 'px', color: '#06b6d4' },
                { key: 'bodySize',       label: 'Body Text',       icon: '📄', min: 8,  max: 18, step: 1,   unit: 'px', color: '#10b981' },
                { key: 'contactSize',    label: 'Contact Info',    icon: '📞', min: 7,  max: 16, step: 1,   unit: 'px', color: '#f59e0b' },
                { key: 'lineHeight',     label: 'Line Height',     icon: '↕️', min: 1.2, max: 2.4, step: 0.1, unit: 'x', color: '#ec4899' },
                { key: 'sectionSpacing', label: 'Section Gap',     icon: '📏', min: 6,  max: 40, step: 2,   unit: 'px', color: '#14b8a6' },
                { key: 'pagePadding',    label: 'Page Padding',    icon: '🔲', min: 14, max: 72, step: 2,   unit: 'px', color: '#f97316' },
              ] as { key: keyof FontSettings; label: string; icon: string; min: number; max: number; step: number; unit: string; color: string }[]).map(({ key, label, icon, min, max, step, unit, color }) => (
                <div key={key} style={{ marginBottom: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 11.5, color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span>{icon}</span>{label}
                    </label>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: 'white', background: color, padding: '2px 9px', borderRadius: 999, minWidth: 38, textAlign: 'center' }}>
                      {typeof fontSettings[key] === 'number' && Number.isInteger(fontSettings[key]) ? fontSettings[key] : (fontSettings[key] as number).toFixed(1)}{unit}
                    </span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={fontSettings[key]} style={{ accentColor: color, width: '100%' }} onChange={e => updFont(key, parseFloat(e.target.value))} />
                </div>
              ))}

              {/* Footer note */}
              <div style={{ paddingTop: 10, borderTop: '1px solid #f1f5f9', marginTop: 4 }}>
                <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', lineHeight: 1.6 }}>
                  ✨ Drag sliders → ALL templates update instantly<br/>📥 PDF uses your custom font settings
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="mobile-bar">
        <button className="mobile-bar-btn" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }} onClick={() => setModal('preview')}>
          <span>👁️</span><span>Preview</span>
        </button>
        <button className="mobile-bar-btn" style={{ background: 'rgba(139,92,246,0.08)', color: '#7c3aed' }} onClick={() => setModal('templates')}>
          <span>🎨</span><span>Templates</span>
        </button>
        <button className="mobile-bar-btn" style={{ background: 'rgba(245,158,11,0.08)', color: '#d97706' }} onClick={() => setModal('ai')}>
          <span>🤖</span><span>AI Fill</span>
        </button>
        <button className="mobile-bar-btn" style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981' }} onClick={() => { setDlState('idle'); setModal('download') }}>
          <span>⬇️</span><span>Download</span>
        </button>
      </div>

      {/* Mobile Preview Modal */}
      {modal === 'preview' && (
        <div className="mobile-preview-modal" style={{ display: 'flex' }}>
          <div className="mobile-preview-header">
            <div className="mobile-preview-title">📄 Resume Preview</div>
            <button className="mobile-preview-close" onClick={() => setModal(null)}>✕</button>
          </div>
          <div className="mobile-preview-body">
            <div style={{ width: '100%', overflow: 'auto' }}>
              <div style={{ transform: `scale(${Math.min((window.innerWidth - 32) / 794, 1)})`, transformOrigin: 'top left', width: 794, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <ResumeTemplate data={resumeData} templateId={templateId} scale={1} fontSettings={fontSettings} />
              </div>
            </div>
          </div>
          <div className="mobile-preview-footer">
            <button className="mobile-preview-dl-btn" onClick={() => { setModal('download'); setDlState('idle') }}>
              {dlState === 'loading' ? '⏳ Generating...' : '⬇️ Download PDF'}
            </button>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {modal === 'templates' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">🎨 Choose Template</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="template-grid">
                {TEMPLATES.map((tpl) => (
                  <div key={tpl.id} className={`template-card ${templateId === tpl.id ? 'selected' : ''}`}
                    onClick={() => { setTemplateId(tpl.id); setModal(null) }}>
                    <div className="template-preview-box" style={{ background: tpl.layout === 'dark' ? '#1e1b4b' : tpl.bg }}>
                      {/* Mini layout preview */}
                      {tpl.layout === 'sidebar-left' && (
                        <div style={{ display: 'flex', width: 90, height: 100, gap: 4 }}>
                          <div style={{ width: 28, background: tpl.color, borderRadius: 3, display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                            {[18, 14, 14, 14, 12].map((w, i) => <div key={i} style={{ height: 2, width: w, background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />)}
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 4 }}>
                            {[60, 40, 55, 45, 50, 40, 55].map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? tpl.accent : '#cbd5e1', borderRadius: 1 }} />)}
                          </div>
                        </div>
                      )}
                      {tpl.layout === 'sidebar-right' && (
                        <div style={{ display: 'flex', width: 90, height: 100, gap: 4 }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 4 }}>
                            <div style={{ height: 4, width: '70%', background: tpl.color, borderRadius: 1, marginBottom: 2 }} />
                            {[60, 40, 55, 45, 50, 40, 55, 45].map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? tpl.accent : '#cbd5e1', borderRadius: 1 }} />)}
                          </div>
                          <div style={{ width: 26, background: tpl.color, borderRadius: 3, display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}>
                            {[18, 14, 14, 14, 12, 10].map((w, i) => <div key={i} style={{ height: 2, width: w, background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />)}
                          </div>
                        </div>
                      )}
                      {tpl.layout === 'topbar' && (
                        <div style={{ width: 90, height: 100, display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ height: 24, background: tpl.color, borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <div style={{ height: 2, width: '60%', background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
                              <div style={{ height: 1.5, width: '40%', background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {[70, 50, 65, 45, 60, 40, 55, 45].map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? tpl.accent : '#cbd5e1', borderRadius: 1 }} />)}
                            </div>
                            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {[100, 70, 80, 60, 75, 55, 70].map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 2 === 0 ? tpl.accent : '#cbd5e1', borderRadius: 1 }} />)}
                            </div>
                          </div>
                        </div>
                      )}
                      {(tpl.layout === 'classic' || tpl.layout === 'minimal') && (
                        <div style={{ width: 90, height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                          <div style={{ height: 3, width: '70%', background: tpl.color, borderRadius: 1 }} />
                          <div style={{ height: 1.5, width: '50%', background: tpl.accent, borderRadius: 1 }} />
                          <div style={{ height: 1, width: '80%', background: tpl.accent, marginBottom: 2 }} />
                          {[70, 50, 65, 45, 60, 40, 55, 45, 60].map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 4 === 0 ? tpl.accent : '#cbd5e1', borderRadius: 1 }} />)}
                        </div>
                      )}
                      {tpl.layout === 'split' && (
                        <div style={{ width: 90, height: 100, display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ height: 28, display: 'flex', gap: 0 }}>
                            <div style={{ flex: 1, background: tpl.color, borderRadius: '3px 0 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5px', gap: 2 }}>
                              <div style={{ height: 3, width: '80%', background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
                              <div style={{ height: 2, width: '60%', background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
                            </div>
                            <div style={{ width: 28, background: tpl.accent, borderRadius: '0 3px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4px', gap: 2 }}>
                              {[3, 2, 2].map((h, i) => <div key={i} style={{ height: h, background: 'rgba(255,255,255,0.6)', borderRadius: 1 }} />)}
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                            {[[65, 45, 60, 40, 55], [100, 75, 85, 70, 80]].map((ws, col) => (
                              <div key={col} style={{ flex: col === 0 ? 1 : 0, width: col === 1 ? 24 : undefined, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {ws.map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? tpl.accent : '#cbd5e1', borderRadius: 1 }} />)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {tpl.layout === 'dark' && (
                        <div style={{ width: 90, height: 100, background: '#1e1b4b', borderRadius: 3, display: 'flex', flexDirection: 'column', padding: 6, gap: 3, alignItems: 'center' }}>
                          <div style={{ height: 3, width: '60%', background: '#c7d2fe', borderRadius: 1 }} />
                          <div style={{ height: 1.5, width: '40%', background: tpl.accent, borderRadius: 1 }} />
                          <div style={{ height: 1, width: '80%', background: `${tpl.accent}44`, marginBottom: 2 }} />
                          {[65, 45, 60, 40, 55, 45, 60, 40].map((w, i) => <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? tpl.accent : 'rgba(255,255,255,0.2)', borderRadius: 1 }} />)}
                        </div>
                      )}
                      {templateId === tpl.id && <div className="template-selected-badge">✓ Active</div>}
                    </div>
                    <div className="template-info">
                      <div className="template-name">{tpl.name}</div>
                      <div className="template-desc">{tpl.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Modal */}
      {modal === 'ai' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <div className="modal-header">
              <div className="modal-title">🤖 AI Resume Generator</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
                Choose a career profile and AI will instantly fill your entire resume with realistic, ATS-optimized content. You can then edit the details.
              </p>
              <div className="ai-profile-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                {[
                  { icon: '📊', title: 'MBA Graduate', desc: 'Business Analyst with internships at top consulting firms. Finance, strategy, and analytics focus.', color: '#6366f1', bg: 'rgba(99,102,241,0.06)' },
                  { icon: '💻', title: 'MCA / Developer', desc: 'Full Stack Developer with React & Node.js. Built 5+ production apps. Ready for tech roles.', color: '#10b981', bg: 'rgba(16,185,129,0.06)' },
                  { icon: '🧠', title: 'Data Scientist', desc: '5+ years in ML/AI at top companies. TensorFlow, Python, AWS. Senior-level experience.', color: '#7c3aed', bg: 'rgba(124,58,237,0.06)' },
                ].map((p, i) => (
                  <div key={i} className="ai-profile-card" style={{ background: p.bg, borderColor: `${p.color}33` }}
                    onClick={() => aiFill(i)}>
                    <span className="ai-profile-icon" style={{ animationDelay: `${i * 0.3}s` }}>{p.icon}</span>
                    <div className="ai-profile-title" style={{ color: p.color }}>{p.title}</div>
                    <div className="ai-profile-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#713f12', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span>⚠️</span>
                <span>This will replace your current resume data. Make sure to save important info before proceeding.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {modal === 'download' && (
        <div className="modal-overlay" onClick={() => dlState !== 'loading' && setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
            {dlState === 'idle' && <>
              <div className="modal-header">
                <div className="modal-title">⬇️ Download Resume</div>
                <button className="modal-close" onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="modal-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>📄</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Ready to Download!</div>
                <div style={{ color: '#64748b', fontSize: 14, marginBottom: 8 }}>
                  Template: <strong style={{ color: '#6366f1' }}>{TEMPLATES.find(t => t.id === templateId)?.name}</strong>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ats >= 75 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: ats >= 75 ? '#10b981' : '#d97706', padding: '8px 20px', borderRadius: 100, fontSize: 14, fontWeight: 700, marginBottom: 24 }}>
                  ATS Score: {ats}% — {atsLabel}
                </div>
                <button style={{ width: '100%', padding: 16, background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 8px 24px rgba(16,185,129,0.35)', transition: 'all 0.2s' }} onClick={downloadPDF}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                  ⬇️ Download PDF — {resumeData.name || 'My Resume'}.pdf
                </button>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 12 }}>
                  Direct download — no print dialog, no popups
                </div>
              </div>
            </>}
            {dlState === 'loading' && (
              <div className="download-state">
                <div className="download-spinner" />
                <div className="download-title">Generating PDF...</div>
                <div className="download-subtitle">{dlMsg}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Please wait, this may take a few seconds</div>
              </div>
            )}
            {dlState === 'done' && (
              <div className="download-state">
                <div style={{ fontSize: 64 }}>✅</div>
                <div className="download-title" style={{ color: '#10b981' }}>Downloaded!</div>
                <div className="download-subtitle">Check your Downloads folder</div>
              </div>
            )}
            {dlState === 'error' && (
              <div className="download-state">
                <div style={{ fontSize: 64 }}>❌</div>
                <div className="download-title" style={{ color: '#ef4444' }}>Download Failed</div>
                <div className="download-subtitle">{dlMsg}</div>
                <button style={{ padding: '12px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }} onClick={() => setDlState('idle')}>Try Again</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden PDF container */}
      <div ref={pdfRef} style={{ position: 'fixed', left: -9999, top: 0, width: 794, background: 'white', zIndex: -1 }} />
    </div>
  )
}
