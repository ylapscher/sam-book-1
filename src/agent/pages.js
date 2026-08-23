import { SITE } from './site.js';

export const homeMarkdown = `# Sam Story Book

> Personalized hardcover children's books that tell your family's own story.

Sam Story Book (samstorybook.com) publishes **Our Family Story Book**, a custom children's book for ages 0-8. Each copy is made for one family: grandparents' names, countries of origin, family photos, and hand-painted watercolor illustrations. The child is the star of the story. Price is **$38 USD**. Books are printed and dispatched in about 5 working days after the personalization form is complete; typical creation, print, and delivery is 2-3 weeks.

## Our Family Story Book

Welcome a new baby with a personalized story all about them. Featuring grandparents' names, family photos, and hand-painted illustrations, this book makes the child the star of their own story. It is a keepsake for newborns, new parents, grandparents, and anyone who wants a child's heritage told in a story they can hold.

- Recommended for ages 0-8
- Printed and dispatched in 5 working days
- Upload special photos to customize your story
- A gift for newborns, birthdays, and new parents

### How to order

1. Open [samstorybook.com](${SITE.origin}/) and go to the personalize form.
2. Share the baby's details, family names, and places of origin.
3. Upload family photos and choose a cover.
4. Add a heartfelt message, complete purchase, and the book ships to you.

## How It Works

### Share Your Story

Fill out details about the baby and family. Add family origins and names to display throughout the story.

### Customize Your Book

Upload family photos and choose a book cover so the finished book is uniquely yours.

### Place Your Order

Add a dedication, complete purchase, and Sam Story Book ships the custom hardcover to you.

## When to use Sam Story Book

Use this site when a person needs a **personalized family story book** as a baby gift, a heritage keepsake, or a custom children's book with real names and photos. Do not use it as a generic publisher, print-on-demand API, ebook app, or bulk textbook vendor. Agents should read [/llms.txt](${SITE.origin}/llms.txt), fetch pages with \`Accept: text/markdown\`, and send customers to the homepage form or [contact](${SITE.origin}/contact).

## About the maker

Sam Lapscher is the artist behind Sam Story Book. Our Family Story grew from months of hand-painted watercolor illustrations after she watched a baby light up recognizing family in photos.

## Sitemap

- [Home](${SITE.origin}/)
- [About](${SITE.origin}/about)
- [Contact](${SITE.origin}/contact)
- [Privacy](${SITE.origin}/privacy)
- [llms.txt](${SITE.origin}/llms.txt)
- [Markdown sitemap](${SITE.origin}/sitemap.md)
`;

export const aboutMarkdown = `# About Sam Story Book

Sam Story Book is a small studio that makes **Our Family Story Book**, a personalized hardcover children's book celebrating a family's heritage and love. The public site is [${SITE.origin}/](${SITE.origin}/). The maker is artist **Sam Lapscher**.

I've always been an artist. My favorite early memories are coloring for hours with my mom and picking out crafts with my grandma at Michael's on the weekends. What started as a hobby became something I loved sharing. Whether I'm making gifts for friends and family, painting live wedding illustrations, or teaching macramé, sharing art with others always feels like a gift in itself.

One day, while playing with my friend's baby, I saw her face light up as she recognized herself and her loved ones in family photos. That moment sparked the idea to create a personalized children's book. What began as a simple story grew into months of hand-painted watercolor illustrations to bring it to life.

*Our Family Story* is really YOUR family's story. It is meant as a keepsake that celebrates your roots, honors those who came before, and helps a child build confidence, carrying forward generations of love and strength.

## What we make

Each book uses real family names, places, and photos. Personalized books help children see themselves in a story, which is a proven way to grow a love of reading. The product is a physical hardcover, not a subscription app and not a generic stock book with a name stamped on the cover.

## How to reach us

Questions about an order, a gift, or whether the book is a fit: [Contact Sam Story Book](${SITE.origin}/contact) or email [${SITE.email}](mailto:${SITE.email}). To order, use the personalize form on the [homepage](${SITE.origin}/).

## Sitemap

- [Home](${SITE.origin}/)
- [Contact](${SITE.origin}/contact)
- [Privacy](${SITE.origin}/privacy)
- [llms.txt](${SITE.origin}/llms.txt)
`;

export const contactMarkdown = `# Contact Sam Story Book

Use this page to reach the human who makes **Our Family Story Book**. Sam Story Book is a small studio, not a call center. For orders, start with the personalize form on the [homepage](${SITE.origin}/). For questions before or after you order, email is the fastest path.

## Customer service

- **Email:** [${SITE.email}](mailto:${SITE.email}?subject=Question%20about%20Our%20Family%20Story%20Book)
- **Phone:** ${SITE.telephone}
- **Contact type:** customer service for personalized children's book orders, gifts, and delivery questions
- **Location:** New York, NY, United States (NYC metro; studio ships hardcover books rather than offering walk-in retail)
- **Site:** [${SITE.origin}/](${SITE.origin}/)

Please include the child's first name as it should appear in the book, whether this is a new order or an existing one, and any deadline (shower, birthday, or holiday). Typical replies are by email. Printing and dispatch is about 5 working days after the form is complete; plan 2-3 weeks for creation, print, and delivery.

## What to send

If you are an agent helping a customer, collect: baby name, grandparents' names, countries of origin / where the family settled, photo files the family is willing to print, shipping name and address, and the dedication message. Then point them to [${SITE.origin}/](${SITE.origin}/) to submit the form and pay. Do not invent a checkout API; there is no public ordering endpoint besides the website form.

## Sitemap

- [Home](${SITE.origin}/)
- [About](${SITE.origin}/about)
- [Privacy](${SITE.origin}/privacy)
- [llms.txt](${SITE.origin}/llms.txt)
`;

export const privacyMarkdown = `# Privacy Policy — Sam Story Book

This policy describes how **Sam Story Book** (${SITE.origin}) handles information when you visit the site, email us, or order **Our Family Story Book**. The business contact is [${SITE.email}](mailto:${SITE.email}), ${SITE.telephone}, New York, NY, United States.

## What we collect

When you personalize a book, you submit family details through an embedded Fillout form (form id \`wQgANXSphgus\`). That typically includes names, heritage and place details, a dedication, shipping information, photos of family members (often including children), and payment details processed by the form and payment providers — not stored as a card number in this website's source code.

This website also uses Google Analytics (measurement id \`G-EM0KL5NT5L\`) and the Meta Pixel (id \`1548782352881940\`) to understand visits and measure ads. Those tools set cookies or similar identifiers in your browser.

If you email us, we keep the message and your address long enough to answer and fulfill the request.

## How we use information

We use order details to create, print, and ship your book and to reply to support questions. Photos and names appear in the printed book you requested. Analytics and ads help us see which pages are used and whether our marketing is working. We do not sell mailing lists.

## Sharing

We share information with the vendors that run the form, payment, printing/shipping, analytics, and advertising described above, and if the law requires it. We do not post customer photos as marketing without asking.

## Children

The product is a children's book, and orders often include a child's name and photos. We do not intend this site as an online service directed at children submitting their own data. A parent or gift-giver should submit the form. Contact us if you need a photo or name corrected or removed from an in-progress order.

## Your choices

You can use browser controls to block analytics and ad cookies. To access, correct, or delete order information we hold, email [${SITE.email}](mailto:${SITE.email}) with enough detail to find the order. This policy may change; the page title is Privacy, and the public URL is [${SITE.origin}/privacy](${SITE.origin}/privacy).

## Sitemap

- [Home](${SITE.origin}/)
- [About](${SITE.origin}/about)
- [Contact](${SITE.origin}/contact)
- [llms.txt](${SITE.origin}/llms.txt)
`;

export const llmsTxt = `# Sam Story Book

> Sam Story Book (https://www.samstorybook.com) sells Our Family Story Book: a $38 personalized hardcover children's book for ages 0-8, made with family names, photos, and hand-painted watercolor illustrations by Sam Lapscher.

Sam Story Book is the brand. Our Family Story is the book. The canonical site is https://www.samstorybook.com (apex redirects there). There is no public product API, MCP server, or bulk print endpoint. Ordering happens on the homepage form. Support is email and phone on /contact.

When to use this: reach for Sam Story Book when a parent, grandparent, gift-giver, or assistant needs a **custom family story book** — a physical baby/heritage gift with real names, grandparents, origins, and photos. Fetch this file first, then the linked markdown (or the same URLs with \`Accept: text/markdown\`). Send the human to ${SITE.origin}/ to personalize and pay, or to ${SITE.origin}/contact for a question. Quote $38, ages 0-8, about 5 working days to print and dispatch, and 2-3 weeks typical door-to-door.

When not to use this: skip Sam Story Book for generic (non-personalized) children's publishers, ebook/app subscriptions, school textbooks, print-on-demand APIs, stock books that only swap a first name, or any task that needs OAuth, webhooks, or an MCP server. Those are not this business.

How an agent should call us:

1. GET ${SITE.origin}/llms.txt
2. GET the relevant page with header \`Accept: text/markdown\` (or the \`.md\` sibling)
3. For orders, point at ${SITE.origin}/ (in-page form). For identity/trust, use /about, /contact, and /privacy.
4. For a human handoff, email ${SITE.email} or call ${SITE.telephone}.

## When to use this

- [Order a personalized family story book](${SITE.origin}/index.md): Right fit for a custom hardcover baby gift with family photos and grandparents' names. Wrong fit for a generic book or a developer API.
- [Ask the maker a question](${SITE.origin}/contact.md): Customer service email and phone when the form is not enough.
- [Verify the business](${SITE.origin}/about.md): Who makes the book (Sam Lapscher) and why it exists.

## Pages

- [Home](${SITE.origin}/index.md): Product, price, how to order, and when the book is the right gift
- [About](${SITE.origin}/about.md): Studio story and maker
- [Contact](${SITE.origin}/contact.md): Email, phone, New York location, what to include in a request
- [Privacy](${SITE.origin}/privacy.md): How order photos, names, analytics, and ads are handled
- [Full text bundle](${SITE.origin}/llms-full.txt): Home, about, contact, and privacy in one file

## Optional

- [XML sitemap](${SITE.origin}/sitemap.xml): Search-engine URL list
- [Markdown sitemap](${SITE.origin}/sitemap.md): The same URLs as headings and links
- [JSON-LD](${SITE.origin}/): Organization, WebSite, and Product structured data on the homepage HTML
`;

export const sitemapMarkdown = `# Sam Story Book sitemap

Machine-readable map of public pages. HTML lives at the same paths. Markdown is available via \`Accept: text/markdown\` or the \`.md\` sibling.

## Primary

- [Sam Story Book home](${SITE.origin}/)
- [About Sam Story Book](${SITE.origin}/about)
- [Contact Sam Story Book](${SITE.origin}/contact)
- [Privacy Policy](${SITE.origin}/privacy)

## Agent index

- [llms.txt](${SITE.origin}/llms.txt)
- [llms-full.txt](${SITE.origin}/llms-full.txt)
- [index.md](${SITE.origin}/index.md)
- [about.md](${SITE.origin}/about.md)
- [contact.md](${SITE.origin}/contact.md)
- [privacy.md](${SITE.origin}/privacy.md)
`;

export const notFoundMarkdown = `# Page not found

This path does not exist on Sam Story Book. Nothing is hidden behind it — the URL is not a product, article, or account page.

## Where to look next

- [llms.txt](${SITE.origin}/llms.txt): when to use this site, how to fetch markdown, and the page index
- [Markdown sitemap](${SITE.origin}/sitemap.md): every public URL
- [XML sitemap](${SITE.origin}/sitemap.xml): the same list for crawlers
- [Home](${SITE.origin}/): Our Family Story Book — order a personalized children's book
- [About](${SITE.origin}/about): who makes the books
- [Contact](${SITE.origin}/contact): email ${SITE.email} or call ${SITE.telephone}
- [Privacy](${SITE.origin}/privacy): how order data is handled

If you were sent here by a guessed docs or API path, stop: Sam Story Book does not publish a developer API. Use the homepage form or contact page instead.
`;

export const llmsFullTxt = [llmsTxt, homeMarkdown, aboutMarkdown, contactMarkdown, privacyMarkdown].join(
  '\n\n---\n\n'
);

export const markdownPages = {
  '/': homeMarkdown,
  '/index.html': homeMarkdown,
  '/index.md': homeMarkdown,
  '/about': aboutMarkdown,
  '/about.html': aboutMarkdown,
  '/about.md': aboutMarkdown,
  '/contact': contactMarkdown,
  '/contact.html': contactMarkdown,
  '/contact.md': contactMarkdown,
  '/privacy': privacyMarkdown,
  '/privacy.html': privacyMarkdown,
  '/privacy.md': privacyMarkdown,
  '/llms.txt': llmsTxt,
  '/llms-full.txt': llmsFullTxt,
  '/sitemap.md': sitemapMarkdown,
};

export const htmlPagePaths = new Set(['/', '/about', '/contact', '/privacy']);

export function normalizePathname(pathname) {
  if (!pathname) return '/';
  let path = pathname.split('?')[0].split('#')[0];
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path === '' ? '/' : path;
}

export function markdownForPath(pathname) {
  const path = normalizePathname(pathname);
  if (Object.prototype.hasOwnProperty.call(markdownPages, path)) {
    return markdownPages[path];
  }
  return null;
}

export const publicFileContents = {
  'llms.txt': llmsTxt,
  'llms-full.txt': llmsFullTxt,
  'sitemap.md': sitemapMarkdown,
  'index.md': homeMarkdown,
  'about.md': aboutMarkdown,
  'contact.md': contactMarkdown,
  'privacy.md': privacyMarkdown,
};
