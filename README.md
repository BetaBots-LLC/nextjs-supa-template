# Next.js + Supabase Template

A modern, batteries-included starter template for building full-stack applications with Next.js and Supabase.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **React**: React 19 with [React Compiler](https://react.dev/learn/react-compiler)
- **Database & Auth**: [Supabase](https://supabase.com) with SSR support
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) (base-vega style)
- **Forms**: [TanStack React Form](https://tanstack.com/form) + [Zod](https://zod.dev) validation
- **Icons**: [Lucide React](https://lucide.dev)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (dark mode ready)
- **Linting/Formatting**: [Biome](https://biomejs.dev)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Package Manager**: pnpm

## Getting Started

### 1. Clone and install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_PUBLISHABLE_KEY=your-supabase-anon-key
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your app.

## Project Structure

```
src/
├── app/                 # App Router pages and layouts
├── components/
│   ├── ui/              # shadcn/ui components
│   └── theme-provider.tsx
└── lib/
    ├── utils.ts         # Utility functions (cn, etc.)
    └── supabase/        # Supabase client helpers
        ├── client.ts    # Browser client
        ├── server.ts    # Server component client
        ├── middleware.ts # Session refresh logic
        ├── public.ts    # Public/anon client
        └── types.ts     # Database types
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |

## Adding UI Components

This template uses shadcn/ui. Add new components with:

```bash
pnpm dlx shadcn@latest add [component-name]
```

## Deploy

Deploy easily to [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/nextjs-supa-template)
