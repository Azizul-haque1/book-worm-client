# 📚 BookWorm

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.5-5A0EF8?style=for-the-badge&logo=daisyui)

**A modern book discovery and reading tracker platform**

[Live Demo](#) • [Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

BookWorm is a beautifully designed web application that helps book lovers discover new books, track their reading progress, and manage their personal library. Built with Next.js 16 and React 19, it offers a seamless and modern user experience with stunning animations and a responsive design.

---

## ✨ Features

### 📱 Public Features
- **📚 Book Discovery** - Browse and explore a curated collection of books
- **🔍 Search & Filter** - Find books by title, author, or genre
- **📖 Book Details** - View comprehensive information about each book
- **📚 My Library** - Personal bookshelf to track reading progress
- **🎯 Reading Tracker** - Mark books as "Want to Read", "Reading", or "Completed"
- **📺 Tutorials** - Access reading guides and tutorials

### 👤 User Authentication
- **🔐 Secure Login** - User authentication system
- **📝 Registration** - Easy sign-up with photo upload
- **👤 User Profiles** - Personalized user experience

### 🛠️ Admin Dashboard
- **📊 Dashboard Overview** - Analytics and statistics at a glance
- **📚 Book Management** - Full CRUD operations for books
- **🏷️ Genre Management** - Organize books by genres
- **👥 User Management** - Manage registered users
- **⭐ Review Management** - Monitor and manage book reviews

### 🎨 UI/UX Highlights
- **✨ Modern Design** - Glassmorphism effects and premium aesthetics
- **🌙 Dark Mode** - Theme switching with next-themes
- **🎬 Smooth Animations** - Powered by Framer Motion & GSAP
- **📱 Fully Responsive** - Optimized for all screen sizes
- **🎯 Page Transitions** - Seamless navigation experience

---

## 🛠️ Tech Stack

### Core
| Technology | Version | Description |
|------------|---------|-------------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TailwindCSS** | 4.0 | Utility-first CSS framework |
| **DaisyUI** | 5.5.14 | Tailwind CSS component library |

### Animations & UI
| Package | Description |
|---------|-------------|
| **Framer Motion** | Production-ready motion library |
| **GSAP** | Professional-grade animation library |
| **Lucide React** | Beautiful & consistent icons |

### Utilities
| Package | Description |
|---------|-------------|
| **React Hook Form** | Performant form validation |
| **React Hot Toast** | Beautiful toast notifications |
| **next-themes** | Theme switching for Next.js |
| **clsx** | Conditional className utility |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm** or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-worm.git
   cd book-worm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables in the `.env` file.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
book-worm/
├── public/              # Static assets
├── src/
│   ├── app/
│   │   ├── (public)/    # Public routes
│   │   │   ├── books/   # Book listing & details
│   │   │   ├── login/   # Login page
│   │   │   ├── register/# Registration page
│   │   │   ├── my-library/ # User's book library
│   │   │   └── tutorials/  # Tutorial pages
│   │   ├── admin/       # Admin dashboard
│   │   │   ├── dashboard/  # Admin overview
│   │   │   ├── books/      # Book management
│   │   │   ├── genres/     # Genre management
│   │   │   ├── users/      # User management
│   │   │   └── reviews/    # Review management
│   │   ├── actions/     # Server actions
│   │   └── lib/         # Utility functions
│   ├── components/
│   │   ├── home/        # Homepage sections
│   │   ├── auth/        # Authentication components
│   │   ├── shared/      # Reusable components
│   │   ├── Navbar.jsx   # Navigation component
│   │   └── Footer.jsx   # Footer component
│   ├── context/         # React context providers
│   └── hooks/           # Custom React hooks
├── package.json
└── README.md
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy BookWorm is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

1. Push your code to a Git repository
2. Import the project on Vercel
3. Configure environment variables
4. Deploy!

For detailed deployment instructions, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Tailwind CSS component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/book-worm/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Azizul Haque**

- GitHub: [@Azizul-haque1](https://github.com/Azizul-haque1)

---

<div align="center">

Made with ❤️ and ☕

⭐ Star this repo if you find it helpful!

</div>
