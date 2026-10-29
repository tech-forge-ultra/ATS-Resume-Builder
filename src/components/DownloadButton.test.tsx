import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DownloadButton } from './DownloadButton';
import { vi, describe, it, expect, beforeEach, afterAll } from 'vitest';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

vi.mock('html2canvas');
vi.mock('jspdf');
vi.mock('docx', () => ({
  Document: vi.fn(),
  Packer: { toBlob: vi.fn() },
  Paragraph: vi.fn(),
  TextRun: vi.fn(),
  HeadingLevel: { TITLE: 'Title', HEADING_1: 'Heading1' },
}));
vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const mockResumeData: ResumeData = {
  personalInfo: { fullName: 'John Doe', email: 'test@test.com', phone: '', location: '', summary: '', linkedIn: '', website: '' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  hobbies: [],
};

describe('DownloadButton', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation((msg, err) => {
    // console.log("Caught in mock:", msg, err);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders correctly and opens dropdown on click', () => {
    const mockRef = { current: document.createElement('div') };
    render(<DownloadButton resumeRef={mockRef} resumeData={mockResumeData} />);

    expect(screen.getByText('Download Resume')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Download Resume'));

    expect(screen.getByText('PDF Format')).toBeInTheDocument();
    expect(screen.getByText('DOCX Format')).toBeInTheDocument();
  });

  it('handles html2canvas error gracefully when downloading PDF', async () => {
    vi.mocked(html2canvas).mockRejectedValueOnce(new Error('html2canvas failed'));

    const mockRef = { current: document.createElement('div') };
    render(<DownloadButton resumeRef={mockRef} resumeData={mockResumeData} />);

    fireEvent.click(screen.getByText('Download Resume'));
    fireEvent.click(screen.getByText('PDF Format'));

    expect(screen.getByText('Generating...')).toBeInTheDocument();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating PDF:', expect.any(Error));
    });

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });

  it('handles jspdf error gracefully when downloading PDF', async () => {
    vi.mocked(html2canvas).mockResolvedValueOnce({
      toDataURL: () => 'data:image/png;base64,mock',
      width: 100,
      height: 100,
    } as any);

    vi.mocked(jsPDF).mockImplementationOnce(function() {
      throw new Error('jsPDF failed');
    } as any);

    const mockRef = { current: document.createElement('div') };
    render(<DownloadButton resumeRef={mockRef} resumeData={mockResumeData} />);

    fireEvent.click(screen.getByText('Download Resume'));
    fireEvent.click(screen.getByText('PDF Format'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating PDF:', expect.any(Error));
    });

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });

  it('handles docx packer error gracefully when downloading DOCX', async () => {
    vi.mocked(Packer.toBlob).mockRejectedValueOnce(new Error('docx packer failed'));

    const mockRef = { current: document.createElement('div') };
    render(<DownloadButton resumeRef={mockRef} resumeData={mockResumeData} />);

    fireEvent.click(screen.getByText('Download Resume'));
    fireEvent.click(screen.getByText('DOCX Format'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating DOCX:', expect.any(Error));
    });

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });

  it('successfully generates a PDF', async () => {
    const mockSave = vi.fn();
    const mockAddImage = vi.fn();

    vi.mocked(html2canvas).mockResolvedValueOnce({
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,mock'),
      width: 100,
      height: 100,
    } as any);

    vi.mocked(jsPDF).mockImplementation(function() {
      return {
        addImage: mockAddImage,
        save: mockSave,
      };
    } as any);

    const mockRef = { current: document.createElement('div') };
    render(<DownloadButton resumeRef={mockRef} resumeData={mockResumeData} />);

    fireEvent.click(screen.getByText('Download Resume'));
    fireEvent.click(screen.getByText('PDF Format'));

    await waitFor(() => {
      expect(mockAddImage).toHaveBeenCalled();
      expect(mockSave).toHaveBeenCalledWith('John Doe_resume.pdf');
    });

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });

  it('successfully generates a DOCX', async () => {
    vi.mocked(Packer.toBlob).mockResolvedValueOnce(new Blob());

    const mockRef = { current: document.createElement('div') };
    render(<DownloadButton resumeRef={mockRef} resumeData={mockResumeData} />);

    fireEvent.click(screen.getByText('Download Resume'));
    fireEvent.click(screen.getByText('DOCX Format'));

    await waitFor(() => {
      expect(saveAs).toHaveBeenCalled();
    });

    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });
});
