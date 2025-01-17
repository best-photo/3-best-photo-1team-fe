'use client';

import Header from '@/src/components/mySales/header/header';
import SearchSection from '@/src/components/common/searchSection/searchSection';
import CardContainer from '@/src/components/mySales/cardContainer/cardContainer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMySalesCard } from '@/src/services/mySales';
import useAuthStore from '@/src/store/useAuthStore';
import { useCallback, useEffect, useRef } from 'react';

export default function MySalesPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = {
    keyword: searchParams.get('keyword') || undefined,
    grade: searchParams.get('grade') || undefined,
    genre: searchParams.get('genre') || undefined,
    stockState: searchParams.get('stockState') || undefined,
    salesMethod: searchParams.get('salesMethod') || undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('size')) || 30,
  };

  const observerRef = useRef<HTMLDivElement>(null);

  const { data: total } = useQuery({
    queryKey: ['mySales', 'total'],
    queryFn: () => getMySalesCard({ page: 1, limit: 30 }),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['mySales', query],
      queryFn: ({ pageParam }) => getMySalesCard({ ...query, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.page < lastPage.meta.totalPage) {
          return lastPage.meta.page + 1;
        }
        return undefined;
      },
    });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allCards = data?.pages.flatMap((page) => page.items) ?? [];
  console.log('data', data?.pages?.[0].items);

  const cardsCount = {
    common: total?.items.filter((item: any) => item.grade === 'COMMON').length,
    rare: total?.items.filter((item: any) => item.grade === 'RARE').length,
    superRare: total?.items.filter((item: any) => item.grade === 'SUPER_RARE')
      .length,
    legendary: total?.items.filter((item: any) => item.grade === 'LEGENDARY')
      .length,
  };

  return (
    <div className='flex flex-col max-w-[744px] md:max-w-[1480px] mx-auto p-[15px] md:p-5 h-[1500px]'>
      <Header
        nickname={user?.nickname || ''}
        cards={cardsCount}
      />
      <SearchSection
        onSubmitFilter={(query) => router.push(`${pathname}?${query}`)}
        variant='mySale'
      />
      <CardContainer
        cards={allCards}
        onClick={(id) => router.push(`marketplace/${id}`)}
      />

      <div
        ref={observerRef}
        className='h-20 flex items-center justify-center'
      ></div>
    </div>
  );
}
