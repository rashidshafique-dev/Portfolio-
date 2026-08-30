import { Helmet } from 'react-helmet-async';
import ContactSection from '../features/contact';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact Muhammad Rashid Shafique',
  'url': `${BASE_URL}/contact`,
  'description': 'Contact Muhammad Rashid Shafique for freelance projects, collaboration, or job opportunities.',
  'mainEntity': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'email': 'rashidshafique.dev@gmail.com',
    'telephone': '+92-319-8696623',
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

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Muhammad Rashid Shafique | Hire Systems Engineer & Full-Stack Developer</title>
        <meta name="description" content="Hire Muhammad Rashid Shafique — Systems Engineer & Full-Stack Developer from Faisalabad, Pakistan. Available for full-time roles, freelance contracts, and open-source collaboration. Expertise in Python, Django, FastAPI, React, and modern web applications." />
        <meta name="keywords" content="contact Muhammad Rashid Shafique, hire systems engineer Pakistan, hire full stack developer Pakistan, hire Python developer, hire React developer, freelance backend developer Pakistan, software engineer for hire" />
        <link rel="canonical" href={`${BASE_URL}/contact`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/contact`} />
        <meta property="og:title" content="Contact Muhammad Rashid Shafique | Hire Systems Engineer" />
        <meta property="og:description" content="Available for full-time, freelance, and contract opportunities. Reach out to discuss systems engineering, backend APIs, or full-stack projects." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Muhammad Rashid Shafique" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="Hire Muhammad Rashid Shafique for your next engineering project. Full-time, freelance, or contract." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>
      <ContactSection />
    </>
  );
}
