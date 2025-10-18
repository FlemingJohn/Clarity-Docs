import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SummarySkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto animate-pulse">
      <Card className="flex flex-col">
        <CardHeader className="border-b">
          <div className='flex justify-between items-start'>
            <div className="flex-1">
              <CardTitle className="text-2xl">Analyzing Your Document</CardTitle>
              <p className="text-sm text-muted-foreground pt-2">Please wait while we process your document...</p>
            </div>
            <div className='flex gap-2'>
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="space-y-6">
            {/* Tabs skeleton */}
            <div className="flex gap-2 border-b pb-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>

            {/* Content area skeleton */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>

              <div className="space-y-3 pt-4">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[92%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[88%]" />
              </div>

              <div className="space-y-3 pt-4">
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[94%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
              </div>

              {/* Do's and Don'ts skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummarySkeleton;
