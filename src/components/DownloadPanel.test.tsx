import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DownloadPanel } from './DownloadPanel';
import { downloadAsPDF } from '../utils/downloadUtils';

// Mock the downloadUtils
vi.mock('../utils/downloadUtils', () => ({
  downloadAsPDF: vi.fn(),
  downloadAsDOCX: vi.fn(),
  downloadAsText: vi.fn(),
}));

const mockResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

describe('DownloadPanel error handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays error message when download fails', async () => {
    const mockDownloadAsPDF = vi.mocked(downloadAsPDF);
    mockDownloadAsPDF.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <DownloadPanel
        isOpen={true}
        onClose={vi.fn()}
        resumeData={mockResumeData as any}
        template="modern"
      />
    );

    // Find and click the PDF download button
    const pdfButtonText = screen.getByText('PDF Document');
    const button = pdfButtonText.closest('button');
    if (!button) throw new Error('Button not found');

    fireEvent.click(button);

    // Assert that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to download PDF. Please try again.')).not.toBeNull();
    });
  });
});
