
'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function GetStartedButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-11 w-[200px] rounded-md" />;
  }

  const href = user ? '/clarity' : '/sign-up';
  const text = user ? 'Go to App' : 'Get Started';

  return (
    <Button asChild size="lg">
      <Link href={href}>
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
