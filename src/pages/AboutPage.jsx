import { Helmet } from 'react-helmet-async';
import AboutSection from '../features/about';
import HireMeCTA from '../features/cta';
import { SITE_URL as BASE_URL } from '../constants/portfolioData';

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  'name': 'About Muhammad Rashid Shafique (Rashid Shafique)',
  'url': `${BASE_URL}/about`,
  'mainEntity': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'alternateName': ['Rashid Shafique', 'rashidshafique-dev', 'Rashid Khan'],
    'jobTitle': 'Full-Stack Software Engineer',
    'description': 'Muhammad Rashid Shafique (Rashid Shafique) is a Full-Stack Software Engineer from Faisalabad, Pakistan specialising in Python backends (Django, FastAPI), React, TypeScript, and modern web architectures.',
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
      'https://x.com/rashidshafiqdev',
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Muhammad Rashid Shafique — Full-Stack Software Engineer</title>
        <meta name="description" content="Learn about Muhammad Rashid Shafique — Full-Stack Software Engineer from Faisalabad, Pakistan. Specializing in Python backends (Django, FastAPI), React, TypeScript, and relational databases." />
        <meta name="keywords" content="Rashid Shafique, Muhammad Rashid Shafique, Rashid Shafique developer, Full Stack Software Engineer Pakistan, UAF Computer Science student, Python backend developer, full stack engineer Pakistan bio" />
        <link rel="canonical" href={`${BASE_URL}/about`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:title" content="About | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta property="og:description" content="Full-Stack Software Engineer specializing in Python backends, relational databases, and modern React & TypeScript applications." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Muhammad Rashid Shafique" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidshafiqdev" />
        <meta name="twitter:creator" content="@rashidshafiqdev" />
        <meta name="twitter:title" content="About | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta name="twitter:description" content="Full-Stack Software Engineer specializing in Python, Django, FastAPI, React, and TypeScript." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
      <AboutSection />
      <HireMeCTA />
    </>
  );
}
