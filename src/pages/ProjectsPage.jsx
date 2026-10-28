import { Helmet } from 'react-helmet-async';
import { DetailedProjects } from '../features/projects';
import HireMeCTA from '../features/cta';
import { SITE_URL as BASE_URL } from '../constants/portfolioData';

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': 'Projects by Muhammad Rashid Shafique',
  'url': `${BASE_URL}/projects`,
  'description': 'Production engineering projects by Muhammad Rashid Shafique — Enterprise hotel management, cross-platform mobile workspace, Django/FastAPI backends, React web apps, and IoT systems.',
  'author': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'url': `${BASE_URL}/`,
  },
  'hasPart': [
    {
      '@type': 'SoftwareApplication',
      'name': 'Al Shifaa Clinic',
      'description': 'Full-stack clinic system with 7 role-based portals, secure Django REST APIs, stateless JWT token auto-rotation, and PostgreSQL composite indexing.',
      'applicationCategory': 'Healthcare Software',
      'programmingLanguage': ['Python', 'Django REST Framework', 'React', 'PostgreSQL', 'JavaScript'],
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
        <title>Projects | Muhammad Rashid Shafique — Full-Stack Software Engineer</title>
        <meta name="description" content="Engineering projects by Muhammad Rashid Shafique — Enterprise PMS systems, cross-platform mobile utilities, Django/FastAPI REST APIs, React web apps, and IoT dashboards. Explore technical case studies and GitHub repositories." />
        <meta name="keywords" content="Muhammad Rashid Shafique projects, Python projects Pakistan, React projects, Django REST API project, full stack web app portfolio, open source engineer Pakistan" />
        <link rel="canonical" href={`${BASE_URL}/projects`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/projects`} />
        <meta property="og:title" content="Projects | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta property="og:description" content="Technical projects: Full-stack web platforms, Django/FastAPI REST APIs, React applications, and system design case studies." />
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
        <meta name="twitter:description" content="Engineering projects: Full-Stack web platforms, Django REST APIs, React systems. Deep case-study breakdowns." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(projectsSchema)}</script>
      </Helmet>
      <DetailedProjects />
      <HireMeCTA />
    </>
  );
}
