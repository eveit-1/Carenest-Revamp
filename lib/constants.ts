import { NavItem, Subscription, Expert, Testimonial, Feature } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Book Consultation', href: '/appointment' },
  { label: 'Product', href: '/product' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/#contact' },
];

export const productCategories = [
  { name: 'Multi Vitamin Gummies', href: '/product' },
  { name: 'Hair', href: '/#' },
  { name: 'Skin', href: '/#' },
  { name: 'Body', href: '/#' },
  { name: 'Beard', href: '/#' },
];

export const features: Feature[] = [
  {
    title: 'Confidential',
    description: 'Allow you to get secure and private counseling via your own tablet and smartphones.',
    icon: '/images/Vector (1).png',
    bgColor: '#FE8B75',
  },
  {
    title: 'Comfortable To Use',
    description: 'No need to make appointment and go to counselor\'s office in advance.',
    icon: '/images/Vector-1.png',
    bgColor: '#9AB898',
  },
  {
    title: 'Flexible',
    description: 'Flexible consultation time slots that are more convenient for you.',
    icon: '/images/Group 555.png',
    bgColor: '#F9495C',
  },
  {
    title: 'Cost-Effective Care',
    description: 'Striving to deliver cost-effective healthcare solutions that maximize value for patients and payers.',
    icon: '/images/Group 48095407.png',
    bgColor: '#D9D9D9',
  },
];

export const subscriptions: Subscription[] = [
  {
    id: '1',
    title: 'Mother and child counseling',
    price: '₹ 1,099',
    sessions: '(1 session)',
    icon: '/images/1.png',
  },
  {
    id: '2',
    title: 'Physical health',
    price: '₹ 1,299',
    sessions: '(3 sessions)',
    icon: '/images/2.png',
  },
  {
    id: '3',
    title: 'Mental health care',
    price: '₹ 1999 (2 sessions) ₹ 3099 (3 sessions) ₹ 5099 (5 sessions)',
    sessions: '',
    icon: '/images/4.png',
  },
  {
    id: '4',
    title: 'Skin and Hair',
    price: '₹ 1,099',
    sessions: '(4 appointments / 20min. each)',
    icon: '/images/3.png',
  },
];

export const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Anuradha',
    specialty: 'Skin and Hair expert',
    bio: 'Dr. Anuradha comes with 8+ years of experience in treating skin and hair conditions, Has gained her training from her country and internationally and has been constantly updating her techniques in the field of medicine. She is a patient oriented Doctor who believes in implementation of science and researches for betterment of her country.',
    image: '/images/rem 1.jpg',
  },
  {
    id: '2',
    name: 'Dr. Rajeshwari',
    specialty: 'Child health expert',
    bio: 'Dr. Rajeshwari has an extensive knowledge in pediatrics with her career excellence in pediatrics from national board of examinations and diploma in child health care, India. She is very professional with 11 + years of experience in medicine and believes in the best treatment outcome for her patients.',
    image: '/images/rem 2.jpg',
  },
  {
    id: '3',
    name: 'Dr. Govind',
    specialty: 'General health care',
    bio: 'Dr. Govind is a Bachelor of Medicine and Bachelor of Surgery from Indian government recognized institute - Maharashtra university of health science and comes with extensive knowledge in the field of medicine with his career training from government institutes and hospitals in India.',
    image: '/images/CN5.png',
  },
  {
    id: '4',
    name: 'Dr. Deepak',
    specialty: 'Radiologist',
    bio: 'Dr. Deepak has more than 10 + years of experience in medicine. He is a postgraduate from the national board of examination in Radiology. He believes in Imaging with passion and knowledge, for best patient diagnosis and treatment outcome.',
    image: '/images/CN3.png',
  },
  {
    id: '5',
    name: 'Dr. Dyuti',
    specialty: 'Gynaecologist',
    bio: 'Dr Dyuti is a national board certified specialist in the field of obstetrics and gynaecology and specialises in high risk pregnancy, laproscopic, vaginal gynecological procedures and ultrasonography. She has 5+ years of experience in this field. A patient oriented personality for all new moms with us.',
    image: '/images/doc5.png',
  },
  {
    id: '6',
    name: 'Dr. Jaisybai',
    specialty: 'Physiotherapist',
    bio: 'Dr. Jaisybai is an expert in her field of physiotherapy with more than 8 years of experience in pain management, mobility improvement, weight management and healthcare wellness. Experienced with orthopedic, neurological as well as delayed paediatric conditions. She can help you through your journey of wellness.',
    image: '/images/doc6.png',
  },
  {
    id: '7',
    name: 'Dr. Shreya',
    specialty: 'Psychologist',
    bio: 'I am RCI certified Clinical Psychologist. I aim to help people with mental health problems by providing psychotherapy services, group therapy sessions to help them deal with psycho-social issues. I have training in evidence-based therapies of CBT, person-centred therapy through my practice, I have commonly helped my clients cope with disorders such as depression, anxiety, OCD as well as neuropsychology problems.',
    image: '/images/doctor7.jpeg',
  },
  {
    id: '8',
    name: 'Dr. Amit',
    specialty: 'Psychologist',
    bio: 'Amit is a RCI Registered Rehabilitation Psychologist. Mental health professional with a PGDRP in Rehabilitation Psychology and MA in Clinical Psychology. He is clinically trained in conducting psychological assessments and evaluations. His therapy dwells primarily upon the approaches of cognitive behavioural therapy, humanistic therapy, motivational enhancement therapy and client centered therapy.',
    image: '/images/male_doc.png',
  },
  {
    id: '9',
    name: 'Dr. Shreya',
    specialty: 'Physiotherapists',
    bio: 'Dr Shreya is a postgraduate in physiotherapy, who specializes in orthopedic care and fitness. She is an internationally certified mat pilates instructor which makes her a great consultant for your fitness along with care for your bone, muscle and joint problems. She believes in patient tailored and goal oriented treatment protocols.',
    image: '/images/doctor8.jpeg',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Great advices given by Carenest!! One of the best healthcare services!! Highly recommended!!',
    author: 'Akansha',
    rating: 5.0,
    avatar: '/images/rem 1.jpg',
  },
  {
    id: '2',
    quote: 'I have been following the information they are providing and it\'s really Great, backed by authentic research.',
    author: 'Chaitanya Bansal',
    rating: 4.0,
    avatar: '/images/rem 2.jpg',
  },
  {
    id: '3',
    quote: 'One of the best health care advices. Experienced skin care professionals.',
    author: 'Adil Khan',
    rating: 4.0,
    avatar: '/images/rem 3.jpg',
  },
];

export const featuredProduct = {
  id: '1',
  name: 'CareNest Multivitamin Gummies',
  price: 999,
  image: '/images/products/carenest.webp',
  slug: 'careNest-multivitamin',
};
