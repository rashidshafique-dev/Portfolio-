import { Helmet } from 'react-helmet-async';
import BuildLogsSection from '../features/build-logs/components/BuildLogsSection';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const buildLogsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${BASE_URL}/build-logs/#blog`,
      'name': 'Build Logs — Muhammad Rashid Shafique',
      'url': `${BASE_URL}/build-logs`,
      'description': 'Engineering logs, distributed architecture experiments, and full-stack system optimization insights by Rashid Shafique.',
      'author': {
        '@type': 'Person',
        'name': 'Muhammad Rashid Shafique',
        'alternateName': ['Rashid Shafique', 'rashidshafique-dev', 'Rashid Khan'],
        'url': `${BASE_URL}/`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Build Logs', 'item': `${BASE_URL}/build-logs` },
      ],
    },
  ],
};

export default function BuildLogsPage() {
  return (
    <>
      <Helmet>
        <title>Build Logs | Rashid Shafique — Software Engineering & Systems Notes</title>
        <meta name="description" content="Engineering logs, system design write-ups, data analytics workflows, and full-stack development experiments by Rashid Shafique (Muhammad Rashid Shafique)." />
        <meta name="keywords" content="Rashid Shafique build logs, software engineering blog, systems design writeups, Python backend insights, data analytics, full stack developer notes" />
        <link rel="canonical" href={`${BASE_URL}/build-logs`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/build-logs`} />
        <meta property="og:title" content="Build Logs | Rashid Shafique — Engineering Insights" />
        <meta property="og:description" content="Development logs and architectural insights on building scalable systems." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og-preview.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Rashid Shafique Engineering Build Logs" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidkhan4067" />
        <meta name="twitter:title" content="Build Logs | Rashid Shafique" />
        <meta name="twitter:description" content="Development logs and architectural insights on building scalable systems." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.jpg`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(buildLogsSchema)}</script>
      </Helmet>
      <BuildLogsSection />
    </>
  );
}
