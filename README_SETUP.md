# CareNest Revamp - Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
carenest-revamp/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── product/           # Product listing
│   ├── products/[slug]/   # Product detail pages
│   ├── appointment/        # Appointment booking
│   ├── cart/              # Shopping cart
│   ├── blog/              # Blog listing
│   └── about/             # About page
├── components/
│   ├── layout/           # Header, Navbar, Footer
│   ├── sections/         # Homepage sections
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── context/              # React contexts (Cart)
├── lib/                  # Utilities and constants
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Features Implemented

✅ Responsive navigation with mobile menu
✅ Hero section with CTAs
✅ Featured product display
✅ Why Choose Us section (4 features)
✅ Subscriptions carousel (4 slides)
✅ Experts carousel (9 doctors)
✅ Testimonials carousel (3 reviews)
✅ Contact form with validation
✅ Shopping cart functionality
✅ Product pages
✅ Appointment booking page
✅ Blog page
✅ About page
✅ WhatsApp floating button
✅ Footer with social links

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Swiper.js** - Carousel/slider functionality
- **React Icons** - Icon library
- **Zustand** - State management (available, using Context API for cart)

## Environment Setup

No environment variables required for basic functionality.

## Image Assets

Place product images and icons in the `public/images/` directory. The application uses placeholder divs for images that can be replaced with actual images.

## Customization

### Colors
Edit `tailwind.config.js` to change the color palette:
- `primary-red`: #E94C60
- `primary-green`: #9AB898

### Content
- Update `lib/constants.ts` for products, experts, testimonials, etc.
- Modify component files in `components/` for UI changes

## Build for Production

```bash
npm run build
npm start
```

## Notes

- The application uses placeholder images. Replace with actual product images.
- Form submissions are currently logged to console. Connect to your backend API.
- Cart data persists in localStorage.
- All pages are responsive and mobile-friendly.
