import { IProject } from '@/types';

export const GENERAL_INFO = {
  email: 'lukmaannadaf@gmail.com',
  emailSubject: "Collaboration Opportunity",
  emailBody:
    "Hi Lukmaan, I came across your portfolio and I'm interested in exploring potential collaboration opportunities.",

  portfolio: 'https://lukmaann.vercel.app/',
  github: 'https://github.com/lukmaann',
  linkedin: 'https://www.linkedin.com/in/lukmaann/',
};

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: GENERAL_INFO.github },
  { name: 'LinkedIn', url: GENERAL_INFO.linkedin },
];

export const MY_STACK = {
  frontend: [
    { name: 'JavaScript', icon: '/logo/js.png' },
    { name: 'TypeScript', icon: '/logo/ts.png' },
    { name: 'React.js', icon: '/logo/react.png' },
    { name: 'Next.js', icon: '/logo/next.png' },
    { name: 'Redux', icon: '/logo/redux.png' },
    { name: 'Tailwind CSS', icon: '/logo/tailwind.png' },
    { name: 'Bootstrap', icon: '/logo/bootstrap.svg' },
  ],
  backend: [
    { name: 'Node.js', icon: '/logo/node.png' },
    { name: 'Express.js', icon: '/logo/express.png' },
  ],
  database: [
    { name: 'MySQL', icon: '/logo/mysql.svg' },
    { name: 'MongoDB', icon: '/logo/mongodb.svg' },
  ],
  tools: [{ name: 'Git', icon: '/logo/git.png' }],
};

export const MY_EXPERIENCE = [
  {
    title: 'Freelance Web Developer',
    company: 'Starline Industries Pvt. Ltd.',
    duration: 'Feb 2024 – May 2024',
    description: `Developed a custom battery cost calculator that automated raw material–based pricing, reducing manual effort by 90%. Delivered a fully functional production tool within 4 weeks.`,
  },
];

export const PROJECTS: IProject[] = [
  {
    title: 'Battery Price Calculator',
    slug: 'battery-price-calculator',
    liveUrl: 'https://starlinecalc.vercel.app/',
    year: 2024,
    description: `
      A production-ready tool for Starline Industries Pvt. Ltd. to calculate battery manufacturing costs based on raw material inputs and market pricing.
      <br/><br/>
      <strong>Highlights:</strong>
      <ul>
        <li>📉 Automated complex cost estimation workflows (90% time savings)</li>
        <li>🧮 Built robust formula-driven calculations with validation</li>
        <li>🖥️ Designed a clean, error-proof UI for industrial use</li>
      </ul>
    `,
    role: `
      Freelance Full-Stack Developer<br/>
      - Designed and implemented the full-stack solution independently<br/>
      - Built with Next.js
    `,
    techStack: ['Next.js', 'Tailwind CSS'],
    images: ['/projects/images/battery1.png', '/projects/images/battery2.png'],
  },
  {
    title: 'Polynote – AI Collaboration Platform',
    slug: 'polynote',
    liveUrl: 'https://polynote.vercel.app/',
    year: 2025,
    description: `
      An AI-powered workspace combining an intelligent text editor with an infinite canvas for real-time team collaboration.
      <br/><br/>
      <strong>Core Features:</strong>
      <ul>
        <li>🧠 AI-assisted writing: grammar, tone, clarity improvements</li>
        <li>📊 Automatic meeting & document summarization</li>
        <li>✅ Action item extraction with deadlines & key decisions</li>
        <li>🖌️ Infinite canvas for brainstorming & design reviews</li>
        <li>🔄 Real-time multi-user sync with conflict resolution</li>
        <li>🔐 Privacy-focused AI processing</li>
      </ul>
    `,
    role: `
      Full-Stack Developer<br/>
      - Developed AI editor and collaborative canvas<br/>
      - Integrated summarization, task extraction, and live sync<br/>
      - Optimized for large-scale team collaboration
    `,
    techStack: [
      'Next.js',
      'TypeScript',
      'Liveblocks',
      'Convex',
      'Tailwind CSS',
      'Clerk',
      'Gemini 2.5',
    ],
    images: [
      '/projects/images/polynote1.png',
      '/projects/images/polynote2.png',
    ],
  },
  {
    title: 'RimRubber – Tire Reselling Platform',
    slug: 'rimrubber',
    liveUrl: 'https://rimrubber.netlify.app/',
    year: 2024,
    description: `
      A full-stack platform for posting, browsing, and managing tire resale ads with admin moderation.
      <br/><br/>
      <strong>Features:</strong>
      <ul>
        <li>📤 User ad posting with image uploads</li>
        <li>🛡️ Admin dashboard for approvals</li>
        <li>📱 Mobile-first, responsive design</li>
        <li>🔐 Secure Google OAuth login</li>
      </ul>
    `,
    role: `
      Full-Stack Developer<br/>
      - Built with MERN stack (MongoDB, Express, React, Node)<br/>
      - Implemented Firebase Google login<br/>
      - Hosted backend on Render & frontend on Netlify
    `,
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Google Auth',
      'Netlify',
      'Render',
    ],
    images: ['/projects/images/rimrubber1.png', '/projects/images/rimrubber2.png'],
  },
  {
    title: 'Hazel – Social Web App',
    slug: 'hazel',
    liveUrl: 'https://hazelsocial.netlify.app/',
    year: 2024,
    description: `
      A social platform for creating, liking, and commenting on posts, with admin moderation and secure authentication.
      <br/><br/>
      <strong>Features:</strong>
      <ul>
        <li>📝 Post creation and interaction (likes, comments)</li>
        <li>🛑 Admin reporting & moderation system</li>
        <li>🔐 JWT-based authentication</li>
      </ul>
    `,
    role: `
      Full-Stack Developer<br/>
      - Frontend: React.js + Tailwind CSS<br/>
      - Backend: Node.js, Express, MongoDB<br/>
      - Deployed via Render & Netlify
    `,
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Tailwind CSS',
      'Netlify',
      'Render',
    ],
    images: ['/projects/images/hazel1.png', '/projects/images/hazel2.png'],
  },
];
