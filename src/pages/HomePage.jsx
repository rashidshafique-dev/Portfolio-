import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/hero';
import SkillsSection from '../features/skills';
import ProjectsSection from '../features/projects';
import BuildLogsTeaser from '../features/build-logs/components/BuildLogsTeaser';
import TestimonialsSection from '../features/testimonials';
import HireMeCTA from '../features/cta';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      'name': 'Muhammad Rashid Shafique (Rashid Shafique) — Portfolio',
      'url': `${BASE_URL}/`,
      'mainEntity': {
        '@type': 'Person',
        'name': 'Muhammad Rashid Shafique',
        'alternateName': ['Rashid Shafique', 'rashidshafique-dev', 'Rashid Khan'],
        'jobTitle': 'Full-Stack Developer & Systems Engineer',
        'description': 'Muhammad Rashid Shafique (Rashid Shafique) is a Full-Stack Developer & Systems Engineer from Faisalabad, Pakistan specialising in Python, Django, FastAPI, React, and AI-integrated applications.',
        'url': `${BASE_URL}/`,
        'sameAs': [
          'https://github.com/rashidshafique-dev',
          'https://www.linkedin.com/in/rashidshafique-dev',
        ],
      },
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Who is Rashid Shafique?',
          'acceptedAnswer': {
            'text': 'Muhammad Rashid Shafique (Rashid Shafique) is a Full-Stack Developer and Systems Engineer from Faisalabad, Pakistan. He specializes in Python backends (Django, FastAPI), React, and AI-integrated web applications.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Is Rashid Shafique a software developer?',
          'acceptedAnswer': {
            'text': 'Yes, Rashid Shafique is a Full-Stack Developer and Systems Engineer specializing in Python, Django, FastAPI, React.js, and modern full-stack development.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What services does Rashid Shafique offer?',
          'acceptedAnswer': {
            'text': 'Rashid Shafique offers full-stack web application development, custom backend REST API engineering, data analytics dashboards, and AI-powered software solutions.',
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Muhammad Rashid Shafique | Full-Stack Developer & Systems Engineer | Pakistan</title>
        <meta name="description" content="Official portfolio of Muhammad Rashid Shafique — Full-Stack Developer & Systems Engineer from Faisalabad, Pakistan. Expert in Python (Django, FastAPI), React, and modern web applications." />
        <meta name="keywords" content="Rashid Shafique, Muhammad Rashid Shafique, Rashid Shafique developer, Systems Engineer Pakistan, Full Stack Developer Pakistan, Python developer, React developer, Django FastAPI, backend developer, hire software engineer, rashidshafique-dev" />
        <link rel="canonical" href={`${BASE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="Muhammad Rashid Shafique | Full-Stack Developer & Systems Engineer" />
        <meta property="og:description" content="Systems Engineer & Full-Stack Developer from Pakistan. Python · Django · FastAPI · React. Building scalable APIs and modern web apps." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidshafique-dev" />
        <meta name="twitter:creator" content="@rashidshafique-dev" />
        <meta name="twitter:title" content="Muhammad Rashid Shafique | Full-Stack Developer & Systems Engineer" />
        <meta name="twitter:description" content="Systems Engineer & Full-Stack Developer from Pakistan. Python · Django · FastAPI · React." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(homeSchema)}</script>
      </Helmet>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <BuildLogsTeaser />
      <TestimonialsSection />
      <HireMeCTA />
    </>
  );
}
