'use client';

import { motion } from 'motion/react';
import { Scale, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default function Navbar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Don't show navbar on auth pages or dashboard
  const showNavbar = !pathname?.startsWith('/login') && !pathname?.startsWith('/signup') && !pathname?.startsWith('/dashboard');

  if (!showNavbar) return null;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 pointer-events-none"
    >
      <div className="max-w-4xl border rounded-full mr-auto ml-auto pt-3 pr-6 pb-3 pl-6 border-white/10 pointer-events-auto"
        style={{
          background: "linear-gradient(180deg, rgba(14,16,26,0.55), rgba(14,16,26,0.35)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box",
          border: "1px solid transparent",
          backdropFilter: "blur(16px) saturate(120%)",
          WebkitBackdropFilter: "blur(16px) saturate(120%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)"
        }}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white/90">Nyay<span className="text-primary">AI</span></span>
          </Link>
          <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-white/60">
            <li className="">
              <Link href="#"
                className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">Home</Link>
            </li>
            <li className="">
              <Link href="#problem"
                className="transition-colors duration-300 hover:text-white hover:bg-white/5 rounded-full pt-2 pr-4 pb-2 pl-4">Problem</Link>
            </li>
            <li className="">
              <Link href="#solution"
                className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">Solution</Link>
            </li>
            <li className="">
              <Link href="#features"
                className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">Features</Link>
            </li>
            <li className="">
              <Link href="#demo"
                className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">Demo</Link>
            </li>
          </ul>
          <div className="flex items-center gap-2 md:gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              // Logged in - show Dashboard and Logout
              <div className="flex items-center gap-2">
                <Link href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
                <LogoutButton />
              </div>
            ) : (
              // Not logged in - show Login and Signup
              <div className="flex items-center gap-2">
                <Link href="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link href="/signup"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
                    boxShadow: "0 2px 10px rgba(124, 58, 237, 0.3)",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
