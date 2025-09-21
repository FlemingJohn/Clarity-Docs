import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SummarySkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 h-full animate-pulse">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Original Document</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-2 p-4 border rounded-md h-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <div className='flex justify-between items-start'>
            <div>
              <CardTitle>Simplified Summary</CardTitle>
              <p className="text-sm text-muted-foreground pt-1">Generating your summary...</p>
            </div>
            <div className='flex gap-2'>
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummarySkeleton;
