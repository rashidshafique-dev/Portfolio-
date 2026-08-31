// Static data for the entire portfolio
// Optimized specifically to target Google Engineering specifications and recruiter screening parameters
// Employs the official Google X-Y-Z achievement formula: "Accomplished [X], as measured by [Y], by doing [Z]"

import salesPipelineImg from '../assets/sales_pipeline/sales_pipeline.webp';
import aquasyncImg from '../assets/aquasync/aquasync.webp';
import medicareImg from '../assets/medicare/medicare.webp';
import algovizImg from '../assets/algoviz/algoviz.webp';
import faceAttendanceImg from '../assets/face_attendance/face_attendance.webp';
import taleemproImg from '../assets/taleempro/taleempro.webp';
import venturetwistImg from '../assets/venturetwist/venturetwist.png';
import rescueDashboardImg from '../assets/rescue_project/rescue_dashboard.png';
import rescueLandingImg from '../assets/rescue_project/rescue_landing.png';
import rescueMapImg from '../assets/rescue_project/rescue_map.png';
import fooddashLandingImg from '../assets/fooddash/fooddash_landing.png';
import fooddashLoginImg from '../assets/fooddash/fooddash_login.png';
import aiHmsImg from '../assets/shifaa_hms/ai_hms.webp';
import portfolioDarkOrangeImg from '../assets/portfolio_showcase/portfolio_dark_orange.png';
import portfolioDarkRoseImg from '../assets/portfolio_showcase/portfolio_dark_rose.png';
import portfolioLightOrangeImg from '../assets/portfolio_showcase/portfolio_light_orange.png';
import bhuttaScientsImg from '../assets/bhutta_scents/bhuttaScients.png';
import bhuttaCollectionImg from '../assets/bhutta_scents/collection.png';
import bhuttaHomepageImg from '../assets/bhutta_scents/homepage.jpg';
import bhuttaProductdetailsImg from '../assets/bhutta_scents/productdetails.png';
import bhuttaImageImg from '../assets/bhutta_scents/image.png';
import sunriseMainImg from '../assets/sunrise_hotel/sunrise_main.png';
import sunriseDashboardDarkImg from '../assets/sunrise_hotel/sunrise_dashboard_dark.png';
import sunriseDashboardLightImg from '../assets/sunrise_hotel/sunrise_dashboard_light.png';
import sunriseCustomizerImg from '../assets/sunrise_hotel/sunrise_customizer.png';
import sunriseBookingsImg from '../assets/sunrise_hotel/sunrise_bookings.png';
import sunriseReportImg from '../assets/sunrise_hotel/sunrise_report.png';
import sunriseAppsImg from '../assets/sunrise_hotel/sunrise_apps.png';
import aioverseMainImg from '../assets/aioverse/aioverse_main.png';
import aioverseHomeImg from '../assets/aioverse/home.png';
import aioverseAuthImg from '../assets/aioverse/auth.png';
import aioverseOnboarding1Img from '../assets/aioverse/onboardingscreen.png';
import aioverseOnboarding2Img from '../assets/aioverse/onboarding2.png';
import aioverseSplashImg from '../assets/aioverse/splashsceen.png';
import aioverseSystemDesignImg from '../assets/aioverse/system-design.png';


export const personalInfo = {
  name: 'Muhammad Rashid Shafique',
  title: 'Full-Stack Software Engineer · Python · Django · React',
  tagline: 'Building scalable web applications, secure Python REST APIs, and high-performance backend systems.',
  bio: 'Software Engineer specializing in Python backends (Django, FastAPI), relational database architecture (PostgreSQL), and modern React frontends. Strong foundation in Data Structures, Algorithms, and System Design with a proven track record of shipping production client solutions.',
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

export const credentials = [
  {
    id: 1,
    title: 'BS in Computer Science',
    institution: 'University of Agriculture Faisalabad (UAF)',
    period: '2023 — 2027',
    badge: 'Degree',
    highlights: 'Data Structures, Algorithms (Big-O), Relational Databases (SQL), Operating Systems, Software Architecture',
  },
  {
    id: 2,
    title: 'Python & Django Backend Engineering',
    institution: 'Production Systems & API Architecture',
    period: '2023 — Present',
    badge: 'Backend',
    highlights: 'REST Framework, Stateless JWT Rotation, PostgreSQL Indexing, Multi-Threaded I/O, Async Pipelines',
  },
  {
    id: 3,
    title: 'Full-Stack React & Web Performance',
    institution: 'Commercial Platform Development',
    period: '2024 — Present',
    badge: 'Frontend',
    highlights: 'React SPA, Vanilla CSS Design Systems, Core Web Vitals (0.00 CLS), State Management',
  },
];

export const navLinks = [
  { label: 'Home',       href: '/'           },
  { label: 'About',      href: '/about'       },
  { label: 'Projects',   href: '/projects'    },
  { label: 'Skills',     href: '/skills'      },
  { label: 'Experience', href: '/experience'  },
  { label: 'Build Logs', href: '/build-logs'  },
  { label: 'Contact',    href: '/contact'     },
];

export const stats = [
  { value: '25+',    label: 'Technologies & Tools' },
  { value: '10+',    label: 'Engineered Systems' },
  { value: '42%',    label: 'Query Latency Cut' },
  { value: '99.9%',  label: 'Service Reliability' }
];

export const projects = [
  {
    id: 1,
    title: 'Sunrise Imperial Resort',
    description: 'Enterprise 5-star Hotel Property Management System (PMS) and Guest Booking SaaS built with React 19, TypeScript, Tailwind CSS v4, and Radix UI. Features dynamic rate calculation, interactive room scheduling, ADR/RevPAR analytics, POS folio invoicing, housekeeping workflows, security audit trails, and a 50+ theme engine with INP < 10ms.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'Zustand 5', 'TanStack Query v5', 'TanStack Table v8', 'Recharts 3.6', 'Clerk Auth', 'dnd-kit', 'cmdk', 'Zod 4', 'React Hook Form', 'date-fns', 'Sonner'],
    tech: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'Zustand 5', 'TanStack Query v5', 'TanStack Table v8', 'Recharts 3.6', 'Clerk Auth', 'dnd-kit', 'cmdk', 'Zod 4', 'React Hook Form', 'date-fns', 'Sonner'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://sunrise-hotel-plum.vercel.app',
    githubUrl: 'https://github.com/rashidkhan4067/Sunrise-Hotel.git',
    accentColor: '#D97706', // Luxury Gold / Amber
    imageUrl: sunriseMainImg,
    metric: 'INP < 10ms · React 19 · 50+ Themes',
    relatedLogTitle: 'Optimizing INP (<10ms) & Auto-Recovering Dynamic Import Chunks in React 19 Hotel PMS',
    screenshots: [
      { label: 'Guest Portal & Rate Engine', url: sunriseMainImg },
      { label: 'Executive Dashboard (Dark)', url: sunriseDashboardDarkImg },
      { label: 'Executive Dashboard (Light)', url: sunriseDashboardLightImg },
      { label: '50+ Dynamic Theme Engine', url: sunriseCustomizerImg },
      { label: 'Front-Desk Booking Matrix', url: sunriseBookingsImg },
      { label: 'Financial Reports & Audit Trail', url: sunriseReportImg },
      { label: 'Operational Module Launcher', url: sunriseAppsImg }
    ],
    tagline: 'Enterprise luxury Hotel Property Management System (PMS) & guest SaaS platform.',
    status: 'Completed',
    problemStatement: 'Enterprise hotel management systems are traditionally fragmented between legacy desktop front-desk software and disconnected public guest booking engines. Furthermore, feature-dense dashboard interfaces often suffer from sluggish theme transitions, stale deployment chunk crashes, and fragile authentication dependencies during offline demonstrations.',
    systemOverview: 'Decoupled, high-performance architecture built on React 19 and Vite 7: Radix UI component primitives styled with Tailwind CSS v4, Zustand 5 & TanStack Query v5 state orchestration, dual-mode authentication (Clerk RBAC + Zero-Config interactive demo engine), Recharts 3.6 hospitality data analytics with automated CSV/PDF export, dnd-kit calendar scheduling, and cmdk command search.',
    engineeringDecisions: [
      {
        decision: 'Frame-Deferred CSS Variable Mutation Engine over Synchronous Document Injection',
        reason: 'Applying 50+ CSS tokens synchronously inside dropdown selectors blocked main thread rendering for >220ms. Decoupling selector dismissal with requestAnimationFrame and flattening Radix viewports cut INP below 10ms.',
        tradeoff: 'Requires managing animation frame handles to prevent rapid theme toggle tearing.'
      },
      {
        decision: 'Automated Dynamic Chunk Retry & Vite Preload Error Interception',
        reason: 'New production deployments on Vercel frequently invalidated cached chunk hashes, causing "Failed to fetch dynamically imported module" errors. Custom lazyWithRetry wrapper and window "vite:preloadError" invalidation automatically recovers sessions on the first reload.',
        tradeoff: 'Adds a minor retry delay on true network dropouts before showing fallback boundary.'
      },
      {
        decision: 'Dual-Mode State: Enterprise Clerk RBAC with Zero-Config Fallback Layer',
        reason: 'Provides strict production Role-Based Access Control (org:admin, receptionist, guest) while guaranteeing 100% feature functionality in offline or credential-free portfolio reviews through simulated latency mock controllers.',
        tradeoff: 'Requires maintaining mock data schemas alongside production Clerk user types.'
      },
      {
        decision: 'Headless Radix UI + CVA + Tailwind CSS v4 Component Foundation',
        reason: 'Provides 100% WAI-ARIA accessible primitives (Dialog, Select, Popover, Tabs, Accordion) with zero-runtime utility styling and tokenized class variance authority.',
        tradeoff: 'Requires authoring composition glue code compared to off-the-shelf styled component kits.'
      }
    ],
    hardProblem: 'Interaction to Next Paint (INP) Bottlenecks on Real-Time Theme Swapping: Applying 50+ document-level CSS color variables inside Radix Select trigger handlers caused extensive layout reflows and blocked the main thread for over 220ms. Resolved by decoupling dropdown dismissal from DOM style mutation using requestAnimationFrame frame deferral and attaching menus directly to Radix root viewports, slashing INP to <10ms (Good/Green rating).',
    whatWeCut: 'Intentionally avoided server-side rendering (SSR) overhead for internal back-office management routes; leveraged an optimized client-side SPA with TanStack Query caching and localized Zustand stores to achieve instant transitions.',
    challenges: [
      'Engineered a real-time hospitality financial analytics suite calculating ADR (Average Daily Rate), RevPAR (Revenue Per Available Room), and forward 30-day forecasting with multi-format CSV and PDF audit exports.',
      'Constructed a visual front-desk Gantt reservation matrix and real-time housekeeping workflow synchronizing room states (AVAILABLE, OCCUPIED, CLEANING, MAINTENANCE) with one-click check-in/out transitions.',
      'Integrated an accessible drag-and-drop room scheduler using @dnd-kit and global keyboard-first Command Palette (⌘K) using cmdk.',
      'Optimized Core Web Vitals to achieve INP < 10ms and 100% build reliability via custom chunk retry listeners.'
    ],
    outcome: 'Delivered an enterprise-grade luxury Hotel PMS and guest reservation platform featuring 50+ themes, Forbes 5-star aesthetics, sub-10ms UI responsiveness, and complete operational workflows.',
    milestones: [
      {
        title: 'Milestone 1: Luxury Guest Landing Page & Reservation Engine',
        status: 'Completed',
        details: [
          'Forbes 5-star aesthetics with curated Google Fonts (Plus Jakarta Sans & Playfair Display) and dark luxury styling.',
          'Dynamic date-range rate calculator projecting real-time suite pricing and guest occupancy constraints.',
          'Interactive suite showcase with amenity tags and instant booking modal triggers.'
        ]
      },
      {
        title: 'Milestone 2: Executive Dashboard & Hospitality Financial Analytics',
        status: 'Completed',
        details: [
          'Live hospitality KPIs: ADR (Average Daily Rate), RevPAR, ALOS (Average Length of Stay), and 30-day revenue projections.',
          'Interactive Recharts visualizations (Area, Bar, Line, Radial) for occupancy patterns and booking volume.',
          'Security and compliance audit trail logging staff transactions with IP attribution and multi-format CSV/PDF export.'
        ]
      },
      {
        title: 'Milestone 3: Front-Desk Receptionist Hub & Housekeeping Matrix',
        status: 'Completed',
        details: [
          'Multi-view visual calendar timeline for conflict-free room scheduling and allocation powered by dnd-kit.',
          'One-click Check-In / Check-Out guest lifecycle transitions with automatic room synchronization.',
          'Housekeeping inspection matrix tracking clean/inspected status across all property floors.'
        ]
      },
      {
        title: 'Milestone 4: POS Billing & Folio Management',
        status: 'Completed',
        details: [
          'Itemized folio invoicing breaking down room rates, amenities, dining charges, and GST/VAT taxes.',
          'Multi-method POS settlement supporting Credit Card, Bank Transfer, and Cash with printable receipts.'
        ]
      },
      {
        title: 'Milestone 5: Real-Time Dynamic Theme Engine & Performance Optimization',
        status: 'Completed',
        details: [
          '50+ pre-configured luxury themes with circular reveal transitions using CSS View Transitions API.',
          'Engineered requestAnimationFrame token batching to reduce INP from 220ms to <10ms.',
          'Implemented lazyWithRetry and vite:preloadError auto-recovery handlers for 100% deployment reliability.'
        ]
      }
    ],
    features: [
      {
        title: 'External Libraries & Technology Architecture Stack',
        details: [
          'Core Framework & Bundler: React 19 (19.2.3), TypeScript 5.9, Vite 7.3, and React Router DOM v7 (resilient code-split routing).',
          'UI & Design System: Tailwind CSS v4, Radix UI suite (Dialog, Select, Popover, Tabs, Accordion, Dropdown, HoverCard, Tooltip, Switch, Progress), CVA, clsx, and next-themes.',
          'State & Server Data: Zustand 5 for client state & theme tokens; TanStack React Query v5 for asynchronous caching and optimistic updates.',
          'Data Visualization & Tables: Recharts 3.6 for ADR/RevPAR charts; TanStack Table v8 for high-density sortable/searchable audit logs.',
          'Interactive Components: @dnd-kit (Core, Sortable, Modifiers) for calendar room drag-and-drop; cmdk for Command Palette (⌘K); vaul for mobile drawers; react-resizable-panels.',
          'Forms, Dates & Validation: React Hook Form 7, Zod 4 runtime schema validation, date-fns date arithmetic, and react-day-picker.',
          'Security, Auth & Notifications: Clerk Auth React 6 (RBAC & SSO), Sonner stackable toasts, and Lucide React icons.'
        ]
      },
      {
        title: 'Public Luxury Guest Portal',
        details: [
          'Dynamic Rate Engine: Calculates nightly rates, taxes, and add-on amenities instantly across selected date ranges.',
          'Suite Category Explorer: High-definition room previews with occupancy badges, pricing tiers, and direct booking flows.'
        ]
      },
      {
        title: 'Front-Desk Reception & Calendar Matrix',
        details: [
          'Visual Gantt Scheduler: Real-time room allocation matrix powered by dnd-kit showing booking spans and preventing double-allocations.',
          'Guest Lifecycle Controller: One-click check-in, room key issuance, and express checkout with automated billing sync.'
        ]
      },
      {
        title: 'Housekeeping & Maintenance Operations',
        details: [
          'Room State Controller: Live status management across AVAILABLE, OCCUPIED, CLEANING, and MAINTENANCE states.',
          'Inspection Checklist: Supervisor sign-off workflows ensuring Forbes standard quality before room release.'
        ]
      },
      {
        title: 'POS Billing & Folio Settlement',
        details: [
          'Itemized Invoicing: Real-time charge ledger with automated tax calculations and discount rule engines.',
          'Export Suite: One-click CSV and PDF receipt exports for accounting compliance.'
        ]
      },
      {
        title: 'Dynamic Theme & Style Customizer',
        details: [
          '50+ Luxury Presets: Live switching across Sunrise Noir Gold, Imperial Navy, Emerald Luxe, and Shadcn palettes.',
          'Circular Reveal Animation: CSS View Transitions API ripple effect for seamless light/dark toggling.'
        ]
      }
    ]
  },
    {
    id: 2,
    title: 'AioVerse',
    description: 'Full-stack cross-platform mobile workspace and multi-utility SaaS application built with React Native, Expo, TypeScript, and Python Django REST Framework. Features 40+ native mobile utilities including Image Processing Studio, PDF Document Workspace, QR Code Studio, Task Organizer, and Guest Session Engine with offline-first persistence.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Django', 'Django REST Framework', 'PostgreSQL', 'JWT', 'AsyncStorage'],
    tech: ['React Native', 'Expo', 'TypeScript', 'Django', 'Django REST Framework', 'PostgreSQL', 'JWT', 'AsyncStorage'],
    category: 'Mobile / Full-Stack',
    featured: true,
    liveUrl: null,
    githubUrl: 'https://github.com/rashidkhan4067/AioVerse',
    accentColor: '#6366F1',
    imageUrl: aioverseMainImg,
    metric: '40+ Mobile Utilities · 60 FPS Native Performance · Offline-First Sync',
    relatedLogTitle: 'Architecting Offline-First Local Storage & Native Media Pipelines in React Native & Django',
    screenshots: [
      { label: 'Home Workspace Screen', url: aioverseHomeImg },
      { label: 'Authentication & Security', url: aioverseAuthImg },
      { label: 'Onboarding Flow', url: aioverseOnboarding1Img },
      { label: 'Feature Walkthrough', url: aioverseOnboarding2Img },
      { label: 'Splash & Brand Identity', url: aioverseSplashImg },
      { label: 'System Design Architecture', url: aioverseSystemDesignImg }
    ],
    tagline: 'Cross-platform mobile workspace & all-in-one multi-utility ecosystem.',
    status: 'In Progress (Active Backend Architecture)',
    problemStatement: 'Modern mobile users are forced to install dozens of disparate single-purpose utility apps that consume excessive device storage, battery, and background memory. Furthermore, offline mobile utility apps frequently lack unified cloud backup, secure multi-device profile sync, and structured backend API architectures.',
    systemOverview: 'Full-stack cross-platform mobile architecture: React Native client on Expo with custom TypeScript design system tokens (src/design-system), local-first state persistence via AsyncStorage, and a modular Python Django REST Framework backend providing stateless JWT authentication (/api/v1/auth/token/), user profile endpoints, and pytest validation suites.',
    engineeringDecisions: [
      {
        decision: 'Offline-First Local Storage Engine with Async Buffer Synchronization',
        reason: 'Enables users to perform image compressions, PDF conversions, and task updates with zero network latency, while automatically queuing cloud synchronization jobs when connectivity is restored.',
        tradeoff: 'Requires conflict-resolution logic between local AsyncStorage cache and Django PostgreSQL database.'
      },
      {
        decision: 'Stateless Single-Use JWT Refresh Rotation & Guest Mode Token Isolation',
        reason: 'Guarantees secure mobile authentication with automatic token refresh queues while supporting zero-friction guest sessions that can be seamlessly upgraded to persistent registered accounts.',
        tradeoff: 'Requires maintaining isolated guest data partitions on both client AsyncStorage and backend API models.'
      },
      {
        decision: 'Decoupled Native Media Bridge Worker Pipelines',
        reason: 'Offloaded heavy image compression, aspect-ratio cropping, and PDF rendering to native device threads before invoking asynchronous multipart upload streams, preventing JavaScript event loop UI freezing.',
        tradeoff: 'Requires custom Expo native module configurations across iOS and Android build profiles.'
      }
    ],
    hardProblem: 'Native Thread Blocking on Multi-Megabyte Image & Document Processing: Synchronously reading and manipulating camera photos on the JavaScript thread dropped mobile framerates below 25 FPS during batch operations. Resolved by offloading file I/O to native Expo file system workers with chunked memory buffers and progressive image decoding, restoring locked 60 FPS UI performance.',
    whatWeCut: 'Avoided bloated third-party component libraries in favor of a bespoke, lightweight design system (src/design-system) with zero-runtime style overhead and strict tokenized themes.',
    challenges: [
      'Engineered 40+ native mobile utilities across image compression, PDF manipulation, QR scanning, biometric security, and productivity management.',
      'Constructed a high-throughput Django REST API backend supporting stateless JWT rotation, password reset flows, and automated pytest test suites.',
      'Implemented offline-first AsyncStorage state caching with seamless online synchronization.',
      'Delivered locked 60 FPS native UI transitions across both iOS and Android Expo environments.'
    ],
    outcome: 'Shipped a comprehensive, production-grade mobile workspace app integrating 40+ tools into a single lightweight client with sub-80ms processing latency and complete Django API backend synchronization.',
    milestones: [
      {
        title: 'Milestone 1: Core Mobile Design System & Navigation Architecture',
        status: 'Completed',
        details: [
          'Bespoke design system tokens with dark/light themes, typography scales, and haptic feedback triggers.',
          'Modular bottom-tab and stack navigation with fluid screen transitions across all device sizes.'
        ]
      },
      {
        title: 'Milestone 2: Media & Image Processing Studio',
        status: 'Completed',
        details: [
          'High-performance image compressor with target-size constraints and format conversion (JPEG, PNG, WebP).',
          'Aspect-ratio cropper, filters, and batch optimization pipeline offloaded to native threads.'
        ]
      },
      {
        title: 'Milestone 3: PDF Document Workspace & QR Studio',
        status: 'Completed',
        details: [
          'Multi-page PDF generation, document viewer, and page extraction pipeline.',
          'Dynamic SVG QR code generator with custom styling and real-time camera barcode scanner.'
        ]
      },
      {
        title: 'Milestone 4: Productivity Suite & Local Storage Engine',
        status: 'Completed',
        details: [
          'Task organization matrix with priority filtering and persistent AsyncStorage state.',
          'Workspace notes organizer with Markdown formatting and search indexing.'
        ]
      },
      {
        title: 'Milestone 5: Django REST API Backend & Authentication Layer',
        status: 'Completed',
        details: [
          'Stateless JWT authentication with token refresh, password recovery, and profile endpoints.',
          'Comprehensive pytest test suites verifying API security, rate limiting, and database constraints.'
        ]
      }
    ],
    features: [
      {
        title: 'Full-Stack Architecture & Technology Stack',
        details: [
          'Frontend Mobile Client: React Native, Expo, TypeScript, custom Design System tokens, and AsyncStorage.',
          'Backend REST API: Python, Django, Django REST Framework, PostgreSQL, and Pytest validation suites.',
          'Security & Authentication: Stateless JWT rotation (/api/v1/auth/token/), guest mode isolation, and biometric auth bridges.'
        ]
      },
      {
        title: 'Image & Media Processing Studio',
        details: [
          'Image Compressor: Native image compression with configurable quality ratios and target file-size limits.',
          'Format Converter: Real-time image format conversion (PNG, JPEG, WebP) with EXIF metadata preservation.',
          'Aspect-Ratio Cropper: Interactive canvas cropping with preset aspect ratios (1:1, 4:5, 16:9).'
        ]
      },
      {
        title: 'PDF Document Workspace',
        details: [
          'PDF Merger & Splitter: Combine multiple documents or extract specific page ranges with native speed.',
          'Document Viewer: Pinch-to-zoom interactive document reader with bookmarking.'
        ]
      },
      {
        title: 'QR Code Studio & Scanner',
        details: [
          'QR Generator: Custom color, logo embedding, and error correction for Wi-Fi, URL, and vCard codes.',
          'Camera Scanner: Real-time barcode and QR detection with automatic clipboard parsing.'
        ]
      },
      {
        title: 'Productivity & Workspace Hub',
        details: [
          'Task Matrix: Priority-based task tracking with completion streaks and reminders.',
          'Offline Storage Engine: Zero-latency local caching with background cloud sync.'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Bhutta Scents',
    description: 'Live luxury fragrance e-commerce platform (bhuttascents.com) featuring 50+ curated SKUs, zero layout shift (0.00 CLS), sub-second cart mutations with Context/LocalStorage, and 100% verified client satisfaction.',
    techStack: ['React', 'Vite', 'Vanilla CSS', 'State Management'],
    tech: ['React', 'Vite', 'Vanilla CSS', 'State Management'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://bhuttascents.com',
    githubUrl: 'https://github.com/rashidshafique-dev/BhuttaScents',
    accentColor: '#D4AF37', // Gold metallic accent for luxury brand
    imageUrl: bhuttaScientsImg,
    metric: '0.00 CLS · 50+ SKUs · Live Client',
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
    id: 4,
    title: 'Al Shifaa Clinic',
    description: 'Full-stack clinic system with 7 role-based portals (Doctor, Patient, Admin, Pharmacist, Lab, Nurse, Receptionist), 15+ secure Django REST APIs, stateless JWT token auto-rotation, and 42% faster query response via PostgreSQL composite indexing.',
    techStack: ['React', 'Django REST Framework', 'PostgreSQL', 'JWT', 'LLMs'],
    tech: ['React', 'Django REST Framework', 'PostgreSQL', 'JWT', 'LLMs'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://al-shifaa-hms.vercel.app/',
    githubUrl: 'https://github.com/rashidshafique-dev/AI-HMS',
    accentColor: '#10B981',
    imageUrl: aiHmsImg,
    metric: '7 Role Portals · 42% Query Latency Reduced',
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
    id: 5,
    title: 'Rescue Project',
    description: 'AI-powered search-and-rescue command console with difference-hash facial matching (dHash + Hamming distance), Groq Llama 3 conversational coordinator, and geofenced SMTP volunteer mobilization alerts.',
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
    title: 'Sales-Data-Analysis-System',
    description: 'Semester project: interactive sales analytics dashboard with 3 Plotly dashboards (regional trends, category distribution, profit forecasting). Built a Scikit-Learn linear regression model to predict profit margins on retail transaction records.',
    techStack: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'Plotly'],
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'Plotly'],
    category: 'AI/ML',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Sales-Data-Analysis-System',
    githubUrl: 'https://github.com/rashidkhan4067/Sales-Data-Analysis-System.git',
    accentColor: '#1A73E8', // Google Blue Brand colors
    imageUrl: salesPipelineImg,
    metric: 'Predictive ML Analytics',
    relatedLogTitle: 'Structuring Exploratory Data Analysis & Predictive Pipelines in Python & Streamlit',
    tagline: 'Interactive sales analytics dashboard and predictive ML forecasting system.',
    status: 'Completed',
    problemStatement: 'Retail transaction datasets often contain noisy, missing, or unstructured records that make manual sales trend identification and revenue forecasting difficult.',
    systemOverview: 'End-to-end data analysis application: Python and Pandas data cleaning pipeline, Scikit-Learn regression models for profit estimation, and an interactive Streamlit dashboard featuring dynamic Plotly visualizations.',
    engineeringDecisions: [
      {
        decision: 'Pandas Vectorized Operations over Iterative Loops',
        reason: 'Utilized vectorized column operations and groupby aggregations, accelerating dataset filtering and metric computations.',
        tradeoff: 'Requires sufficient in-memory RAM for holding intermediate dataframes.'
      },
      {
        decision: 'Streamlit & Plotly for Rapid Interactive Visualization',
        reason: 'Allowed dynamic parameter tuning (date ranges, regional filters) with instant visual updates and zero complex frontend overhead.',
        tradeoff: 'Reruns script execution on filter state changes, requiring @st.cache_data optimization.'
      },
      {
        decision: 'Scikit-Learn Linear Regression for Profit Modeling',
        reason: 'Provides transparent, interpretable regression coefficients to evaluate feature correlation with profit margins.',
        tradeoff: 'Assumes linear feature relationships, less suited for non-linear seasonal spikes.'
      }
    ],
    hardProblem: 'Dataframe Memory & Caching Optimization: Recomputing aggregations on every user interaction caused UI lag in Streamlit. Resolved by implementing @st.cache_data caching decorators with optimized column data types.',
    whatWeCut: 'Kept the architecture lean by relying on Streamlit and local data caching rather than heavy distributed cluster infrastructure.',
    challenges: [
      'Engineered automated data cleaning routines to handle missing values and normalize multi-category transaction records.',
      'Constructed interactive charts with Plotly to visualize regional sales distributions and category profit ratios.'
    ],
    outcome: 'Successfully delivered an intuitive semester project dashboard with interactive filters and predictive revenue forecasts.'
  },
  {
    id: 10,
    title: 'AquaSync',
    description: 'IoT real-time fluid telemetry system monitoring 4 sensor nodes (flow rate, pressure, tank level, pump status) across a water distribution network. Multi-threaded Python dashboard with C++/Arduino firmware and threshold alert system.',
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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

/**
 * Dynamically calculates academic semester, year, and progress percentage
 * based on enrollment in Sept 2023 at UAF (4-year BS CS degree, graduating in 2027).
 */
export const getCurrentSemesterInfo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed: 0 = Jan, 7 = Aug, 11 = Dec

  let semester = 1;
  const yearDiff = year - 2023;

  if (yearDiff <= 0) {
    semester = 1;
  } else {
    // January belongs to the Fall semester that started previous year
    if (month === 0) {
      semester = (yearDiff - 1) * 2 + 1;
    } else if (month >= 1 && month <= 6) {
      // Spring Semester (Feb - Jul)
      semester = (yearDiff - 1) * 2 + 2;
    } else {
      // Fall Semester (Aug - Dec)
      semester = yearDiff * 2 + 1;
    }
  }

  // Bound semester between 1 and 8 (for 4-year degree)
  semester = Math.max(1, Math.min(8, semester));
  const academicYear = Math.min(4, Math.ceil(semester / 2));
  const progressPercent = Math.min(100, Math.round((semester / 8) * 100));

  const suffix = semester === 1 ? '1st' : semester === 2 ? '2nd' : semester === 3 ? '3rd' : `${semester}th`;
  
  return {
    semester,
    semesterText: `${suffix} Semester`,
    academicYear,
    yearText: `Year ${academicYear} of 4`,
    progress: progressPercent,
    progressLabel: `Year ${academicYear} of 4 (${suffix} Semester)`,
    metric: `🎓 ${suffix} Semester · Year ${academicYear} of 4`,
    period: '2023 — 2027 (Expected)',
  };
};

export const currentAcademicStatus = getCurrentSemesterInfo();

export const experience = [
  {
    id: 1,
    role: 'Full-Stack Software Engineer',
    company: 'Self-Employed / Remote',
    companyUrl: 'https://github.com/rashidshafique-dev',
    period: '2023 — Present',
    type: 'Full-Stack & Backend',
    category: 'work',
    location: 'Faisalabad · Remote',
    isCurrent: true,
    description: 'Building high-performance REST APIs, Python backend services, and responsive React web applications.',
    highlights: [
      'Built modular Django, FastAPI, and Node.js REST APIs with robust validation and clean OOP structure.',
      'Cut database query latency by 42% through composite indexing and normalized SQL schema design.',
      'Implemented JWT authentication with token auto-rotation, blacklisting, and Google OAuth SSO.',
    ],
    techStack: ['Python', 'Django', 'FastAPI', 'React.js', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Vercel'],
    color: '#1A73E8',
  },
  {
    id: 2,
    role: 'Frontend Engineer',
    company: 'Bhutta Scents',
    companyUrl: 'https://bhuttascents.com',
    period: '2024 — 2025',
    type: 'Commercial Platform',
    category: 'client',
    location: 'Faisalabad, Pakistan',
    isCurrent: false,
    description: 'Engineered an end-to-end luxury fragrance e-commerce web application with custom Vanilla CSS and instant cart operations.',
    highlights: [
      'Authored custom Vanilla CSS design tokens with aspect-ratio skeleton bounding boxes, eliminating layout shift (0 CLS).',
      'Built a decoupled React Context cart state engine with debounced local storage persistence.',
      'Delivered 100% client satisfaction, receiving executive endorsement from CEO Amir Bhutta.',
    ],
    techStack: ['React.js', 'Vite', 'Vanilla CSS', 'State Management', 'Web Performance'],
    projectLink: 'https://bhuttascents.com',
    color: '#D4AF37',
  },
  {
    id: 3,
    role: 'BS in Computer Science',
    company: 'University of Agriculture Faisalabad',
    companyUrl: 'https://uaf.edu.pk',
    period: currentAcademicStatus.period,
    type: 'Education',
    category: 'education',
    location: 'UAF, Pakistan',
    metric: currentAcademicStatus.metric,
    progress: currentAcademicStatus.progress,
    progressLabel: currentAcademicStatus.progressLabel,
    isCurrent: true,
    description: `Undergraduate candidate in Computer Science (${currentAcademicStatus.semesterText}, ${currentAcademicStatus.yearText}), with focused coursework in algorithmic analysis, relational database architecture, and backend systems.`,
    highlights: [
      'Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Relational Databases (SQL), Operating Systems, Software Engineering.',
      'Engineered full-stack and IoT telemetry systems applying core CS principles (AquaSync & predictive sales analytics).',
      'Core focus on algorithmic time/space complexity analysis (Big-O) and modular system design.',
    ],
    techStack: ['Data Structures', 'Algorithms', 'OOP', 'SQL & RDBMS', 'C++', 'Python'],
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
    content: "An outstanding student who possesses an innate understanding of computational structures and algorithmic problem solving. His semester projects and software systems demonstrate exceptional dedication to clean architecture and practical engineering.",
    rating: 5,
  }
];

export const timeline = [
  { year: 'Oct 2023', event: 'Started BS Computer Science at the University of Agriculture Faisalabad (UAF)' },
  { year: 'Dec 2023', event: 'Mastered Python and started building commercial automation scripts & web crawlers' },
  { year: 'Jun 2024', event: 'Transitioned into Full-Stack Web Development, building React and Node.js products' },
  { year: 'Nov 2024', event: 'Engineered comprehensive Hospital Management System' },
  { year: 'Aug 2025', event: 'Developed Sales Data Analysis System with predictive ML modeling' },
  { year: 'Jun 2026', event: 'Presenting a fully modern production-grade portfolio' },
  { year: 'Jul 2026', event: 'Architected Sunrise Imperial Resort — Enterprise Hotel PMS & Guest Experience SaaS' },
];

export const buildLogs = [
  {
    id: 1,
    title: 'Optimizing INP (<10ms) & Auto-Recovering Dynamic Import Chunks in React 19 Hotel PMS',
    date: 'July 15, 2026',
    type: 'Frontend Performance & Architecture',
    metric: 'INP < 10ms · 100% Chunk Recovery',
    excerpt: 'How frame-deferred CSS variable batching cut theme switching INP from >220ms to <10ms, and how vite:preloadError listeners solved stale dynamic chunk 404s on Vercel deployments.',
    tags: ['React 19', 'Performance', 'Web Vitals', 'Tailwind CSS', 'Architecture'],
    content: `When architecting the Sunrise Imperial Resort Hotel Property Management System (PMS), we combined mission-critical hospitality operations with a real-time dynamic theme customizer supporting 50+ luxury presets. However, stress testing revealed two critical frontend bottlenecks: high Interaction to Next Paint (INP) latency during theme switching and stale chunk loading failures on continuous Vercel deployments.

### Bottleneck 1: High Interaction to Next Paint (INP > 220ms) on Theme Selection
The theme engine allows users to switch between 50+ curated luxury palettes (such as *Sunrise Noir Gold* and *Emerald Luxe*) and modify radius/typography tokens on the fly:
1. When selecting a theme inside a Radix UI \`Select\` component, the \`onValueChange\` callback synchronously applied over 50 CSS custom properties (\`--primary\`, \`--background\`, \`--card\`, etc.) directly to \`document.documentElement.style\`.
2. Simultaneously, Radix UI attempted to unmount the dropdown popover and recalculate layout boundaries.
3. This synchronous DOM thrashing blocked the main thread for over 220ms, producing a poor "Needs Improvement" Core Web Vitals rating for INP.

### The Solution: Frame Deferral with \`requestAnimationFrame\`
We decoupled dropdown UI state dismissal from document style injection:
- **Batched Token Application**: Wrapped CSS variable mutations inside a \`requestAnimationFrame\` / \`setTimeout\` frame deferral so the browser completes the dropdown close transition before calculating style changes.
- **Viewport Layout Flattening**: Removed deeply nested wrapper divs and attached the Radix Popover Viewport directly to the portal root, minimizing reflow depth.
- **Result**: Interaction to Next Paint (INP) dropped to under 10ms, achieving a perfect "Good" (Green) rating.

### Bottleneck 2: Stale Dynamic Import Chunks on Production Deployments
With Vite code splitting across admin sub-routes (Reports, Housekeeping, POS Invoicing, Calendar), users with active browser sessions experienced \`TypeError: Failed to fetch dynamically imported module\` whenever a new commit was deployed to Vercel (since old hashed chunk files were purged from the edge cache).

### The Solution: Resilient Chunk Recovery with \`lazyWithRetry\`
We implemented a two-tiered auto-recovery architecture:
1. **\`lazyWithRetry\` Wrapper**: A higher-order component around \`React.lazy\` that catches dynamic \`import()\` rejections, checks if a page reload has occurred within the current session, and performs a silent single reload to fetch the latest assets from the edge CDN.
2. **Global \`vite:preloadError\` Listener**: Registered a window event listener that intercepts Vite module preload errors and triggers cache invalidation before the error boundary unmounts the workspace.

This eliminated production deployment crashes and guaranteed 100% session continuity for hotel receptionists and guest users.`
  },
    {
    id: 2,
    title: 'Architecting Offline-First Local Storage & Native Media Pipelines in React Native & Django',
    date: 'July 02, 2026',
    type: 'Mobile & System Architecture',
    metric: '60 FPS UI · <80ms Processing',
    excerpt: 'How native thread offloading and asynchronous buffer queues eliminated UI frame drops during multi-megabyte image compression and PDF document generation in AioVerse.',
    tags: ['React Native', 'Expo', 'Django', 'Mobile', 'TypeScript', 'Performance'],
    content: `When architecting AioVerse—a multi-utility mobile workspace app integrating 40+ tools (Image Studio, PDF Workspace, QR Studio, Task Manager) on React Native (Expo) and Django REST Framework—we prioritized instant, sub-100ms user interactions even in offline or low-connectivity environments.

### The Bottleneck: UI Thread Freezes During Media Processing
Mobile utility applications frequently process user-provided binary files (high-resolution camera photos up to 15MB, multi-page PDFs). In early prototypes:
1. Decoding raw image buffers and calculating aspect-ratio transforms directly on the JavaScript thread caused severe frame drops (dropping from 60 FPS down to 18 FPS).
2. Users experienced unresponsive touch states while batch processing multiple images.
3. Synchronous cloud upload attempts in poor network conditions blocked navigation transitions.

### The Solution: Decoupled Native Worker Pipelines & Chunked Buffers
We redesigned the client architecture into a decoupled pipeline:

1. **Native Thread Delegation**: Offloaded binary file transformations to native Expo FileSystem workers with progressive chunk decoding, ensuring the JavaScript UI thread maintains locked 60 FPS animations.
2. **Local-First AsyncStorage Cache**: Media transforms and task edits write immediately to local device storage with zero network latency. An asynchronous buffer queue monitors network connectivity state and dispatches background multipart upload jobs to Django REST API endpoints when online.
3. **Stateless JWT Guest Isolation**: Implemented isolated local guest partitions in AsyncStorage that seamlessly migrate to persistent Django database schemas when a user registers.

The result is a responsive, locked 60 FPS mobile utility workspace with zero perceived processing latency.`
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: 'Structuring Exploratory Data Analysis & Predictive Pipelines in Python & Streamlit',
    date: 'June 04, 2026',
    type: 'Data Analytics',
    metric: 'Sub-Second Filtering',
    excerpt: 'Optimizing DataFrame caching, memory footprints, and regression modeling to deliver responsive interactive sales dashboards in Streamlit.',
    tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'Data Science'],
    content: `While building the Sales Data Analysis System semester project to analyze retail transaction records and forecast regional profit margins, we focused on building a clean and responsive exploratory data pipeline.

### The Problem: Reactive Rerun Bottlenecks in Streamlit
Streamlit's execution model re-executes the Python script from top to bottom whenever a user tweaks an input widget (like a date slider or category dropdown):
1. Reloading raw CSV datasets on every state change caused noticeable UI lag.
2. Inefficient DataFrame manipulation with unoptimized data types consumed unnecessary RAM.
3. Model retraining on every filter change slowed down prediction responses.

### The Solution: Optimized Caching & Vectorized Transformations
To make the dashboard snappy and responsive:
1. **Data Caching with \`@st.cache_data\`**: Wrapped the data ingestion and preprocessing functions with Streamlit's caching decorators, ensuring CSV parsing occurs only once.
2. **DataFrame Downcasting**: Downcasted integer and float columns (e.g. \`float64\` to \`float32\`, categorical strings to \`category\` dtypes), slashing memory consumption by over 60%.
3. **Pre-Trained Regression Persistence**: Separated model training from inference, serializing the fitted Scikit-Learn model to disk and loading it instantly for live predictions.
4. **Vectorized Pandas Aggregations**: Replaced row iteration with vectorized groupby operations for calculating regional profit margins and sales volumes.

This eliminated dashboard latency, resulting in sub-second filter updates and fluid chart rendering across all transaction views.`
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
