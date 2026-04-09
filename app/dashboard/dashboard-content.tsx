'use client';

import { motion } from 'motion/react';
import { Scale, LogOut, FileText, MessageSquare, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/use-auth';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface DashboardContentProps {
  user: User;
  profile: Profile | null;
}

export default function DashboardContent({ user, profile }: DashboardContentProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
      }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-white/50">Welcome back, {profile?.full_name || user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: FileText, label: 'Documents', value: '0', color: 'from-purple-500 to-pink-500' },
            { icon: MessageSquare, label: 'AI Summaries', value: '0', color: 'from-cyan-500 to-blue-500' },
            { icon: Clock, label: 'Hours Saved', value: '0', color: 'from-amber-500 to-orange-500' },
            { icon: Star, label: 'Rating', value: '-', color: 'from-emerald-500 to-green-500' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="relative backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              style={{
                background: "linear-gradient(180deg, rgba(30, 27, 75, 0.3), rgba(15, 23, 42, 0.5)) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)) border-box",
              }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Upload Document Card */}
          <div className="relative backdrop-blur-xl rounded-2xl border border-white/10 p-8"
            style={{
              background: "linear-gradient(180deg, rgba(124, 58, 237, 0.1), rgba(15, 23, 42, 0.5)) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)) border-box",
            }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload Legal Document</h3>
            <p className="text-white/50 mb-6">Upload any legal document and get an instant AI-powered summary in simple language.</p>
            <button className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
                boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3)",
              }}
            >
              Upload Document
            </button>
          </div>

          {/* Recent Activity Card */}
          <div className="relative backdrop-blur-xl rounded-2xl border border-white/10 p-8"
            style={{
              background: "linear-gradient(180deg, rgba(30, 27, 75, 0.3), rgba(15, 23, 42, 0.5)) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)) border-box",
            }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Recent Activity</h3>
            <p className="text-white/50 mb-6">View your previously analyzed documents and summaries.</p>
            <div className="text-white/30 text-sm">No recent documents</div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/" className="text-white/40 hover:text-white/60 text-sm transition-colors">
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}