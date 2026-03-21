# 🎯 ATS Resume Builder

A professional, AI-powered resume builder that creates ATS-optimized resumes with live preview and direct PDF download.

**Developed by Gaurav Vishwas** ❤️

---

## ✨ Features

### 🤖 AI-Powered Resume Generation
- **3 Pre-built Templates**: MBA Fresher, Data Science Professional, MCA/Software Developer
- **Instant Fill**: Generate complete resume with one click
- **Smart Content**: AI-generated professional summaries, experience descriptions, and skills

### 📄 10 ATS-Friendly Templates
1. **Modern Blue** - Clean and contemporary design
2. **Classic Gray** - Traditional professional layout
3. **Minimal White** - Simple and elegant
4. **Professional Cyan** - Business-focused design
5. **Creative Purple** - Modern and vibrant
6. **Executive Navy** - Leadership-oriented
7. **Tech Green** - Technology-focused
8. **Elegant Gold** - Sophisticated double-border design
9. **Bold Red** - Stand-out design for sales/marketing
10. **Clean Indigo** - Versatile layout for any role

### 📸 Photo Upload
- Optional profile photo
- Appears in both live preview and PDF
- Supports JPG, PNG, WebP formats

### 🎨 Live Preview
- **Real-time updates** as you type
- **Side-by-side view** on desktop
- **Full-screen modal** on mobile
- See exactly how your final resume will look

### 📥 Direct PDF Download
- **No print dialog** - downloads instantly
- **Full A4 page** - proper sizing on all devices
- **Single-page PDF** - optimized content fitting
- **High quality** - crisp text and images
- Works identically on mobile, tablet, and desktop

### 📊 ATS Score
- **Real-time calculation** based on resume completeness
- **Color-coded feedback**: Green (80%+), Yellow (50-79%), Red (<50%)
- **Visible in header** for easy tracking

### 📱 Fully Responsive
- **Mobile-first design** with bottom navigation
- **Tablet-optimized** layouts
- **Desktop power-user** interface
- **Touch-friendly** buttons and inputs (52px minimum)

### 📝 Complete Resume Sections
- **Personal Information**: Name, title, contact details, professional summary
- **Education**: Degree, institution, graduation date, GPA
- **Work Experience**: Job title, company, dates, responsibilities
- **Skills**: Technical skills with quick-add buttons
- **Projects**: Title, technologies, description, links
- **Certifications**: Name, issuer, date, credential ID
- **Languages**: Multilingual support

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) version 16+ installed
- npm (comes with Node.js)

### Installation & Running Locally

```bash
# 1. Clone or download the project
git clone <repository-url>
cd ats-resume-builder

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:5173
```

### Build for Production

```bash
# Build optimized production files
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Get your free URL: `https://your-project.vercel.app`

**Deployment time: 2 minutes** ⚡

---

### Option 2: Deploy to GitHub Pages

1. **Create GitHub Repository**:
   - Go to [github.com/new](https://github.com/new)
   - Create a new repository (e.g., "resume-builder")

2. **Push Code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
   git branch -M main
   git push -u origin main
   ```

3. **Create GitHub Actions Workflow**:
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       permissions:
         contents: write
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
       
       - name: Install dependencies
         run: npm install
       
       - name: Build
         run: npm run build
       
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)` → Save
   - Wait 2-3 minutes

5. **Access Your Site**:
   ```
   https://YOUR_USERNAME.github.io/resume-builder/
   ```

---

### Option 3: Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"
   - Get your free URL: `https://your-site.netlify.app`

---

### Option 4: Self-Hosted (VPS/Dedicated Server)

```bash
# 1. Build the project
npm run build

# 2. Upload the `dist` folder to your server
# Use FTP, SCP, or rsync

# 3. Serve with Nginx
# Example Nginx config:
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/resume-builder/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. Reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📱 How to Use

### Step 1: Choose Resume Type
- Click "Get Started"
- Select **Fresher** or **Experienced**

### Step 2: Fill Information
- Navigate through 6 sections using tabs:
  - 👤 Personal
  - 🎓 Education
  - 💼 Experience
  - ⚡ Skills
  - 🚀 Projects
  - 🏆 Certificates

### Step 3: Use AI Assistant (Optional)
- Click "AI Fill" button
- Choose a profile:
  - MBA Fresher
  - Data Science Professional
  - MCA/Software Developer
- AI fills all sections instantly

### Step 4: Customize Template
- Click "Templates" button
- Choose from 10 designs
- See live preview update

### Step 5: Add Photo (Optional)
- Go to Personal section
- Click camera icon
- Upload JPG/PNG image

### Step 6: Download PDF
- Click "Download PDF"
- PDF downloads instantly (no dialogs)
- Single-page A4 format

---

## 🎯 ATS Optimization Tips

### What is ATS?
**Applicant Tracking System (ATS)** is software used by employers to scan and rank resumes. Our builder ensures your resume passes ATS checks.

### ATS Best Practices (Built-in):
✅ **Simple formatting** - No tables, text boxes, or graphics that confuse ATS  
✅ **Standard fonts** - Arial, sans-serif fonts  
✅ **Clear section headings** - WORK EXPERIENCE, EDUCATION, SKILLS  
✅ **Keyword optimization** - Includes relevant industry keywords  
✅ **Consistent formatting** - Uniform date formats, bullet points  
✅ **No headers/footers** - Critical info in main body  
✅ **Single column layout** - Easy for ATS to parse  
✅ **Standard file format** - PDF (A4 size)  

### Improve Your ATS Score:
- **Add contact info**: Email, phone, location (15 points)
- **Write summary**: 50+ characters (15 points)
- **Add education**: At least one degree (15 points)
- **Add experience**: Job history (20 points)
- **List skills**: Minimum 5 skills (15 points)
- **Include projects**: Showcase work (10 points)
- **Add certifications**: Professional credentials (10 points)

**Target Score: 80%+** 🎯

---

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **html2canvas** - Screenshot generation
- **jsPDF** - PDF creation

---

## 📦 Project Structure

```
ats-resume-builder/
├── src/
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md            # This file
```

---

## 🐛 Troubleshooting

### PDF Downloads Blank
- **Cause**: Browser blocking canvas
- **Fix**: Allow downloads from the site

### PDF Shows 2 Pages on Mobile
- **Fixed**: Latest version ensures single-page on all devices

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 5173 Already in Use
```bash
# Run on different port
npm run dev -- --port 3000
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

## 👨‍💻 Developer

**Developed with ❤️ by Gaurav Vishwas**

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: [Your Contact Info]

---

## 🎉 Acknowledgments

Special thanks to:
- React team for the amazing library
- Tailwind CSS for beautiful styling
- Vite for blazing-fast builds
- All open-source contributors

---

**⭐ If this project helped you, please give it a star on GitHub!**

Happy Resume Building! 🚀
