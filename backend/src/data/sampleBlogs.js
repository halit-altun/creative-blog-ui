export const sampleBlogs = [
  {
    category: 'React',
    title: 'Building Scalable UIs with React and Modern Hooks',
    excerpt:
      'Learn how to structure React apps with clean component boundaries, Suspense-friendly data flow, and maintainable state patterns for production-ready frontends.',
    tags: ['React', 'Hooks', 'Frontend', 'Architecture'],
    date: 'March 12, 2026',
    readTime: '6 min read',
    author: 'Halit Altun',
    content: [
      {
        type: 'subtitle',
        text: 'Why component boundaries matter',
      },
      {
        type: 'paragraph',
        text: 'Scalable React applications start with clear ownership. Keep presentational components focused on rendering, and move side effects into dedicated hooks or services. This separation makes features easier to test and safer to refactor as the product grows.',
      },
      {
        type: 'subtitle',
        text: 'Practical state strategy',
      },
      {
        type: 'paragraph',
        text: 'Use local state for UI-only concerns, lift state only when siblings must share it, and prefer server state libraries for remote data. Avoid premature memoization; optimize after measuring real render bottlenecks.',
      },
      {
        type: 'paragraph',
        text: 'With consistent folder structure, typed props, and predictable data fetching, React remains productive from small landing pages to complex dashboards.',
      },
    ],
  },
  {
    category: 'Nextjs',
    title: 'Next.js App Router Patterns for Full Stack Delivery',
    excerpt:
      'A practical look at routing, server components, and API boundaries in Next.js so you can ship faster without sacrificing maintainability.',
    tags: ['Next.js', 'App Router', 'TypeScript', 'Full Stack'],
    date: 'March 28, 2026',
    readTime: '7 min read',
    author: 'Halit Altun',
    content: [
      {
        type: 'subtitle',
        text: 'Server-first by default',
      },
      {
        type: 'paragraph',
        text: 'The App Router encourages fetching close to the data source. Prefer Server Components for read-heavy views and introduce Client Components only where interactivity is required. This keeps bundles smaller and improves first paint.',
      },
      {
        type: 'subtitle',
        text: 'Clear API contracts',
      },
      {
        type: 'paragraph',
        text: 'Whether you use Route Handlers or an external .NET API, define request/response shapes early. Shared TypeScript types between UI and backend reduce runtime surprises and speed up feature work.',
      },
      {
        type: 'paragraph',
        text: 'Combine nested layouts, loading UI, and error boundaries to create resilient page flows that feel intentional on both desktop and mobile.',
      },
    ],
  },
  {
    category: 'Dotnet',
    title: 'Designing Clean .NET APIs with CQRS and DDD',
    excerpt:
      'How to keep backend domains readable using CQRS, bounded contexts, and Clean Architecture while integrating with modern frontends.',
    tags: ['.NET', 'CQRS', 'DDD', 'Clean Architecture'],
    date: 'April 5, 2026',
    readTime: '8 min read',
    author: 'Halit Altun',
    content: [
      {
        type: 'subtitle',
        text: 'Separate reads from writes',
      },
      {
        type: 'paragraph',
        text: 'CQRS lets query models stay optimized for UI needs while command handlers enforce business rules. This split is especially valuable in e-commerce workflows where listing data and order mutations evolve at different speeds.',
      },
      {
        type: 'subtitle',
        text: 'Protect the domain',
      },
      {
        type: 'paragraph',
        text: 'Keep entities and domain services free from infrastructure details. Map persistence through repositories and treat controllers as thin adapters. The result is a backend that remains testable as integrations grow.',
      },
      {
        type: 'paragraph',
        text: 'Paired with JWT identity and role-based policies, this approach scales from CRM modules to multi-marketplace orchestration systems.',
      },
    ],
  },
  {
    category: 'Mongodb',
    title: 'Modeling Blog Content in MongoDB for Real Products',
    excerpt:
      'Shape flexible document schemas for blog lists and detail pages, including tags, excerpts, and rich content blocks that map cleanly to React UIs.',
    tags: ['MongoDB', 'Mongoose', 'Schema Design', 'API'],
    date: 'April 18, 2026',
    readTime: '5 min read',
    author: 'Halit Altun',
    content: [
      {
        type: 'subtitle',
        text: 'Documents that match the UI',
      },
      {
        type: 'paragraph',
        text: 'Good schema design mirrors how screens consume data. For blogs, store list fields such as title, excerpt, tags, and readTime at the root, and keep long-form content as ordered blocks with type and text.',
      },
      {
        type: 'subtitle',
        text: 'Category as a routing key',
      },
      {
        type: 'paragraph',
        text: 'Using a unique category field enables simple detail lookups like GET /api/blogs/:category. Index that field and query case-insensitively so URL slugs remain resilient.',
      },
      {
        type: 'paragraph',
        text: 'With Atlas and a lean Express layer, you can iterate on content quickly while keeping the frontend API contract stable.',
      },
    ],
  },
  {
    category: 'Automation',
    title: 'Automating Marketplace Workflows with Node.js and n8n',
    excerpt:
      'Reduce manual operations by connecting marketplace APIs, webhooks, and internal services through reliable automation pipelines.',
    tags: ['n8n', 'Node.js', 'Automation', 'E-commerce'],
    date: 'May 2, 2026',
    readTime: '6 min read',
    author: 'Halit Altun',
    content: [
      {
        type: 'subtitle',
        text: 'From repetitive tasks to flows',
      },
      {
        type: 'paragraph',
        text: 'Order sync, stock updates, and listing checks become fragile when handled manually. With n8n and Node.js workers, each step becomes an observable node that can retry, alert, and scale independently.',
      },
      {
        type: 'subtitle',
        text: 'Design for failure',
      },
      {
        type: 'paragraph',
        text: 'Idempotent handlers, dead-letter paths, and clear logging turn automation from a fragile script into production infrastructure. Start with one high-impact workflow, measure time saved, then expand.',
      },
      {
        type: 'paragraph',
        text: 'This approach has repeatedly cut operational overhead in multi-marketplace environments while keeping engineering ownership clear.',
      },
    ],
  },
];
