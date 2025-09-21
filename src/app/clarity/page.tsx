
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { summarizeDocumentAction } from '@/lib/actions';
import type { GeneratePlainLanguageSummaryOutput } from '@/ai/flows/generate-plain-language-summary';

import DocumentUpload from '@/components/clarity-docs/document-upload';
import SummaryView from '@/components/clarity-docs/summary-view';
import SummarySkeleton from '@/components/clarity-docs/summary-skeleton';
import { useAuth } from '@/components/auth/auth-provider';

export default function ClarityPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [documentText, setDocumentText] = useState('');
  const [summaryData, setSummaryData] = useState<GeneratePlainLanguageSummaryOutput | null>(null);
  const [agreementType, setAgreementType] = useState<string | undefined>();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  const handleSummarize = async (text: string, agreementType?: string) => {
    if (!text.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Document',
        description: 'Please paste some text to summarize.',
      });
      return;
    }
    setIsLoading(true);
    setDocumentText(text);
    setAgreementType(agreementType);

    const result = await summarizeDocumentAction({ documentText: text, agreementType });

    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: result.error,
      });
      setDocumentText('');
    } else if (result.summary) {
      setSummaryData(result as GeneratePlainLanguageSummaryOutput);
    }
  };

  const handleReset = () => {
    setDocumentText('');
    setSummaryData(null);
    setAgreementType(undefined);
  };

  const renderContent = () => {
    if (isLoading) {
      return <SummarySkeleton />;
    }
    if (summaryData) {
      return (
        <SummaryView originalText={documentText} summaryData={summaryData} onReset={handleReset} agreementType={agreementType} />
      );
    }
    return <DocumentUpload onSummarize={handleSummarize} />;
  };

  if (loading || !user) {
    return (
        <SummarySkeleton />
    );
  }

  return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</div>;
}
