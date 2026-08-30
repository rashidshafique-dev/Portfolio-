import { Helmet } from 'react-helmet-async';
import ExperienceSection from '../features/experience';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

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
        <title>Experience | Muhammad Rashid Shafique — Engineer & BS CS Candidate</title>
        <meta name="description" content="Work experience and academic timeline of Muhammad Rashid Shafique — open-source contributor, freelance systems engineer, and BS Computer Science candidate at UAF Faisalabad. Experience with Selenium automation, Node.js APIs, hospital management systems, and data analytics workflows." />
        <meta name="keywords" content="Muhammad Rashid Shafique experience, software engineer work history, open source contributor Pakistan, BS Computer Science UAF, Selenium automation engineer, Node.js backend experience, Django API experience" />
        <link rel="canonical" href={`${BASE_URL}/experience`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/experience`} />
        <meta property="og:title" content="Experience | Muhammad Rashid Shafique — Engineer & BS CS Candidate" />
        <meta property="og:description" content="Systems Engineer with experience in Python automation, REST APIs, hospital management systems, and modern web applications." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Experience" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Experience | Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="Open Source Engineer & BS CS Candidate. Delivering scalable systems with Python, React, and Django." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(experienceSchema)}</script>
      </Helmet>
      <ExperienceSection />
    </>
  );
}
