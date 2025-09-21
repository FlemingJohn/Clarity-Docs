
'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/auth-provider';
import GetStartedButton from '@/components/layout/get-started-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../ui/skeleton';

export default function HeroActions() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Skeleton className="h-11 w-[200px] rounded-md" />
        <Skeleton className="h-11 w-[120px] rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row">
      <GetStartedButton />
      {!user && (
        <Button asChild variant="secondary" size="lg">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
