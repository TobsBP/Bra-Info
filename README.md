# 🇧🇷 BrasilAPI Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)

**BrasilAPI Dashboard** is a high-performance, real-time interactive dashboard that consumes various Brazilian public APIs. Built with the latest technologies (Next.js 15, React 19, Tailwind 4), it provides a centralized and beautiful interface for data like CEP, CNPJ, FIPE, PIX, and more.

---

## ✨ Key Features

| Module | Description |
| :--- | :--- |
| **📊 Overview** | Real-time KPI dashboard: Total banks, SELIC/CDI rates, PIX participants, and upcoming holidays. |
| **🏦 Banks** | Searchable list of all Brazilian financial institutions (ISPB, Name, Code). |
| **📍 CEP** | Address lookup with **interactive Leaflet maps** and location markers. |
| **🏢 CNPJ** | Detailed corporate registration data directly from the Federal Revenue (Receita Federal). |
| **📈 Câmbio** | Real-time currency exchange rates with interactive data visualization. |
| **📅 Feriados** | National holiday calendar filtered by year. |
| **🚗 FIPE** | Advanced vehicle search (Cars, Motorcycles, Trucks) with a **guided wizard** and high-quality image search. |
| **⚡ PIX** | Complete list of institutions enabled in the Central Bank's PIX system. |

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 15 (App Router, Server Components)
- **Library:** React 19
- **Styling:** Tailwind CSS 4 (Zero-runtime, modern CSS)
- **Language:** TypeScript

### Ecosystem
- **State Management:** TanStack React Query v5 (Server-state synchronization)
- **Git Hooks:** Husky + lint-staged (Pre-commit linting & formatting)
- **CI/CD:** GitHub Actions (Automated Build, Lint, Audit)
- **UI Components:** Radix UI (Unstyled primitives for accessibility)
- **Forms:** React Hook Form + Zod (Type-safe validation)
- **Maps:** Leaflet + React Leaflet
- **Data Viz:** Recharts
- **Utilities:** date-fns, axios, tailwind-merge
- **Icons:** Lucide React
- **Linting:** Biome (Fast replacement for ESLint/Prettier)

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js Routes & Server-side API Proxy
├── components/
│   ├── layout/           # Global Shell (Sidebar, Header, Providers)
│   ├── ui/               # Reusable Atomic UI Components (Shadcn-like)
│   ├── shared/           # Business-logic shared components (StatCard, etc.)
│   └── [module]/         # Feature-specific components
├── lib/
│   ├── api/              # Strongly typed Fetch wrappers
│   ├── hooks/            # Custom React Query hooks
│   └── schemas/          # Zod validation schemas
└── config/               # Navigation & Global Metadata
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bra-info.git
   cd bra-info
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file with the following:
   ```env
   # API Endpoints
   BRASILAPI_URL=https://brasilapi.com.br/api
   AWESOMEAPI_URL=https://economia.awesomeapi.com.br
   PARALLELUM_URL=https://parallelum.com.br/fipe/api/v1

   # App Config
   NEXT_PUBLIC_APP_NAME="BrasilAPI Dashboard"

   # Vehicle Images (FIPE Module)
   AUTO_DEV_API_KEY=        # Get yours at https://auto.dev
   UNSPLASH_ACCESS_KEY=     # Get yours at https://unsplash.com
   ```

### Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the magic happen.

---

## 🛠️ Scripts

```bash
npm run dev      # Local development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Check for linting/formatting errors (Biome)
npm run check    # Automatically fix linting/formatting (Pre-commit)
```

---

## 🛡️ CI/CD Pipeline

This project uses **GitHub Actions** to maintain code quality:
- **Linting:** Runs `npm run lint` on every PR to ensure code standards.
- **Security Audit:** Runs `npm audit` to catch high-severity vulnerabilities.
- **Build Check:** Ensures the application builds successfully without errors.

---

## 🌐 Data Sources

Our data is fetched from reliable and public sources:
- [BrasilAPI](https://brasilapi.com.br) - Primary source for Banks, CEP, CNPJ, and Taxes.
- [AwesomeAPI](https://economia.awesomeapi.com.br) - Real-time Exchange rates.
- [Parallelum FIPE](https://parallelum.com.br) - Vehicle market values.
- [Auto.dev](https://auto.dev) & [Unsplash](https://unsplash.com) - Dynamic vehicle imagery.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is for educational purposes. All data is provided by public APIs. Please respect the rate limits and terms of service of each provider.

Developed with ❤️ by [Tobias](https://github.com/your-username)
