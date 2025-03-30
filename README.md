# Personal Portfolio

A modern, responsive portfolio website built with React, showcasing professional experience, conference talks, and personal projects. The site features smooth animations, interactive components, and a clean, professional design.

## 🚀 Features

- **Modern React Architecture**: Built with React and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Conference Showcase**: Dynamic conference presentation section with image gallery
- **Professional Experience**: Timeline-based experience section
- **Social Media Integration**: Integrated social media links and professional profiles

## 🛠 Tech Stack

- React 19
- Vite 6
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

### Prerequisites

1. Create a GitHub repository named `personal-portfolio`
2. Configure Git (if not already done):
```bash
git config --global user.email "your.email@example.com"
git config --global user.name "Your Name"
```

### Deployment Steps

1. Update the `homepage` in `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/personal-portfolio"
}
```

2. Connect your local repository to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/personal-portfolio.git
git branch -M main
git push -u origin main
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

4. Configure GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages"
   - Set source to "gh-pages" branch
   - Save changes

Your portfolio will be available at: `https://YOUR_USERNAME.github.io/personal-portfolio`

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR_USERNAME/personal-portfolio/issues).

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your.email@example.com

Project Link: [https://github.com/YOUR_USERNAME/personal-portfolio](https://github.com/YOUR_USERNAME/personal-portfolio)
