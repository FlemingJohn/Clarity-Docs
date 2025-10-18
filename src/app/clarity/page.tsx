
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

import DocumentUpload from '@/components/clarity-docs/document-upload';
import DocumentHistoryComponent from '@/components/clarity-docs/document-history';
import SummarySkeleton from '@/components/clarity-docs/summary-skeleton';
import { useAuth } from '@/components/auth/auth-provider';
import { DocumentHistory } from '@/lib/firestore-actions';

export default function ClarityPage() {
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [editingDocument, setEditingDocument] = useState<DocumentHistory | null>(null);

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
    
    // Store the document ID if we're editing an existing document
    if (editingDocument?.id) {
      localStorage.setItem('clarityEditingDocumentId', editingDocument.id);
    } else {
      localStorage.removeItem('clarityEditingDocumentId');
    }
    
    // Clear any existing summary data to force regeneration
    localStorage.removeItem('claritySummaryData');

    // Navigate to summary page
    router.push('/clarity/summary');
  };

  const handleEditDocument = (document: DocumentHistory) => {
    setEditingDocument(document);
    toast({
      title: 'Editing Document',
      description: `You are now editing "${document.documentName}". Changes will update the existing document.`,
    });
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main upload section - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <DocumentUpload 
            onSummarize={handleSummarize} 
            initialDocument={editingDocument}
            onClearEdit={() => setEditingDocument(null)}
          />
        </div>

        {/* Document history sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <DocumentHistoryComponent 
            userId={user.uid} 
            onDocumentEdit={handleEditDocument}
          />
        </div>
      </div>
    </div>
  );
}
