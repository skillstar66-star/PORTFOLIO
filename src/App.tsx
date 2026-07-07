import { useEffect, useRef, useState } from 'react';
import './App.css'
import './MobileApp.css'

import seoImg from './assets/services/seo.png';
import marketingImg from './assets/services/marketing.png';
import webdevImg from './assets/services/webdev.png';
import uiuxImg from './assets/services/uiux.png';
import brandingImg from './assets/services/branding.png';
import aiImg from './assets/services/ai.png';
import softwareImg from './assets/services/software.png';

const frameModules = import.meta.glob('./assets/skill star/*.jpg', { eager: true, import: 'default' });
const framePaths = Object.keys(frameModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameModules[key] as string);

const getOptimizedPreviewUrl = (url: string) => {
  if (url && url.includes('cloudinary.com')) {
    return url.replace('/upload/', '/upload/q_auto,f_auto,w_300,c_scale/');
  }
  return url;
};

interface Project {
  logo: string;
  title: string;
  category: string;
  badge: string;
  theme: string;
  color: string;
  rgb: string;
  img: string;
  tags: string[];
  description: string;
  shortDesc: string;
  details: string;
  features: string[];
  client: string;
  year: string;
  link: string;
  metaLeft: string;
  actionText: string;
  industry?: string;
  timeline?: string;
  services?: string;
}

interface Video {
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
}

interface BrandFolder {
  id: string;
  name: string;
  count: number;
  shortDesc: string;
  thumbnail: string;
  videos: Video[];
}

const videoBrandsData: BrandFolder[] = [
  {
    id: 'rokea',
    name: 'ROKEA',
    count: 30,
    shortDesc: 'Luxury Sarees & Jewellery Brand',
    thumbnail: '/images/projects/rokea_thumbnail.png',
    videos: [
      { title: 'Pink Saree Showcase', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674815/25.4.26_pink_saree_qlzha9.mp4' },
      { title: 'Antique Chain Jewellery', duration: '00:20', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674815/6.5.26_antique_chain_video_gizrto.mp4' },
      { title: 'Luxury Silk Weaves', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674814/9.4.26_video_1_quifw7.mp4' },
      { title: 'Traditional Bridal Wear', duration: '00:30', category: 'Bridal Shoot', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674812/21.4.26_video2_iqofqu.mp4' },
      { title: 'Saree Draping Elegance', duration: '00:25', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674810/6.4.26_v1_a87nvc.mp4' },
      { title: 'Premium Festive Wear', duration: '00:15', category: 'Festive Wear', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674804/V1_rkxy3f.mp4' },
      { title: 'Heritage Gold Collections', duration: '00:18', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674799/V-1_dfdulk.mp4' },
      { title: "Today's Bridal Special", duration: '00:22', category: 'Bridal Shoot', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674804/today_reel_j9ysx2.mp4' },
      { title: 'Gold Zari Details', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674800/17.4.26_video_6_izcj1i.mp4' },
      { title: 'Minimal Bridal Set', duration: '00:30', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674798/25.4.26_minimal_bridal_set_video_kqushm.mp4' },
      { title: 'Pure Kanjivaram Silk', duration: '00:28', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674791/9.4.26_video_2_fmpjmz.mp4' },
      { title: 'Royal Wedding Collection', duration: '00:20', category: 'Bridal Shoot', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674774/11.4.26_video_1_ciwtqt.mp4' },
      { title: 'Handcrafted Neckpieces', duration: '00:15', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674773/21.4.26_video_1_nnrsew.mp4' },
      { title: 'Designer Saree Trends', duration: '00:18', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674768/22.4.26_video_2_gpsqfr.mp4' },
      { title: 'Intricate Jewellery Shoot', duration: '00:24', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674765/0422_bpakcm.mp4' },
      { title: 'Classic Blue Saree', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674761/24.4.26_blue_saree_d3flgi.mp4' },
      { title: 'Exquisite Border Work', duration: '00:30', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674738/17.4.26_video1_t6vguw.mp4' },
      { title: 'South Indian Bridal Look', duration: '00:25', category: 'Bridal Shoot', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674724/8.4.26_video_4_vpjmn4.mp4' },
      { title: 'Ethnic Fashion Reel', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674719/8.4.26_reel_v2_k9pmiz.mp4' },
      { title: 'Authentic Loom Craft', duration: '00:20', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674711/17.4.26_v2_px05yd.mp4' },
      { title: 'Modern Choker Sets', duration: '00:22', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781674695/0327_3_ez8ygo.mp4' },
      { title: 'Exhibition Highlights', duration: '00:45', category: 'Event Promo', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781673865/finnal_expo_video_ko6wsr.mp4' },
      { title: 'Festive Sparkle Reel', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781673306/today_reel_u9fkbb.mp4' },
      { title: 'Luxury Wedding Series', duration: '00:30', category: 'Bridal Shoot', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781673304/finnal_reel_5_taqq2j.mp4' },
      { title: 'Temple Jewellery Craft', duration: '00:18', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781673209/V-1_urj9rn.mp4' },
      { title: 'Silver Saree Accents', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781672633/8.4.26_video_5_jelezz.mp4' },
      { title: 'Rich Green Silk Saree', duration: '00:20', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781672611/24.4.26_green_saree_h8wpsu.mp4' },
      { title: 'Gold Polish Sets', duration: '00:25', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781672586/22.4.26_video_2_fcxqs4.mp4' },
      { title: 'Royal Blue Collection', duration: '00:15', category: 'Saree Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781672578/24.4.26_blue_saree_q2cwli.mp4' },
      { title: 'Premium Bridal Chokers', duration: '00:30', category: 'Jewellery Showcase', thumbnail: '/images/projects/rokea_thumbnail.png', videoUrl: 'https://res.cloudinary.com/dgpkzmkxf/video/upload/v1781672540/0327_3_euprx8.mp4' }
    ]
  },
  {
    id: 'seed-therapy',
    name: 'Seed Therapy',
    count: 18,
    shortDesc: 'Pediatric Therapy & Wellness Center',
    thumbnail: '/images/projects/seedstherapy_thumbnail.png',
    videos: [
      { title: 'Early Intervention Intro', duration: '01:30', category: 'Awareness Video', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Sensory Integration Therapy Walkthrough', duration: '02:45', category: 'Educational', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Parent Testimonial - Kabir\'s Journey', duration: '03:10', category: 'Client Story', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Occupational Therapy Activities at Home', duration: '01:50', category: 'Tutorial', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Understanding Autism Grids', duration: '02:15', category: 'Awareness Video', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Speech Therapy Games for Kids', duration: '01:40', category: 'Tutorial', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Physiotherapy Center Tour', duration: '01:10', category: 'Showcase', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Interactive Learning Playgrounds', duration: '01:25', category: 'Showcase', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Nutrition Tips for Developing Minds', duration: '02:30', category: 'Educational', thumbnail: '/images/projects/seedstherapy_thumbnail.png' },
      { title: 'Group Social Skills Exercises', duration: '01:55', category: 'Documentary', thumbnail: '/images/projects/seedstherapy_thumbnail.png' }
    ]
  }
];

const projectsData: Project[] = [
  {
    logo: '/images/logos/rokea_logo.png',
    title: 'ROKEA by RK',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'gold',
    color: '#b59a57',
    rgb: '181, 154, 87',
    img: '/images/projects/rokea_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'Razorpay SDK'],
    description: 'A premium luxury e-commerce platform for heritage sarees and handpicked jewellery, featuring an AI Virtual Stylist and integrated payment checkout.',
    shortDesc: 'Premium Luxury Sarees & Jewellery',
    details: 'Designed and developed a complete luxury e-commerce experience for ROKEA by RK. The site features an interactive AI Virtual Stylist for personalized matching, real-time database cart/wishlist management, secured Razorpay payment checkout, and custom notifications.',
    features: [
      'AI Virtual Stylist for personalized matching',
      'Secure Razorpay checkout payment integration',
      'Firebase Auth, Analytics & Firestore database'
    ],
    client: 'ROKEA by RK',
    year: '2026',
    link: 'https://rokeabyrk.com/',
    metaLeft: 'JavaScript • Firebase • Razorpay',
    actionText: 'View Live Website',
    industry: 'Luxury E-Commerce',
    timeline: '6 Weeks',
    services: 'E-commerce, AI Stylist'
  },
  {
    logo: '/images/logos/seedstherapy_logo.png',
    title: 'Seeds Therapy',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'green',
    color: '#10b981',
    rgb: '16, 185, 129',
    img: '/images/projects/seedstherapy_thumbnail.png',
    tags: ['Next.js', 'React.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    description: 'A responsive, search-optimized pediatric therapy center website showcasing child-centered care, evidence-based therapies, and booking integrations.',
    shortDesc: 'Pediatric Therapy Center Website',
    details: 'Designed and engineered a premium, high-converting pediatric therapy website for Seeds Therapy Center. Features personalized early intervention programs, interactive therapy listings, and direct scheduling hooks wrapped in custom SVG assets.',
    features: [
      'Evidence-based early intervention showcases',
      'Custom responsive therapy categorization grids',
      'SEO optimized schema structure & instant contact hooks'
    ],
    client: 'Seeds Therapy Center',
    year: '2026',
    link: 'https://seedsthrapy.vercel.app/',
    metaLeft: 'Next.js • React • Tailwind CSS',
    actionText: 'View Live Website',
    industry: 'Pediatric Healthcare',
    timeline: '8 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/nexttrip_logo.png',
    title: 'NextTrip Holidays',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'cyan',
    color: '#06b6d4',
    rgb: '6, 182, 212',
    img: '/images/projects/nexttrip_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'jQuery', 'ripples.js', 'Firebase'],
    description: 'A premium, conversion-focused travel booking portal featuring interactive water ripple effects and dynamic package builders.',
    shortDesc: 'Tour Booking & Travel Portal',
    details: 'Architected and built a luxury travel booking portal for NextTrip Holidays. Integrated a premium jQuery.ripples layout effect, custom interactive package slider builders, secure booking forms, and a Firebase Firestore backend database.',
    features: [
      'Interactive jQuery water ripples backdrop rendering',
      'Real-time Firestore database package tour logs',
      'Secure travel booking form with mobile UI verification'
    ],
    client: 'NextTrip Holidays',
    year: '2026',
    link: 'https://dinesh1966.github.io/final-next-trip/',
    metaLeft: 'HTML5 • jQuery • Firebase',
    actionText: 'Explore Portal',
    industry: 'Travel & Tourism',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/krishnanjali_logo.png',
    title: 'Krishnanjali Music',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'gold',
    color: '#d4af37',
    rgb: '212, 175, 55',
    img: '/images/projects/krishnanjali_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas particles', 'FontAwesome'],
    description: 'A responsive, interactive academy website featuring classical dance details, floating musical particle backdrops, and registration workflows.',
    shortDesc: 'Music & Classical Dance Academy Website',
    details: 'Designed and engineered a legacy brand website for Krishnanjali Musical Training Centre in RS Puram. Integrates a custom musical note floating particle system, course selectors, and online enrollment links.',
    features: [
      'Interactive musical floating notes particle backdrop',
      'Trinity College London & Bridge Academy graded pathways',
      'Fully responsive weekend batch registration workflow'
    ],
    client: 'Krishnanjali Academy',
    year: '2026',
    link: 'https://onedassistant-arch.github.io/MUSIC-WEBSITE-/',
    metaLeft: 'HTML5 • Canvas • Graded Prep',
    actionText: 'Explore Academy',
    industry: 'Education & Fine Arts',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/brandify_logo.png',
    title: 'Brandify Agency',
    category: 'Digital Marketing',
    badge: 'BRANDING',
    theme: 'orange',
    color: '#f59e0b',
    rgb: '245, 158, 11',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['Figma', 'Illustrator', 'Google Ads', 'SEO'],
    description: 'A creative agency website showcasing interactive brand campaigns, promotional media, and modern startup guidelines.',
    shortDesc: 'Digital Marketing Agency',
    details: 'Led the digital marketing campaign and visual asset rebranding which increased inbound customer traffic by 4x.',
    features: [
      'Interactive digital marketing guidelines',
      'High-converting ad designs & metrics',
      'Typography and color alignment assets'
    ],
    client: 'Brandify LLC',
    year: '2026',
    link: '#',
    metaLeft: 'Digital Campaign • Google Ads',
    actionText: 'Explore Campaigns',
    industry: 'AdTech & Marketing',
    timeline: '4 Weeks',
    services: 'Digital Marketing'
  },
  {
    logo: '/images/logos/tattoos_logo.png',
    title: 'Tattoos Center',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'red',
    color: '#d90429',
    rgb: '217, 4, 41',
    img: '/images/projects/tattoos_thumbnail.png',
    tags: ['React', 'Vite', 'Vanilla CSS', 'FontAwesome'],
    description: 'A dark, high-contrast tattoo studio website featuring style galleries, artist profiles, and an online booking form with reference uploads.',
    shortDesc: 'Premium Tattoo Studio Website',
    details: 'Designed and built a premium web presence for Tattoos Center. Features horizontal style showcase cards, an interactive booking system with reference file uploaders, testimonials, and contact hooks styled in a rich black-and-red neon theme.',
    features: [
      'Interactive custom tattoo style cataloging',
      'Tattoo artist profiles & direct booking links',
      'Advanced appointment scheduler with image file uploader'
    ],
    client: 'Tattoos Center',
    year: '2026',
    link: 'https://tatttos-new-dqu9.vercel.app',
    metaLeft: 'React • Vanilla CSS • Vite',
    actionText: 'Explore Studio',
    industry: 'Lifestyle & Body Art',
    timeline: '6 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/ayurveda_logo.png',
    title: 'Ayuruvedha Wellness',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'emerald',
    color: '#059669',
    rgb: '5, 150, 105',
    img: '/images/projects/ayurveda_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'AOS Library', 'Responsive Design'],
    description: 'A premium, responsive Ayurvedic wellness brand website showcasing herbal treatments, products, therapies, and custom contact flows.',
    shortDesc: 'Ayurvedic Wellness & Herbal Retreat Portal',
    details: 'Designed and built an elegant digital brand portal for Ayuruvedha Wellness. Integrates smooth scroll scroll-triggered animations (AOS library), customized booking pathways for therapies, interactive product showcase carousels, and response-optimized contact integrations.',
    features: [
      'Responsive organic-themed brand showcase',
      'Smooth scroll animations and interactive product slider cards',
      'Instant booking contact form validation & interactive maps'
    ],
    client: 'Ayuruvedha Wellness',
    year: '2026',
    link: 'https://skillstardevsrc-sys.github.io/ayuruvedha/#',
    metaLeft: 'HTML5 • CSS3 • AOS Library',
    actionText: 'View Live Site',
    industry: 'Ayurvedic Healthcare',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/realestate_logo.png',
    title: 'Elite Real Estate',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'gold',
    color: '#d4af37',
    rgb: '212, 175, 55',
    img: '/images/projects/realestate_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API', 'Swiper.js'],
    description: 'A premium, high-conversion real estate listing and luxury villa booking portal with interactive filtering and virtual tours.',
    shortDesc: 'Luxury Real Estate & Villa Booking Portal',
    details: 'Designed and engineered a legacy real estate showcase portal. Integrates custom Swiper dynamic carousels, responsive property filter grids, interactive Google Maps location APIs, and secured booking lead generation forms.',
    features: [
      'Interactive luxury property listings & search filter sorting',
      'Integrated location maps, proximity logs & virtual tours',
      'Responsive lead forms & direct consultant booking channels'
    ],
    client: 'Elite Properties',
    year: '2026',
    link: 'https://skillstardevsrc-sys.github.io/realestate/',
    metaLeft: 'HTML5 • Swiper.js • Lead Gen',
    actionText: 'Explore Properties',
    industry: 'Real Estate & Hospitality',
    timeline: '5 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/dental_logo.png',
    title: 'Dental Care Hospital',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'teal',
    color: '#0d9488',
    rgb: '13, 148, 136',
    img: '/images/projects/dental_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'FontAwesome', 'AOS Library'],
    description: 'A premium, responsive dental clinic and hospital website featuring appointment scheduling, treatments directory, and doctor profiles.',
    shortDesc: 'Modern Dental Clinic & Hospital Portal',
    details: 'Designed and developed a premium medical portal for Dental Care Hospital. Integrates interactive treatment list grids, detailed doctor profile showcases, custom online booking forms, patient testimonials, and SEO-optimized local clinic schema structures.',
    features: [
      'Interactive dental treatment directories & pricing structures',
      'Advanced appointment reservation logic & scheduling hooks',
      'Fully responsive doctor profile carousels & contact pathways'
    ],
    client: 'Dental Care Hospital',
    year: '2026',
    link: 'https://skillstardevsrc-sys.github.io/dental-hospital/',
    metaLeft: 'HTML5 • CSS3 • Clinic Schema',
    actionText: 'Book Appointment',
    industry: 'Healthcare & Dental Care',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/beauty_logo.png',
    title: 'Elite Beauty Saloon',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'magenta',
    color: '#db2777',
    rgb: '219, 39, 119',
    img: '/images/projects/beauty_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts', 'AOS Library'],
    description: 'A premium, responsive beauty saloon and luxury wellness spa website with custom styling catalogs and booking triggers.',
    shortDesc: 'Luxury Beauty Saloon & Wellness Spa Portal',
    details: 'Designed and engineered an elite digital portal for Elite Beauty Saloon. Integrates sleek treatment and service catalogs, stylistic pricing blocks, custom hair/beauty trend showcases, and mobile-responsive appointment pathways.',
    features: [
      'Interactive beauty styling treatment catalogs & services lists',
      'Elegant pricing grids & direct beauty consult scheduling forms',
      'Fully responsive service card carousels & testimonial boards'
    ],
    client: 'Elite Beauty Saloon',
    year: '2026',
    link: 'https://skillstardevsrc-sys.github.io/beauty-saloon-final/',
    metaLeft: 'HTML5 • CSS3 • Spa Catalogs',
    actionText: 'Book Service',
    industry: 'Beauty & Wellness',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/gym_logo.png',
    title: 'Titan Fitness Gym',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'orange',
    color: '#ea580c',
    rgb: '234, 88, 12',
    img: '/images/projects/gym_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'FontAwesome', 'AOS Library'],
    description: 'A high-energy, responsive gym and fitness club website showcasing membership plans, trainer directories, and training classes.',
    shortDesc: 'Premium Fitness Club & Gym Website',
    details: 'Designed and engineered a high-performance digital portal for Titan Fitness Gym. Integrates active trainer showcases, membership pricing calculators, dynamic training class listings, and secure registration call-to-actions.',
    features: [
      'Interactive fitness class directories & trainer profile cards',
      'Elegant membership plans table & custom booking forms',
      'Fully responsive media sliders & motivational quote carousels'
    ],
    client: 'Titan Fitness Gym',
    year: '2026',
    link: 'https://skillstardevsrc-sys.github.io/gym-website/',
    metaLeft: 'HTML5 • CSS3 • Fitness Schedules',
    actionText: 'Join Titan Gym',
    industry: 'Fitness & Health',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/cafe_logo.png',
    title: 'La Cafe Coffee House',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'rose',
    color: '#be123c',
    rgb: '190, 18, 60',
    img: '/images/projects/cafe_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts', 'AOS Library'],
    description: 'A cozy, premium coffee shop and cafe website showcasing custom menus, seasonal brews, and local table booking pathways.',
    shortDesc: 'Modern Coffee Shop & Cafe Website',
    details: 'Designed and engineered a legacy digital portal for La Cafe Coffee House. Integrates cozy responsive menu grids, online order pathways, interactive maps for physical locations, and a streamlined private booking lead funnel.',
    features: [
      'Interactive visual menus & beverage details catalogs',
      'Table reservations & event hosting appointment forms',
      'Fully responsive reviews grids & local maps integrations'
    ],
    client: 'La Cafe',
    year: '2026',
    link: 'https://ramkumar143z.github.io/La-Cafe/',
    metaLeft: 'HTML5 • CSS3 • Menu Catalogs',
    actionText: 'Explore Menu',
    industry: 'Food & Beverage',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/eye_logo.png',
    title: 'Elite Eye Hospital',
    category: 'Websites',
    badge: '★ FEATURED',
    theme: 'teal',
    color: '#0d9488',
    rgb: '13, 148, 136',
    img: '/images/projects/eye_thumbnail.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts', 'AOS Library'],
    description: 'A premium, responsive eye care hospital and surgery center website featuring appointment reservations and treatments catalogs.',
    shortDesc: 'Modern Eye Hospital & Ophthalmology Portal',
    details: 'Designed and developed a premium medical portal for Elite Eye Hospital. Integrates interactive clinical services catalog grids, detailed surgeon and specialist profile showcases, patient testimonial sliders, and online appointment booking forms.',
    features: [
      'Interactive eye treatments directory & diagnostic catalogs',
      'Advanced appointment booking pathways & scheduling forms',
      'Fully responsive doctor profile displays & patients review systems'
    ],
    client: 'Elite Eye Hospital',
    year: '2026',
    link: 'https://skillstardevsrc-sys.github.io/eye-hospital/',
    metaLeft: 'HTML5 • CSS3 • Clinic Schema',
    actionText: 'Book Consult',
    industry: 'Healthcare & Ophthalmology',
    timeline: '4 Weeks',
    services: 'Web Development, UI/UX Design'
  },
  {
    logo: '/images/logos/seo_logo.png',
    title: 'Organic Search Dominance',
    category: 'Digital Marketing',
    badge: 'SEO',
    theme: 'emerald',
    color: '#10b981',
    rgb: '16, 185, 129',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    tags: ['SEO', 'AEO', 'GEO', 'Google Business'],
    description: 'Technical schema setup, Local SEO, and AI search engine optimization (AEO/GEO) pipelines.',
    shortDesc: 'SEO/AEO Search Performance',
    details: 'Secured first-page search rankings on competitive keywords and optimized schema tags to ensure indexability on modern AI answer search engines.',
    features: [
      'Deep technical health audits',
      'AEO / GEO voice search schema',
      'Structured local business map setup'
    ],
    client: 'Seeds Therapy',
    year: '2026',
    link: 'https://seedsthrapy.vercel.app/',
    metaLeft: 'SEO • AEO • Schema',
    actionText: 'Verify Rankings',
    industry: 'Healthcare & Marketing',
    timeline: '12 Weeks',
    services: 'SEO Campaign'
  },
  {
    logo: '/images/logos/no1insurance_logo.png',
    title: 'NO1 Insurance',
    category: 'Web Apps',
    badge: '★ FEATURED',
    theme: 'blue',
    color: '#2563eb',
    rgb: '37, 99, 235',
    img: '/images/projects/no1insurance_thumbnail.png',
    tags: ['Next.js', 'React.js', 'Tailwind CSS', 'TypeScript', 'Lucide Icons'],
    description: 'A premium financial service web app offering insurance booking, mutual fund tracking, and custom tax planning calculators under one roof.',
    shortDesc: 'Insurance & Wealth Management Web App',
    details: 'Designed and engineered a full-service financial advising web portal for NO1 Insurance (SD Financial Solution) in Selvapuram. Features custom interactive calculators, partner showcases, and appointment scheduler APIs.',
    features: [
      'Interactive life, health, and vehicle insurance selectors',
      'Smart financial planning & SIP wealth calculators',
      'Secure client portal & WhatsApp advice hooks'
    ],
    client: 'NO1 Insurance',
    year: '2026',
    link: 'https://no-1insurence.vercel.app/',
    metaLeft: 'Next.js • Tailwind CSS • Lucide',
    actionText: 'Launch Portal',
    industry: 'Financial Advisory & Insurance',
    timeline: '10 Weeks',
    services: 'Web Application Development'
  }
];

interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
  img: string;
}

const servicesData: Service[] = [
  {
    num: '01',
    title: 'SEO, GEO & AEO Optimization',
    description: 'Technical SEO, Local SEO, Answer Engine Optimization, AI Search Optimization, Google Business Optimization, Schema Implementation.',
    tags: ['Google Search Console', 'Semrush', 'Ahrefs', 'Schema.org', 'Screaming Frog'],
    img: seoImg
  },
  {
    num: '02',
    title: 'Performance Marketing & Lead Gen',
    description: 'Google Ads, Meta Ads, LinkedIn Advertising, YouTube Campaigns, Conversion Funnel Optimization, Retargeting.',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn Campaign Mgr', 'HubSpot', 'Google Tag Manager'],
    img: marketingImg
  },
  {
    num: '03',
    title: 'Enterprise Website Development',
    description: 'Business Websites, E-Commerce, Landing Pages, SaaS Platforms, Web Applications, Progressive Web Apps.',
    tags: ['React', 'Next.js', 'Node.js', 'WordPress', 'Laravel', 'Tailwind CSS'],
    img: webdevImg
  },
  {
    num: '04',
    title: 'UI/UX Experience Design',
    description: 'Dashboard Design, Mobile App UI, Website Interfaces, SaaS Product Design, UX Research.',
    tags: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Miro'],
    img: uiuxImg
  },
  {
    num: '05',
    title: 'Branding & Creative Solutions',
    description: 'Logo Design, Brand Identity, Motion Graphics, Social Media Creatives, Packaging Design, Corporate Presentations.',
    tags: ['Adobe Illustrator', 'Adobe Photoshop', 'After Effects', 'Premiere Pro'],
    img: brandingImg
  },
  {
    num: '06',
    title: 'AI & Intelligent Automation',
    description: 'AI Chatbots, Virtual Assistants, Workflow Automation, CRM Integrations, Predictive Analytics, Custom AI Tools.',
    tags: ['OpenAI API', 'Claude API', 'Make.com', 'Zapier', 'LangChain', 'n8n'],
    img: aiImg
  },
  {
    num: '07',
    title: 'Custom Software Development',
    description: 'ERP Systems, CRM Platforms, SaaS Products, Mobile Applications, API Integrations, Workflow Systems.',
    tags: ['Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
    img: softwareImg
  }
];

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  company: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: 'RK Saree Hub',
    role: 'Founder, Rokea',
    text: 'SkillStar Digital Solutions tripled our D2C e-commerce revenue in under 5 months through high-performance Meta/Google Ads and conversion rate optimization.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    company: 'Rokea'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Wellness Director, Inner Compass',
    text: 'Thanks to their AI-powered SEO framework and dynamic video editing, our wellness community saw a 4X growth with an all-time high engagement score.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    company: 'Inner Compass'
  },
  {
    name: 'Dr. Alok Sen',
    role: 'Chief Practitioner, Seeds Therapy',
    text: 'They elevated our healthcare practice from a local clinic to a trusted regional therapy brand. Their technical SEO and positioning strategy were top-notch.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    company: 'Seeds Therapy'
  }
];



const getCategoryIcon = (category: string, color: string, size: number = 14) => {
  switch (category) {
    case 'Websites':
    case 'Web Development':
    case 'UI/UX Design':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
    case 'Web Apps':
    case 'Web Application':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="21" x2="9" y2="9"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
        </svg>
      );
    case 'Videos':
    case 'Vedios':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      );
    case 'Digital Marketing':
    case 'Branding':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon>
        </svg>
      );
  }
};

const renderProjectScreen = (project: Project, isMobile: boolean) => {
  const title = project.title;
  
  if (title === 'ROKEA by RK') {
    return (
      <div className={`mock-screen rokea-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">ROKEA by RK</div>
          {!isMobile && (
            <div className="nav-links">
              <span>Home</span>
              <span>About</span>
              <span>Products</span>
              <span>Contact</span>
            </div>
          )}
          <div className="header-dot"></div>
        </div>
        <div className="screen-body">
          <div className="screen-hero">
            <div className="hero-text">
              <h3>Handpicked Heritage Luxury</h3>
              <p>Discover premium silk sarees and handpicked imitation jewellery that help you shine.</p>
              <div className="hero-buttons">
                <span className="btn-primary">Shop Sarees</span>
                {!isMobile && <span className="btn-secondary">AI Stylist ✦</span>}
              </div>
            </div>
            {!isMobile && (
              <div className="hero-media">
                <div className="saree-graphic-mock">
                  <div className="saree-pattern"></div>
                  <div className="ai-badge">✦ AI Powered</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="screen-glow"></div>
      </div>
    );
  }

  if (title === 'Seeds Therapy') {
    return (
      <div className={`mock-screen seeds-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">SEEDS THERAPY</div>
          {!isMobile && (
            <div className="nav-links">
              <span>Home</span>
              <span>About Us</span>
              <span>Therapies</span>
              <span>Contact</span>
            </div>
          )}
          <div className="header-dot"></div>
        </div>
        <div className="screen-body">
          <div className="screen-hero">
            <div className="hero-text">
              <h3>Helping Children Thrive</h3>
              <p>Personalized pediatric therapy programs designed to help children build confidence and independence.</p>
              <div className="hero-buttons">
                <span className="btn-primary">Book Consultation</span>
              </div>
            </div>
            {!isMobile && (
              <div className="hero-media">
                <div className="wellness-badge">✦ EARLY INTERVENTION</div>
              </div>
            )}
          </div>
        </div>
        <div className="screen-glow"></div>
      </div>
    );
  }

  if (title === 'NextTrip Holidays') {
    return (
      <div className={`mock-screen nexttrip-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">NEXTTRIP</div>
          {!isMobile && (
            <div className="nav-links">
              <span>Home</span>
              <span>Destinations</span>
              <span>Gallery</span>
              <span>Contact</span>
            </div>
          )}
          <div className="header-dot"></div>
        </div>
        <div className="screen-body">
          <div className="screen-hero">
            <div className="hero-text">
              <h3>Discover Hidden Wonders</h3>
              <p>For 15 years, we’ve dedicated ourselves to crafting journeys that immerse you in their soul.</p>
              <div className="hero-buttons">
                <span className="btn-primary">Book Now</span>
              </div>
            </div>
            {!isMobile && (
              <div className="hero-media">
                <div className="plane-mock-graphic">✈</div>
              </div>
            )}
          </div>
        </div>
        <div className="screen-glow"></div>
      </div>
    );
  }

  if (title === 'Krishnanjali Music') {
    return (
      <div className={`mock-screen krishnanjali-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">KRISHNANJALI</div>
          {!isMobile && (
            <div className="nav-links">
              <span>Home</span>
              <span>About</span>
              <span>Courses</span>
              <span>Contact</span>
            </div>
          )}
          <div className="header-dot"></div>
        </div>
        <div className="screen-body">
          <div className="screen-hero">
            <div className="hero-text">
              <h3>Shaping Artistes, Preserving Tradition</h3>
              <p>26+ years of excellence in classical music, dance, and instrumental training in Coimbatore.</p>
              <div className="hero-buttons">
                <span className="btn-primary">Enroll Now</span>
                {!isMobile && <span className="btn-secondary">View Courses</span>}
              </div>
            </div>
            {!isMobile && (
              <div className="hero-media">
                <div className="music-mock-graphic">
                  <span className="music-note-float float-1">♪</span>
                  <span className="music-note-float float-2">♫</span>
                  <span className="music-note-float float-3">♬</span>
                  <div className="classical-badge">✦ Legacy of Art</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="screen-glow"></div>
      </div>
    );
  }

  if (title === 'Tattoos Center') {
    return (
      <div className={`mock-screen tattoos-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">TATTOO<span className="text-red">S</span></div>
          {!isMobile && (
            <div className="nav-links">
              <span>Home</span>
              <span>Styles</span>
              <span>Artists</span>
              <span>Booking</span>
            </div>
          )}
          <div className="header-dot"></div>
        </div>
        <div className="screen-body">
          <div className="screen-hero">
            <div className="hero-text">
              <h3>Ink & Individuality</h3>
              <p>Hygiene-first premium custom tattoos by master artists in a sterile, state-of-the-art studio environment.</p>
              <div className="hero-buttons">
                <span className="btn-primary">Book Artist</span>
                {!isMobile && <span className="btn-secondary">View Styles</span>}
              </div>
            </div>
            {!isMobile && (
              <div className="hero-media">
                <div className="tattoo-mock-graphic">
                  <div className="tattoo-needle-graphic"></div>
                  <div className="ink-splash-graphic"></div>
                  <div className="hygiene-badge">✦ sterile-certified</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="screen-glow"></div>
      </div>
    );
  }

  if (title === 'NO1 Insurance') {
    return (
      <div className={`mock-screen no1insurance-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">NO1 <span>INSURANCE</span></div>
          {!isMobile && (
            <div className="nav-links">
              <span>Home</span>
              <span>Insurance</span>
              <span>Investments</span>
              <span>Contact</span>
            </div>
          )}
          <div className="header-dot"></div>
        </div>
        <div className="screen-body">
          <div className="screen-hero">
            <div className="hero-text">
              <h3>Protect & Grow</h3>
              <p>IRDAI certified insurance plans & wealth advisory trusted by 5000+ families in Coimbatore.</p>
              <div className="hero-buttons">
                <span className="btn-primary">Consult Now</span>
                {!isMobile && <span className="btn-secondary">Calculators</span>}
              </div>
            </div>
            {!isMobile && (
              <div className="hero-media">
                <div className="insurance-mock-graphic">
                  <div className="shield-icon-vector">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="shield-pulse-ring"></div>
                  <div className="certified-badge">✦ IRDAI Certified</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="screen-glow"></div>
      </div>
    );
  }

  if (title === 'Brandify Agency') {
    return (
      <div className={`mock-screen agency-screen ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="screen-header">
          <div className="logo">BRANDIFY</div>
          <div className="menu-dot"></div>
        </div>
        <div className="screen-body">
          <h4>We Grow Brands Digitally</h4>
          <p>Full-funnel growth campaigns & creative asset suites.</p>
          <div className="btn-campaign">Start Campaign</div>
          <div className="brand-abstract-glow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mock-screen fallback-screen ${isMobile ? 'mobile' : 'desktop'}`} style={{ backgroundImage: `url(${project.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="fallback-overlay">
        <h4>{project.title}</h4>
        <span>{project.category}</span>
      </div>
    </div>
  );
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  img: string;
  accent: string;
  isFounder?: boolean;
  experience: string;
  icon?: React.ReactNode;
  socials: { type: string; url: string; }[];
  skills: string[];
  timeline: { year: string; title: string; desc: string; }[];
  achievements: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Anto Sheeba',
    role: 'Administration Head',
    bio: 'Supervising operations, workflows and corporate timelines.',
    img: '/images/team/sheeba.png',
    accent: 'purple',
    experience: '5 Years',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    socials: [
      { type: 'instagram', url: '#' },
      { type: 'twitter', url: '#' },
      { type: 'email', url: 'mailto:sheeba@skillstar.com' }
    ],
    skills: ['Operations Management', 'Workflow Optimization', 'Team Coordination', 'HR Management', 'Client Communication'],
    timeline: [
      { year: '2021', title: 'Joined SkillStar', desc: 'Took charge of administrative operations and team coordination.' },
      { year: '2022', title: 'Process Optimization', desc: 'Streamlined internal workflows, improving delivery efficiency by 40%.' },
      { year: '2024', title: 'Administration Head', desc: 'Elevated to lead all operational and administrative functions.' }
    ],
    achievements: ['40% Efficiency Improvement', 'Zero Deadline Misses', 'Team Satisfaction Score 98%']
  },
  {
    name: 'Saravanan',
    role: 'Senior Video Editor',
    bio: 'Designing high-converting marketing collaterals and visual assets.',
    img: '/images/team/saro.png',
    accent: 'purple',
    experience: '6 Years',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 9 20 8 18 8C16 8 16 6 16 5C16 3 14 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
        <circle cx="7.5" cy="10.5" r="1.5"></circle>
        <circle cx="11.5" cy="7.5" r="1.5"></circle>
        <circle cx="16.5" cy="11.5" r="1.5"></circle>
      </svg>
    ),
    socials: [
      { type: 'instagram', url: '#' },
      { type: 'behance', url: '#' },
      { type: 'email', url: 'mailto:saravanan@skillstar.com' }
    ],
    skills: ['Video Editing', 'Motion Graphics', 'Color Grading', 'After Effects', 'Premiere Pro', 'DaVinci Resolve'],
    timeline: [
      { year: '2019', title: 'Started Video Editing', desc: 'Began professional video editing for brand campaigns and advertisements.' },
      { year: '2021', title: 'Joined SkillStar', desc: 'Brought expertise in cinematic editing and visual storytelling.' },
      { year: '2023', title: 'Senior Video Editor', desc: 'Promoted to lead all video production and post-production workflows.' }
    ],
    achievements: ['500+ Videos Produced', 'Viral Campaign with 2M+ Views', 'Brand Film Awards Finalist']
  },
  {
    name: 'Dhanusha',
    role: 'UI/UX Designer',
    bio: 'Engineering wireframe aesthetics and seamless user journeys.',
    img: '/images/team/dhanusha.png',
    accent: 'purple',
    experience: '4 Years',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    ),
    socials: [
      { type: 'instagram', url: '#' },
      { type: 'behance', url: '#' },
      { type: 'email', url: 'mailto:dhanusha@skillstar.com' }
    ],
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Systems', 'User Testing'],
    timeline: [
      { year: '2022', title: 'Joined SkillStar', desc: 'Started designing user interfaces for web and mobile platforms.' },
      { year: '2023', title: 'Design System Lead', desc: 'Built a scalable design system adopted across all client projects.' },
      { year: '2024', title: 'UX Excellence', desc: 'Achieved 95%+ user satisfaction scores on usability testing.' }
    ],
    achievements: ['30+ App Designs', 'Design System Architect', '95% Usability Score']
  },
  {
    name: 'Harini',
    role: 'SEO & App Developer',
    bio: 'Optimizing technical health models and building hybrid mobile interfaces.',
    img: '/images/team/harini.png',
    accent: 'purple',
    experience: '3 Years',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9"></line>
        <line x1="4" y1="15" x2="20" y2="15"></line>
        <line x1="10" y1="3" x2="8" y2="21"></line>
        <line x1="16" y1="3" x2="14" y2="21"></line>
      </svg>
    ),
    socials: [
      { type: 'instagram', url: '#' },
      { type: 'github', url: '#' },
      { type: 'email', url: 'mailto:harini@skillstar.com' }
    ],
    skills: ['SEO Strategy', 'Technical SEO', 'React Native', 'Flutter', 'Google Analytics', 'App Store Optimization'],
    timeline: [
      { year: '2023', title: 'Joined SkillStar', desc: 'Started optimizing client websites for search engine performance.' },
      { year: '2024', title: 'Mobile App Developer', desc: 'Expanded into hybrid mobile app development using React Native.' },
      { year: '2025', title: 'SEO Specialist', desc: 'Drove organic traffic growth of 300% for multiple client portfolios.' }
    ],
    achievements: ['300% Organic Growth', '15+ Apps Published', 'Page 1 Rankings for 100+ Keywords']
  },
  {
    name: 'Dinesh',
    role: 'Full Stack Developer',
    bio: 'Writing clean backend API integrations and responsive frontends.',
    img: '/images/team/dinesh.jpeg',
    accent: 'purple',
    experience: '4 Years',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    socials: [
      { type: 'instagram', url: '#' },
      { type: 'github', url: '#' },
      { type: 'email', url: 'mailto:dinesh@skillstar.com' }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'REST APIs', 'Cloud Deployment'],
    timeline: [
      { year: '2022', title: 'Joined SkillStar', desc: 'Started building scalable web applications and API integrations.' },
      { year: '2023', title: 'Lead Developer', desc: 'Led development of enterprise-grade applications for key clients.' },
      { year: '2024', title: 'Architecture Expert', desc: 'Designed microservices architecture handling 1M+ daily requests.' }
    ],
    achievements: ['50+ Web Apps Built', '99.9% Uptime Record', 'Clean Code Champion']
  },
  {
    name: 'Ram',
    role: 'Full Stack Developer',
    bio: 'Developing data layer queries and serverless database workflows.',
    img: '/images/team/Ram.png',
    accent: 'purple',
    experience: '5 Years',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    ),
    socials: [
      { type: 'instagram', url: '#' },
      { type: 'github', url: '#' },
      { type: 'email', url: 'mailto:ram@skillstar.com' }
    ],
    skills: ['React', 'Next.js', 'Firebase', 'PostgreSQL', 'Python', 'Serverless Architecture'],
    timeline: [
      { year: '2021', title: 'Started Professional Development', desc: 'Began building full-stack solutions for startups and SMBs.' },
      { year: '2023', title: 'Joined SkillStar', desc: 'Brought expertise in database architecture and serverless workflows.' },
      { year: '2025', title: 'Solutions Architect', desc: 'Designing end-to-end technical solutions for enterprise clients.' }
    ],
    achievements: ['40+ Projects Delivered', 'Serverless Migration Expert', 'Open Source Contributor']
  }
];

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isFirstMount = useRef<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrandFolder, setSelectedBrandFolder] = useState<string | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedCardIndices, setExpandedCardIndices] = useState<number[]>([]);
  const [showLeadPopup, setShowLeadPopup] = useState<boolean>(false);
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState<number>(0);
  const recentScrollRef = useRef<HTMLDivElement>(null);
  const scrollRecent = (dir: 'left' | 'right') => {
    if (recentScrollRef.current) {
      const scrollAmount = 380;
      recentScrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Mobile Redesign States
  const [activeSection, setActiveSection] = useState<string>('home');
  const [navHidden, setNavHidden] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeProjectMobile, setActiveProjectMobile] = useState<Project | null>(null);
  const [expandedAbout, setExpandedAbout] = useState<number[]>([]);
  const [expandedFooter, setExpandedFooter] = useState<string[]>([]);
  const [activeHeroStatIdx, setActiveHeroStatIdx] = useState<number>(0);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);

  const filteredProjects = (selectedCategory === 'All' || selectedCategory === 'All Projects')
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  const activeShowcaseProject = filteredProjects[activeShowcaseIdx] || filteredProjects[0] || projectsData[0];

  const toggleExpandCard = (idx: number) => {
    if (expandedCardIndices.includes(idx)) {
      setExpandedCardIndices(expandedCardIndices.filter(i => i !== idx));
    } else {
      setExpandedCardIndices([...expandedCardIndices, idx]);
    }
  };

  const toggleExpandAbout = (idx: number) => {
    if (expandedAbout.includes(idx)) {
      setExpandedAbout(expandedAbout.filter(i => i !== idx));
    } else {
      setExpandedAbout([...expandedAbout, idx]);
    }
  };

  const toggleExpandFooter = (colName: string) => {
    if (expandedFooter.includes(colName)) {
      setExpandedFooter(expandedFooter.filter(name => name !== colName));
    } else {
      setExpandedFooter([...expandedFooter, colName]);
    }
  };

  const scrollToSection = (className: string) => {
    const element = document.querySelector(className);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll up/down logic for bottom navigation and sticky action bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setNavHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Active section tracking via Intersection Observer
  useEffect(() => {
    const sections = [
      { id: 'home', selector: '.app-container' },
      { id: 'services', selector: '.services-section, .mobile-services' },
      { id: 'projects', selector: '.projects-section, .mobile-projects' },
      { id: 'about', selector: '.about-section, .mobile-about' },
      { id: 'contact', selector: '.testimonials-section, .mobile-contact' },
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sections.find(s => entry.target.matches(s.selector));
          if (matched) {
            setActiveSection(matched.id);
          }
        }
      });
    }, observerOptions);

    sections.forEach(s => {
      const elements = document.querySelectorAll(s.selector);
      elements.forEach(el => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);

  // Always start at the top of the page on load and prevent browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Clear URL hash to prevent deep linking scroll on load
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Instant scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Fallback scroll in case of latencies in image rendering / layout shifts
    const forceScroll = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100);
    
    return () => clearTimeout(forceScroll);
  }, []);

  useEffect(() => {
    const hasClosedPopup = sessionStorage.getItem('hasClosedLeadPopup');
    if (hasClosedPopup) return;

    const timer = setTimeout(() => {
      setShowLeadPopup(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);


  // Scroll active projects dock item horizontally inside its scroll container on index change (skip on first load)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    
    const activeItem = document.querySelector('.projects-dock .dock-item.active') as HTMLElement;
    const dockContainer = document.querySelector('.projects-dock') as HTMLElement;
    
    if (activeItem && dockContainer) {
      const offsetLeft = activeItem.offsetLeft;
      const clientWidth = activeItem.clientWidth;
      const containerWidth = dockContainer.clientWidth;
      
      // Scroll the container horizontally without affecting the main page viewport scroll
      dockContainer.scrollTo({
        left: offsetLeft - (containerWidth / 2) + (clientWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeShowcaseIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let currentFrame = 0;
    let targetFrame = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollDistance = windowHeight * 0.8;
      const scrolled = windowHeight - rect.top;

      let progress = 0;
      if (scrolled >= 0 && scrolled <= totalScrollDistance) {
        progress = scrolled / totalScrollDistance;
      } else if (scrolled > totalScrollDistance) {
        progress = 1;
      }

      const maxIndex = framePaths.length - 1;
      targetFrame = progress * maxIndex;
    };

    const renderLoop = () => {
      // Smooth interpolation using a lerp factor (lower is smoother/slower)
      currentFrame += (targetFrame - currentFrame) * 0.08;

      const frameToRender = Math.round(currentFrame);
      if (imgRef.current && framePaths[frameToRender]) {
        imgRef.current.src = framePaths[frameToRender];
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Reveal animation for hero components
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);



  return (
    <div className="app-container">
      <header className="navbar desktop-only">
        <div className="container nav-content">
          <div className="logo">
            <img src="/images/projects/logo (2).png" alt="SkillStar Logo" className="logo-image" />
          </div>
          <nav className="nav-links">
            <a href="#" className="active" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>HOME</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.services-section'); }}>SERVICES</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.about-section'); }}>ABOUT US</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.projects-section'); }}>PROJECTS</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowLeadPopup(true); }}>CONTACT</a>
          </nav>
          <button className="btn-outline" onClick={() => setShowLeadPopup(true)}>
            Get In Touch <span>→</span>
          </button>
        </div>
      </header>

      {/* Mobile-Only Bottom Navigation Dock */}
      <nav className={`mobile-bottom-nav mobile-only ${navHidden ? 'nav-hidden' : ''}`}>
        <button 
          className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
          {activeSection === 'home' && <div className="mobile-nav-indicator"></div>}
        </button>

        <button 
          className={`mobile-nav-item ${activeSection === 'services' ? 'active' : ''}`}
          onClick={() => scrollToSection('.mobile-services')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9" rx="1"/>
            <rect x="14" y="3" width="7" height="5" rx="1"/>
            <rect x="14" y="12" width="7" height="9" rx="1"/>
            <rect x="3" y="16" width="7" height="5" rx="1"/>
          </svg>
          <span>Services</span>
          {activeSection === 'services' && <div className="mobile-nav-indicator"></div>}
        </button>

        <button 
          className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={() => scrollToSection('.mobile-projects')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="M12 8v8"/>
            <path d="M8 12h8"/>
          </svg>
          <span>Projects</span>
          {activeSection === 'projects' && <div className="mobile-nav-indicator"></div>}
        </button>

        <button 
          className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => scrollToSection('.mobile-about')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M20 21a8 8 0 0 0-16 0"/>
          </svg>
          <span>About</span>
          {activeSection === 'about' && <div className="mobile-nav-indicator"></div>}
        </button>

        <button 
          className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => scrollToSection('.mobile-contact')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Contact</span>
          {activeSection === 'contact' && <div className="mobile-nav-indicator"></div>}
        </button>
      </nav>

      {/* Mobile-Only Sticky Call | WhatsApp Actions */}
      <div className={`mobile-sticky-action-bar mobile-only ${navHidden ? 'hidden' : ''}`}>
        <a href="tel:+918925845871" className="sticky-btn sticky-btn-call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Call Us
        </a>
        <a href="https://wa.me/918925845871" target="_blank" rel="noopener noreferrer" className="sticky-btn sticky-btn-whatsapp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.583-1.471A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      <main className="main-content container desktop-only">
        <div className="hero-text-section reveal">
          <p className="kicker kicker-purple">CREATING</p>
          <h1 className="main-headline uppercase-headline">
            DIGITAL<br />
            <span className="text-gradient-purple">EXPERIENCES</span><br />
            THAT DRIVE<br />
            <span className="text-gradient-purple">RESULTS</span>
          </h1>
          <p className="hero-subtext">
            We build powerful websites, web applications, and digital solutions that help brands grow.
          </p>
          
          <div className="hero-features-row">
            <div className="hero-feature-item">
              <div className="feature-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>Modern Design</h4>
                <p>Pixel perfect layouts</p>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>High Performance</h4>
                <p>Optimized for speed</p>
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="feature-text">
                <h4>Scalable Solutions</h4>
                <p>Built for growth & the future</p>
              </div>
            </div>
          </div>
        </div>


      </main>

      {/* Mobile-Only Hero Section */}
      <section className="mobile-hero mobile-only container">
        <div className="mobile-hero-header">
          <div className="logo">
            <img src="/images/projects/logo (2).png" alt="SkillStar Logo" className="logo-image" />
          </div>
          <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => setShowLeadPopup(true)}>
            Contact
          </button>
        </div>

        <span className="mobile-hero-badge">CREATING</span>
        <h1 className="mobile-hero-title">
          DIGITAL <span className="text-gradient-purple">EXPERIENCES</span> THAT DRIVE <span className="text-gradient-purple">RESULTS</span>
        </h1>
        <p className="mobile-hero-subtitle">
          We build powerful websites, web applications, and digital solutions that help brands grow.
        </p>

        <div className="mobile-hero-actions">
          <button className="mobile-btn mobile-btn-primary" onClick={() => setShowLeadPopup(true)}>
            Claim Free Growth Audit <span>→</span>
          </button>
        </div>

        <div className="mobile-hero-features">
          <div className="mobile-feature-item">
            <div className="feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <div className="feature-text">
              <h4>Modern Design</h4>
              <p>Pixel perfect layouts</p>
            </div>
          </div>
          <div className="mobile-feature-item">
            <div className="feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="feature-text">
              <h4>High Performance</h4>
              <p>Optimized for speed</p>
            </div>
          </div>
          <div className="mobile-feature-item">
            <div className="feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="feature-text">
              <h4>Scalable Solutions</h4>
              <p>Built for growth & the future</p>
            </div>
          </div>
        </div>

        {/* Swipe Statistics Cards */}
        <div className="mobile-stats-container">
          <div 
            className="mobile-stats-carousel no-scrollbar"
            onScroll={(e) => {
              const target = e.currentTarget;
              const scrollIndex = Math.round(target.scrollLeft / target.clientWidth);
              setActiveHeroStatIdx(scrollIndex);
            }}
          >
            <div className="mobile-stat-card">
              <div className="mobile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span className="mobile-stat-val">20+</span>
              <span className="mobile-stat-lbl">Projects Successfully Delivered</span>
            </div>
            <div className="mobile-stat-card">
              <div className="mobile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <span className="mobile-stat-val">95%</span>
              <span className="mobile-stat-lbl">Client Satisfaction Rate</span>
            </div>
            <div className="mobile-stat-card">
              <div className="mobile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
              </div>
              <span className="mobile-stat-val">AI-Driven</span>
              <span className="mobile-stat-lbl">Approach For Organic Scalability</span>
            </div>
            <div className="mobile-stat-card">
              <div className="mobile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <span className="mobile-stat-val">ROI First</span>
              <span className="mobile-stat-lbl">Digital Strategies & Funnels</span>
            </div>
          </div>
          <div className="mobile-carousel-dots">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`mobile-dot ${activeHeroStatIdx === i ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>

        <div className="mobile-hero-visual">
          <div className="mobile-brain-container">
            <img src="/brain.png" alt="Glowing Brain" className="mobile-brain-image" />
          </div>
        </div>
      </section>

      <div className="desktop-only">
        <section className="services-section container">
          <div className="services-header">
            <div className="services-title-area">
              <span className="services-kicker">Our Service</span>
              <h2 className="services-headline">
                <span className="text-dim">Digital</span> Solutions <span className="text-dim">for<br />Your</span> Business
              </h2>
            </div>
            <div className="services-desc">
              <p>Our services help you create digital products and solve your problems objectively, strategy, technology and analysis. Our service also has a high appeal because it has a beautiful color combination.</p>
            </div>
          </div>

          <div className="services-list">
            {servicesData.map((service, idx) => (
              <div className="service-item" key={idx}>
                <div className="service-num">{service.num}</div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-tags">
                    {service.tags.map((tag, tagIdx) => (
                      <span className="service-tag" key={tagIdx}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="service-hover-img">
                  <img src={service.img} alt={service.title} />
                </div>
                <button className="service-btn" aria-label={`Learn more about ${service.title}`}>↗</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="projects-section container">
          <div className="projects-header">
            <span className="projects-kicker">OUR WORK</span>
            <div className="projects-headline-area">
              <div className="projects-header-info">
                <h2 className="projects-headline">
                  Featured <span className="text-gradient">Projects</span>
                </h2>
                <p className="projects-subtitle">We build digital experiences that drive results and create lasting impressions.</p>
              </div>
            </div>
            <div className="projects-filter-bar">
              {['All Projects', 'Websites', 'Web Apps', 'Videos', 'Digital Marketing'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat || (cat === 'All Projects' && selectedCategory === 'All') ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat === 'All Projects' ? 'All' : cat);
                    setActiveShowcaseIdx(0);
                    setSelectedBrandFolder(null);
                  }}
                >
                  {cat === 'All Projects' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  )}
                  {cat === 'Websites' && (
                    <span style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </span>
                  )}
                  {cat === 'Web Apps' && (
                    <span style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                      </svg>
                    </span>
                  )}
                  {(cat === 'Videos' || cat === 'Vedios') && (
                    <span style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </span>
                  )}
                  {cat === 'Digital Marketing' && (
                    <span style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                      </svg>
                    </span>
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area: Conditional based on Video Category */}
          {selectedCategory === 'Videos' || selectedCategory === 'Vedios' ? (
            <div className="videos-main-view">
              {selectedBrandFolder === null ? (
                /* Grid of Brand Folders */
                <div className="videos-folder-grid">
                  {videoBrandsData.map((brand) => (
                    <div 
                      key={brand.id} 
                      className="video-folder-card glass-panel" 
                      onClick={() => setSelectedBrandFolder(brand.id)}
                    >
                      <div className="folder-thumbnail-wrapper">
                        <img src={brand.thumbnail} alt={brand.name} loading="lazy" />
                        <div className="folder-icon-badge">📁</div>
                      </div>
                      <div className="folder-content">
                        <div className="folder-header-row">
                          <h4>{brand.name}</h4>
                          <span className="videos-count">{brand.count} Videos</span>
                        </div>
                        <p className="folder-desc">{brand.shortDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Video Gallery for Selected Brand */
                (() => {
                  const activeBrand = videoBrandsData.find(b => b.id === selectedBrandFolder);
                  if (!activeBrand) return null;
                  return (
                    <div className="videos-gallery-container">
                      <div className="gallery-header-row">
                        <button className="back-to-brands-btn" onClick={() => setSelectedBrandFolder(null)}>
                          ← Back to Brands
                        </button>
                        <h3 className="gallery-title">{activeBrand.name} Videos</h3>
                      </div>
                      <div className={`videos-cards-grid ${activeBrand.id === 'rokea' ? 'portrait-reels-grid' : ''}`}>
                        {activeBrand.videos.map((video, idx) => (
                          video.videoUrl ? (
                            <div 
                              key={idx} 
                              className={`video-card glass-panel ${activeBrand.id === 'rokea' ? 'portrait-reel' : ''}`}
                              onMouseEnter={(e) => {
                                const videoEl = e.currentTarget.querySelector('video');
                                if (videoEl) {
                                  videoEl.play().catch(() => {});
                                }
                              }}
                              onMouseLeave={(e) => {
                                const videoEl = e.currentTarget.querySelector('video');
                                if (videoEl) {
                                  videoEl.pause();
                                }
                              }}
                              onClick={() => {
                                if (video.videoUrl) {
                                  setActiveVideoUrl(video.videoUrl);
                                }
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="video-thumbnail-wrapper">
                                <video 
                                  src={getOptimizedPreviewUrl(video.videoUrl) + '#t=0.1'} 
                                  preload="auto" 
                                  muted 
                                  loop 
                                  playsInline 
                                  className="video-preview-player"
                                />
                                <div className="play-button-overlay">
                                  <div className="play-icon">▶</div>
                                </div>
                                <span className="video-duration">{video.duration}</span>
                              </div>
                              <div className="video-card-body">
                                <span className="video-category-tag">{video.category}</span>
                               <h4 className="video-card-title">{video.title}</h4>
                              </div>
                            </div>
                          ) : (
                            <div key={idx} className="video-card glass-panel">
                              <div className="video-thumbnail-wrapper">
                                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                                <div className="play-button-overlay">
                                  <div className="play-icon">▶</div>
                                </div>
                                <span className="video-duration">{video.duration}</span>
                              </div>
                              <div className="video-card-body">
                                <span className="video-category-tag">{video.category}</span>
                                <h4 className="video-card-title">{video.title}</h4>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          ) : (
            <>
              {/* Main Featured Showcase Card */}
              <div 
            className="featured-project-card glass-panel"
            style={{ 
              '--spotlight-theme': activeShowcaseProject.color,
              '--spotlight-theme-rgb': activeShowcaseProject.rgb
            } as React.CSSProperties}
          >
            {/* Left Column: Details & Tech & Navigation */}
            <div className="featured-card-left">
              <div className="featured-card-header-row">
                <div className="featured-badge-wrapper">
                  <div className="featured-badge-pill">
                    <span className="star-symbol">★</span> FEATURED PROJECT
                  </div>
                </div>

                <div className="pagination-wrapper">
                  <span className="pagination-numbers">
                    {String(activeShowcaseIdx + 1).padStart(2, '0')} <span className="slash">/</span> {String(filteredProjects.length).padStart(2, '0')}
                  </span>
                  <div className="pagination-arrows">
                    <button 
                      className="arrow-btn prev"
                      aria-label="Previous showcase"
                      onClick={() => setActiveShowcaseIdx(prev => (prev === 0 ? filteredProjects.length - 1 : prev - 1))}
                    >
                      ‹
                    </button>
                    <button 
                      className="arrow-btn next"
                      aria-label="Next showcase"
                      onClick={() => setActiveShowcaseIdx(prev => (prev === filteredProjects.length - 1 ? 0 : prev + 1))}
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="featured-card-title">
                {activeShowcaseProject.title} {activeShowcaseProject.title === 'ROKEA by RK' ? '✨' : ''}
              </h3>
              <p className="featured-card-tagline">
                {getCategoryIcon(activeShowcaseProject.category, activeShowcaseProject.color, 14)}
                <span style={{ marginLeft: '6px', verticalAlign: 'middle' }}>{activeShowcaseProject.shortDesc}</span>
              </p>
              
              <p className="featured-card-desc">{activeShowcaseProject.description}</p>

              {/* Metadata Grid */}
              <div className="featured-meta-grid">
                <div className="meta-item">
                  <div className="meta-icon-wrapper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="meta-info">
                    <span className="meta-label">Industry</span>
                    <span className="meta-value">{activeShowcaseProject.industry || 'Media & Entertainment'}</span>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="meta-icon-wrapper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="meta-info">
                    <span className="meta-label">Timeline</span>
                    <span className="meta-value">{activeShowcaseProject.timeline || '4 Weeks'}</span>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="meta-icon-wrapper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <div className="meta-info">
                    <span className="meta-label">Services</span>
                    <span className="meta-value">{activeShowcaseProject.services || 'Web Development'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="featured-actions">
                <button 
                  className="btn-live-project"
                  onClick={() => {
                    if (activeShowcaseProject.link && activeShowcaseProject.link !== '#') {
                      window.open(activeShowcaseProject.link, '_blank', 'noopener,noreferrer');
                    } else {
                      setShowLeadPopup(true);
                    }
                  }}
                >
                  View Live Project <span className="arrow-sym">→</span>
                </button>
                <button 
                  className="btn-case-study"
                  onClick={() => setActiveProject(activeShowcaseProject)}
                >
                  View Case Study <span className="arrow-sym">→</span>
                </button>
              </div>

              {/* Tech Stack Row */}
              <div className="featured-card-footer">
                <div className="tech-stack-wrapper">
                  <span className="tech-stack-label">Tech Stack:</span>
                  <div className="tech-stack-tags">
                    {activeShowcaseProject.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tech-stack-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Mockup Devices */}
            <div className="featured-card-right">
              <div className="mockups-container">
                {/* Radial Glow */}
                <div className="radial-glow-backdrop"></div>

                {/* Laptop Mockup */}
                <div className="laptop-mockup-wrapper">
                  <div className="laptop-bezel">
                    <div className="laptop-camera"></div>
                    <div className="laptop-screen">
                      {renderProjectScreen(activeShowcaseProject, false)}
                    </div>
                  </div>
                  <div className="laptop-keyboard-shelf">
                    <div className="keyboard-notch"></div>
                  </div>
                </div>

                {/* Mobile Mockup overlapping */}
                <div className="phone-mockup-wrapper">
                  <div className="phone-bezel">
                    <div className="phone-earpiece"></div>
                    <div className="phone-screen">
                      {renderProjectScreen(activeShowcaseProject, true)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="recent-projects-container">
            <div className="recent-projects-header">
              <h3 className="recent-projects-title">
                Recent <span className="text-gradient">Projects</span>
              </h3>
              <div className="recent-nav-arrows">
                <button 
                  className="arrow-btn prev" 
                  aria-label="Scroll left"
                  onClick={() => scrollRecent('left')}
                >
                  ‹
                </button>
                <button 
                  className="arrow-btn next" 
                  aria-label="Scroll right"
                  onClick={() => scrollRecent('right')}
                >
                  ›
                </button>
              </div>
            </div>

            <div className="recent-projects-grid no-scrollbar" ref={recentScrollRef}>
              {projectsData.map((project, idx) => {
                return (
                  <div 
                    key={idx} 
                    className="recent-project-card"
                    style={{ '--card-theme-rgb': project.rgb } as React.CSSProperties}
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="card-image-wrapper">
                      <img src={project.img} alt={project.title} loading="lazy" />
                      <div className="card-category-tag">{project.category}</div>
                    </div>
                    <div className="card-body">
                      <div 
                        className="card-app-icon-box"
                        style={{ backgroundColor: `rgba(${project.rgb}, 0.1)`, borderColor: `rgba(${project.rgb}, 0.2)` }}
                      >
                        <img 
                          src={project.logo} 
                          alt={`${project.title} logo`} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                        />
                      </div>
                      <div className="card-text">
                        <h4>{project.title}</h4>
                        <p>{project.shortDesc}</p>
                      </div>
                    </div>
                    <div className="card-action-link">
                      View Project <span className="arrow-sym">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            </>
          )}
        </section>

        {/* Project details modal */}
        <div 
          className={`project-modal-overlay ${activeProject ? 'open' : ''}`}
          onClick={() => setActiveProject(null)}
        >
          {activeProject && (
            <div 
              className="project-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setActiveProject(null)}
                aria-label="Close modal"
              >
                ×
              </button>
              
              <div className="modal-content-grid">
                <div className="modal-media">
                  <img src={activeProject.img} alt={activeProject.title} />
                </div>
                
                <div className="modal-details">
                  <span className="modal-category">{activeProject.category}</span>
                  <h3 className="modal-title">{activeProject.title}</h3>
                  
                  <p className="modal-desc">{activeProject.description}</p>
                  
                  <h4>Key Highlights</h4>
                  <div className="modal-features">
                    {activeProject.features.map((feature, fIdx) => (
                      <div className="modal-feature-item" key={fIdx}>
                        <span className="bullet">▸</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h4>Technologies Used</h4>
                  <div className="modal-tech-tags">
                    {activeProject.tags.map((tag, tIdx) => (
                      <span className="modal-tech-tag" key={tIdx}>{tag}</span>
                    ))}
                  </div>

                  <div className="modal-meta-grid">
                    <div className="modal-meta-item">
                      <span className="modal-meta-label">Client</span>
                      <span className="modal-meta-value">{activeProject.client}</span>
                    </div>
                    <div className="modal-meta-item">
                      <span className="modal-meta-label">Year</span>
                      <span className="modal-meta-value">{activeProject.year}</span>
                    </div>
                  </div>

                  <a 
                    href={activeProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="modal-action-btn"
                  >
                    Visit Project Site <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Lightbox Modal */}
        {activeVideoUrl && (
          <div 
            className="video-lightbox-overlay"
            onClick={() => setActiveVideoUrl(null)}
          >
            <div 
              className="video-lightbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="video-lightbox-close-btn"
                onClick={() => setActiveVideoUrl(null)}
                aria-label="Close video player"
              >
                ×
              </button>
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                playsInline
                className="video-lightbox-player"
              />
            </div>
          </div>
        )}

      <div className="desktop-only">
        <section className="about-section container" ref={scrollRef}>
          <div className="about-content-area">
            <div className="about-text-content">
              <span className="about-kicker">Who We Are</span>
              <h2 className="about-headline">
                <span className="text-dim">Our</span> Brand <span className="text-dim">&amp;<br />
                Mission</span> Statement
              </h2>
              <p className="about-desc">
                SkillStar Digital Solutions is an AI-powered digital growth company. We don't just market businesses; we engineer complete digital ecosystems.
              </p>

              <div className="mission-vision-grid">
                <div className="mv-item">
                  <h4><span className="cyan-star">◆</span> Our Mission</h4>
                  <p>We don't just market businesses. We engineer digital ecosystems that increase authority, improve visibility, generate qualified leads, and accelerate long-term growth.</p>
                </div>
                <div className="mv-item">
                  <h4><span className="cyan-star">◆</span> Our Vision</h4>
                  <p>To be the premier global catalyst for growth, transforming ambitious startups and scaling enterprises into market-dominating brands.</p>
                </div>
              </div>

              <div className="about-leadership">
                <h4 className="leadership-title"><span className="cyan-star">◆</span> Our Leadership</h4>
                <div className="leadership-grid">
                  <div className="leadership-card">
                    <div className="leadership-info">
                      <h5>Rahannath P R</h5>
                      <span className="leadership-role">Co-Founder & Director</span>
                      <p className="leadership-bio">Leading strategic partnerships & client scale-up trajectories.</p>
                    </div>
                  </div>
                  <div className="leadership-card">
                    <div className="leadership-info">
                      <h5>Rohan R</h5>
                      <span className="leadership-role">Co-Founder & Director</span>
                      <p className="leadership-bio">Directing creative output & unified brand solutions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-outline about-btn" onClick={() => setShowLeadPopup(true)}>
                Book Free Discovery Call <span>→</span>
              </button>
            </div>

            <div className="about-image-content">
              <div className="blob-image-wrapper">
                <img ref={imgRef} src={framePaths[0]} alt="Animation frame" className="blob-image" />
                <div className="glow-trace"></div>
              </div>
            </div>
          </div>

          <div className="about-stats-row">
            <div className="about-stat-item">
              <div className="val">20+</div>
              <div className="lbl">Projects Delivered</div>
            </div>
            <div className="about-stat-item">
              <div className="val">95%</div>
              <div className="lbl">Client Satisfaction</div>
            </div>
            <div className="about-stat-item">
              <div className="val">AI-Driven</div>
              <div className="lbl">Core Approach</div>
            </div>
            <div className="about-stat-item">
              <div className="val">ROI First</div>
              <div className="lbl">Strategy Focus</div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile-Only Services Section */}
      <section className="mobile-services mobile-only container">
        <div className="mobile-services-header">
          <span className="mobile-services-kicker">Our Services</span>
          <h2 className="mobile-services-title section-headline">
            Digital <span className="text-gradient">Solutions</span> for Growth
          </h2>
          <p className="mobile-services-desc">
            We build and execute digital pipelines that elevate brand authority, capture hot leads, and maximize user conversion.
          </p>
        </div>

        <div className="mobile-services-carousel no-scrollbar">
          {servicesData.map((service, idx) => (
            <div className="mobile-service-card" key={idx}>
              <span className="mobile-service-num">{service.num}</span>
              <h3 className="card-title">{service.title}</h3>
              <p>{service.description}</p>
              <div className="mobile-service-tags">
                {service.tags.slice(0, 3).map((tag, tIdx) => (
                  <span className="mobile-service-tag" key={tIdx}>{tag}</span>
                ))}
              </div>
              <button className="mobile-service-cta" onClick={() => setShowLeadPopup(true)}>
                Learn More <span>↗</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile-Only Projects Section */}
      <section className="mobile-projects mobile-only container">
        <div className="mobile-projects-header">
          <span className="mobile-projects-kicker">Our Portfolio</span>
          <h2 className="section-headline">
            Featured <span className="text-gradient">Works</span>
          </h2>
        </div>

        <div className="mobile-projects-filter-bar no-scrollbar">
          {['All', 'Web Development', 'UI/UX Design', 'Branding', 'Web Application'].map(cat => (
            <button
              key={cat}
              className={`mobile-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? 'All' : cat === 'Web Development' ? 'Web Dev' : cat === 'UI/UX Design' ? 'UI/UX' : cat === 'Branding' ? 'Branding' : 'Apps'}
            </button>
          ))}
        </div>

        <div className="mobile-projects-carousel no-scrollbar">
          {filteredProjects.map((project, idx) => (
            <div 
              className="mobile-project-card" 
              key={idx}
              onClick={() => setActiveProjectMobile(project)}
            >
              <div className="mobile-project-img">
                <img src={project.img} alt={project.title} loading="lazy" />
                <span className="mobile-project-badge">{project.badge}</span>
              </div>
              <div className="mobile-project-content">
                <span className="mobile-project-category">{project.category} • {project.year}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="mobile-project-desc">{project.shortDesc || project.description}</p>
                <div className="mobile-project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span className="mobile-project-tag" key={tIdx}>{tag}</span>
                  ))}
                </div>
                <button className="mobile-project-btn">
                  View Case Study ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile-Only About Section */}
      <section className="mobile-about mobile-only container">
        <span className="mobile-about-kicker">Who We Are</span>
        <h2 className="mobile-about-title section-headline">
          Engineering <span className="text-gradient">Digital</span> Ecosystems
        </h2>

        <div className="mobile-about-cards">
          {[
            {
              title: 'Our Mission',
              desc: 'We engineer complete digital ecosystems. We combine performance advertising, AI-powered automation, custom frontends, and technical search visibility to drive measurable, high-conversions growth.'
            },
            {
              title: 'Our Vision',
              desc: 'To scale startups and mid-market enterprises into market-dominating brands globally using unified design languages and cutting-edge data architecture.'
            },
            {
              title: 'Our Core Value',
              desc: 'Everything we construct is ROI-focused and indexability-verified. We don\'t build pretty sites that stay hidden; we craft digital portals that win eyeballs.'
            }
          ].map((card, idx) => {
            const isExpanded = expandedAbout.includes(idx);
            return (
              <div 
                key={idx} 
                className={`mobile-about-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpandAbout(idx)}
              >
                <div className="mobile-about-card-header">
                  <div className="mobile-about-card-title">
                    <span className="star-icon">◆</span>
                    <h3 className="card-title">{card.title}</h3>
                  </div>
                  <div className="mobile-about-card-toggle">
                    {isExpanded ? '−' : '+'}
                  </div>
                </div>
                <div className="mobile-about-card-content">
                  <p>{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mobile-leadership">
          <h4 className="mobile-leadership-title"><span className="cyan-star">◆</span> Our Leadership</h4>
          <div className="mobile-leadership-cards">
            <div className="mobile-leadership-card">
              <div className="mobile-leadership-info">
                <h5>Rahannath P R</h5>
                <span className="mobile-leadership-role">Co-Founder & Director</span>
                <p className="mobile-leadership-bio">Leading strategic partnerships & client scale-up trajectories.</p>
              </div>
            </div>
            <div className="mobile-leadership-card">
              <div className="mobile-leadership-info">
                <h5>Rohan R</h5>
                <span className="mobile-leadership-role">Co-Founder & Director</span>
                <p className="mobile-leadership-bio">Directing creative output & unified brand solutions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-timeline">
          <h4>Our Milestones</h4>
          <div className="timeline-steps">
            <div className="timeline-step">
              <div className="timeline-step-dot"></div>
              <span className="timeline-step-year">2023</span>
              <span className="timeline-step-title">Company Founded</span>
              <span className="timeline-step-desc">Launched SkillStar as a remote design agency.</span>
            </div>
            <div className="timeline-step">
              <div className="timeline-step-dot"></div>
              <span className="timeline-step-year">2024</span>
              <span className="timeline-step-title">E-Commerce & Dev Integration</span>
              <span className="timeline-step-desc">Delivered custom Shopify storefronts and React SPAs.</span>
            </div>
            <div className="timeline-step">
              <div className="timeline-step-dot"></div>
              <span className="timeline-step-year">2025</span>
              <span className="timeline-step-title">SEO & AI Automation Launch</span>
              <span className="timeline-step-desc">Built custom AEO schema optimization tool chains.</span>
            </div>
            <div className="timeline-step">
              <div className="timeline-step-dot"></div>
              <span className="timeline-step-year">2026</span>
              <span className="timeline-step-title">Market Authority Redesign</span>
              <span className="timeline-step-desc">Scaling 20+ clients into unified marketing leaders.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Only Project Details Bottom Sheet */}
      <div 
        className={`bottom-sheet-overlay mobile-only ${activeProjectMobile ? 'open' : ''}`}
        onClick={() => setActiveProjectMobile(null)}
      >
        <div 
          className={`bottom-sheet-drawer ${activeProjectMobile ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bottom-sheet-drag-handle"></div>
          <div className="bottom-sheet-header">
            <h3 className="bottom-sheet-header-title">{activeProjectMobile?.title}</h3>
            <button className="bottom-sheet-close" onClick={() => setActiveProjectMobile(null)}>×</button>
          </div>
          {activeProjectMobile && (
            <div className="bottom-sheet-body">
              <div className="bottom-sheet-img">
                <img src={activeProjectMobile.img} alt={activeProjectMobile.title} />
              </div>
              <div className="bottom-sheet-meta">
                <span>Client: <strong>{activeProjectMobile.client}</strong></span>
                <span>Year: <strong>{activeProjectMobile.year}</strong></span>
              </div>
              <div>
                <h4 className="bottom-sheet-section-title">Overview</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{activeProjectMobile.description}</p>
              </div>
              {activeProjectMobile.details && (
                <div>
                  <h4 className="bottom-sheet-section-title">Details</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{activeProjectMobile.details}</p>
                </div>
              )}
              <div>
                <h4 className="bottom-sheet-section-title">Key Highlights</h4>
                <div className="bottom-sheet-features">
                  {activeProjectMobile.features.map((feature, fIdx) => (
                    <div className="bottom-sheet-feature-item" key={fIdx}>
                      <span className="bullet">▸</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="bottom-sheet-section-title">Tech Stack</h4>
                <div className="bottom-sheet-tech-tags">
                  {activeProjectMobile.tags.map((tag, tIdx) => (
                    <span className="bottom-sheet-tech-tag" key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="bottom-sheet-footer">
            <button 
              className="bottom-sheet-action-btn"
              onClick={() => {
                if (activeProjectMobile?.link && activeProjectMobile.link !== '#') {
                  window.open(activeProjectMobile.link, '_blank', 'noopener,noreferrer');
                } else {
                  setShowLeadPopup(true);
                  setActiveProjectMobile(null);
                }
              }}
            >
              {activeProjectMobile?.actionText || 'Visit Site'} <span>→</span>
            </button>
          </div>
        </div>
      </div>



      <section className="tech-grid-section container">
        <div className="tech-header">
          <span className="tech-kicker">Technology</span>
          <h2 className="tech-headline">
            <span className="text-dim">What technologies</span><br />
            do we use?
          </h2>
        </div>

        <div className="tech-cards-grid">
          {[
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
              title: 'UI/UX & Creative Systems',
              desc: 'Designing premium visual identities, scalable components libraries, and interactive prototypes configured for modern user journeys.',
              tools: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects', 'Framer', 'Premiere Pro'],
              focus: 'User-Experience Research, Vector Branding & Video Design'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
              title: 'Web Development',
              desc: 'Engineering modern responsive frontends and resilient business backend ecosystems built to handle scale and optimize page speeds.',
              tools: [
                'React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 
                'Svelte', 'SolidJS', 'Remix', 'Gatsby', 'HTML5', 
                'CSS3', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 
                'Fastify', 'NestJS', 'Python', 'Django', 'Flask', 
                'FastAPI', 'Ruby', 'Ruby on Rails', 'PHP', 'Laravel', 
                'Symfony', 'WordPress', 'Shopify', 'Webflow', 'Tailwind CSS', 
                'Bootstrap', 'Sass', 'Less', 'webpack', 'Vite', 
                'Rollup', 'esbuild', 'Babel', 'Git', 'GitHub', 
                'GitLab', 'npm', 'yarn', 'pnpm', 'Docker', 
                'Kubernetes', 'AWS', 'Vercel', 'Netlify', 'Firebase'
              ],
              focus: 'Progressive Web Apps (PWAs), Headless E-Commerce & Web Vitals'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
              title: 'SEO, GEO & AEO Dominance',
              desc: 'Deploying schema architectures and local profile setups optimized for traditional query indices and AI answer engine rankings.',
              tools: ['Search Console', 'Google Analytics', 'Semrush', 'Ahrefs', 'Schema.org', 'Screaming Frog'],
              focus: 'Local Map Dominance, Semantic Indexing & AI Indexability'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hubspot/hubspot-original.svg',
              title: 'Acquisition & Funnels',
              desc: 'Setting up conversion pixels, dynamic remarketing campaigns, and CRM databases to convert traffic into qualified business leads.',
              tools: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Campaign Mgr', 'HubSpot', 'Tag Manager', 'Mailchimp'],
              focus: 'ROAS Optimization, Lead Capture Pipelines & Email Automation'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
              title: 'AI & Intelligent Workflows',
              desc: 'Designing custom LLM integrations, retrieval systems, and background automation logic to remove manual business friction points.',
              tools: ['OpenAI API', 'Claude API', 'Make.com', 'Zapier', 'LangChain', 'n8n', 'Python'],
              focus: 'Intelligent Chatbots, CRM Integrations & Operational Flow'
            },
            {
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
              title: 'Infrastructure & Data',
              desc: 'Configuring reliable database queries, secure API endpoints, and scalable cloud container orchestrations for business systems.',
              tools: ['AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL', 'Kubernetes', 'GitHub'],
              focus: 'Secure Serverless Infrastructures, Data Modeling & API Pipelines'
            }
          ].map((tech, i) => (
            <div className="tech-card" key={i}>
              <div className="tech-icon">
                <img src={tech.icon} alt={tech.title} />
              </div>
              <h3>{tech.title}</h3>
              <p className="tech-desc">{tech.desc}</p>
              
              <div className="tech-tools-list">
                {tech.tools
                  .slice(0, expandedCardIndices.includes(i) ? tech.tools.length : 8)
                  .map((tool, tIdx) => (
                    <span className="tech-tool-badge" key={tIdx}>{tool}</span>
                  ))}
              </div>
              
              {tech.tools.length > 8 && (
                <button 
                  className="tech-expand-btn" 
                  onClick={() => toggleExpandCard(i)}
                >
                  {expandedCardIndices.includes(i) ? 'Show Less ↑' : `+${tech.tools.length - 8} More ↓`}
                </button>
              )}
              
              <div className="tech-focus">
                <span className="focus-label">Core Focus</span>
                <span className="focus-val">{tech.focus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section container" id="team">
        <div className="team-header">
          <span className="team-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            OUR TEAM
          </span>
          <h2 className="team-headline">
            The <span className="text-gradient-purple">Minds</span> Behind Every <span className="text-gradient-orange">Success</span>
          </h2>
          <p className="team-subtitle">
            A passionate team of creative thinkers, designers, developers and strategists dedicated to turning your ideas into digital reality.
          </p>
        </div>



        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div className={`team-card ${member.accent}-accent ${member.isFounder ? 'founder-card' : ''}`} key={idx}>
              <div className="team-image-container">
                <div className="card-top-action">
                  {member.isFounder ? (
                    <span className="founder-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      FOUNDER
                    </span>
                  ) : (
                    <span className="card-badge-icon">
                      {member.icon}
                    </span>
                  )}
                </div>
                
                <img src={member.img} alt={member.name} className="team-image" />
                
                <div className="team-social-overlay">
                  {member.socials.map((social, sIdx) => (
                    <a href={social.url} className={`social-btn-overlay ${social.type}`} key={sIdx} aria-label={social.type}>
                      {social.type === 'linkedin' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      )}
                      {social.type === 'github' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      )}
                      {social.type === 'twitter' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      )}
                      {social.type === 'instagram' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      )}
                      {social.type === 'email' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      )}
                      {social.type === 'website' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      )}
                      {social.type === 'behance' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 10h1.5a1.5 1.5 0 0 0 0-3H9v3zm0 5h2a1.5 1.5 0 0 0 0-3H9v3z"></path>
                          <path d="M5 20h7a5 5 0 0 0 5-5v-1a5 5 0 0 0-5-5H5v11zM18 9h4"></path>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="team-details-container">
                <h3>{member.name}</h3>
                <p className="team-specialty">{member.role}</p>
                <div className="team-experience-row">
                  <span className="experience-label">Experience:</span>
                  <span className="experience-value"> {member.experience}</span>
                </div>
                <button className="team-book-btn" onClick={() => setSelectedTeamMember(member)}>
                  CHECK {member.name.split(' ')[0].toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats Bar */}
        <div className="team-stats-bar">
          <div className="stats-item">
            <div className="stats-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="stats-content">
              <h4>100+</h4>
              <p>Projects Completed</p>
            </div>
          </div>
          <div className="stats-item">
            <div className="stats-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stats-content">
              <h4>50+</h4>
              <p>Happy Clients</p>
            </div>
          </div>
          <div className="stats-item">
            <div className="stats-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="stats-content">
              <h4>5.0</h4>
              <p>Average Rating</p>
            </div>
          </div>
          <div className="stats-item">
            <div className="stats-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                <path d="M12 2a6 6 0 0 1 6 6v4H6V8a6 6 0 0 1 6-6z"></path>
              </svg>
            </div>
            <div className="stats-content">
              <h4>3+</h4>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      <div className="desktop-only">
        <section className="testimonials-section container">
          <div className="testimonials-header">
            <div className="header-left">
              <span className="testimonials-kicker">Testimonials</span>
              <h2 className="testimonials-headline">
                <span className="text-dim">What</span> Clients Say<br />
                <span className="text-dim">About</span> Us
              </h2>
            </div>
            <div className="header-right">
              <p>Explore our diverse range of successful projects and innovative products across various industries. Explore our diverse range of successful projects and innovative products across various industries.</p>
            </div>
          </div>

          <div className="testimonials-marquee-container">
            <div className="marquee-row">
              <div className="marquee-track">
                {[
                  ...testimonialsData,
                  ...testimonialsData,
                  ...testimonialsData,
                  ...testimonialsData
                ].map((t, i) => (
                  <div className="testimonial-card" key={i}>
                    <div className="t-logo">
                      <span className="logo-placeholder">◈ {t.company}</span>
                    </div>
                    <p className="t-text">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="marquee-row">
              <div className="marquee-track reverse">
                {[
                  ...testimonialsData,
                  ...testimonialsData,
                  ...testimonialsData,
                  ...testimonialsData
                ].reverse().map((t, i) => (
                  <div className="testimonial-card" key={i}>
                    <div className="t-logo">
                      <span className="logo-placeholder">◈ {t.company}</span>
                    </div>
                    <p className="t-text">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div className="container footer-content">
            <div className="footer-cta">
              <h2>Ready to start your digital journey?</h2>
              <p>Let's collaborate to build something extraordinary together.</p>
              <button className="btn-primary" onClick={() => setShowLeadPopup(true)}>
                Get In Touch <span>→</span>
              </button>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col brand-col">
                <div className="logo">
                  <img src="/images/projects/logo (2).png" alt="SkillStar Logo" className="logo-image" />
                </div>
                <p>Transforming Businesses Into Market Leaders with AI-powered digital growth ecosystems.</p>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.about-section'); }}>About Us</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.services-section'); }}>Services</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.projects-section'); }}>Projects</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setShowLeadPopup(true); }}>Contact</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Services</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.services-section'); }}>Web Development</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.services-section'); }}>UI/UX Design</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.services-section'); }}>App Development</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('.services-section'); }}>Digital Marketing</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Contact Info</h4>
                <ul className="contact-info-list">
                  <li><span className="icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span> <a href="mailto:skillstardigitalsolutions@gmail.com">skillstardigitalsolutions@gmail.com</a></li>
                  <li><span className="icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span> <a href="tel:+918925845871">+91 89258 45871</a></li>
                  <li><span className="icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </span> <a href="https://wa.me/918925845871" target="_blank" rel="noopener noreferrer">WhatsApp: +91 89258 45871</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="container bottom-flex">
              <p>&copy; 2026 SkillStar Digital Solutions. All rights reserved.</p>
              <div className="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* 15-Second Lead Capture Popup */}
        <div 
          className={`lead-popup-overlay ${showLeadPopup ? 'open' : ''}`}
          onClick={() => {
            setShowLeadPopup(false);
            sessionStorage.setItem('hasClosedLeadPopup', 'true');
          }}
        >
          <div className="popup-bg-glow popup-bg-glow-1"></div>
          <div className="popup-bg-glow popup-bg-glow-2"></div>
          <div 
            className="lead-popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="popup-close-btn"
              onClick={() => {
                setShowLeadPopup(false);
                sessionStorage.setItem('hasClosedLeadPopup', 'true');
              }}
              aria-label="Close popup"
            >
              ×
            </button>
            
            <div className="popup-badge">Special Offer</div>
            <h3>Scale Your Business Today!</h3>
            <p>Get a <strong>Free Digital Growth Audit & AI Strategy Call</strong> worth <strong>₹15,000</strong> for your business. Only 3 slots left this week!</p>
            
            <form 
              className="popup-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Our digital growth specialist will contact you in 24 hours.");
                setShowLeadPopup(false);
                sessionStorage.setItem('hasClosedLeadPopup', 'true');
              }}
            >
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                className="popup-input"
              />
              <input 
                type="email" 
                placeholder="Your Email Address" 
                required 
                className="popup-input"
              />
              <input 
                type="tel" 
                placeholder="Phone Number / WhatsApp" 
                required 
                className="popup-input"
              />
              <button type="submit" className="popup-submit-btn">
                Claim Free Growth Audit <span>→</span>
              </button>
            </form>
            
            <div className="popup-or">or connect instantly</div>
            
            <a 
              href="https://wa.me/918925845871" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="popup-whatsapp-btn"
              onClick={() => {
                setShowLeadPopup(false);
                sessionStorage.setItem('hasClosedLeadPopup', 'true');
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.583-1.471A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Mobile-Only Testimonials Section */}
      <section className="mobile-testimonials mobile-only container">
        <div className="mobile-testimonials-header">
          <span className="mobile-testimonials-kicker">Client Feedback</span>
          <h2 className="section-headline">
            What They <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="mobile-testimonials-carousel no-scrollbar">
          {testimonialsData.map((t, idx) => (
            <div className="mobile-testimonial-card" key={idx}>
              <div className="mobile-testimonial-stars">
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <span key={sIdx}>★</span>
                ))}
              </div>
              <p className="mobile-testimonial-text">
                "{t.text}"
              </p>
              <div className="mobile-testimonial-client">
                <img src={t.avatar} alt={t.name} className="mobile-testimonial-avatar" loading="lazy" />
                <div className="mobile-testimonial-info">
                  <span className="mobile-testimonial-name">{t.name}</span>
                  <span className="mobile-testimonial-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile-Only Contact Section */}
      <section className="mobile-contact mobile-only container">
        <div className="mobile-contact-header">
          <span className="mobile-contact-kicker">Get In Touch</span>
          <h2 className="section-headline">
            Let's <span className="text-gradient">Collaborate</span>
          </h2>
        </div>

        <div className="mobile-contact-grid">
          <a href="https://wa.me/918925845871" target="_blank" rel="noopener noreferrer" className="mobile-contact-btn mobile-contact-btn-whatsapp">
            Chat on WhatsApp
          </a>
          <a href="tel:+918925845871" className="mobile-contact-btn mobile-contact-btn-call">
            Call Our Growth Expert
          </a>
          <a href="mailto:skillstardigitalsolutions@gmail.com" className="mobile-contact-btn mobile-contact-btn-email">
            Send an Email
          </a>
          <button className="mobile-contact-btn mobile-contact-btn-meeting" onClick={() => setShowLeadPopup(true)}>
            Book Discovery Call
          </button>
        </div>
      </section>

      {/* Mobile-Only Footer with Accordions */}
      <footer className="mobile-footer mobile-only">
        <div className="container">
          <div className="mobile-footer-logo-area">
            <div className="logo">
              <img src="/images/projects/logo (2).png" alt="SkillStar Logo" className="logo-image" />
            </div>
            <p>Transforming Businesses Into Market Leaders with AI-powered digital growth ecosystems.</p>
          </div>

          <div className="mobile-footer-accordions">
            <div className={`mobile-footer-accordion ${expandedFooter.includes('links') ? 'open' : ''}`}>
              <div className="mobile-footer-accordion-header" onClick={() => toggleExpandFooter('links')}>
                <span>Quick Links</span>
                <span className="mobile-footer-accordion-icon">▶</span>
              </div>
              <div className="mobile-footer-accordion-content">
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-about'); }}>About Us</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-services'); }}>Services</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-projects'); }}>Projects</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); setShowLeadPopup(true); }}>Contact</a>
              </div>
            </div>

            <div className={`mobile-footer-accordion ${expandedFooter.includes('services') ? 'open' : ''}`}>
              <div className="mobile-footer-accordion-header" onClick={() => toggleExpandFooter('services')}>
                <span>Services</span>
                <span className="mobile-footer-accordion-icon">▶</span>
              </div>
              <div className="mobile-footer-accordion-content">
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-services'); }}>Web Development</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-services'); }}>UI/UX Design</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-services'); }}>App Development</a>
                <a href="#" className="mobile-footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('.mobile-services'); }}>Digital Marketing</a>
              </div>
            </div>

            <div className={`mobile-footer-accordion ${expandedFooter.includes('contact') ? 'open' : ''}`}>
              <div className="mobile-footer-accordion-header" onClick={() => toggleExpandFooter('contact')}>
                <span>Contact Info</span>
                <span className="mobile-footer-accordion-icon">▶</span>
              </div>
              <div className="mobile-footer-accordion-content">
                <div className="mobile-footer-contact-list">
                  <div className="mobile-footer-contact-item">
                    <span className="icon">✉</span>
                    <a href="mailto:skillstardigitalsolutions@gmail.com">skillstardigitalsolutions@gmail.com</a>
                  </div>
                  <div className="mobile-footer-contact-item">
                    <span className="icon">☎</span>
                    <a href="tel:+918925845871">+91 89258 45871</a>
                  </div>
                  <div className="mobile-footer-contact-item">
                    <span className="icon">💬</span>
                    <a href="https://wa.me/918925845871" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-footer-bottom">
            <p>&copy; 2026 SkillStar Digital Solutions. All rights reserved.</p>
            <div className="mobile-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Career Experience Modal */}
      {selectedTeamMember && (
        <div className="career-modal-overlay" onClick={() => setSelectedTeamMember(null)}>
          <div className="career-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="career-modal-close" onClick={() => setSelectedTeamMember(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Header */}
            <div className="career-modal-header">
              <div className="career-modal-avatar-wrapper">
                <div className="career-modal-avatar-ring"></div>
                <img src={selectedTeamMember.img} alt={selectedTeamMember.name} className="career-modal-avatar" />
                {selectedTeamMember.isFounder && (
                  <span className="career-modal-founder-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    FOUNDER
                  </span>
                )}
              </div>
              <div className="career-modal-header-info">
                <h2 className="career-modal-name">{selectedTeamMember.name}</h2>
                <p className="career-modal-role">{selectedTeamMember.role}</p>
                <div className="career-modal-exp-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  {selectedTeamMember.experience} Experience
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="career-modal-bio">
              <p>{selectedTeamMember.bio}</p>
            </div>

            {/* Skills */}
            <div className="career-modal-section">
              <h3 className="career-modal-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Core Skills
              </h3>
              <div className="career-modal-skills">
                {selectedTeamMember.skills?.map((skill: string, sIdx: number) => (
                  <span className="career-skill-tag" key={sIdx} style={{ animationDelay: `${sIdx * 0.08}s` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="career-modal-section">
              <h3 className="career-modal-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Career Journey
              </h3>
              <div className="career-timeline">
                {selectedTeamMember.timeline?.map((item: any, tIdx: number) => (
                  <div className="career-timeline-item" key={tIdx} style={{ animationDelay: `${tIdx * 0.15}s` }}>
                    <div className="career-timeline-dot"></div>
                    <div className="career-timeline-connector"></div>
                    <div className="career-timeline-content">
                      <span className="career-timeline-year">{item.year}</span>
                      <h4 className="career-timeline-title">{item.title}</h4>
                      <p className="career-timeline-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="career-modal-section">
              <h3 className="career-modal-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                Key Achievements
              </h3>
              <div className="career-achievements-grid">
                {selectedTeamMember.achievements?.map((ach: string, aIdx: number) => (
                  <div className="career-achievement-card" key={aIdx} style={{ animationDelay: `${aIdx * 0.1}s` }}>
                    <div className="career-achievement-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="career-modal-cta">
              <a
                href={`https://wa.me/918925845871?text=Hi! I'd like to connect with ${selectedTeamMember.name} regarding a project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="career-modal-cta-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
                Connect via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Only Lead Capture Bottom Sheet Drawer */}
      <div 
        className={`mobile-popup-overlay mobile-only ${showLeadPopup ? 'open' : ''}`}
        onClick={() => {
          setShowLeadPopup(false);
          sessionStorage.setItem('hasClosedLeadPopup', 'true');
        }}
      >
        <div 
          className={`mobile-popup-sheet ${showLeadPopup ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bottom-sheet-drag-handle" onClick={() => setShowLeadPopup(false)}></div>
          <div className="mobile-popup-badge">Special Offer</div>
          <h3>Scale Your Business Today!</h3>
          <p>Get a <strong>Free Digital Growth Audit & AI Strategy Call</strong> worth <strong>₹15,000</strong>. Only 3 slots left!</p>
          
          <form 
            className="mobile-popup-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! Our digital growth specialist will contact you in 24 hours.");
              setShowLeadPopup(false);
              sessionStorage.setItem('hasClosedLeadPopup', 'true');
            }}
          >
            <input type="text" placeholder="Your Name" required className="mobile-popup-input" />
            <input type="email" placeholder="Your Email Address" required className="mobile-popup-input" />
            <input type="tel" placeholder="Phone Number / WhatsApp" required className="mobile-popup-input" />
            <button type="submit" className="mobile-popup-submit">
              Claim Free Growth Audit <span>→</span>
            </button>
          </form>
          
          <a 
            href="https://wa.me/918925845871" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-popup-whatsapp-btn"
            onClick={() => {
              setShowLeadPopup(false);
              sessionStorage.setItem('hasClosedLeadPopup', 'true');
            }}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
