'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { lookupTermAction } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type TermLookupPopoverProps = {
  term: string;
  context: string;
  children: React.ReactNode;
};

const TermLookupPopover = ({ term, context, children }: TermLookupPopoverProps) => {
  const [definition, setDefinition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open && !definition && !isLoading) {
      setIsLoading(true);
      const result = await lookupTermAction({ term, context });
      setIsLoading(false);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Definition Error',
          description: result.error,
        });
        setIsOpen(false);
      } else if (result.definition) {
        setDefinition(result.definition);
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <span className="bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md px-1 cursor-pointer transition-colors">
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top" align="center">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-foreground">{term}</h4>
            <div className="text-sm text-muted-foreground">
              {isLoading && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Looking up definition...</span>
                </div>
              )}
              {definition && <p>{definition}</p>}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TermLookupPopover;
