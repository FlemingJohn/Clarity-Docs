# Document Editing Feature

## Overview
Users can now edit documents from their history without creating duplicates. Clicking "Edit" on a document loads it back into the editor for modification.

## Features Added

### 1. **Edit Button in Document History**
- Each document in the history now has an "Edit" button
- Clicking "Edit" loads the document content into the main editor
- Shows a visual indicator that you're editing an existing document

### 2. **Update Existing Documents**
- When editing a document and regenerating the summary, it updates the existing document instead of creating a new one
- The `uploadedAt` timestamp is updated to reflect the latest modification
- No duplicate entries are created in the document history

### 3. **Visual Feedback**
- **Editing Badge**: Shows "Editing: [Document Name]" with an X button to cancel
- **Title Changes**: "Edit Your Document" instead of "Simplify Your Document"
- **Button Text**: "Update & Regenerate Summary" instead of "Simplify Pasted Text"
- **Toast Notification**: Shows "Document Updated" when successfully updated

### 4. **Cancel Editing**
- Click the X button in the editing badge to clear the editor and start fresh
- Prevents accidental updates to existing documents

## User Flow

### Editing a Document:
1. Navigate to `/clarity` page
2. Find the document you want to edit in the history sidebar
3. Click the "Edit" button
4. The document content loads in the main editor with an "Editing" badge
5. Make your changes to the text or document type
6. Click "Update & Regenerate Summary"
7. The document is updated (not duplicated) and you're taken to the summary page

### Creating a New Document:
1. Navigate to `/clarity` page
2. If an editing badge is shown, click the X to clear it
3. Paste or upload your document
4. Click "Simplify Pasted Text"
5. A new document is created in your history

## Technical Implementation

### Files Modified:

#### 1. **`src/lib/firestore-actions.ts`**
- Added `updateDocumentInHistory()` function
- Imports `updateDoc` from Firestore SDK
- Updates document fields and timestamp

#### 2. **`src/components/clarity-docs/document-history.tsx`**
- Added `Edit` icon import
- Added `onDocumentEdit` prop
- Added `handleEdit()` function
- Added Edit button in the document list
- Edit button only shows when `onDocumentEdit` callback is provided

#### 3. **`src/components/clarity-docs/document-upload.tsx`**
- Added `initialDocument` prop to receive the document being edited
- Added `onClearEdit` callback to clear editing state
- Added `useEffect` to load document content when editing
- Added editing badge with cancel button
- Changed title and button text based on editing state
- Added `X` icon import

#### 4. **`src/app/clarity/page.tsx`**
- Added `editingDocument` state
- Added `handleEditDocument()` function
- Passes editing document to `DocumentUpload`
- Shows toast notification when editing starts
- Stores document ID in localStorage for the summary page

#### 5. **`src/app/clarity/summary/page.tsx`**
- Added `updateDocumentInHistory` import
- Checks `clarityEditingDocumentId` from localStorage
- Uses update function instead of create when editing
- Clears editing flag after successful update
- Shows "Document Updated" toast notification
- Clears editing flag on reset

### Data Flow:

```
Document History (Edit Click)
    ↓
Set editingDocument state
    ↓
Pass to DocumentUpload component
    ↓
Load content in editor
    ↓
User modifies & submits
    ↓
Store documentId in localStorage
    ↓
Navigate to summary page
    ↓
Summary page checks for documentId
    ↓
Update existing document (instead of create)
    ↓
Clear editing flag
    ↓
Show success message
```

### LocalStorage Keys:
- `clarityDocumentText` - Document content
- `clarityAgreementType` - Document type
- `claritySummaryData` - Generated summary
- `clarityEditingDocumentId` - ID of document being edited (new)

## Firestore Rules
The existing rules already support updates:
```javascript
match /documentHistory/{documentId} {
  allow update: if isAuthenticated() && resource.data.userId == request.auth.uid;
}
```

## Benefits

### For Users:
- ✅ Can refine and improve their documents
- ✅ No duplicate entries cluttering history
- ✅ Clear visual feedback about editing state
- ✅ Easy to cancel and start fresh
- ✅ Updated timestamp shows latest modification

### For System:
- ✅ Reduces database storage (no duplicates)
- ✅ Maintains document history integrity
- ✅ Better data organization
- ✅ Efficient updates with Firestore

## Future Enhancements

Potential improvements:
1. **Version History**: Keep track of all edits with timestamps
2. **Compare Changes**: Show diff between original and edited versions
3. **Auto-save Drafts**: Save changes as you type
4. **Rename Documents**: Allow custom names instead of timestamps
5. **Duplicate Feature**: Explicitly duplicate a document as a starting point
6. **Undo Changes**: Revert to previous version

## Testing Checklist

- [ ] Edit a document and verify it updates (not creates new)
- [ ] Check that timestamp updates on edit
- [ ] Verify editing badge shows correct document name
- [ ] Test cancel editing (X button) clears the state
- [ ] Verify creating new document still works
- [ ] Check that "View Summary" still works for existing documents
- [ ] Test with different document types
- [ ] Verify toast notifications appear correctly
- [ ] Check that deleting still works
- [ ] Test with empty history (no documents)
