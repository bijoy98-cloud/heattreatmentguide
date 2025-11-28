
'use client';

import * as React from 'react';
import { Search as SearchIcon, Loader2, Lock, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import * as LucideIcons from 'lucide-react';
import { navItems } from '@/lib/heat-treatment-data';
import { useFirebase } from '@/firebase';

type SearchResult = {
  type: 'page' | 'answer';
  title: string;
  content: string;
  icon: string;
  href?: string;
};

const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIcon = (LucideIcons as any)[name] as LucideIcons.LucideIcon;
  if (!LucideIcon) {
    return <LucideIcons.HelpCircle {...props} />;
  }
  return <LucideIcon {...props} />;
};

type Plan = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Admin';

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const [showInput, setShowInput] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const { user } = useFirebase();

  let currentPlan: Plan = 'Free';
  if (user) {
    if (user.email === 'bijoy98@gmail.com') {
      currentPlan = 'Admin';
    } else if (user.email?.includes('+premium')) {
      currentPlan = 'Premium';
    } else if (user.email === 'bijoysaha98@gmail.com' || user.email?.includes('+standard')) {
      currentPlan = 'Standard';
    } else if (user.email === 'spacetime020372@gmail.com' || user.email?.includes('+basic')) {
      currentPlan = 'Basic';
    }
  }

  const canUseSearch = currentPlan !== 'Free';

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (!canUseSearch) {
           e.preventDefault();
           router.push('/pricing');
           return;
        }
        e.preventDefault();
        setShowInput(true);
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [canUseSearch, router]);

  const fetchSearchResults = async (searchQuery: string) => {
    if (!canUseSearch || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search fetch error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSearchResults(debouncedQuery);
  }, [debouncedQuery, canUseSearch]);

  const handleSelect = (result: SearchResult) => {
    if (result.href) {
      router.push(result.href);
    }
    setOpen(false);
    setShowInput(false);
    setQuery('');
  };

  const defaultResults = navItems
    .filter(item => !item.external && !item.hidden)
    .map(item => ({
      type: 'page',
      title: item.label,
      content: `Navigate to the ${item.label} page.`,
      icon: (item.icon as any).displayName || 'File',
      href: item.href,
    } as SearchResult));

  const displayedResults = query.length > 0 ? results : defaultResults;

  if (!showInput) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                if (!canUseSearch) {
                  router.push('/pricing');
                  return;
                }
                setShowInput(true);
                setOpen(true);
              }}
            >
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {canUseSearch ? <p>Search</p> : <p>Upgrade to use AI Search</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Command>
            <div className="flex items-center">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <CommandInput
                autoFocus
                value={query}
                onValueChange={setQuery}
                onBlur={() => {
                  setTimeout(() => {
                    if (!open) {
                      setShowInput(false);
                      setQuery('');
                    }
                  }, 150);
                }}
                placeholder="Ask a question or search..."
                className="pl-9 h-8 w-48 md:w-64"
                disabled={!canUseSearch}
              />
               {!canUseSearch && <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
            </div>
          </Command>
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[350px] md:w-[500px] p-0" 
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            {isLoading ? (
                <div className='p-4 flex items-center justify-center'>
                    <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
                </div>
            ) : (
              <>
                {displayedResults.length > 0 ? (
                  <CommandGroup heading={query.length > 0 ? "Results" : "Suggestions"}>
                    {displayedResults.map((result) => (
                      <CommandItem
                        key={result.title + (result.href || '')}
                        value={`${result.title} ${result.content}`}
                        onSelect={() => handleSelect(result)}
                        className='items-start'
                      >
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-muted shrink-0">
                          <Icon name={result.icon} className="h-5 w-5" />
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{result.title}</span>
                            <span className='text-xs text-muted-foreground'>{result.content}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>No results found for "{query}"</CommandEmpty>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
