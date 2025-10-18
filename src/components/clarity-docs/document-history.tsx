'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Trash2, 
  Clock, 
  Eye, 
  Loader2,
  FolderOpen,
  Calendar,
  Edit,
  Check,
  X as XIcon
} from 'lucide-react';
import { getUserDocumentHistory, deleteDocumentFromHistory, updateDocumentInHistory, type DocumentHistory } from '@/lib/firestore-actions';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';

interface DocumentHistoryProps {
  userId: string;
  onDocumentSelect?: (document: DocumentHistory) => void;
  onDocumentEdit?: (document: DocumentHistory) => void;
}

export default function DocumentHistoryComponent({ userId, onDocumentSelect, onDocumentEdit }: DocumentHistoryProps) {
  const [documents, setDocuments] = useState<DocumentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState('');
  const { toast } = useToast();

  // Wait for Firebase auth to be fully ready
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user ? `User: ${user.uid}` : 'No user');
      if (user) {
        // Small delay to ensure auth token is attached to requests
        setTimeout(() => {
          setIsAuthReady(true);
        }, 100);
      } else {
        setIsAuthReady(false);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadHistory = async () => {
    // Verify we have both userId prop and auth is ready
    if (!userId) {
      console.warn('Cannot load history: No userId provided');
      setIsLoading(false);
      return;
    }

    if (!isAuthReady || !auth.currentUser) {
      console.warn('Cannot load history: User not authenticated', {
        isAuthReady,
        hasCurrentUser: !!auth.currentUser,
        userId
      });
      setIsLoading(false);
      return;
    }

    // Verify the userId matches the current user
    if (auth.currentUser.uid !== userId) {
      console.error('UserId mismatch:', {
        propUserId: userId,
        authUserId: auth.currentUser.uid
      });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Loading document history for user:', userId);
      const history = await getUserDocumentHistory(userId);
      console.log('Document history loaded:', history.length, 'documents');
      setDocuments(history);
    } catch (error) {
      console.error('Error loading document history:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Load History',
        description: error instanceof Error ? error.message : 'Could not load your document history. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthReady && userId) {
      loadHistory();
    }
  }, [userId, isAuthReady]);

  const handleDelete = async (documentId: string) => {
    try {
      setDeletingId(documentId);
      await deleteDocumentFromHistory(documentId);
      setDocuments(documents.filter(doc => doc.id !== documentId));
      toast({
        title: 'Document Deleted',
        description: 'The document has been removed from your history.',
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: 'Could not delete the document. Please try again.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (document: DocumentHistory) => {
    if (onDocumentSelect) {
      onDocumentSelect(document);
    } else {
      // Store in localStorage and navigate
      localStorage.setItem('clarityDocumentText', document.content);
      if (document.documentType) {
        localStorage.setItem('clarityAgreementType', document.documentType);
      }
      if (document.summary) {
        localStorage.setItem('claritySummaryData', JSON.stringify(document.summary));
      }
      window.location.href = '/clarity/summary';
    }
  };

  const handleEdit = (document: DocumentHistory) => {
    if (onDocumentEdit) {
      onDocumentEdit(document);
    }
  };

  const handleStartEditingTitle = (doc: DocumentHistory) => {
    if (doc.id) {
      setEditingTitleId(doc.id);
      setEditingTitleValue(doc.documentName);
    }
  };

  const handleCancelEditingTitle = () => {
    setEditingTitleId(null);
    setEditingTitleValue('');
  };

  const handleSaveTitle = async (documentId: string) => {
    if (!editingTitleValue.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid Name',
        description: 'Document name cannot be empty.',
      });
      return;
    }

    try {
      await updateDocumentInHistory(documentId, {
        documentName: editingTitleValue.trim(),
      });
      
      // Update the local state
      setDocuments(documents.map(doc => 
        doc.id === documentId 
          ? { ...doc, documentName: editingTitleValue.trim() }
          : doc
      ));
      
      setEditingTitleId(null);
      setEditingTitleValue('');
      
      toast({
        title: 'Name Updated',
        description: 'Document name has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating document name:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update the document name. Please try again.',
      });
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  if (!isAuthReady || isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Document History
          </CardTitle>
          <CardDescription>Your recently uploaded documents</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!auth.currentUser) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Document History
          </CardTitle>
          <CardDescription>Your recently uploaded documents</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Please sign in to view your document history.</p>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Document History
          </CardTitle>
          <CardDescription>Your recently uploaded documents</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FolderOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-2">No documents yet</p>
          <p className="text-sm text-muted-foreground/70">
            Upload and process your first document to see it here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Document History
        </CardTitle>
        <CardDescription>
          {documents.length} document{documents.length !== 1 ? 's' : ''} in your history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={doc.id}>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors break-words">
                  <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        {editingTitleId === doc.id ? (
                          <div className="flex items-center gap-1 mb-1 flex-wrap">
                            <Input
                              value={editingTitleValue}
                              onChange={(e) => setEditingTitleValue(e.target.value)}
                              className="h-7 text-sm flex-1 min-w-[120px]"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveTitle(doc.id!);
                                } else if (e.key === 'Escape') {
                                  handleCancelEditingTitle();
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 flex-shrink-0"
                              onClick={() => handleSaveTitle(doc.id!)}
                            >
                              <Check className="h-3 w-3 text-green-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 flex-shrink-0"
                              onClick={handleCancelEditingTitle}
                            >
                              <XIcon className="h-3 w-3 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mb-1 group">
                            <h4 className="font-medium text-sm truncate flex-1">
                              {doc.documentName}
                            </h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              onClick={() => handleStartEditingTitle(doc)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          {doc.documentType && (
                            <Badge variant="secondary" className="text-xs">
                              {doc.documentType}
                            </Badge>
                          )}
                          {doc.fileType && (
                            <Badge variant="outline" className="text-xs">
                              {doc.fileType.toUpperCase()}
                            </Badge>
                          )}
                          {doc.fileSize && (
                            <span className="text-xs text-muted-foreground">
                              {formatFileSize(doc.fileSize)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {doc.content.substring(0, 150)}...
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleView(doc)}
                        className="text-xs flex-shrink-0"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>

                      {onDocumentEdit && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(doc)}
                          className="text-xs flex-shrink-0"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={deletingId === doc.id}
                            className="text-xs flex-shrink-0"
                          >
                            {deletingId === doc.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <>
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{doc.documentName}" from your history.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => doc.id && handleDelete(doc.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
                
                {index < documents.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
