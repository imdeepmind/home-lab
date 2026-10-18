/**
 * Home Lab / Personal Homepage Catalog Data
 * home.imdeepmind.com
 */

const DEFAULT_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'hosted', label: 'Hosted Apps', icon: 'globe' },
  { id: 'email', label: 'Inboxes & Email', icon: 'mail' },
  { id: 'media', label: 'Media', icon: 'film' },
  { id: 'cloud', label: 'Cloud & Databases', icon: 'cloud' },
  { id: 'security', label: 'Security & Passwords', icon: 'key' },
  { id: 'projects', label: 'GitHub Projects', icon: 'code' }
];

const DEFAULT_SERVICES = [
  // --- Hosted Apps ---
  {
    id: 'app-imdeepmind',
    name: 'imdeepmind.com',
    category: 'hosted',
    url: 'https://imdeepmind.com/',
    description: 'Personal study notes, engineering blog, and portfolio by Abhishek Chatterjee.',
    iconType: 'badge',
    iconBg: '#d9083c',
    iconText: 'IM',
    tags: ['Blog', 'Notes', 'Primary'],
    status: 'online',
    favorite: true
  },
  {
    id: 'app-portfolio',
    name: 'Portfolio',
    category: 'hosted',
    url: 'https://portfolio.imdeepmind.com/',
    description: 'Personal investment portfolio tracker and analytics web application.',
    iconType: 'badge',
    iconBg: '#0284c7',
    iconText: 'PF',
    tags: ['Investments', 'Finance', 'Next.js'],
    status: 'online',
    favorite: true
  },
  {
    id: 'app-todo',
    name: 'Todo App',
    category: 'hosted',
    url: 'https://todo.imdeepmind.com/',
    description: 'Minimalist TODO application with sleek design, micro-animations, and shortcuts.',
    iconType: 'badge',
    iconBg: '#10b981',
    iconText: 'TD',
    tags: ['Productivity', 'Tasks', 'Focus'],
    status: 'online',
    favorite: true
  },
  {
    id: 'app-ayo',
    name: 'ayo Storage',
    category: 'hosted',
    url: 'https://ayo.imdeepmind.com/',
    description: 'Self-hosted, end-to-end encrypted, multi-cloud storage platform by Abhishek.',
    iconType: 'badge',
    iconBg: '#d9083c',
    iconText: 'AY',
    tags: ['E2EE', 'Cloud Storage', 'Go', 'OSS'],
    status: 'online',
    favorite: true
  },
  {
    id: 'app-rocket',
    name: 'Rocket Platform',
    category: 'hosted',
    url: 'https://rocket.imdeepmind.com/',
    description: 'Configuration-driven open-source platform for rapidly building backend APIs.',
    iconType: 'badge',
    iconBg: '#8b5cf6',
    iconText: '🚀',
    tags: ['API Framework', 'TypeScript', 'Backend'],
    status: 'online',
    favorite: true
  },
  {
    id: 'app-utility-tools',
    name: 'Utility Tools',
    category: 'hosted',
    url: 'https://imdeepmind.com/utility-tools/',
    description: 'Curated developer tool collection: encoders, formatters, hashes, and generators.',
    iconType: 'badge',
    iconBg: '#06b6d4',
    iconText: 'UT',
    tags: ['Dev Tools', 'Utilities', 'Converters'],
    status: 'online',
    favorite: true
  },
  {
    id: 'app-hocrox',
    name: 'Hocrox',
    category: 'hosted',
    url: 'https://hocrox.imdeepmind.com/',
    description: 'High performance data preprocessing & augmentation pipeline for deep learning.',
    iconType: 'badge',
    iconBg: '#f59e0b',
    iconText: 'HX',
    tags: ['Deep Learning', 'Python', 'Computer Vision'],
    status: 'online',
    favorite: false
  },
  {
    id: 'app-gallery',
    name: 'Photo Gallery',
    category: 'hosted',
    url: 'https://gallery.imdeepmind.com/',
    description: 'Landscape, travel, and nature photography gallery from road trips and hikes.',
    iconType: 'badge',
    iconBg: '#ec4899',
    iconText: 'GL',
    tags: ['Photography', 'Travel', 'Landscapes'],
    status: 'online',
    favorite: true
  },

  // --- Inboxes & Email ---
  {
    id: 'email-imdeepmind',
    name: 'abhishek@imdeepmind.com',
    category: 'email',
    url: 'https://mail.google.com/mail/u/?authuser=abhishek@imdeepmind.com',
    description: 'Primary custom domain email inbox on Google Workspace.',
    iconType: 'badge',
    iconBg: '#d9083c',
    iconText: '@',
    tags: ['Primary', 'Domain', 'Google Workspace'],
    status: 'online',
    favorite: true
  },
  {
    id: 'email-gmail-infinity',
    name: 'infinityatme@gmail.com',
    category: 'email',
    url: 'https://mail.google.com/mail/u/?authuser=infinityatme@gmail.com',
    description: 'Personal Gmail inbox (infinityatme).',
    iconType: 'badge',
    iconBg: '#ea4335',
    iconText: 'GM',
    tags: ['Gmail', 'Personal'],
    status: 'online',
    favorite: true
  },
  {
    id: 'email-gmail-jit',
    name: 'abhishekchatterjeejit@gmail.com',
    category: 'email',
    url: 'https://mail.google.com/mail/u/?authuser=abhishekchatterjeejit@gmail.com',
    description: 'Personal & academic Gmail inbox (abhishekchatterjeejit).',
    iconType: 'badge',
    iconBg: '#ea4335',
    iconText: 'GM',
    tags: ['Gmail', 'Personal'],
    status: 'online',
    favorite: false
  },
  {
    id: 'email-proton',
    name: 'abhishek.chatterjee97@protonmail.com',
    category: 'email',
    url: 'https://mail.proton.me/u/0/inbox',
    description: 'End-to-end encrypted privacy mailbox on Proton Mail.',
    iconType: 'badge',
    iconBg: '#6d4aff',
    iconText: 'PM',
    tags: ['Proton', 'E2EE', 'Encrypted Mail'],
    status: 'online',
    favorite: true
  },

  // --- Media ---
  {
    id: 'media-jellyfin',
    name: 'Jellyfin',
    category: 'media',
    url: 'https://jellyfin.home.imdeepmind.com',
    description: 'Self-hosted media system for streaming personal movies, shows, and audio.',
    iconType: 'badge',
    iconBg: '#7c3aed',
    iconText: 'JF',
    tags: ['Streaming', 'Home Lab', 'Movies'],
    status: 'online',
    favorite: true
  },
  {
    id: 'media-youtube',
    name: 'YouTube',
    category: 'media',
    url: 'https://www.youtube.com',
    description: 'Video sharing platform, tutorials, tech channels, and subscriptions.',
    iconType: 'badge',
    iconBg: '#ff0000',
    iconText: 'YT',
    tags: ['Video', 'Streaming', 'Subscriptions'],
    status: 'online',
    favorite: true
  },
  {
    id: 'media-ytmusic',
    name: 'YouTube Music',
    category: 'media',
    url: 'https://music.youtube.com',
    description: 'Music streaming, playlists, favorites, and albums.',
    iconType: 'badge',
    iconBg: '#dc2626',
    iconText: 'YM',
    tags: ['Music', 'Audio', 'Playlists'],
    status: 'online',
    favorite: true
  },

  // --- Security & Passwords ---
  {
    id: 'sec-protonpass',
    name: 'Proton Pass',
    category: 'security',
    url: 'https://pass.proton.me',
    description: 'Encrypted password manager, credit cards, passkeys, and identity vault.',
    iconType: 'badge',
    iconBg: '#6d4aff',
    iconText: 'PP',
    tags: ['Passwords', 'Passkeys', '2FA', 'Proton'],
    status: 'online',
    favorite: true
  },

  // --- Cloud & Databases ---
  {
    id: 'cloud-aws',
    name: 'AWS Console',
    category: 'cloud',
    url: 'https://console.aws.amazon.com/',
    description: 'Amazon Web Services cloud console: EC2, S3, Route53, and IAM.',
    iconType: 'badge',
    iconBg: '#ff9900',
    iconText: 'AWS',
    tags: ['Cloud', 'Infra', 'Compute', 'S3'],
    status: 'online',
    favorite: true
  },
  {
    id: 'cloud-gdrive',
    name: 'Google Drive',
    category: 'cloud',
    url: 'https://drive.google.com/',
    description: 'Cloud document storage, spreadsheets, shared folders, and backups.',
    iconType: 'badge',
    iconBg: '#34a853',
    iconText: 'GD',
    tags: ['Storage', 'Files', 'Documents'],
    status: 'online',
    favorite: true
  },
  {
    id: 'cloud-mongodb',
    name: 'MongoDB Atlas',
    category: 'cloud',
    url: 'https://cloud.mongodb.com/',
    description: 'Fully managed multi-cloud document database clusters and metrics.',
    iconType: 'badge',
    iconBg: '#00ed64',
    iconText: 'MG',
    tags: ['Database', 'NoSQL', 'Clusters'],
    status: 'online',
    favorite: true
  },
  {
    id: 'cloud-upstash',
    name: 'Upstash',
    category: 'cloud',
    url: 'https://console.upstash.com/',
    description: 'Serverless Redis, Kafka, and Vector databases with per-request pricing.',
    iconType: 'badge',
    iconBg: '#00e9a3',
    iconText: 'UP',
    tags: ['Serverless', 'Redis', 'Vector DB', 'Cache'],
    status: 'online',
    favorite: false
  },
  {
    id: 'cloud-vercel',
    name: 'Vercel',
    category: 'cloud',
    url: 'https://vercel.com/dashboard',
    description: 'Frontend cloud platform, Next.js deployments, preview URLs, and analytics.',
    iconType: 'badge',
    iconBg: '#171717',
    iconText: '▲',
    tags: ['Hosting', 'Next.js', 'Deployments'],
    status: 'online',
    favorite: true
  },
  {
    id: 'cloud-netlify',
    name: 'Netlify',
    category: 'cloud',
    url: 'https://app.netlify.com/',
    description: 'Serverless web hosting, continuous deployment, DNS, and edge functions.',
    iconType: 'badge',
    iconBg: '#00c7b7',
    iconText: 'NT',
    tags: ['Jamstack', 'CI/CD', 'Hosting'],
    status: 'online',
    favorite: false
  }
];
