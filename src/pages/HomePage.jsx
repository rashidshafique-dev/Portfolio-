import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/hero';
import SkillsSection from '../features/skills';
import ProjectsSection from '../features/projects';
import BuildLogsTeaser from '../features/build-logs/components/BuildLogsTeaser';
import TestimonialsSection from '../features/testimonials';
import HireMeCTA from '../features/cta';
import { SITE_URL as BASE_URL } from '../constants/portfolioData';

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
        'jobTitle': 'Full-Stack Software Engineer',
        'description': 'Muhammad Rashid Shafique (Rashid Shafique) is a Full-Stack Software Engineer from Faisalabad, Pakistan specialising in Python backends (Django, FastAPI), React, TypeScript, and relational databases.',
        'url': `${BASE_URL}/`,
        'sameAs': [
          'https://github.com/rashidshafique-dev',
          'https://www.linkedin.com/in/rashidshafique-dev',
          'https://x.com/rashidshafiqdev',
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
            'text': 'Muhammad Rashid Shafique (Rashid Shafique) is a Full-Stack Software Engineer from Faisalabad, Pakistan. He specializes in Python backends (Django, FastAPI), React, TypeScript, and scalable web architectures.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Is Rashid Shafique a software developer?',
          'acceptedAnswer': {
            'text': 'Yes, Rashid Shafique is a Full-Stack Software Engineer specializing in Python, Django, FastAPI, React, TypeScript, and modern system design.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What services does Rashid Shafique offer?',
          'acceptedAnswer': {
            'text': 'Rashid Shafique offers full-stack web application development, custom backend REST API engineering, relational database design, and high-performance frontend interfaces.',
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
        <title>Muhammad Rashid Shafique | Full-Stack Software Engineer · Python · Django · React · TypeScript</title>
        <meta name="description" content="Official portfolio of Muhammad Rashid Shafique — Full-Stack Software Engineer from Faisalabad, Pakistan. Expert in Python (Django, FastAPI), React, TypeScript, and scalable database architecture." />
        <meta name="keywords" content="Rashid Shafique, Muhammad Rashid Shafique, Rashid Shafique developer, Full Stack Software Engineer Pakistan, Python developer, React developer, Django FastAPI, backend developer, hire software engineer, rashidshafique-dev" />
        <link rel="canonical" href={`${BASE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="Muhammad Rashid Shafique | Full-Stack Software Engineer" />
        <meta property="og:description" content="Full-Stack Software Engineer specializing in Python (Django, FastAPI), React, TypeScript, and relational databases." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidshafiqdev" />
        <meta name="twitter:creator" content="@rashidshafiqdev" />
        <meta name="twitter:title" content="Muhammad Rashid Shafique | Full-Stack Software Engineer" />
        <meta name="twitter:description" content="Full-Stack Software Engineer specializing in Python (Django, FastAPI), React, TypeScript, and relational databases." />
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
