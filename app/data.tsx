'use client'

// Types pour les cartes
export interface Card {
  id: string
  title: string
  subtitle: string
  image: string
  difficulty: 'easy' | 'medium' | 'hard'
  platform: string
  categories: string[]
  techniques: string[]
  date: string
}

// Données pour les cartes "easy"
export const easyBox: Card[] = [
  {
    id: 'easy-1',
    title: 'Meow',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'easy',
    platform: 'Hack The Box',
    categories: ['services', 'reconnaissance'],
    techniques: ['FTP', 'Enumeration'],
    date: '2023-01-15'
  },
  {
    id: 'easy-2',
    title: 'Fawn',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'easy',
    platform: 'Hack The Box',
    categories: ['services'],
    techniques: ['FTP'],
    date: '2023-02-10'
  },
  {
    id: 'easy-3',
    title: 'Dancing',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'easy',
    platform: 'Hack The Box',
    categories: ['services'],
    techniques: ['SMB'],
    date: '2023-03-05'
  },
  {
    id: 'easy-4',
    title: 'Basic Pentesting',
    subtitle: 'TryHackMe',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'easy',
    platform: 'TryHackMe',
    categories: ['web', 'reconnaissance'],
    techniques: ['Enumeration', 'Web'],
    date: '2023-04-20'
  }
]

// Données pour les cartes "medium"
export const mediumBox: Card[] = [
  {
    id: 'medium-1',
    title: 'Poison',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'medium',
    platform: 'Hack The Box',
    categories: ['web', 'services'],
    techniques: ['LFI/RFI', 'Log Poisoning'],
    date: '2023-05-12'
  },
  {
    id: 'medium-2',
    title: 'Lazy Admin',
    subtitle: 'TryHackMe',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'medium',
    platform: 'TryHackMe',
    categories: ['web', 'privilege_escalation'],
    techniques: ['SQL Injection', 'Linux PE'],
    date: '2023-06-18'
  },
  {
    id: 'medium-3',
    title: 'Shocker',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'medium',
    platform: 'Hack The Box',
    categories: ['web', 'services'],
    techniques: ['Shellshock', 'Web'],
    date: '2023-07-22'
  }
]

// Données pour les cartes "hard"
export const hardBox: Card[] = [
  {
    id: 'hard-1',
    title: 'Brainfuck',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'hard',
    platform: 'Hack The Box',
    categories: ['web', 'cryptography', 'privilege_escalation'],
    techniques: ['SQL Injection', 'Encryption', 'Linux PE'],
    date: '2023-08-30'
  },
  {
    id: 'hard-2',
    title: 'Jeeves',
    subtitle: 'Hack The Box',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    difficulty: 'hard',
    platform: 'Hack The Box',
    categories: ['services', 'privilege_escalation'],
    techniques: ['Jenkins', 'Windows PE'],
    date: '2023-09-15'
  }
]

// Filtres disponibles
export const FILTERS = {
  difficulty: ['easy', 'medium', 'hard'],
  platform: ['Hack The Box', 'TryHackMe', 'VulnHub'],
  categories: {
    'reconnaissance': ['Enumeration', 'Scanning', 'Footprinting'],
    'web': ['LFI/RFI', 'SQL Injection', 'XSS', 'CSRF', 'Command Injection', 'Web'],
    'privilege_escalation': ['Windows PE', 'Linux PE', 'Kernel Exploits', 'SUID/SGID', 'Privilege Escalation'],
    'services': ['SMB', 'FTP', 'SSH', 'DNS', 'HTTP', 'SMTP'],
    'cryptography': ['Hashing', 'Encryption', 'Steganography', 'SSL/TLS'],
    'misc': ['Buffer Overflow', 'Reverse Engineering', 'Forensics']
  }
}

// Données pour les articles de blog
export interface BlogPost {
  uid: string
  title: string
  description: string
  link: string
  date: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    uid: 'blog-1',
    title: 'Getting Started with Cybersecurity',
    description: 'A beginners guide to essential tools and methodologies.',
    link: '/blog/getting-started-with-cybersecurity',
    date: '2023-10-05'
  },
  {
    uid: 'blog-2',
    title: 'Understanding Buffer Overflows',
    description: 'Deep dive into memory corruption vulnerabilities.',
    link: '/blog/understanding-buffer-overflows',
    date: '2023-11-12'
  },
  {
    uid: 'blog-3',
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How modern design practices are evolving with technology.',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    date: '2023-12-20'
  }
]

// Informations de contact
export const EMAIL = 'contact@example.com'

// Liens sociaux
export interface SocialLink {
  label: string
  link: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Twitter',
    link: 'https://twitter.com/example'
  },
  {
    label: 'GitHub',
    link: 'https://github.com/example'
  },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/example'
  }
]
