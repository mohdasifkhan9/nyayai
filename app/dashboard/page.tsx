import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardContent from './dashboard-content';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }

  // Get user profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return <DashboardContent user={session.user} profile={profile} />;
}