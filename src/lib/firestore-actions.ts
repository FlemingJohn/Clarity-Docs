'use client';

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

export interface DocumentHistory {
  id?: string;
  userId: string;
  documentName: string;
  documentType?: string;
  content: string; // The full document text
  summary?: any; // The AI-generated summary
  uploadedAt: Date;
  fileType?: string; // 'pdf', 'image', 'text'
  fileSize?: number;
}

/**
 * Save a document to the user's history
 */
export async function saveDocumentToHistory(
  userId: string,
  documentData: Omit<DocumentHistory, 'id' | 'userId' | 'uploadedAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'documentHistory'), {
      userId,
      ...documentData,
      uploadedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving document to history:', error);
    throw new Error('Failed to save document to history');
  }
}

/**
 * Get all documents for a specific user, sorted by most recent
 */
export async function getUserDocumentHistory(
  userId: string,
  limitCount: number = 50
): Promise<DocumentHistory[]> {
  try {
    const q = query(
      collection(db, 'documentHistory'),
      where('userId', '==', userId),
      orderBy('uploadedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const documents: DocumentHistory[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({
        id: doc.id,
        userId: data.userId,
        documentName: data.documentName,
        documentType: data.documentType,
        content: data.content,
        summary: data.summary,
        uploadedAt: data.uploadedAt.toDate(),
        fileType: data.fileType,
        fileSize: data.fileSize,
      });
    });

    return documents;
  } catch (error) {
    console.error('Error fetching document history:', error);
    throw new Error('Failed to fetch document history');
  }
}

/**
 * Delete a document from history
 */
export async function deleteDocumentFromHistory(
  documentId: string
): Promise<void> {
  try {
    await deleteDoc(doc(db, 'documentHistory', documentId));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete document');
  }
}

/**
 * Get recent documents (last 10)
 */
export async function getRecentDocuments(userId: string): Promise<DocumentHistory[]> {
  return getUserDocumentHistory(userId, 10);
}
