import { Helmet } from 'react-helmet-async';
import AboutSection from '../features/about';
import HireMeCTA from '../features/cta';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  'name': 'About Muhammad Rashid Shafique (Rashid Shafique)',
  'url': `${BASE_URL}/about`,
  'mainEntity': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'alternateName': ['Rashid Shafique', 'rashidshafique-dev', 'Rashid Khan'],
    'jobTitle': 'Full-Stack Developer & Systems Engineer',
    'description': 'Muhammad Rashid Shafique (Rashid Shafique) is a Full-Stack Developer & Systems Engineer from Faisalabad, Pakistan specialising in Python, Django, FastAPI, React, and modern web architectures. BS Computer Science student at the University of Agriculture Faisalabad.',
    'alumniOf': {
      '@type': 'CollegeOrUniversity',
      'name': 'University of Agriculture Faisalabad',
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Faisalabad',
      'addressRegion': 'Punjab',
      'addressCountry': 'PK',
    },
    'sameAs': [
      'https://github.com/rashidshafique-dev',
      'https://www.linkedin.com/in/rashidshafique-dev',
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Rashid Shafique | Full-Stack Developer & Systems Engineer Pakistan</title>
        <meta name="description" content="Learn about Muhammad Rashid Shafique (Rashid Shafique) — Full-Stack Developer & Systems Engineer from Faisalabad, Pakistan. BS Computer Science student at UAF specialising in Python backends, modern web systems, and React apps." />
        <meta name="keywords" content="Rashid Shafique, Muhammad Rashid Shafique, Rashid Shafique developer, Systems Engineer Faisalabad Pakistan, UAF Computer Science student, Python backend developer, full stack engineer Pakistan bio" />
        <link rel="canonical" href={`${BASE_URL}/about`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:title" content="About Muhammad Rashid Shafique | Systems Engineer from Pakistan" />
        <meta property="og:description" content="Systems Engineer & Full-Stack Developer pursuing BS Computer Science at UAF. Building scalable backends and modern React apps." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Muhammad Rashid Shafique" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Muhammad Rashid Shafique | Systems Engineer" />
        <meta name="twitter:description" content="BS Computer Science student at UAF specialising in systems engineering, Python, and full-stack development." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
      <AboutSection />
      <HireMeCTA />
    </>
  );
}
