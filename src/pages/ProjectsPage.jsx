import { Helmet } from 'react-helmet-async';
import { DetailedProjects } from '../features/projects';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': 'Projects by Muhammad Rashid Shafique',
  'url': `${BASE_URL}/projects`,
  'description': '10+ engineering projects by Muhammad Rashid Shafique — AI facial recognition, data analytics dashboards, Django/FastAPI backends, React web apps, IoT dashboards, and hospital management systems.',
  'author': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'url': `${BASE_URL}/`,
  },
  'hasPart': [
    {
      '@type': 'SoftwareApplication',
      'name': 'Al Shifaa Clinic',
      'description': 'AI-powered Hospital Management System with face recognition attendance, billing automation, and real-time ward management. Built with PyQt5, SQLite, and TensorFlow.',
      'applicationCategory': 'Healthcare Software',
      'programmingLanguage': ['Python', 'PyQt5', 'TensorFlow', 'SQLite'],
    },
    {
      '@type': 'SoftwareApplication',
      'name': 'AquaSync IoT Dashboard',
      'description': 'Real-time IoT water quality monitoring dashboard with live sensor data, threshold alerts, and predictive analytics.',
      'applicationCategory': 'IoT / Web Application',
      'programmingLanguage': ['React', 'Node.js', 'Firebase'],
    },
    {
      '@type': 'SoftwareApplication',
      'name': 'AlgoViz',
      'description': 'Interactive algorithm visualiser for sorting and graph traversal algorithms with step-by-step animation.',
      'applicationCategory': 'Educational Software',
      'programmingLanguage': ['React', 'JavaScript'],
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects | Muhammad Rashid Shafique — AI, Full-Stack & Systems Engineering</title>
        <meta name="description" content="10+ engineering projects by Muhammad Rashid Shafique — AI hospital management system, data analytics dashboards, Django/FastAPI REST APIs, React web apps, IoT dashboards, and algorithm visualisers. Explore technical case studies and GitHub repositories." />
        <meta name="keywords" content="Muhammad Rashid Shafique projects, Python projects Pakistan, React projects, AI hospital management system, data analytics project, Django REST API project, full stack web app portfolio, open source engineer Pakistan" />
        <link rel="canonical" href={`${BASE_URL}/projects`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/projects`} />
        <meta property="og:title" content="Projects | Muhammad Rashid Shafique — Full-Stack & Systems Developer" />
        <meta property="og:description" content="Technical projects: AI/ML systems, full-stack web apps, IoT dashboards, and REST APIs. Explore case studies and code." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Projects Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="Engineering projects: AI/ML, Full-Stack, IoT. Deep case-study breakdowns." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(projectsSchema)}</script>
      </Helmet>
      <DetailedProjects />
    </>
  );
}
