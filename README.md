[![Solditor - AI-Powered Development Environment](./public/social_preview_index.jpg)](https://solditor.dev)

# Solditor

**Solditor** is an AI-powered development environment that runs entirely in your browser. Fork, edit, run, and deploy full-stack applications directly from the browser—no local setup required.

![Solditor Interface](./public/project-visibility.jpg)

## What Makes Solditor Special

- **AI-First Development**: Chat with OpenAI or Claude to build applications using natural language
- **Instant Environment**: No downloads, installations, or setup required
- **Full-Stack Support**: Build and deploy complete applications with frontend, backend, and databases
- **Real-Time Preview**: See your changes instantly with hot reload
- **Integrated Terminal**: Full terminal access for package management and commands
- **File Management**: Complete file explorer with syntax highlighting and IntelliSense

## Powered By

- **OpenAI GPT-4o**: Advanced AI assistance for code generation and problem-solving (default)
- **Claude AI**: Alternative AI model for code generation and problem-solving
- **WebContainer**: Browser-based Node.js runtime by StackBlitz
- **Remix**: Full-stack web framework
- **Cloudflare**: Edge deployment and hosting

## Getting Started

### Prerequisites

- Node.js (v20.15.1 or higher)
- pnpm (v9.4.0 or higher)
- OpenAI API key (required)
- Claude API key from Anthropic (optional)
- WebContainer API access from StackBlitz

### Quick Setup

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/yourusername/solditor.git
   cd solditor
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your API keys to `.env.local`:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_claude_api_key_here
   SELECTED_PROVIDER=openai
   WEBCONTAINER_API_KEY=your_webcontainer_api_key_here
   VITE_LOG_LEVEL=debug
   \`\`\`

4. **Start the development server:**
   \`\`\`bash
   pnpm run dev
   \`\`\`

5. **Open your browser:**
   Navigate to `http://localhost:5173` and start building!

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Run production build locally
- `pnpm run preview` - Preview production build
- `pnpm run deploy` - Deploy to Cloudflare Pages
- `pnpm run test` - Run test suite
- `pnpm run typecheck` - Run TypeScript checks

## Configuration

### OpenAI Setup (Default)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env.local` file as `OPENAI_API_KEY`

### Claude AI Setup (Optional)

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Add it to your `.env.local` file as `ANTHROPIC_API_KEY`
3. Set `SELECTED_PROVIDER=anthropic` to use Claude by default, or switch between models in the UI

### WebContainer API Setup

1. Sign up for WebContainer API access at [StackBlitz](https://stackblitz.com/pricing#webcontainer-api)
2. Add your API key to environment variables
3. Configure WebContainer settings in `app/lib/webcontainer/index.ts`

### Deployment

Deploy to Cloudflare Pages:

\`\`\`bash
pnpm run deploy
\`\`\`

Make sure to set your environment variables in the Cloudflare dashboard.

## Customization

### Branding
- Update logos in `/public` and `/icons` directories
- Modify colors and themes in `uno.config.ts`
- Customize UI text in component files

### AI Behavior
- Edit system prompts in `app/lib/.server/llm/prompts.ts`
- Adjust model settings in `app/lib/.server/llm/model.ts`
- Configure response limits in `app/lib/.server/llm/constants.ts`

### Features
- Add new file types in `app/components/editor/codemirror/languages.ts`
- Customize terminal behavior in `app/components/workbench/terminal/`
- Extend preview functionality in `app/components/workbench/Preview.tsx`

## Architecture

Solditor is built with:

- **Frontend**: React + Remix + TypeScript
- **Styling**: UnoCSS + SCSS
- **AI Integration**: OpenAI GPT-4o and Anthropic Claude via AI SDK
- **Code Editor**: CodeMirror 6
- **Terminal**: xterm.js
- **Runtime**: WebContainer API
- **Deployment**: Cloudflare Pages + Workers

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📧 Email: support@solditor.dev
- 💬 Discord: [Join our community](https://discord.gg/solditor)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/solditor/issues)

---

**Solditor** - Where ideas become applications ⚡
