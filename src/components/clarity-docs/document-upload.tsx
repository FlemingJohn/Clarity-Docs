
'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Sparkles, Loader2, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { processDocumentAction } from '@/lib/actions';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


type DocumentUploadProps = {
  onSummarize: (text: string, agreementType?: string) => void;
  isLoading?: boolean;
};

const agreementTypes = [
  'Rental Agreement',
  'Loan Agreement',
  'Terms of Service',
  'Employment Contract',
  'Other',
];


const DocumentUpload = ({ onSummarize, isLoading = false }: DocumentUploadProps) => {
  const [text, setText] = useState('');
  const [agreementType, setAgreementType] = useState<string | undefined>();
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsProcessingFile(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const dataUri = e.target?.result as string;
        const result = await processDocumentAction({ fileDataUri: dataUri });
        
        setIsProcessingFile(false);
        if (result.error) {
           toast({
            variant: 'destructive',
            title: 'Document Processing Error',
            description: result.error,
          });
        } else if (result.documentText) {
          onSummarize(result.documentText, agreementType);
        }

      } catch (error) {
        setIsProcessingFile(false);
        console.error('Error processing document:', error);
        toast({
          variant: 'destructive',
          title: 'File Error',
          description: 'Could not read or process the uploaded file.',
        });
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSummarize(text, agreementType);
  };

  const isBusy = isLoading || isProcessingFile;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full max-w-2xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Simplify Your Document</CardTitle>
            <CardDescription>
              Paste your document's text or upload a file to get a simple, easy-to-understand summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf,image/tiff,image/jpeg,image/png,image/bmp,image/gif"
              disabled={isBusy}
            />

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleUploadClick}
              disabled={isBusy}
            >
              {isProcessingFile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Document...
                </>
              ) : (
                <>
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Document (PDF, JPG, PNG, etc.)
                </>
              )}
            </Button>
            
            <div className="relative flex items-center justify-center">
              <Separator className="w-full" />
              <span className="absolute bg-card px-2 text-sm text-muted-foreground">OR</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="agreement-type">Agreement Type (Optional)</Label>
              <Select value={agreementType} onValueChange={setAgreementType} disabled={isBusy}>
                <SelectTrigger id="agreement-type">
                  <SelectValue placeholder="Select document type..." />
                </SelectTrigger>
                <SelectContent>
                  {agreementTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your document text here..."
                className="min-h-[300px] text-sm p-4 resize-y"
                disabled={isBusy}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-1"
                   aria-hidden="true"
              >
                  <UploadCloud className="w-16 h-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground/50 mt-2">Paste content or type here</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isBusy || !text.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Simplify Pasted Text
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DocumentUpload;
