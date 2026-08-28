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
    newsletter: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7495340020820512769',
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
    relatedLogTitle: 'Eliminating Cumulative Layout Shift (CLS) on High-Resolution E-Commerce Grids',
    screenshots: [
      { label: 'Product Banner', url: bhuttaImageImg },
      { label: 'Product Details', url: bhuttaProductdetailsImg },
      { label: 'Collection Grid', url: bhuttaCollectionImg },
      { label: 'Storefront Catalog', url: bhuttaScientsImg }
    ],
    tagline: 'Premium e-commerce experience for luxury fragrances and curated scents.',
    status: 'Completed',
    problemStatement: 'Luxury perfume e-commerce demands an ultra-fast, visually immersive product discovery layout. Standard templates rely on heavy third-party UI component kits that bloat JavaScript bundles, trigger Cumulative Layout Shifts (CLS), and degrade mobile 4G conversions.',
    systemOverview: 'Decoupled, zero-bloat architecture: React 18 single-page application built with custom Vanilla CSS design tokens, an isolated Context state controller for local cart persistence, and WebP responsive image pipeline.',
    engineeringDecisions: [
      {
        decision: 'Custom Vanilla CSS Tokens over Tailwind / Component Kits',
        reason: 'Eliminated 80% of unnecessary CSS runtime overhead and provided 100% fine-grained control over layout stability and typography rendering.',
        tradeoff: 'Required manual authoring of responsive grid primitives and touch states.'
      },
      {
        decision: 'Isolated Context State with LocalStorage Debounced Sync',
        reason: 'Enables instant subtotal calculations and cart persistence with zero network round-trip delay on user click.',
        tradeoff: 'Required defensive client-side schema validation to prevent stale or corrupt local storage states.'
      },
      {
        decision: 'Aspect-Ratio Constrained Skeleton Shimmers',
        reason: 'Prevents Cumulative Layout Shift (CLS) during high-resolution fragrance asset decoding on mobile viewports.',
        tradeoff: 'Fixed aspect-ratio containers require consistent product photography crops.'
      }
    ],
    hardProblem: 'Cumulative Layout Shift (CLS) on High-Res Fragrance Images: Variable aspect-ratio banners caused intrusive viewport jumps during scroll on mobile browsers. Resolved by enforcing strict CSS aspect-ratio bounding boxes with skeleton shimmer placeholders before image decode.',
    whatWeCut: 'Intentionally omitted heavy third-party state libraries (Redux/Zustand); lightweight React Context + useReducer handled all cart mutation pathways with zero dependency weight.',
    challenges: [
      'Eliminated visual layout shifts by designing fixed-ratio bounding containers and shimmer skeletons before image decode.',
      'Constructed a lightweight React Context cart controller with debounced LocalStorage synchronization, ensuring sub-second response times on mobile devices.'
    ],
    outcome: 'Delivered a sub-second, 100% stable storefront resulting in 0 CLS layout shift, verified mobile responsiveness, and 100% client satisfaction.'
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
    accentColor: '#10B981',
    imageUrl: aiHmsImg,
    metric: '42% Latency Reduction',
    relatedLogTitle: 'Solving JWT Token-Refresh Race Conditions in React & Django REST Framework',
    tagline: 'AI-powered hospital management system with secure multi-role access control.',
    status: 'In Progress',
    problemStatement: 'Traditional healthcare clinics suffer from long patient intake queues, slow registration bottlenecks, and insecure role boundaries between patients, medical staff, and system administrators.',
    systemOverview: 'Full-stack 3-tier architecture: Modular Django REST Framework backend API managing business rules, normalized PostgreSQL database with UUID primary keys and email indexing, and a responsive React single-page frontend secured with stateless JWT token rotation.',
    engineeringDecisions: [
      {
        decision: 'Django REST Framework over Node/Express',
        reason: 'Built-in ORM security against SQL injection, strict schema validation via serializers, and declarative permission classes across multi-role endpoints.',
        tradeoff: 'Slightly higher memory baseline compared to lightweight Node runtimes.'
      },
      {
        decision: 'Stateless JWT with Token Rotation & Blacklisting',
        reason: 'Eliminates database lookup overhead on every authenticated API request while maintaining immediate session revocation capability on logout.',
        tradeoff: 'Requires client-side request queueing to prevent refresh token race conditions.'
      },
      {
        decision: 'Modular Monolith Architecture over Early Microservices',
        reason: 'Prevents distributed network latency, cross-service auth overhead, and infrastructure complexity while maintaining strict domain modularity.',
        tradeoff: 'Requires disciplined internal package boundaries to prevent code coupling.'
      }
    ],
    hardProblem: 'Token-Refresh Race Conditions: Concurrent asynchronous requests from the React dashboard were triggering multiple simultaneous refresh token requests with rotated single-use tokens, causing valid sessions to be prematurely blacklisted. Solved by implementing an Axios request queue that holds outgoing requests until a single refresh promise resolves.',
    whatWeCut: 'Intentionally omitted real-time WebSockets for appointment queues in V1; leveraged lightweight HTTP polling with conditional 304 headers to reduce infrastructure cost and server complexity.',
    challenges: [
      'Securing multi-role access control (Patients, Doctors, Admins) across the application with custom DRF permission classes and JWT blacklist validation.',
      'Eliminated auth race conditions by architecting an Axios background request queue that buffers concurrent calls during token rotation.'
    ],
    outcome: 'Completed Milestone 1 (Auth & Authorization), reducing patient check-in onboarding latency by 42% and eliminating auth session leaks across all user tiers.',
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
    relatedLogTitle: 'Eliminating Cumulative Layout Shift (CLS) on High-Resolution E-Commerce Grids',
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
    relatedLogTitle: 'Debugging Spark Partition Skew & Memory Spills in 10M+ Row PySpark Pipelines',
    tagline: 'High-throughput big data pipeline and analytics dashboard processing 10M+ transaction rows.',
    status: 'Completed',
    problemStatement: 'Processing multi-million row transactional datasets causes single-threaded analytics tools (e.g. Pandas) to trigger memory spills, driver crashes, and unscalable execution times during complex joins and forecasting aggregations.',
    systemOverview: 'Distributed data engineering pipeline: Apache Spark (PySpark) worker cluster executing parallelized data ingestion, feature transformation, and ML predictive classifiers, visualized through an interactive Streamlit telemetry dashboard.',
    engineeringDecisions: [
      {
        decision: 'PySpark Distributed Processing over In-Memory Pandas',
        reason: 'Distributes dataset partitions across worker nodes, enabling sub-second filtering and group-by aggregations on 10M+ rows without memory exhaustion.',
        tradeoff: 'Higher driver initialization overhead for small datasets (<10k rows).'
      },
      {
        decision: 'Synthetic Key Salting on Categorical Joins',
        reason: 'Eliminated severe Spark partition skew during regional sales join operations by evenly spreading hot keys across executor slots.',
        tradeoff: 'Requires an extra post-join aggregation step to strip synthetic salts.'
      },
      {
        decision: 'Scheduled Batch Ingestion over Streaming Broker',
        reason: 'Periodic cron-triggered batch execution met business requirements at 1/10th the infrastructure cost of a 24/7 Kafka cluster.',
        tradeoff: 'Data updates on hourly intervals rather than sub-second real-time.'
      }
    ],
    hardProblem: 'Spark Executor Partition Skew & Memory Spills: Heavily skewed regional transaction keys were overloading single executor nodes, causing Out-Of-Memory (OOM) task failures. Resolved by analyzing Spark UI execution DAGs and implementing synthetic key salting with custom repartition thresholds.',
    whatWeCut: 'Intentionally avoided deploying an expensive Apache Kafka cluster; scheduled batch jobs on Linux cron intervals fulfilled all analytical SLA targets.',
    challenges: [
      'Identified and resolved Spark executor partition skew on heavily imbalanced regional transaction records via synthetic key salting.',
      'Constructed distributed feature engineering pipelines feeding Spark ML decision-tree classifiers for profit forecasting.'
    ],
    outcome: 'Processed over 10M+ transaction rows in under 1.5 seconds runtime, delivering accurate profit forecasts with 0 memory spillover.'
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
    relatedLogTitle: 'Designing Fault-Tolerant Serial Protocol Buffers for Arduino & Python IoT Networks',
    tagline: 'IoT fluid telemetry system and real-time desktop monitoring dashboard.',
    status: 'Completed',
    problemStatement: 'Remote fluid distribution networks suffer from undetected pipe leaks, pump failures, and lack of unified telemetry visualization across distributed sensor nodes.',
    challenges: [
      'Engineered low-power serial communication protocols in C++ on Arduino microcontrollers to sample ultrasonic flow and level sensors.',
      'Constructed a multi-threaded Python monitoring dashboard to aggregate live sensor feeds and trigger threshold alerts with 99.9% uptime.'
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
    relatedLogTitle: 'Preventing Race Conditions in Patient Bed Allocations with Atomic SQLite Transactions',
    tagline: 'High-security patient management portal and Express REST API.',
    status: 'Completed',
    problemStatement: 'Manual paper registration in clinics leads to slow admissions, lost patient records, and doctor scheduling collisions.',
    challenges: [
      'Designed atomic SQLite transaction models with parameterized query sanitization to prevent race conditions during concurrent bed bookings.',
      'Constructed an Express.js API gateway with custom validation middleware to authenticate staff and manage doctor shift rosters.'
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
    relatedLogTitle: 'Achieving Locked 60 FPS in D3 & React Graph Pathfinding Visualizations',
    tagline: 'Algorithmic visualization engine demonstrating pathfinding and custom structures.',
    status: 'Completed',
    problemStatement: 'Understanding complex graph traversal algorithms (Dijkstra, A*, BFS/DFS) is difficult without interactive step-by-step frame execution.',
    challenges: [
      'Optimized DOM re-render pipelines using requestAnimationFrame to render dynamic pathfinding grid updates at a locked 60 FPS.',
      'Engineered custom state-machine step controllers allowing users to pause, rewind, and inspect algorithm call stacks.'
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
    relatedLogTitle: 'Optimizing OpenCV & Keras Frame Pipelines for Sub-120ms Real-Time AI Inference',
    tagline: 'Real-time AI-powered facial recognition attendance and verification system.',
    status: 'Completed',
    problemStatement: 'Manual roll-call in university lecture halls consumes up to 15 minutes of class time and allows buddy-punching proxy attendance.',
    challenges: [
      'Optimized OpenCV Haar Cascade face detection pipeline and Keras embeddings to achieve sub-120ms inference latency per video frame.',
      'Implemented anti-spoofing liveness detection heuristics to reject static 2D photo spoof attempts.'
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
    relatedLogTitle: 'Solving JWT Token-Refresh Race Conditions in React & Django REST Framework',
    tagline: 'Scalable school management portal handling concurrent administrative requests.',
    status: 'Completed',
    problemStatement: 'Educational institutions struggle with slow grade entry, paper fee slips, and lack of role-segregated parent/teacher portals.',
    challenges: [
      'Implemented stateless JWT authentication with role-based routing middleware in Node/Express.',
      'Constructed MongoDB aggregations to compute class grade distributions and outstanding fee summaries under 50ms.'
    ],
    outcome: 'Successfully handles multi-role administrative workflows for school directories, grades, and fee records.'
  }
];

export const projectCategories = ['All', 'Full-Stack', 'AI/ML', 'Open Source', 'Mobile', 'IoT'];

export const experience = [
  {
    id: 1,
    role: 'Software Engineer — Full-Stack & AI Systems',
    company: 'Independent / Open-Source Engineering',
    companyUrl: 'https://github.com/rashidshafique-dev',
    period: '2023 — Present',
    type: 'Employment',
    location: 'Faisalabad, Pakistan / Remote',
    metric: '42% Latency Optimized',
    description: 'Architecting and shipping production-grade Python backend services, secure REST APIs, and full-stack web and cross-platform mobile applications.',
    highlights: [
      'Architected and shipped production-grade Python backend services (Django, DRF, FastAPI) applying OOP design patterns and modular software principles for clean, maintainable codebases.',
      'Designed optimized SQL schemas, normalization models, and indexing strategies to minimize API response latency by 42% and eliminate redundant database round-trips.',
      'Engineered secure authentication systems using stateless JWT tokens with auto-rotation/blacklisting and Google OAuth 2.0 Single Sign-On (SSO).',
      'Built responsive, production-deployed frontends in React.js (Vite, Tailwind CSS, CSS Modules) and cross-platform mobile apps in React Native (Expo), shipping to Vercel and Railway.',
    ],
    techStack: ['Django', 'DRF', 'FastAPI', 'Python', 'React.js', 'React Native', 'PostgreSQL', 'SQL', 'JWT', 'Google OAuth 2.0', 'Supabase', 'Firebase', 'Vercel'],
    color: '#1A73E8',
  },
  {
    id: 2,
    role: 'Bachelor of Science in Computer Science (BS CS)',
    company: 'University of Agriculture Faisalabad (UAF)',
    companyUrl: 'https://uaf.edu.pk',
    period: 'Sept 2023 — 2027 (Expected)',
    type: 'Education',
    location: 'Faisalabad, Pakistan',
    metric: 'Top Academic Tier',
    description: 'Rigorous academic coursework and deep research focus in Data Structures, Algorithmic Analysis, and Relational Database Optimization.',
    highlights: [
      'Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Relational Database Management Systems (RDBMS & SQL), Operating Systems, Software Engineering, Web Systems Architecture.',
      'Academic Focus: Algorithmic Time/Space Complexity (Big-O Analysis), Database Optimization, and Distributed Systems fundamentals.',
    ],
    techStack: ['Data Structures', 'Algorithms', 'OOP', 'RDBMS & SQL', 'Operating Systems', 'Software Engineering', 'C++', 'Python'],
    color: '#1A73E8',
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
    title: 'Solving JWT Token-Refresh Race Conditions in React & Django REST Framework',
    date: 'June 20, 2026',
    type: 'Auth & Security',
    metric: '0 Session Drops',
    excerpt: 'How concurrent asynchronous API calls during single-use token rotation caused user session blacklisting in Al Shifaa Clinic, and how architecting an Axios promise queue resolved it.',
    tags: ['Django', 'React', 'JWT', 'Security', 'Backend'],
    content: `When architecting the authentication layer for Al Shifaa Clinic (AI-HMS), we implemented stateless JWT authentication with single-use refresh token rotation and blacklisting to ensure maximum security.

### The Problem: Concurrent Request Race Conditions
In a modern React dashboard, multiple components mount simultaneously and fire independent API calls (e.g. fetching user profile, appointment schedules, and notifications in parallel). When the access token expires:
1. Three concurrent requests fail with HTTP 401.
2. All three requests intercept the error and simultaneously invoke the \`/api/token/refresh/\` endpoint with the same single-use refresh token.
3. The first refresh request succeeds and rotates the refresh token.
4. The second and third requests hit the server with the old refresh token, which Django REST Framework correctly flags as a potential token replay attack and immediately blacklists the entire user session!

### The Solution: Mutex-Locked Axios Interceptor Queue
To resolve this without adding stateful server sessions, we engineered an asynchronous request buffer inside our global Axios interceptor:

- Maintain an \`isRefreshing\` boolean flag and a \`failedQueue\` array.
- When the first 401 arrives, set \`isRefreshing = true\` and initiate a single token refresh promise.
- Any subsequent 401 requests that arrive while \`isRefreshing\` is true are pushed into \`failedQueue\` with their resolve/reject callbacks.
- Once the primary refresh promise resolves with the new access token, update the default authorization header, replay all queued requests with the fresh token, and clear the queue.

This completely eliminated authentication race conditions, ensuring seamless session continuity across all multi-role dashboards.`
  },
  {
    id: 2,
    title: 'Eliminating Cumulative Layout Shift (CLS) on High-Resolution E-Commerce Grids',
    date: 'June 12, 2026',
    type: 'Frontend Performance',
    metric: '0.00 CLS Score',
    excerpt: 'Refactoring the Bhutta Scents luxury product catalog from bloated UI libraries to Vanilla CSS tokens with fixed aspect-ratio bounding boxes, cutting mobile bundle size by 80%.',
    tags: ['React', 'Vanilla CSS', 'Web Vitals', 'Performance'],
    content: `For luxury e-commerce brands like Bhutta Scents, visual presentation and high-resolution product photography are critical to conversion rates. However, initial prototypes suffered from noticeable Cumulative Layout Shift (CLS) and sluggish load times on mobile 4G connections.

### The Bottleneck: Unbounded Image Decoding
When browsing the fragrance collection on mobile viewports:
1. Product images with varying original dimensions (1200x1600, 1080x1080) caused parent cards to repeatedly recalculate their bounding heights as images downloaded.
2. This created distracting page jumps while users were scrolling, leading to poor Core Web Vitals scores (CLS > 0.28).
3. Third-party UI component kits added unnecessary JavaScript runtime overhead, increasing Total Blocking Time (TBT).

### The Architectural Refactoring
1. **Strict Aspect-Ratio Bounding Boxes**: Enforced modern CSS \`aspect-ratio: 4 / 5\` containers across all product card components. The browser reserves exact pixel dimensions prior to network response arrival.
2. **Low-Weight Shimmer Skeletons**: Applied lightweight CSS keyframe shimmers inside image placeholders to maintain visual continuity.
3. **WebP Responsive Image Pipeline**: Converted heavy source assets into compressed \`.webp\` formats with responsive \`srcset\` tags, cutting payload size from 2.8MB down to <180KB per card.
4. **Vanilla CSS Token System**: Replaced heavy external UI frameworks with scoped CSS Modules and custom variables, reducing the stylesheet bundle by 80%.

The result was a locked 0.00 CLS score, instant sub-second page transitions, and a premium, responsive feel on all mobile devices.`
  },
  {
    id: 3,
    title: 'Debugging Spark Partition Skew & Memory Spills in 10M+ Row PySpark Pipelines',
    date: 'June 04, 2026',
    type: 'Data Engineering',
    metric: '10M+ Rows <1.5s',
    excerpt: 'Diagnosing Out-Of-Memory (OOM) executor crashes on imbalanced categorical joins in Apache Spark, and eliminating partition hotspots using synthetic key salting.',
    tags: ['PySpark', 'Big Data', 'Distributed Systems', 'Python'],
    content: `While building the Sales Data Analysis System to ingest and forecast trends across 10M+ transactional records, we encountered severe execution bottlenecks during multi-dataset join operations.

### The Bottleneck: Spark Partition Skew
When joining transactional tables with regional customer lookup tables on \`region_id\`:
- A single region (e.g. high-volume urban center) accounted for over 45% of total transactions.
- During Spark's shuffle hash join, all records with that hot key were hashed to a single executor node.
- While 7 worker nodes finished their tasks in 200ms, the overloaded node ran out of JVM heap memory, spilled partitions to disk, and eventually triggered an Out-Of-Memory (OOM) failure.

### The Solution: Synthetic Key Salting & Repartitioning
To distribute the computational workload evenly across the cluster:
1. **Salting the Skewed Key**: Appended a pseudo-random integer suffix (\`0\` to \`K-1\`, where \`K\` = cluster parallelism factor) to the hot join key in the primary transactional DataFrame:
   \`\`\`python
   df = df.withColumn("salted_key", concat(col("region_id"), lit("_"), (rand() * K).cast("int")))
   \`\`\`
2. **Exploding the Lookup Dimension**: Replicated corresponding rows in the smaller dimension table across all \`K\` synthetic salt values.
3. **Executing the Salted Join**: Performed the join on \`salted_key\`, spreading the hot partition uniformly across all executor slots.
4. **Stripping Synthetic Salts**: Removed the salt suffix in the final aggregation stage.

This eliminated partition hotspots, reduced overall join latency from 18 seconds down to 1.4 seconds, and completely prevented memory spillover.`
  },
  {
    id: 4,
    title: 'Architecting Multi-Threaded Python Scrapers with Rotating Proxy Gateways',
    date: 'May 26, 2026',
    type: 'Backend Systems',
    metric: '1.2M+ Daily Ingestion',
    excerpt: 'Bypassing aggressive anti-bot fingerprinting and rate limits to extract 1.2M+ records daily using Selenium, headless Chromium worker pools, and Linux crons.',
    tags: ['Python', 'Automation', 'Selenium', 'Linux', 'Backend'],
    content: `Commercial web scraping at enterprise scale requires navigating complex anti-scraping defenses: IP rate-limiting, Cloudflare TLS fingerprinting, dynamic DOM mutations, and memory leaks in long-running headless browser sessions.

### Key Engineering Architecture
1. **Headless Browser Pool Management**: Spawning new Chrome instances per request causes high memory thrashing. We engineered a reusable worker pool that recycles browser processes after 50 requests to prevent Chromium memory leaks.
2. **Rotating Proxy Gateway with Exponential Backoff**: Routed all outgoing requests through an automated proxy rotation layer. If an IP encounters HTTP 429 (Too Many Requests) or Cloudflare verification challenges, the request automatically falls back to a fresh proxy with jittered exponential backoff.
3. **Decoupled DOM Extraction**: Avoided brittle XPath queries by designing structural CSS selector extractors paired with defensive fallbacks and schema validation.
4. **Linux Cron Scheduling**: Configured automated background ingestion scripts on scheduled cron intervals, maintaining 99.9% uptime and extracting over 1.2M+ records daily.`
  },
  {
    id: 5,
    title: 'Designing Fault-Tolerant Serial Protocol Buffers for Arduino & Python IoT Networks',
    date: 'May 15, 2026',
    type: 'IoT & Systems',
    metric: '99.9% Sensor Uptime',
    excerpt: 'Overcoming serial port buffer overruns and corrupted packet streams in real-time ultrasonic fluid monitoring through lightweight checksum framing in C++ and Python.',
    tags: ['C++', 'IoT', 'Python', 'Serial Comms'],
    content: `In the AquaSync fluid telemetry project, remote Arduino microcontroller nodes continuously sample ultrasonic water level and flow-rate sensors and stream telemetry data over hardware serial connections to a centralized Python telemetry daemon.

### The Challenge: Serial Stream Desynchronization
Raw serial streams (UART) are asynchronous byte sequences without inherent packet boundary guarantees. Under electrical noise or high baud rates:
- Partial bytes caused misalignment in multi-byte integer decoding.
- Buffer overruns in the Python receiver caused packet drift and dropped sensor alarms.

### The Solution: Framed Packet Protocol
We designed a lightweight framed packet structure:
\`[START_BYTE (0xAA)] [NODE_ID (1B)] [SENSOR_VAL (4B)] [CHECKSUM (1B)] [END_BYTE (0x55)]\`

- **C++ Microcontroller Layer**: Formats sensor readings into binary packet frames with XOR parity checksums.
- **Python Daemon Layer**: Implements a sliding byte-buffer window that hunts for \`START_BYTE\`, validates the payload against the checksum, and discards malformed frames before updating the live Tkinter telemetry dashboard.

This eliminated sensor packet corruption and maintained 99.9% uptime across active device connections.`
  },
  {
    id: 6,
    title: 'Optimizing OpenCV & Keras Frame Pipelines for Sub-120ms Real-Time AI Inference',
    date: 'May 02, 2026',
    type: 'AI & Computer Vision',
    metric: '<120ms AI Inference',
    excerpt: 'Reducing frame-copy bottlenecks and CPU memory overhead during live video streams for automated classroom facial recognition and anti-spoofing verification.',
    tags: ['OpenCV', 'TensorFlow', 'Python', 'AI'],
    content: `Building real-time facial recognition attendance systems requires processing high-frame-rate video feeds without UI freeze or frame stuttering.

### The Bottleneck: In-Memory Frame Copying
Processing full 1080p camera frames directly through deep neural networks (Keras/TensorFlow) saturated the CPU, dropping video throughput to 8 FPS with an inference latency exceeding 450ms per frame.

### The Optimization Pipeline
1. **Multi-Threaded Video Ingestion**: Decoupled camera frame reading into a dedicated background I/O thread, ensuring the camera buffer never overflows.
2. **Spatial Downsampling for Detection**: Passed a 0.25x downsampled grayscale frame into OpenCV Haar Cascades for initial face bounding-box localization.
3. **Region of Interest (ROI) Cropping**: Only cropped bounding boxes were normalized and passed to the Keras embedding network, reducing convolutional matrix multiplications by 90%.
4. **Cosine Similarity Vector Caching**: Pre-computed 128-dimensional facial embedding vectors for enrolled students and stored them in indexed memory buffers for instant vector dot-product matching.

These optimizations reduced end-to-end inference latency to <120ms per face while maintaining locked 30 FPS video playback.`
  },
  {
    id: 7,
    title: 'Preventing Race Conditions in Patient Bed Allocations with Atomic SQLite Transactions',
    date: 'April 18, 2026',
    type: 'Database Systems',
    metric: '0 Double-Bookings',
    excerpt: 'Structuring parameterized query buffers and ACID isolation levels in Express.js and SQLite to guarantee zero double-bookings during peak hospital admission surges.',
    tags: ['SQL', 'Express', 'Node.js', 'Databases', 'Backend'],
    content: `In the MediCare Hospital Management portal, bed and room allocation is a high-concurrency operation during emergency intake surges. If two receptionists simultaneously allocate the last available bed to different patients, an uncoordinated database write causes double-booking.

### The Solution: Atomic ACID Isolation
1. **Immediate Transaction Locks**: Wrapped bed status checking and allocation updates inside an atomic \`BEGIN IMMEDIATE TRANSACTION\` block in SQLite.
2. **Write-Ahead Logging (WAL)**: Enabled SQLite WAL mode (\`PRAGMA journal_mode=WAL\`), allowing concurrent read queries to proceed without being blocked by active write transactions.
3. **Parameterized Sanitization**: All incoming patient IDs and room numbers are strictly sanitized via parameterized queries to eliminate SQL injection vulnerabilities.

This guaranteed absolute transactional consistency with zero double-booking occurrences across 150+ daily hospital admissions.`
  },
  {
    id: 8,
    title: 'Achieving Locked 60 FPS in D3 & React Graph Pathfinding Visualizations',
    date: 'April 02, 2026',
    type: 'Algorithms & Frontend',
    metric: '60 FPS @ 10k Nodes',
    excerpt: 'Bypassing React virtual DOM reconciliation overhead to animate complex graph structures (Dijkstra, A*) at 60 FPS using direct canvas rendering and requestAnimationFrame.',
    tags: ['Algorithms', 'React', 'D3.js', 'Performance'],
    content: `Algorithmic visualization engines like Algoviz-pro need to render thousands of node state updates (unvisited, open set, closed set, shortest path) every second during Dijkstra and A* traversals.

### The Bottleneck: Virtual DOM Overhead
Managing 10,000 grid nodes as individual React components caused massive DOM tree re-render cycles, dropping frame rates below 15 FPS during search expansions.

### The Solution: Canvas Layering & RequestAnimationFrame
1. **Decoupling Algorithm from Render Loop**: Separated the core graph search logic into an asynchronous generator function that yields visited node coordinates.
2. **Direct Canvas Rendering**: Bypassed React DOM reconciliation entirely by rendering node states onto an HTML5 Canvas context.
3. **AnimationFrame Throttling**: Batched coordinate updates and flushed them to the canvas using \`window.requestAnimationFrame\`, locking the animation pipeline at a smooth 60 FPS even on large 10,000-node graph grids.`
  }
];
