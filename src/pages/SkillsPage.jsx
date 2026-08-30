import { Helmet } from 'react-helmet-async';
import SkillsSection from '../features/skills';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const skillsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Skills & Technologies | Muhammad Rashid Shafique',
  'url': `${BASE_URL}/skills`,
  'description': 'Full technical skill set of Muhammad Rashid Shafique: Python, Django, FastAPI, React, Node.js, TensorFlow, SQL, C++, Pandas, Supabase, Firebase and more.',
  'author': {
    '@type': 'Person',  
    'name': 'Muhammad Rashid Shafique',
    'knowsAbout': [
      'Python', 'Django', 'FastAPI', 'React', 'Node.js',
      'TensorFlow', 'C++', 'C', 'Pandas', 'Scikit-Learn',
      'SQL', 'PostgreSQL', 'Supabase', 'Firebase',
      'Tkinter', 'PyQt5', 'Selenium', 'REST API',
      'Machine Learning', 'Data Analysis',
    ],
  },
};

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills & Technologies | Muhammad Rashid Shafique — Python, React & More</title>
        <meta name="description" content="Technical skills of Muhammad Rashid Shafique — 25+ technologies across backend (Python, Django, FastAPI, Node.js), frontend (React, Tailwind), data analysis (Pandas, SQL), machine learning (TensorFlow), and cloud/database (Supabase, Firebase, PostgreSQL)." />
        <meta name="keywords" content="Muhammad Rashid Shafique skills, Python developer skills, React skills, Django developer, FastAPI Python, TensorFlow machine learning, backend developer technologies, full stack skills Pakistan" />
        <link rel="canonical" href={`${BASE_URL}/skills`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/skills`} />
        <meta property="og:title" content="Skills & Technologies | Muhammad Rashid Shafique" />
        <meta property="og:description" content="Core technologies: Python, Django, DRF, FastAPI, React.js, Vite, Tailwind CSS, SQL, Supabase, Firebase, JWT & Google OAuth." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Technical Skills" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skills | Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="Technical skills across backend, frontend, database, security, and cloud deployment." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(skillsSchema)}</script>
      </Helmet>
      <SkillsSection />
    </>
  );
}
