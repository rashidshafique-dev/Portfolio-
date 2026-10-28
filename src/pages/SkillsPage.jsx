import { Helmet } from 'react-helmet-async';
import SkillsSection from '../features/skills';
import { SITE_URL as BASE_URL } from '../constants/portfolioData';

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
      'Python', 'Django', 'FastAPI', 'React', 'TypeScript', 'JavaScript',
      'Node.js', 'TensorFlow', 'C++', 'Pandas', 'Scikit-Learn',
      'SQL', 'PostgreSQL', 'Supabase', 'Firebase', 'REST API',
    ],
  },
};

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills & Technologies | Muhammad Rashid Shafique — Full-Stack Software Engineer</title>
        <meta name="description" content="Technical skills of Muhammad Rashid Shafique — Python, Django, FastAPI, React, TypeScript, PostgreSQL, and scalable full-stack system architecture." />
        <meta name="keywords" content="Muhammad Rashid Shafique skills, Python developer skills, React skills, TypeScript, Django developer, FastAPI Python, full stack skills Pakistan" />
        <link rel="canonical" href={`${BASE_URL}/skills`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/skills`} />
        <meta property="og:title" content="Skills & Technologies | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta property="og:description" content="Core technologies: Python, Django, FastAPI, React, TypeScript, PostgreSQL, REST APIs, and modern system design." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Technical Skills" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidshafiqdev" />
        <meta name="twitter:creator" content="@rashidshafiqdev" />
        <meta name="twitter:title" content="Skills | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta name="twitter:description" content="Technical skills across backend, frontend, database, security, and cloud deployment." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(skillsSchema)}</script>
      </Helmet>
      <SkillsSection />
    </>
  );
}
