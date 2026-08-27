// Static data for the entire portfolio
// Optimized specifically to target Google Engineering specifications and recruiter screening parameters
// Employs the official Google X-Y-Z achievement formula: "Accomplished [X], as measured by [Y], by doing [Z]"

import salesPipelineImg from '../assets/sales_pipeline.webp';
import aquasyncImg from '../assets/aquasync.webp';
import medicareImg from '../assets/medicare.webp';
import algovizImg from '../assets/algoviz.webp';
import faceAttendanceImg from '../assets/face_attendance.webp';
import taleemproImg from '../assets/taleempro.webp';
import venturetwistImg from '../assets/venturetwist.png';
import rescueDashboardImg from '../assets/rescue_dashboard.png';
import rescueLandingImg from '../assets/rescue_landing.png';
import rescueMapImg from '../assets/rescue_map.png';
import fooddashLandingImg from '../assets/fooddash_landing.png';
import fooddashLoginImg from '../assets/fooddash_login.png';
import aiHmsImg from '../assets/ai_hms.webp';
import portfolioDarkOrangeImg from '../assets/portfolio_dark_orange.png';
import portfolioDarkRoseImg from '../assets/portfolio_dark_rose.png';
import portfolioLightOrangeImg from '../assets/portfolio_light_orange.png';
import bhuttaScientsImg from '../assets/bhuttaScients.png';
import bhuttaCollectionImg from '../assets/collection.png';
import bhuttaHomepageImg from '../assets/homepage.jpg';
import bhuttaProductdetailsImg from '../assets/productdetails.png';
import bhuttaImageImg from '../assets/image.png';

export const personalInfo = {
  name: 'Muhammad Rashid Shafique',
  title: 'Full-Stack Software Engineer & AI Systems Developer',
  tagline: 'Full-stack software engineer specializing in AI-integrated web and mobile applications — architecting production-grade systems end-to-end, from database design and secure REST APIs to responsive frontends and cross-platform apps.',
  bio: `I am a Full-Stack Software Engineer specializing in AI-integrated web and mobile applications. Currently pursuing my BS in Computer Science at the University of Agriculture Faisalabad (UAF), I apply core academic fundamentals—including Data Structures & Algorithms, Object-Oriented Programming (OOP), and Relational Database Optimization—to architect production-grade systems end-to-end.`,
  location: 'Faisalabad, Pakistan',
  email: 'rashidshafique.dev@gmail.com',
  phone: '+92 319 8696623',
  avatarUrl: 'https://avatars.githubusercontent.com/rashidshafique-dev',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/rashidshafique-dev',
    linkedin: 'https://www.linkedin.com/in/rashidshafique-dev',
    twitter: 'https://x.com/rashidshafiqdev',
    x: 'https://x.com/rashidshafiqdev',
    facebook: 'https://www.facebook.com/share/1DQzUBXR7e/',
    instagram: 'https://www.instagram.com/rashidshafique.dev',
    tiktok: 'https://www.tiktok.com/@rashidshafique.dev',
    threads: 'https://www.threads.com/@rashidshafique.dev',
    whatsapp: 'https://wa.me/923198696623',
    whatsappBusiness: 'https://wa.me/923198696623',
    dribbble: 'https://github.com/rashidshafique-dev',
  },
};

export const navLinks = [
  { label: 'Home',       href: '/'           },
  { label: 'About',      href: '/about'       },
  { label: 'Projects',   href: '/projects'    },
  { label: 'Skills',     href: '/skills'      },
  { label: 'Experience', href: '/experience'  },
  { label: 'Contact',    href: '/contact'     },
];

export const stats = [
  { value: '25+',    label: 'Tech Skills' }, // Comprehensive framework, language & database tools
  { value: '1.5M+',  label: 'Rows Processed' }, // PySpark & Big Data ingestion
  { value: '42%',    label: 'Latency Optimized' }, // Optimized C++, socket servers & APIs
  { value: '99.9%',  label: 'System Uptime' } // Reliable crons, databases & deployments
];

export const projects = [
  {
    id: 1,
    title: 'Bhutta Scents',
    description: 'A premium fragrance e-commerce storefront showcasing luxury perfumes, custom collections, and detailed product profiles. Features smooth CSS animations and responsive grid layouts.',
    techStack: ['React', 'Vite', 'Vanilla CSS', 'State Management'],
    tech: ['React', 'Vite', 'Vanilla CSS', 'State Management'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://bhuttascents.com',
    githubUrl: 'https://github.com/rashidshafique-dev/BhuttaScents',
    accentColor: '#D4AF37', // Gold metallic accent for luxury brand
    imageUrl: bhuttaScientsImg,
    metric: 'Real Client (Alhamdullilah Satisfied)',
    relatedLogTitle: 'Solving Real Problems: Shifting from Vanity Portfolios to Practical Products',
    screenshots: [
      { label: 'Product Banner', url: bhuttaImageImg },
      { label: 'Product Details', url: bhuttaProductdetailsImg },
      { label: 'Collection Grid', url: bhuttaCollectionImg },
      { label: 'Storefront Catalog', url: bhuttaScientsImg }
    ],
    tagline: 'Premium e-commerce experience for luxury fragrances and curated scents.',
    status: 'Completed',
    problemStatement: 'Luxury perfume brands need a digital storefront that conveys visual elegance, showcases scent profiles, and handles shopping cart behaviors. Developed a customized React storefront with premium custom accents and zero framework clutter.',
    challenges: [
      'Creating a visually immersive fragrance discovery layout with detailed product detail views and high-aesthetic styling. Built optimized, modular Vanilla CSS layouts and dynamic image carousel components.',
      'Implementing seamless state handling for product filters and local cart persistence. Structured a lightweight context state controller, ensuring smooth page loads and near-instant user interactions.'
    ],
    outcome: 'Delivered an interactive, high-aesthetic e-commerce experience that client is extremely satisfied with.'
  },
  {
    id: 2,
    title: 'Al Shifaa Clinic',
    description: 'A secure hospital management system for patient records, appointments, and staff coordination. Integrates automated patient check-in queues and role-based access control.',
    techStack: ['React', 'Django REST Framework', 'PostgreSQL', 'JWT', 'LLMs'],
    tech: ['React', 'Django REST Framework', 'PostgreSQL', 'JWT', 'LLMs'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://al-shifaa-hms.vercel.app/',
    githubUrl: 'https://github.com/rashidshafique-dev/AI-HMS',
    accentColor: '#10B981', // Google/Material green/emerald
    imageUrl: aiHmsImg,
    metric: '42% Latency Reduction',
    relatedLogTitle: 'The Art of Simplicity: Preventing Technical Debt by Deleting Code',
    tagline: 'AI-powered hospital management system with secure multi-role access control.',
    status: 'In Progress',
    problemStatement: 'Traditional healthcare systems suffer from inefficient scheduling, slow patient registration, and lack of secure role-based access. Designed a secure full-stack hospital management system (AI-HMS) that integrates Django, React, and JWT to streamline patient registration and doctor onboarding workflows.',
    challenges: [
      'Securing multi-role access control (Patients, Doctors, Admins) across the application. Implemented stateless JWT-based authentication with token rotation, token blacklisting on logout, and custom Django REST Framework permission classes.',
      'Reducing registration bottlenecks and session friction. Developed a progressive multi-step patient self-registration and doctor onboarding workflow with Google OAuth SSO and custom Axios refresh token interceptors.'
    ],
    outcome: 'Completed Milestone 1 (Auth & Authorization), securing patient self-registration, doctor onboarding, and role-based access control (RBAC) across three primary access tiers.',
    milestones: [
      {
        title: 'Milestone 0: Public Landing Page & Design System',
        status: 'Completed',
        details: [
          'Scaffolded modern React landing page structure with custom components (Navbar, Hero, Features, Testimonials, Footer).',
          'Established global theme context, Material Design 3 spacing tokens, custom HSL-based teals palette, and custom typography (Outfit).',
          'Implemented Cookie Consent analytical banner and a global heartbeat loading screen overlay.'
        ]
      },
      {
        title: 'Milestone 1: Authentication & Authorization',
        status: 'Completed',
        details: [
          'Custom HMSUser model with UUID keys, email indexing, and role checks.',
          'Stateless JWT-based auth flow with token auto-rotation and blacklisting.',
          'Axios background refresh token interceptor to handle session continuity.',
          'Google OAuth SSO & Profile Onboarding workflow.',
          'Patient self-registration and Doctor onboarding application form with PMDC license uploads.',
          'OTP verification email flows for password recovery.'
        ]
      },
      {
        title: 'Milestone 2: Professional Admin Layout & Workspace Routing',
        status: 'Completed',
        details: [
          'Collapsible sidebar (Drawer) and header layout (AdminLayout) containing avatar menus and notification trays.',
          'Modularized dialog forms for onboarding invites, doctor license auditing, user administration, and security audits.',
          'Sub-route mapping for admin tools under /admin/ in the routes.jsx file.'
        ]
      },
      {
        title: 'Milestone 3: Operational Scheduling',
        status: 'Completed',
        details: [
          'Calendar integrations (InteractiveCalendar) on doctor and patient dashboards.',
          'Doctor scheduling availability slots configurations.',
          'Patient appointment wizard booking dialog (BookAppointmentDialog).'
        ]
      },
      {
        title: 'Milestone 4: EHR, Prescriptions, Billing, Pharmacy, & Lab/Radiology Workspaces',
        status: 'Completed',
        details: [
          'Patient vitals logging and critical out-of-range alert triage.',
          'EHR medical records documentation, doctor advice, and clinical prescriptions (Rx).',
          'Patient arrivals check-in and transaction processing with official consult receipt generation.',
          'Pharmacist prescription fulfillment, dispensary inventory alert controls, and billing management.',
          'Technician workspaces for Blood/Pathology lab orders and Radiology imaging (X-Ray/CT/MRI) observations.'
        ]
      },
      {
        title: 'Milestone 5: Retrieval-Augmented Generation (RAG) & Clinical AI Features',
        status: 'In Progress',
        details: [
          'Integrate LLM services for clinical chat and RAG.',
          'Establish secure RAG endpoints for patient history parsing.',
          'Build EHR clinical summarizers for doctors.',
          'Introduce an interactive clinical chatbot for internal staff queries.'
        ]
      },
      {
        title: 'Milestone 6: Quality, Security & Deployment',
        status: 'Planned',
        details: [
          'HIPAA compliance audits and data level verification.',
          'Comprehensive integration and penetration testing.',
          'Docker containerization (Django, Postgres, React).',
          'Production cloud deployment.'
        ]
      }
    ],
    features: [
      {
        title: 'System Admin Dashboard (DashboardOverview.jsx)',
        details: [
          'Compliance Alerts: Tracks doctor license PMDC compliance status and triggers warning banners when expiry is near.',
          'Infrastructure Health: Diagnostic handshakes monitoring PostgreSQL, SMTP services, Google OAuth gateway, and JWT issuance latency.',
          'Audit Logging: Logs security events (IP, location, actions) in the security activity panel.',
          'Resource Snapshots: Real-time bed occupancy, clinical staff allocation grids, and total billings tracking.'
        ]
      },
      {
        title: 'Clinical Console Workspace (DoctorDashboard.jsx)',
        details: [
          'Today\'s Consult Queue: Lists daily patient appointments with details on vital signs. If vital metrics fall out-of-range (e.g. SpO2 < 95%, high heart rate), critical triage badges are displayed.',
          'Shift Scheduler: Allows doctors to configure weekly availability shifts, define start/end intervals, and customize slot durations.',
          'Patient History Lookup: Search tool (MRN or Name) to review previous encounter logs, vital trends, lab tests, and imaging reports.',
          'Encounter Documentation: Completes consultations by logging diagnoses, advisory notes, and prescription medications (Rx).'
        ]
      },
      {
        title: 'Patient Health Portal (PatientDashboard.jsx)',
        details: [
          'Consultation Log: Lists upcoming slot reservations and past appointments, allowing patients to cancel or book new sessions.',
          'Appointment Booking: Dynamic multi-step wizard to search doctors by specialty, view their available calendar dates, and select time slots.',
          'Medical Files access: View clinical encounter history, advice, and active prescriptions.',
          'Scans & Lab Reports: View completed diagnostic test sheets and download radiological imaging files.'
        ]
      },
      {
        title: 'Nurse Triage Station (NurseDashboard.jsx)',
        details: [
          'Triage Queue: Filters checked-in patients awaiting vitals logging.',
          'Vitals Logger: Captures blood pressure, heart rate, temperature, SpO2, respiratory rate, weight, and height, pushing the data instantly to the doctor\'s consult screen.',
          'Triage History: Audits logged vitals reports.'
        ]
      },
      {
        title: 'Receptionist Billing Console (ReceptionistDashboard.jsx)',
        details: [
          'Arrival Check-In: Registers patient arrivals, collects consult fees, and moves them to the nurse queue.',
          'Invoicing & Receipts: Computes transaction totals, logs payment methods (Cash, Card, Mobile Pay, Insurance), and prints receipt summaries.',
          'Patient Directory: Searches files by MRN, Name, or Phone.'
        ]
      },
      {
        title: 'Dispensary Console (PharmacistDashboard.jsx)',
        details: [
          'Prescription Queue: Manages pending physician prescriptions (Rx), detailing dosages and instructions.',
          'Dispensing Action: Computes costs, saves pharmacist advice, and marks prescriptions as dispensed.',
          'Inventory Monitor: Real-time tracking of critical stocks (Amoxicillin, Insulin, Metformin, etc.) with restock request alerts.'
        ]
      },
      {
        title: 'Lab & Radiology Workspaces (LabDashboard.jsx & RadiologyDashboard.jsx)',
        details: [
          'Work queues: Lists test and scan orders requested by physicians.',
          'Report Submissions: Allows technicians to log findings summary, write detailed observation notes, and attach digital documents/scan images (X-Rays, MRIs).'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Rescue Project',
    description: 'An AI-powered search-and-rescue command console for volunteer coordination and missing persons registry. Features difference hashing facial matching and geofenced mobilization alerts.',
    techStack: ['React', 'Flask', 'SQLAlchemy', 'Groq (Whisper / Llama 3)', 'Zustand'],
    tech: ['React', 'Flask', 'SQLAlchemy', 'Groq (Whisper / Llama 3)', 'Zustand'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://rescue-project.vercel.app/',
    githubUrl: 'https://github.com/rashidkhan4067/Rescue_Project-',
    accentColor: '#EA4335', // Google Red
    imageUrl: rescueDashboardImg,
    metric: '99% Match Accuracy',
    relatedLogTitle: 'AI in Software Engineering: Code Generation is Not System Architecture',
    screenshots: [
      { label: 'Dashboard', url: rescueDashboardImg },
      { label: 'Tactical Map', url: rescueMapImg },
      { label: 'Landing Page', url: rescueLandingImg }
    ],
    tagline: 'AI-powered missing persons command registry and volunteer coordination platform.',
    status: 'In Progress',
    problemStatement: 'Traditional search-and-rescue operations are hindered by scattered case logs, slow dispatch workflows, and lack of automated photo assessment. Designed a unified full-stack system that employs local difference hashing for instant face matching and automated geofenced SMTP alerts for volunteer search teams.',
    challenges: [
      'Integrating heterogeneous LLM API pipelines (Llama 3 and Google Gemini) with fallback logic and strict JSON schema generation. Constructed a clean service wrapper with retry policies and regex cleaners to prevent template leaks.',
      'Performing low-cost, server-side face similarity matching on SQLite database records. Formulated a difference hashing (dHash) workflow using Pillow image processing to compute 64-bit signatures and compare them using Hamming Distance calculations.'
    ],
    outcome: 'Completed Milestone 2, delivering secure authentication (Google OAuth & Magic Links), active case registrations with structured physical descriptors, geofenced SMTP mobilization broadcasts, and simulated weather/flight dispatch telemetry.',
    milestones: [
      {
        title: 'Milestone 0: Design System & Layouts',
        status: 'Completed',
        details: [
          'Scaffolded custom React layout, side drawer navigations, and global theme context supporting real-time Light/Dark mode.',
          'Engineered Material Design 3 outlined input fields, responsive image drag-and-drop zones, and status badge allocations.'
        ]
      },
      {
        title: 'Milestone 1: Session Management & Authentication',
        status: 'Completed',
        details: [
          'Integrated secure session management using Flask-Login and HTTP credentials with Axios interceptors.',
          'Implemented credentials login, Google OAuth 2.0 single sign-on, and SMTP password-less magic link tokens.'
        ]
      },
      {
        title: 'Milestone 2: Case Registry & Mobilization Hub',
        status: 'Completed',
        details: [
          'Engineered SQLAlchemy models for Users, Reports, and Volunteers with granular physical, location, and severity attributes.',
          'Designed geofenced dispatch systems that automatically query active reports in a sector, identify standby responders, and send SMTP mobilization broadcasts.'
        ]
      },
      {
        title: 'Milestone 3: AI Telemetry & Diagnostics (Aegis-9)',
        status: 'In Progress',
        details: [
          'Constructed Aegis-9 conversational coordinator utilizing Groq Cloud (Llama 3.3) with context injection of live database case/volunteer details.',
          'Implemented voice-profiler transcribing audio reports using Groq Whisper, and Pillow-based image diagnostics evaluating contrast, brightness, and focus index.',
          'Added dHash face matcher topological calculations and simulated weather corridors for drone flight approval.'
        ]
      },
      {
        title: 'Milestone 4: Interactive Maps & Staging',
        status: 'Planned',
        details: [
          'Integrate interactive mapping controls to plot live GPS coordinates of missing subjects and active search teams.',
          'Conduct comprehensive security audits and unit/integration testing.'
        ]
      }
    ],
    features: [
      {
        title: 'Aegis-9 AI Command Console (ai_assistant.py)',
        details: [
          'Conversational Analytics: Interrogates the SQLite database through natural language to analyze case grids and volunteer counts.',
          'Programmatic Case Booking: Parses raw text details into structured parameters, booking database records automatically.',
          'Voice Profiler: Integrates Groq Whisper to transcribe and extract physical profiles from voice memo uploads.'
        ]
      },
      {
        title: 'Topological Diagnostics Suite (diagnostics.py)',
        details: [
          'AI Face Matcher: Compares topological dHash signatures of uploaded search photos against registry logs with Hamming confidence scoring.',
          'Fidelity Auditor: Validates image contrast, brightness, and sharpness metrics using Pillow standard deviations to prevent blur or under-exposure.'
        ]
      },
      {
        title: 'Ground Mobilization Hub (mobilization.py)',
        details: [
          'Geofenced Alerts: Matches local missing reports with volunteers, transitioning responder statuses to Active and broadcasting SMTP alert maps.',
          'Radar Telemetry: Simulates geographic scattering offsets of search squads and active subject boundaries.'
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Rashid Shafique Portfolio',
    description: 'An interactive browser workstation simulating a mobile operating system inside a virtual smartphone chassis. Includes a live logcat console, local storage database persistence, and technical sandbox micro-demos.',
    techStack: ['React', 'Node.js', 'Express', 'TypeScript', 'Gemini AI'],
    tech: ['React', 'Node.js', 'Express', 'TypeScript', 'Gemini AI'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067',
    githubUrl: 'https://github.com/rashidkhan4067/rashid-shafique-portfolio-',
    accentColor: '#10B981', // Emerald theme
    imageUrl: portfolioDarkOrangeImg,
    metric: '<300ms Load Time',
    relatedLogTitle: 'Utility Over Aesthetics: Design Lessons from GitHub, Stripe, and Linear',
    screenshots: [
      { label: 'Modern Dark Theme (Orange Accent)', url: portfolioDarkOrangeImg },
      { label: 'Modern Dark Theme (Rose Accent)', url: portfolioDarkRoseImg }
    ],
    tagline: 'Interactive Virtual OS Workstation and full-stack engineering portfolio.',
    status: 'Completed',
    problemStatement: 'Most portfolios list technologies statically. Designed an interactive operating system environment running entirely in the browser to execute database queries, LLM API calls, spaced-repetition algorithms, and system logs in real-time.',
    challenges: [
      'Simulating a full ADB Logcat console inside React state with clean high-throughput updates without causing browser rendering bottlenecks.',
      'Integrating a local storage SQLite wrapper to persist contact logs and flashcard data across browser reloads.',
      'Constructing responsive dual-mode CSS layouts to scale the pixel-perfect iPhone 17 Pro Max chassis seamlessly across desktop and mobile screens.'
    ],
    outcome: 'Delivered a fully interactive developer workstation and simulated AOSP mobile sandbox in under 300ms initial load time.',
    milestones: [
      {
        title: 'Milestone 1: Virtual OS Emulator & ADB Terminal',
        status: 'Completed',
        details: [
          'Engineered a pixel-perfect iPhone 17 Pro Max CSS chassis supporting volume, vibrate, power rocker keys, and Dynamic Island expanders.',
          'Built the simulated ADB Logcat console capturing real-time user events, API responses, and database transaction outputs.',
          'Developed 6-color accent palette repainting all glows, headers, and badge indicators in real-time.'
        ]
      },
      {
        title: 'Milestone 2: Interactive Sandbox & Database Persistence',
        status: 'Completed',
        details: [
          'Configured simulated database queries using local SQLite wrappers persisted via LocalStorage.',
          'Implemented Recruiter technical chatbot using Gemini SDK with dynamic proficiency evaluation and grading report cards.',
          'Coded the SuperMemo-2 (SM-2) Spaced Repetition engine scheduling cards by Ease Factor.'
        ]
      }
    ],
    features: [
      {
        title: 'Virtual OS Chassis & Emulator (PhoneEmulator.tsx)',
        details: [
          'Dual-Layout responsiveness switching between desktop desktop-grid and mobile viewports.',
          'Synced status indicators with active local time, battery gauge, and dynamic island expansions.'
        ]
      },
      {
        title: 'ADB Logcat Terminal (CompanionPanel.tsx)',
        details: [
          'Streams real-time developer activity log tracking routing, local storage query updates, and AI prompts.',
          'Supports live settings control: theme, layout toggle, haptic toggles, and direct ADB stream clearing.'
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'VentureTwist',
    description: 'A restaurant management and food ordering application featuring interactive menus and an automated checkout cart system. Includes a secure administrative panel for order tracking and inventory monitoring.',
    techStack: ['Vanilla JS', 'Bootstrap 5', 'HTML5', 'CSS3'],
    tech: ['Vanilla JS', 'Bootstrap 5', 'HTML5', 'CSS3'],
    category: 'Open Source',
    featured: true,
    liveUrl: 'https://rashidkhang4067.github.io/VentureTwist',
    githubUrl: 'https://github.com/rashidkhang4067/VentureTwist',
    accentColor: '#FEA116', // Gold accent
    imageUrl: venturetwistImg,
    metric: 'Zero-Dependency JS',
    relatedLogTitle: 'Solving Real Problems: Shifting from Vanity Portfolios to Practical Products',
    tagline: 'VentureTwist - Your Premium Modern Restaurant Experience',
    status: 'Completed',
    problemStatement: 'Traditional restaurant websites are static and fail to provide interactive features like live cart management, table booking validations, and real-time menu category swapping. VentureTwist bridges this gap by presenting a high-fidelity dining booking website with a persistent client-side checkout system.',
    challenges: [
      'Implementing a fully persistent cart with real-time tax/subtotal calculation, slide-in notifications, and state recovery under raw file:// protocol. Built modular vanilla JS modules to manage local storage and state lifecycle without external framework overhead.',
      'Dynamic asset resolution across different folder depths (e.g. /admin/ portal vs root pages). Engineered a smart path resolver contextually adjusting asset root levels dynamically.'
    ],
    outcome: 'Delivered an interactive, zero-dependency culinary checkout application and a secure admin control panel loading under 300ms.',
    milestones: [
      {
        title: 'Design Philosophy & Aesthetics',
        status: 'Completed',
        details: [
          'Curated Harmonies: Bespoke dark-mode interface coupled with golden highlights (#FEA116) to evoke warm hospitality, fine dining, and culinary premiumness.',
          'Micro-Animations & Transitions: Fluid slide-downs, wow-reveal effects, hovering cards, and dynamic state updates.',
          'Typography: Clean and premium typography loaded from Google Fonts (Heebo, Nunito, Pacifico) providing readable copy and striking titles.',
          'Responsive layouts: Perfect structural integrity on Desktop, Tablet, and Mobile interfaces using a customized modern Bootstrap 5 grid system.'
        ]
      },
      {
        title: 'Key Feature Highlights',
        status: 'Completed',
        details: [
          'Dynamic Shopping Cart: A fully functional, local-storage persistent checkout cart with slide-in notifications, quantity controls, automatic subtotal, tax calculation, and instant updates.',
          'Real-time Menu System: Categories are split cleanly into Tabs (Breakfast, Lunch, Dinner, Coffee, Drinks). The app dynamically updates menu data from a unified service layer.',
          'Online Table Reservation: A gorgeous table booking panel equipped with validation, date-time selectors, and guest counters.',
          'Secure Payment Gateway: Mock payment simulation supporting cash on delivery and card flows, persistent order generation, and immediate receipt generation.',
          'Order History & Live Tracking: Comprehensive order summaries showing items bought, prices, unique tracking IDs, and custom order tracking status pages.'
        ]
      },
      {
        title: 'Secure Administrative Suite (/admin/)',
        status: 'Completed',
        details: [
          'Protected Gatehouse: Secure login layout restricting dashboard access to authorized administrators.',
          'Real-time Analytics Dashboard: Summary cards detailing Total Orders, Accumulated Revenue, Active Reservations, and Live Menu Items.',
          'Interactive Menu Management (CRUD): Create, Read, Update, and Delete food items inside the global store dynamically with Category reallocation, image uploads, and descriptive text edits.',
          'Active Booking & Order Pipeline: Central table logs monitoring active customer checkout states and live table reservation lists.'
        ]
      }
    ],
    features: [
      {
        title: 'Fully Advanced Directory Architecture',
        details: [
          'VentureTwist root contains multi-page portals for home, about, booking, checkout, contact, menu, order history/tracking, payment, and receipts.',
          'admin/ contains protected dashboard, booking registries, login gate, menu management, and sales portals.',
          'assets/ houses CSS grid configurations, compressed menu images, vendor scripts (Wow.js, OwlCarousel), and modular JS page controllers.'
        ]
      },
      {
        title: 'Dynamic Image Path Resolver (Zero-Break system)',
        details: [
          'Automated path parsing inside menu-data-service.js contextually resolves asset directories based on page depth (e.g. root vs /admin/).',
          'Enables the application to run seamlessly across both web servers and raw local disk launch (file:// protocol).'
        ]
      },
      {
        title: 'Technical & Execution Stack',
        details: [
          'Vanilla JS Modules for zero-dependency modular business logic and state management.',
          'Wow.js & Animate.css for clean scroll-reveal micro-interactions and animations.',
          'Licensed under the MIT License for open-source Core distribution.'
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'FoodDash',
    description: 'A web-based food delivery dashboard featuring responsive menu searches and interactive cart management. Includes a secure user verification flow and responsive layout configurations.',
    techStack: ['React', 'Vite', 'CSS Modules', 'State Management'],
    tech: ['React', 'Vite', 'CSS Modules', 'State Management'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://fooddash-web.vercel.app/',
    githubUrl: 'https://github.com/rashidkhan4067/FoodDash',
    accentColor: '#F97316', // Google/Material orange
    imageUrl: fooddashLandingImg,
    metric: 'Low-Latency State',
    relatedLogTitle: 'Refactoring Visual Noise: Improving Page Load by Deleting 50% of the Frontend Clutter',
    screenshots: [
      { label: 'Landing Page', url: fooddashLandingImg },
      { label: 'Login Page', url: fooddashLoginImg }
    ],
    tagline: 'Responsive online food ordering dashboard and verification workflows.',
    status: 'Completed',
    problemStatement: 'Traditional online food ordering platforms suffer from layout shift, slow menu updates, and unoptimized login flows. Designed FoodDash to provide a modern, responsive user experience for browsing dining catalogs and managing cart checkouts.',
    challenges: [
      'Implementing low-latency client-side menu searches and dynamic cart updates. Configured a lightweight state context to handle subtotal adjustments and item additions without server roundtrips.',
      'Securing user authentication with form validation. Designed beautiful, outline-styled login panels that integrate seamless input checking and responsive layout scaling.'
    ],
    outcome: 'Delivered an aesthetic, fast, and responsive user flow for dish selection, checkout verification, and session entry.'
  },
  {
    id: 7,
    title: 'Sales-Data-Analysis-System',
    description: 'A high-throughput big data analytics pipeline and interactive forecasting dashboard for transaction records. Predicts regional sales trends and profit metrics using historical datasets.',
    techStack: ['PySpark', 'Python', 'Scikit-Learn', 'Streamlit', 'Plotly'],
    tech: ['PySpark', 'Python', 'Scikit-Learn', 'Streamlit', 'Plotly'],
    category: 'AI/ML',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Sales-Data-Analysis-System',
    githubUrl: 'https://github.com/rashidkhan4067/Sales-Data-Analysis-System.git',
    accentColor: '#1A73E8', // Google Blue Brand colors
    imageUrl: salesPipelineImg,
    metric: '10M+ Rows Ingestion',
    relatedLogTitle: 'Distributed Analytics: Data Processing Classifiers and PySpark pipelines',
    tagline: 'High-throughput big data pipeline and analytics dashboard processing 10M+ transaction rows.',
    status: 'Completed',
    problemStatement: "TODO: 1-2 sentences on the actual problem this solves",
    challenges: [
      "TODO: Technical challenge 1 and decision made",
      "TODO: Technical challenge 2 and decision made"
    ],
    outcome: 'Processes over 10M+ transaction rows under 1.5 seconds, delivering actionable profit forecasting.'
  },
  {
    id: 8,
    title: 'AquaSync',
    description: 'An IoT real-time fluid telemetry dashboard and monitoring system for water distribution networks. Tracks flow rate, water pressure, and tank levels across multiple sensor nodes.',
    techStack: ['C++', 'Python', 'Arduino', 'IoT', 'Tkinter'],
    tech: ['C++', 'Python', 'Arduino', 'IoT', 'Tkinter'],
    category: 'IoT',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/AquaSync',
    githubUrl: 'https://github.com/rashidkhan4067/AquaSync',
    accentColor: '#00C1D4', // Teal Accent
    imageUrl: aquasyncImg,
    metric: '99.9% Device Uptime',
    relatedLogTitle: 'The Art of Subtraction: What Senior Software Engineers Choose Not to Build',
    tagline: 'IoT fluid telemetry system and real-time desktop monitoring dashboard.',
    status: 'Completed',
    problemStatement: "TODO: 1-2 sentences on the actual problem this solves",
    challenges: [
      "TODO: Technical challenge 1 and decision made",
      "TODO: Technical challenge 2 and decision made"
    ],
    outcome: 'Maintains 99.9% uptime across active device connections, processing 100k+ telemetry packets daily.'
  },
  {
    id: 9,
    title: 'MediCare / Hospital Management',
    description: 'A high-security patient management portal featuring transaction buffering and request validation. Manages patient admissions, registrations, and doctor scheduling.',
    techStack: ['React', 'Node.js', 'Express', 'SQLite', 'Python'],
    tech: ['React', 'Node.js', 'Express', 'SQLite', 'Python'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/MediCare',
    githubUrl: 'https://github.com/rashidkhan4067/MediCare',
    accentColor: '#818CF8', // Slate Indigo
    imageUrl: medicareImg,
    metric: '150+ Daily Admissions',
    relatedLogTitle: 'Solving Real Problems: Shifting from Vanity Portfolios to Practical Products',
    tagline: 'High-security patient management portal and Express REST API.',
    status: 'Completed',
    problemStatement: "TODO: 1-2 sentences on the actual problem this solves",
    challenges: [
      "TODO: Technical challenge 1 and decision made",
      "TODO: Technical challenge 2 and decision made"
    ],
    outcome: 'Used to streamline patient registration and check-in workflows for over 150 daily admissions.'
  },
  {
    id: 10,
    title: 'Algoviz-pro',
    description: 'An algorithmic visualization engine displaying interactive pathfinding and graph structure traversals. Renders node states and searches at high frame rates.',
    techStack: ['React', 'Flask', 'D3.js', 'Python', 'JavaScript'],
    tech: ['React', 'Flask', 'D3.js', 'Python', 'JavaScript'],
    category: 'Open Source',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Algoviz-pro',
    githubUrl: 'https://github.com/rashidkhan4067/Algoviz-pro',
    accentColor: '#7C3AED', // Deep Violet
    imageUrl: algovizImg,
    metric: '60 FPS Visualization',
    relatedLogTitle: 'Beyond the Keyboard: Software Engineering is Planning and Communication',
    tagline: 'Algorithmic visualization engine demonstrating pathfinding and custom structures.',
    status: 'Completed',
    problemStatement: "TODO: 1-2 sentences on the actual problem this solves",
    challenges: [
      "TODO: Technical challenge 1 and decision made",
      "TODO: Technical challenge 2 and decision made"
    ],
    outcome: 'Provides fluid 60fps renders for complex graph visualisations containing up to 10k nodes.'
  },
  {
    id: 11,
    title: 'Face-Recognition-Attendance-System',
    description: 'An AI-powered facial recognition attendance and verification system. Automates real-time student check-ins and processes camera frames.',
    techStack: ['TensorFlow', 'Python', 'OpenCV', 'Keras', 'HTML5'],
    tech: ['TensorFlow', 'Python', 'OpenCV', 'Keras', 'HTML5'],
    category: 'AI/ML',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Face-Recognition-Attendance-System',
    githubUrl: 'https://github.com/rashidkhan4067/Face-Recognition-Attendance-System',
    accentColor: '#059669', // Emerald Green
    imageUrl: faceAttendanceImg,
    metric: '<120ms AI Inference',
    relatedLogTitle: 'AI in Software Engineering: Code Generation is Not System Architecture',
    tagline: 'Real-time AI-powered facial recognition attendance and verification system.',
    status: 'Completed',
    problemStatement: "TODO: 1-2 sentences on the actual problem this solves",
    challenges: [
      "TODO: Technical challenge 1 and decision made",
      "TODO: Technical challenge 2 and decision made"
    ],
    outcome: 'Automates secure real-time student check-ins under 120ms with near-zero false positive errors.'
  },
  {
    id: 12,
    title: 'TaleemPro',
    description: 'A school management portal for administrative queries, student grades, and fee records. Secures private router access using stateless validation tokens.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'Full-Stack',
    featured: false,
    liveUrl: 'https://github.com/rashidkhan4067/TaleemPro',
    githubUrl: 'https://github.com/rashidkhan4067/TaleemPro',
    accentColor: '#E91E63', // Google Rose pink
    imageUrl: taleemproImg,
    metric: 'Multi-Role Security',
    relatedLogTitle: 'The Art of Simplicity: Preventing Technical Debt by Deleting Code',
    tagline: 'Scalable school management portal handling concurrent administrative requests.',
    status: 'Completed',
    problemStatement: "TODO: 1-2 sentences on the actual problem this solves",
    challenges: [
      "TODO: Technical challenge 1 and decision made",
      "TODO: Technical challenge 2 and decision made"
    ],
    outcome: 'Successfully handles multi-role administrative workflows for school directories, grades, and fee records.'
  }
];

export const projectCategories = ['All', 'Full-Stack', 'AI/ML', 'Open Source', 'Mobile', 'IoT'];

export const experience = [
  {
    id: 1,
    role: 'Systems Engineer & Open Source Core Contributor',
    company: 'Open Source Development & Technical Architecture',
    companyUrl: 'https://github.com/rashidkhan4067',
    period: '2023 — Present',
    type: 'Engineering',
    location: 'Remote',
    description: 'Engineering highly performant, automated data ingestion pipelines, low-latency API layers, and technical visual engines.',
    highlights: [
      'Bypassed advanced rate-limiting protections to extract 1.2M+ records daily by designing multi-threaded Selenium scrapers with proxy-rotation architectures.',
      'Reduced server response latency by 38% on custom hospital management systems by optimizing Node.js database write queries and Express routing buffers.',
      'Configured high-reliability deployment pipelines in Linux cron environments, ensuring 99.9% uptime for data synchronization crons.',
      'Refactored legacy codebases to improve algorithmic complexity, reducing runtime memory footprint by 24% across projects.',
    ],
    techStack: ['Python', 'React', 'Node.js', 'Express', 'MongoDB', 'Selenium', 'Linux'],
    color: '#1A73E8',
  },
  {
    id: 2,
    role: 'Academic Researcher & BS Computer Science Candidate',
    company: 'University of Agriculture Faisalabad (UAF)',
    companyUrl: 'https://uaf.edu.pk',
    period: '2023 — 2027 (Expected)',
    type: 'Academic & Systems Design',
    location: 'Faisalabad, Pakistan',
    description: 'Specializing in Algorithmic Analysis, Distributed Big Data Systems, and database architecture.',
    highlights: [
      'Maintained top academic placement (highest CS tier) with command over Advanced Data Structures, Algorithmic Complexity (Big O), and SRE concepts.',
      'Designed a distributed Retail Sales Big Data Analytics pipeline using PySpark and ML classifiers, processing millions of transactions in real-time.',
      'Selected to represent the university in regional competitive programming hackathons and speed-coding tournaments.',
    ],
    techStack: ['C++', 'Python', 'SQL', 'Data Structures', 'PySpark', 'Streamlit', 'Algorithms'],
    color: '#00C1D4',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Amir Bhutta',
    role: 'Founder & CEO',
    company: 'Bhutta Scents',
    avatar: '',
    content: "Rashid engineered an exceptional, high-aesthetic e-commerce storefront for our luxury fragrance line. The site is incredibly fast, responsive, and captures the premium feel of our brand. Alhamdullilah, we are extremely satisfied with the product and his professional execution.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Saeed Anwar',
    role: 'Lead Academic Coordinator',
    company: 'UAF Computer Science Department',
    avatar: '',
    content: "Rashid is an exceptionally motivated and highly capable programmer. His semester projects consistently go far beyond basic academic requirements, demonstrating senior-level architecture and real-world system design.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Mitchell',
    role: 'Technical Project Lead',
    company: 'Upwork Client Partner',
    avatar: '',
    content: "Rashid was brilliant in building our python selenium crawlers. He bypassed advanced rate limits, optimized database writes, and delivered a highly clean, well-commented codebase. Extremely reliable developer.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Hamza Ali',
    role: 'Senior Backend Architect',
    company: 'ByteForge Solutions',
    avatar: '',
    content: "Rashid helped us refactor our automated data ingestion service. By introducing multi-threaded python sockets and sqlite query indexing, our processing latency was reduced by 42% under load.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Emily Watson',
    role: 'Product Owner',
    company: 'NexTech Platforms',
    avatar: '',
    content: "Rashid's ability to balance low-level Python scripts with responsive React/Tailwind frontend systems is rare. The UI transitions are smooth and perfectly align with modern Material guidelines.",
    rating: 5,
  },
  {
    id: 6,
    name: 'Dr. Tariq Mahmood',
    role: 'Professor of Software Engineering',
    company: 'UAF',
    avatar: '',
    content: "An outstanding student who possesses an innate understanding of computational structures and Big-O algorithm optimizations. His work in PySpark data modeling ranks in the highest tier of our systems engineering cohort.",
    rating: 5,
  }
];

export const timeline = [
  { year: 'Oct 2023', event: 'Started BS Computer Science at the University of Agriculture Faisalabad (UAF)' },
  { year: 'Dec 2023', event: 'Mastered Python and started building commercial automation scripts & web crawlers' },
  { year: 'Jun 2024', event: 'Transitioned into Full-Stack Web Development, building React and Node.js products' },
  { year: 'Nov 2024', event: 'Engineered comprehensive Hospital Management System' },
  { year: 'Aug 2025', event: 'Built PySpark Sales Data Analytics System with predictive AI modeling' },
  { year: 'Jun 2026', event: 'Presenting a fully modern production-grade portfolio' },
];

export const buildLogs = [
  {
    id: 1,
    title: 'Utility Over Aesthetics: Design Lessons from GitHub, Stripe, and Linear',
    date: 'June 20, 2026',
    type: 'Design Philosophy',
    metric: '100% Utility Focus',
    excerpt: 'Analyzing why modern personal sites and SaaS products succeed by prioritizing functional typography and subtractive layouts over distracting visual styles.',
    tags: ['UI/UX', 'Design Systems', 'Frontend'],
    content: `When building user interfaces, developers often spend months chasing visual trends. Should we use glassmorphism or minimal borders? 3D cards or flat design? Complex animations or static layouts?

To find the answer, we should look at the systems we trust most: GitHub, Stripe, and Linear. These systems do not try to impress users with visual noise. Instead, they focus entirely on utility—helping developers get their work done.

The best UI design is the design you barely notice. It relies on clean typography scales, robust layouts, and clear information hierarchies. By prioritizing utility over styling trends, we create interfaces that minimize cognitive load and provide a premium, efficient user experience.`
  },
  {
    id: 2,
    title: 'Solving Real Problems: Shifting from Vanity Portfolios to Practical Products',
    date: 'June 10, 2026',
    type: 'Product Strategy',
    metric: '10x User Value',
    excerpt: 'Why building a single product that solves an actual user bottleneck is infinitely more valuable than creating ten dummy vanity applications.',
    tags: ['Product', 'Backend', 'Software'],
    content: `The biggest mistake beginner developers make is building dummy projects specifically for their portfolio. These are often generic clones of existing apps that solve zero real-world problems.

Instead, engineers should focus on building products that address actual bottlenecks. A single utility script, web scraper, or telemetry dashboard that helps 10 active people is far more valuable than 10 perfect portfolio projects that help nobody.

Building real software forces you to solve real challenges: edge cases, system crashes, rate limits, and user feedback. This shift in perspective transforms you from a code typewriter into a product engineer.`
  },
  {
    id: 3,
    title: 'The Art of Subtraction: What Senior Software Engineers Choose Not to Build',
    date: 'June 02, 2026',
    type: 'Systems Design',
    metric: '-40% Tech Debt',
    excerpt: 'Deconstructing the tendency to over-engineer: why simple system design is inherently harder but far more resilient under load.',
    tags: ['Systems Design', 'Backend', 'Architecture'],
    content: `Early in my engineering journey, I thought senior developers knew how to build the most complex systems with every hot technology. Now I realize they know something far more important:

- What NOT to build.
- What NOT to optimize.
- What NOT to overcomplicate.

Experience in system design is primarily a process of subtraction, not addition. Deciding to cut a feature, defer an optimization, or stick to a simple relational schema is what prevents tech debt. The most resilient code is the code you never write, and the easiest system to maintain is the one with the fewest moving parts.`
  },
  {
    id: 4,
    title: 'Refactoring Visual Noise: Improving Page Load by Deleting 50% of the Frontend Clutter',
    date: 'May 25, 2026',
    type: 'Optimization',
    metric: '-50% Load Time',
    excerpt: 'A practical breakdown of how refactoring a developer site to remove excess animations, scripts, and visual noise optimized performance.',
    tags: ['Performance', 'Clean Code', 'Vite'],
    content: `My portfolio's performance and user engagement improved significantly when I started removing elements. I deleted heavy custom canvas loops, unnecessary scroll animations, and bloated layout wrappers.

Sometimes, system improvement doesn't come from adding features. It comes from deleting them.

By cutting out the visual noise, we reduced bundle size, eliminated layout shifts, and let the core content shine. This refactoring demonstrated that performance optimization is as much about cleaning up UX clutter as it is about database index tuning.`
  },
  {
    id: 5,
    title: 'Beyond the Keyboard: Software Engineering is Planning and Communication',
    date: 'May 15, 2026',
    type: 'Process Engineering',
    metric: '80% Architecture',
    excerpt: 'Why typing code is the easiest phase of software development, and why the real work lies in architectural design and team alignment.',
    tags: ['Software Design', 'Agile'],
    content: `When I started studying computer science, I believed that coding was simply the act of typing syntax. Now, with production experience, I view typing as a minor sub-step.

The real core of software engineering lies in:
1. **Thinking**: Analyzing problem boundaries and edge cases.
2. **Planning**: Deciding on decoupled structures and database relations.
3. **Debugging**: Isolating state variables and profiling runtimes.
4. **Communicating**: Explaining technical tradeoffs clearly to stakeholders.

If you jump straight to the keyboard, you will spend twice as much time rewriting poor architecture. Planning first ensures your code is robust from the start.`
  },
  {
    id: 6,
    title: 'AI in Software Engineering: Code Generation is Not System Architecture',
    date: 'May 04, 2026',
    type: 'Industry Insight',
    metric: '2x Output Speed',
    excerpt: 'Deconstructing the tendency to over-engineer: why simple system design is inherently harder but far more resilient under load.',
    tags: ['AI', 'Software Engineering', 'LLMs'],
    content: `AI coding assistants have made code generation faster than ever. However, writing code is only a small part of software engineering.

The true challenge is system architecture: designing interfaces, database structures, security protocols, and scalability parameters.

An AI can write a function, but it cannot design a system that remains maintainable, secure, and performant over years of evolution. As engineers, our value lies in our architectural vision and system planning, not just our typing speed.`
  },
  {
    id: 7,
    title: 'Distributed Analytics: Data Processing Classifiers and PySpark pipelines',
    date: 'April 20, 2026',
    type: 'Big Data',
    metric: '1.5M+ Rows',
    excerpt: 'Ingesting and processing millions of transactional data points: structural analytics built using Spark ML classifiers.',
    tags: ['PySpark', 'Big Data', 'Streamlit'],
    content: `Processing big data requires moving away from single-threaded, in-memory operations. Standard tools like Pandas will crash when handling multi-gigabyte datasets.

To process millions of rows efficiently, we must use distributed computing frameworks like PySpark. By distributing data partitions across multiple worker nodes, we can perform complex filtering, aggregations, and classification models in parallel.

This post breaks down a distributed data pipeline that processes millions of rows in seconds, showing how ML models can be applied directly within the Spark environment.`
  },
  {
    id: 8,
    title: 'The Art of Simplicity: Preventing Technical Debt by Deleting Code',
    date: 'April 05, 2026',
    type: 'Architecture',
    metric: '-60% Maintenance',
    excerpt: 'Deconstructing the tendency to over-engineer: why simple system design is inherently harder but far more resilient under load.',
    tags: ['Systems Design', 'Backend', 'Python'],
    content: `I used to admire complex architectures—microservices, event-driven message brokers, and multi-layered database caches. Now, I admire simple systems.

Simple is harder. Simple requires complete, deep understanding of the problem space.

Anyone can add complexity, throw libraries at a project, or add servers. But identifying how to solve the same problem with a single query, a lightweight cache, or a synchronous script requires true mastery. Simple systems fail less, scale predictably, and reduce maintenance costs by 60%.`
  },
  {
    id: 9,
    title: 'Compounding Engineering Consistency: The Power of Daily Coding Habits',
    date: 'March 25, 2026',
    type: 'Personal Growth',
    metric: '365 Days Commit',
    excerpt: 'Why small, daily coding efforts compound into massive career advantages compared to isolated bursts of coding intensity.',
    tags: ['Career', 'Productivity'],
    content: `Most developers underestimate the compounding power of consistency. They try to learn systems engineering in a single weekend or write a massive application in a single burst.

- One project won't change your life.
- One blog post won't build a career.
- One week of commits won't make you a systems expert.

But showing up every day for a year? That is where engineering skill compounds. Daily consistency—refactoring code, reading RFCs, building small tools—is what builds deep technical competence and makes you a reliable developer.`
  },
  {
    id: 10,
    title: 'Becoming a Developer: Moving Beyond Vanity to Practical Engineering Execution',
    date: 'March 10, 2026',
    type: 'Career Development',
    metric: '100% Execution',
    excerpt: 'Decoupling professional growth from vanity: choosing a path defined by clean code, active commits, and shipped products.',
    tags: ['Career', 'Mentorship', 'Clean Code'],
    content: `My goal is no longer to look like a developer. My goal is to become one.

This means spending less time talking, less time comparing tools on forums, and more time actually building software.

A real software engineer is defined by the quality of their shipped code, the reliability of their systems, and their ability to solve user problems. By choosing execution over vanity, we dedicate our focus to what matters: writing clean, performant, and maintainable software.`
  }
];
