# Botify Labs - AI Employee Builder Platform

A modern, interactive web application for creating and managing AI-powered virtual employees. Built with React, TypeScript, and cutting-edge UI components.

![AI Employee Builder Interface](./src/assets/ai-chat-interface.jpg)

## Features

- 🤖 **AI Employee Builder**: Interactive wizard for creating customized AI agents
- 🎨 **Modern UI/UX**: Sleek design with fluid animations and responsive layouts
- 🔄 **Real-time Preview**: Live visualization of AI agent configurations
- 🎯 **Use Case Focused**: Specialized templates for different business needs
- 🛠️ **Customizable Workflows**: Flexible automation and integration options

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/70fefb13-4de3-4a3d-b9e9-ef35c259d9b0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tech Stack

- ⚡ **Vite** - Next Generation Frontend Tooling
- ⚛️ **React** - A JavaScript library for building user interfaces
- 📘 **TypeScript** - For type-safe code
- 🎨 **Tailwind CSS** - A utility-first CSS framework
- 🔮 **Supabase** - Backend and Database
- 🎭 **Shadcn/ui** - Beautifully designed components
- 🎬 **Framer Motion** - For smooth animations

## Key Components

- `AIEmployeeBuilder` - Core wizard interface for creating AI agents
- `WorkflowBuilder` - Visual workflow configuration tool
- `InteractiveAnalyticsDashboard` - Real-time performance monitoring
- `InteractiveCRM` - Customer relationship management interface

## Environment Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Configure Supabase:

   - Create a new project in Supabase
   - Update environment variables with your project credentials

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Main application pages
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── assets/         # Static assets
└── integrations/   # Third-party integrations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

The application can be deployed to any modern hosting platform that supports Node.js applications. We recommend:

- Vercel
- Netlify
- AWS Amplify

## Support

For support, please open an issue in the repository or contact our team at support@botify-labs.com
