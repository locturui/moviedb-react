# Movie Finder App

A web application that helps users find and explore movies with ease. Built with React, TypeScript, Vite, and Appwrite for backend services.

[Demo](https://moviedb-react-eight.vercel.app)

<img width="1440" alt="Screenshot 2025-06-18 at 2 36 36 AM" src="https://github.com/user-attachments/assets/c710eecc-4581-42ac-8190-f89d5fda46f0" />

<img width="1439" alt="Screenshot 2025-06-18 at 2 36 52 AM" src="https://github.com/user-attachments/assets/9f9abd8f-0434-4672-959e-241fa2b65d74" />


## Features

- Trending movies section
- Search functionality
- Movie details (rating, language, release year)
- Responsive design

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Backend**: Appwrite

## Getting Started

### Prerequisites

- Node.js (>=18)
- [pnpm](https://pnpm.io/installation)
- Appwrite instance
- TMDB API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/locturui/moviedb-react.git
cd moviedb-react
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

Create a `.env.local` file and set your TMDB and Appwrite credentials:

```env
VITE_TMDB_API_KEY=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_ENDPOINT=
```

4. Run the app in development mode:

```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## License

MIT
