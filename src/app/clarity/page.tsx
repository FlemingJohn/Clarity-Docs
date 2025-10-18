
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

import DocumentUpload from '@/components/clarity-docs/document-upload';
import SummarySkeleton from '@/components/clarity-docs/summary-skeleton';
import { useAuth } from '@/components/auth/auth-provider';

export default function ClarityPage() {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  const handleSummarize = (text: string, agreementType?: string) => {
    if (!text.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Document',
        description: 'Please paste some text to summarize.',
      });
      return;
    }

    // Store document data in localStorage for the summary page (persists across reloads)
    localStorage.setItem('clarityDocumentText', text);
    if (agreementType) {
      localStorage.setItem('clarityAgreementType', agreementType);
    } else {
      localStorage.removeItem('clarityAgreementType');
    }
    // Clear any existing summary data to force regeneration
    localStorage.removeItem('claritySummaryData');

    // Navigate to summary page
    router.push('/clarity/summary');
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SummarySkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DocumentUpload onSummarize={handleSummarize} />
    </div>
  );
}
