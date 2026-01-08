export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  description?: string;
}

export interface Subscription {
  id: string;
  title: string;
  price: string;
  sessions: string;
  icon?: string;
}

export interface Expert {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
  bgColor?: string;
}
