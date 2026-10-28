import { Helmet } from 'react-helmet-async';
import ExperienceSection from '../features/experience';
import HireMeCTA from '../features/cta';
import { SITE_URL as BASE_URL } from '../constants/portfolioData';

const experienceSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Experience | Muhammad Rashid Shafique',
  'url': `${BASE_URL}/experience`,
  'description': 'Work experience and academic background of Muhammad Rashid Shafique — open source contributor, Systems Engineer, and BS Computer Science candidate at UAF.',
  'mainEntity': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'hasCredential': [
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'degree',
        'name': 'BS Computer Science',
        'educationalLevel': 'Bachelor',
        'recognizedBy': {
          '@type': 'CollegeOrUniversity',
          'name': 'University of Agriculture Faisalabad',
          'url': 'https://uaf.edu.pk',
        },
      },
    ],
    'hasOccupation': [
      {
        '@type': 'Occupation',
        'name': 'Open Source Contributor',
        'description': 'Contributed automation scripts and backend modules to open-source projects using Python, Selenium, and Node.js.',
      },
    ],
  },
};

export default function ExperiencePage() {
  return (
    <>
      <Helmet>
        <title>Experience | Muhammad Rashid Shafique — Full-Stack Software Engineer</title>
        <meta name="description" content="Work experience and academic timeline of Muhammad Rashid Shafique — Full-Stack Software Engineer and BS Computer Science student at UAF Faisalabad. Experience with Python backend systems, Django REST APIs, React platforms, and relational databases." />
        <meta name="keywords" content="Muhammad Rashid Shafique experience, software engineer work history, Full Stack Software Engineer Pakistan, BS Computer Science UAF, Django API experience, React experience" />
        <link rel="canonical" href={`${BASE_URL}/experience`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/experience`} />
        <meta property="og:title" content="Experience | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta property="og:description" content="Full-Stack Software Engineer with experience in Python backends, Django REST APIs, and modern React & TypeScript applications." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Experience" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidshafiqdev" />
        <meta name="twitter:creator" content="@rashidshafiqdev" />
        <meta name="twitter:title" content="Experience | Muhammad Rashid Shafique — Full-Stack Software Engineer" />
        <meta name="twitter:description" content="Delivering scalable full-stack systems with Python, Django, React, and TypeScript." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(experienceSchema)}</script>
      </Helmet>
      <ExperienceSection />
      <HireMeCTA />
    </>
  );
}
