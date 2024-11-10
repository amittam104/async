# Async

Async is a modern task management tool designed to streamline project workflows without the need for constant meetings. It offers an intuitive interface for managing tasks across different stages with keyboard-first navigation and real-time status updates.

## Screenshots

![App Screenshot](/screenshot.png)

## Features

- Keyboard-first navigation for efficient task management
- Three-stage task workflow (Open, In Progress, Closed)
- Focus mode for detailed task viewing and editing
- Real-time task status updates with confirmation dialogs
- Comment system for team collaboration
- Priority-based task organization
- Pagination for handling large task lists
- Responsive design with clean UI
- Current tasks count badge for each status

## Run Locally

Clone the project

```bash
  git clone https://github.com/amittam104/async
```

Go to the project directory

```bash
  cd async
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Tech Stack

- Next JS
- React
- TailwindCSS
- Shadcn

## Design and Architecture

### User Interface Design

- Minimalist design approach focusing on content and functionality
- Three-tab interface (Open, In Progress, Closed) for clear task organization
- Modal-based focus mode for detailed task viewing and editing
- Keyboard shortcuts for efficient navigation and task management
- Status badges and priority indicators for quick visual feedback

### Technical Architecture

- Built with Next.js for optimal performance and SEO
- Component-based architecture using React for maintainability
- Shadcn UI components for consistent design language
- TailwindCSS for responsive and maintainable styling
- Keyboard event handlers for accessibility
