# Jira Clone Project

This project is a full-stack Jira clone built using modern web development tools and libraries. It is designed to showcase a highly functional, visually appealing, and scalable application that can be added to your portfolio to impress recruiters and demonstrate your skillset.

## Project Overview

**YouTube Tutorial:** [Full Stack React JS Project (Jira Clone) - Next JS, Shadcn UI, Tailwind, Clerk, NeonDB Tutorial 🔥](https://www.youtube.com/watch?v=R5dBYINNouY)

### Features

-   **Authentication:** User authentication and management using Clerk.
-   **Database:** Backend powered by NeonDB with Prisma as the ORM.
-   **UI Library:** Built with Shadcn UI components.
-   **Styling:** Tailwind CSS for rapid and responsive design.
-   **Frontend Framework:** React and Next.js for a seamless user experience.
-   **Full Stack Capabilities:** A complete implementation of a project management system inspired by Jira.

## Tech Stack

### Frontend

-   **React.js**: Component-based library for building user interfaces.
-   **Next.js**: Framework for server-rendered React applications.
-   **Tailwind CSS**: Utility-first CSS framework.
-   **Shadcn UI**: For customizable and accessible UI components.

### Backend

-   **NeonDB**: Serverless Postgres database for data persistence.
-   **Prisma**: ORM for database access and schema management.
-   **Clerk**: Authentication and user management.

## Project Structure

```
|-- prisma/           # Prisma schema and migrations
|-- public/           # Static assets
|-- src/
    |-- components/   # Reusable UI components
    |-- hooks/        # Custom React hooks
    |-- pages/        # Next.js pages
    |-- styles/       # Tailwind CSS configuration
    |-- utils/        # Utility functions
    |-- app/          # Application-specific logic
```

## Prerequisites

1. Node.js installed on your system.
2. A NeonDB instance.
3. Clerk account for authentication.
4. Basic knowledge of React, Next.js, and Tailwind CSS.

## Getting Started

### Clone the Repository

```bash
git clone <repository_url>
cd jira-clone
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=get-this-from-clerk
CLERK_SECRET_KEY=get-this-from-clerk

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

DATABASE_URL=your-neon-db-url
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Start the Development Server

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

## Deployment

This project can be deployed to platforms like Vercel or Netlify. Make sure to configure environment variables in the deployment platform.

## Screenshots

![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-27-37.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-31-56.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-32-11.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-32-29.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-32-38.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-33-17.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-33-25.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-34-20.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-34-28.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-34-34.png>)
![ScreenShot](<public/screenshots/Screenshot from 2025-01-16 07-35-00.png>)

## Learnings and Skills Demonstrated

-   Implemented a full-stack web application using modern frameworks and tools.
-   Designed and managed a responsive UI using Tailwind CSS.
-   Configured and interacted with a serverless database (NeonDB).
-   Set up authentication and user management using Clerk.
-   Learned best practices for structuring and deploying a Next.js application.

## Acknowledgments

Thanks to the creator of the [YouTube tutorial](https://www.youtube.com/watch?v=R5dBYINNouY) for guiding this project.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute this project as per the terms of the license.

---

Happy Coding!
