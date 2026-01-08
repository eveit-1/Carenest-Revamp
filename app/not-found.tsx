import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
