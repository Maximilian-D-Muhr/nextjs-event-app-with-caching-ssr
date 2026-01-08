'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getToken, clearToken } from '@/lib/tokenStorage';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(Boolean(token));
  }, [pathname]);

  function handleSignOut() {
    clearToken();
    setIsLoggedIn(false);
    router.push('/signin');
    router.refresh();
  }

  function getLinkClass(href) {
    const isActive = pathname === href;
    return isActive
      ? 'btn btn-primary btn-sm'
      : 'btn btn-ghost btn-sm';
  }

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="mx-auto w-full max-w-5xl px-4 flex items-center">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold text-primary">
            Event Timeline
          </Link>
        </div>

        <div className="flex gap-2">
          <Link href="/" className={getLinkClass('/')}>
            Home
          </Link>

          <Link href="/blog" className={getLinkClass('/blog')}>
            Blog
          </Link>

          {isLoggedIn && (
            <Link href="/create" className={getLinkClass('/create')}>
              Create
            </Link>
          )}

          {!isLoggedIn && (
            <>
              <Link href="/signin" className={getLinkClass('/signin')}>
                Sign In
              </Link>
              <Link href="/signup" className={getLinkClass('/signup')}>
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && (
            <button
              type="button"
              className="btn btn-error btn-sm"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
