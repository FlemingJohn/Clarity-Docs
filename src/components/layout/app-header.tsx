'use client';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { useAppState } from '@/context/app-state-provider';

const AppHeader = () => {
  const { user, signOut, loading } = useAuth();
  const { isSummaryView } = useAppState();

  return (
    <header className="border-b bg-card shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {isSummaryView && <SidebarTrigger className="data-[state=expanded]:hidden" />}
            <h1 className="text-lg font-semibold tracking-tight text-foreground hidden sm:block">
              Document Simplifier
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {!loading && user && (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
