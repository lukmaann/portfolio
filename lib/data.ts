import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'lukmaannadaf@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody:
        'Hi Lukmaan, I came across your portfolio and wanted to connect...',

    oldPortfolio: '', // if you have one, plug the URL here
    upworkProfile: '', // if you’re on Upwork, drop the link here
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/lukmaann' },
    { name: 'linkedin', url: 'hhttps://www.linkedin.com/in/lukmaann/' },
    // { name: 'facebook', url: 'https://www.facebook.com/tajmirul.2000' },
    // { name: 'Old Version', url: GENERAL_INFO.oldPortfolio },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'Javascript',
            icon: '/logo/js.png',
        },
        {
            name: 'Typescript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        // {
        //     name: 'GSAP',
        //     icon: '/logo/gsap.png',
        // },
        // {
        //     name: 'Frammer Motion',
        //     icon: '/logo/framer-motion.png',
        // },
        // {
        //     name: 'SASS',
        //     icon: '/logo/sass.png',
        // },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        // {
        //     name: 'Nest.js',
        //     icon: '/logo/nest.svg',
        // },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        // {
        //     name: 'PostgreSQL',
        //     icon: '/logo/postgreSQL.png',
        // },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        // {
        //     name: 'Prisma',
        //     icon: '/logo/prisma.png',
        // },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        // {
        //     name: 'Docker',
        //     icon: '/logo/docker.svg',
        // },
        // {
        //     name: 'AWS',
        //     icon: '/logo/aws.png',
        // },
    ],
};

export const MY_EXPERIENCE = [
    {
        title: 'Freelance Web Developer',
        company: 'Starline Industries Pvt. Ltd.',
        duration: 'Feb 2024 – Mar 2024',
        description: `Built a custom calculator tool to automate battery cost estimation based on raw material availability and market pricing. Reduced manual effort by 90%.`,
    },
];

export const PROJECTS: IProject[] = [
    {
        title: 'Battery Price Calculator',
        slug: 'battery-price-calculator',
        liveUrl: 'https://starlinecalc.vercel.app/',
        year: 2024,
        description: `
      Built a production tool for Starline Industries Pvt. Ltd. to estimate battery manufacturing costs based on raw material inputs and prices.
      <br/><br/>
      🔑 Highlights:
      <ul>
        <li>📉 Reduced manual work by 90% by automating complex calculations</li>
        <li>🧮 Implemented raw material cost estimation formulas with dynamic input</li>
        <li>🖥️ Delivered a clean UI with error handling and validation</li>
      </ul>
    `,
        role: `
      Freelance Full-Stack Developer<br/>
      - Designed and built the full-stack solution independently<br/>
      - Next.js
    `,
        techStack: ['Next.js'],
        // thumbnail: '/projects/thumbnail/battery1.png',
        // longThumbnail: '/projects/long/battery-calculator.jpg',
        images: [
            '/projects/images/battery1.png',
            '/projects/images/battery2.png',
        ],
    },
    {
        title: 'RimRubber – Tire Reselling Platform',
        slug: 'rimrubber',
        liveUrl: 'https://rimrubber.netlify.app/',
        year: 2024,
        description: `
      A full-stack tire reselling web app allowing users to post and browse tire ads with admin approvals and mobile-first UI.
      <br/><br/>
      🔧 Features:
      <ul>
        <li>📤 User ad posting with image upload and description</li>
        <li>🛡️ Admin dashboard to approve or reject listings</li>
        <li>📱 Fully responsive frontend for mobile users</li>
        <li>🔐 Google OAuth integration</li>
      </ul>
    `,
        role: `
      Full-Stack Developer<br/>
      - Built with the MERN stack (MongoDB, Express, React, Node)<br/>
      - Implemented authentication using Firebase / Google login<br/>
      - Backend hosted on Render, frontend on Netlify
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
        // thumbnail: '/projects/thumbnail/rimrubber.jpg',
        // longThumbnail: '/projects/long/rimrubber.jpg',
        images: [
            '/projects/images/rimrubber-1.png',
            '/projects/images/rimrubber-2.png',
        ],
    },
    {
        title: 'Hazel – Social Web App',
        slug: 'hazel',
        liveUrl: 'https://hazelsocial.netlify.app/',
        year: 2024,
        description: `
      A social media platform for users to post, like, and comment on content, featuring moderation and authentication.
      <br/><br/>
      🔥 Features:
      <ul>
        <li>📝 Create and interact with posts (likes, comments)</li>
        <li>🛑 Admin model for report handling and moderation</li>
        <li>🔐 JWT-based secure login</li>
      </ul>
    `,
        role: `
      Full-Stack Developer<br/>
      - Built frontend with React.js and Tailwind CSS<br/>
      - Backend with Node.js, Express, and MongoDB<br/>
      - Hosted using Render + Netlify for free deployment
    `,
        techStack: [
            'React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Mongoose',
            'JWT',
            'Tailwind CSS',
            'Netlify',
            'Render',
        ],
        // thumbnail: '/projects/thumbnail/hazel.jpg',
        // longThumbnail: '/projects/long/hazel.jpg',
        images: [
            '/projects/images/hazel-1.png',
            '/projects/images/hazel-2.png',
        ],
    },
];
