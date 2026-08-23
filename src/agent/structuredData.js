import { SITE } from './site.js';

const orgId = `${SITE.origin}/#organization`;
const websiteId = `${SITE.origin}/#website`;
const productId = `${SITE.origin}/#product`;

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: SITE.name,
      legalName: SITE.name,
      alternateName: ['Our Family Story', 'Our Family Story Book'],
      url: `${SITE.origin}/`,
      description:
        'Sam Story Book makes personalized hardcover children\'s books that tell a family\'s own story with real names, photos, and hand-painted watercolor illustrations.',
      email: SITE.email,
      telephone: SITE.telephone,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.origin}/images/heart-logo.jpg`,
      },
      image: `${SITE.origin}/images/1.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        addressCountry: SITE.address.addressCountry,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: SITE.email,
        telephone: SITE.telephone,
        url: `${SITE.origin}/contact`,
        availableLanguage: ['English'],
      },
      sameAs: ['https://www.linkedin.com/in/samlapscher'],
      founder: {
        '@type': 'Person',
        name: SITE.founder,
        url: `${SITE.origin}/about`,
        email: SITE.email,
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE.name,
      url: `${SITE.origin}/`,
      description:
        'Create a personalized children\'s book celebrating your family\'s heritage and love. Custom story books for ages 0-8.',
      publisher: { '@id': orgId },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Product',
      '@id': productId,
      name: SITE.productName,
      url: `${SITE.origin}/`,
      image: [
        `${SITE.origin}/images/1.png`,
        `${SITE.origin}/images/2.png`,
        `${SITE.origin}/images/3.png`,
      ],
      description:
        'Create a personalized children\'s book celebrating your family\'s heritage and love. Custom story books for ages 0-8 featuring family photos, grandparents\' names, and hand-painted illustrations.',
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      manufacturer: { '@id': orgId },
      offers: {
        '@type': 'Offer',
        url: `${SITE.origin}/`,
        priceCurrency: 'USD',
        price: '38',
        availability: 'https://schema.org/InStock',
        seller: { '@id': orgId },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '4',
      },
      category: "Children's Books",
      audience: {
        '@type': 'Audience',
        suggestedMinAge: 0,
        suggestedMaxAge: 8,
      },
    },
  ],
};

export function structuredDataJson() {
  return JSON.stringify(structuredData).replace(/</g, '\\u003c');
}
