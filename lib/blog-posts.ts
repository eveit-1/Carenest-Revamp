// Mock blog posts data - In a real app, this would come from an API or CMS

export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
  content?: string;
}

export const featuredPosts: BlogPost[] = [
  {
    title: 'The Importance of Daily Vitamins for Overall Health',
    excerpt:
      'Discover why daily vitamins are essential for maintaining optimal health and wellbeing. Learn about the key vitamins your body needs and how they contribute to your overall wellness.',
    slug: 'importance-of-daily-vitamins',
    createdAt: '2024-01-15',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
  {
    title: 'Understanding Mental Health: A Comprehensive Guide',
    excerpt:
      'Mental health is just as important as physical health. Explore the various aspects of mental wellbeing and learn how to maintain a healthy mind through proper care and professional guidance.',
    slug: 'understanding-mental-health',
    createdAt: '2024-01-10',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
  {
    title: 'Skin and Hair Care: Expert Tips for Healthy Living',
    excerpt:
      'Get expert advice on maintaining healthy skin and hair. Learn about the best practices, products, and treatments recommended by dermatology professionals.',
    slug: 'skin-hair-care-tips',
    createdAt: '2024-01-05',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
];

export const blogPosts: BlogPost[] = [
  ...featuredPosts,
  {
    title: 'Nutrition Essentials: Building a Healthy Diet',
    excerpt:
      'Learn about the essential nutrients your body needs and how to build a balanced diet that supports your health goals.',
    slug: 'nutrition-essentials',
    createdAt: '2024-01-20',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
  {
    title: 'Telehealth: The Future of Healthcare',
    excerpt:
      'Explore how telehealth is revolutionizing healthcare delivery, making medical consultations more accessible and convenient for everyone.',
    slug: 'telehealth-future',
    createdAt: '2024-01-18',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
  {
    title: 'Child Health: A Parent\'s Guide to Wellness',
    excerpt:
      'Essential information for parents about maintaining their children\'s health, from nutrition to regular check-ups and preventive care.',
    slug: 'child-health-guide',
    createdAt: '2024-01-12',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
  {
    title: 'General Wellness: Tips for a Healthier Lifestyle',
    excerpt:
      'Simple yet effective tips to improve your overall wellness and lead a healthier, more balanced lifestyle.',
    slug: 'general-wellness-tips',
    createdAt: '2024-01-08',
    featuredImage: {
      url: '/images/products/carenest.webp',
    },
  },
];
