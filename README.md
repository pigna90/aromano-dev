# Alessandro Romano's Personal Webpage

A modern, responsive portfolio website built with React, showcasing professional experience, conference talks, and personal projects. The site features smooth animations, interactive components, and a clean, professional design.

## 🚀 Features

- **Modern React Architecture**: Built with React and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Conference Showcase**: Dynamic conference presentation section with image gallery
- **Professional Experience**: Timeline-based experience section
- **Social Media Integration**: Integrated social media links and professional profiles

## 🛠 Tech Stack

- React 18
- Vite 5
- Styled Components
- Framer Motion
- Font Awesome
- React Scroll

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/personal-portfolio.git
cd personal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

This project is configured for deployment on GitHub Pages.

### Deployment Steps

1. Connect your local repository to GitHub:
```bash
git remote add origin https://github.com/alessandroromano/personal-portfolio.git
git branch -M main
git push -u origin main
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

Your portfolio will be available at: `https://alessandroromano.github.io/personal-portfolio`

### Updating the Site

1. Make your changes
2. Commit and push:
```bash
git add .
git commit -m "Your update message"
git push origin main
```
3. Deploy:
```bash
npm run deploy
```

## 📁 Project Structure

```
personal-portfolio/
├── public/
│   └── images/
│       ├── conferences/    # Conference images
│       └── profile/       # Profile and personal images
├── src/
│   ├── components/        # React components
│   ├── data/             # Data files
│   └── styles/           # Styled components and global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite with the following configuration (`vite.config.js`):
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/personal-portfolio/',
})
```

### Package Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run deploy`: Deploy to GitHub Pages

## 📝 Adding Content

### Adding a New Conference
Add new conferences in `src/data/conferences.js`:
```javascript
{
  title: "Conference Name",
  topic: "Talk Topic",
  date: "Month DD, YYYY",
  description: "Description of your talk",
  image: "/images/conferences/conference-image.jpg"
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
