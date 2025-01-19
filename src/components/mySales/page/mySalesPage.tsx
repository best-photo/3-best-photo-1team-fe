'use client';

import Header from '@/src/components/mySales/header/header';
import SearchSection from '@/src/components/common/searchSection/searchSection';
import CardContainer from '@/src/components/mySales/cardContainer/cardContainer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getMyCardsCount, getMySalesCard } from '@/src/services/mySales';
import useAuthStore from '@/src/store/useAuthStore';
import { useCallback, useEffect, useRef } from 'react';
import { useFilterStore } from '@/src/store/useFilterStore';

export default function MySalesPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = useFilterStore((store) => store.selectedCategory);
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const categories = ['grade', 'genre', 'salesMethod', 'stockState'];

    categories.forEach(async (category) => {
      await queryClient.prefetchQuery({
        queryKey: ['cardsCount', category],
        queryFn: () => getMyCardsCount(category),
        staleTime: 5 * 60 * 1000,
      });
    });
  }, []);

  const { data: cardsCount, isFetched } = useQuery({
    queryKey: ['cardsCount', selectedCategory.queryString],
    queryFn: () => getMyCardsCount(selectedCategory.queryString),
    staleTime: 5 * 1000 * 60,
  });

  const { data: gradeCount } = useQuery({
    queryKey: ['cardsCount', 'grade'],
    queryFn: () => getMyCardsCount('grade'),
    staleTime: 5 * 1000 * 60,
  });

  const formattedGradeCount = gradeCount
    ? Object.entries(gradeCount).reduce((acc, [grade, count]) => {
        return {
          ...acc,
          [grade.toLowerCase().replace('super_rare', 'superRare')]: count,
        };
      }, {})
    : {};

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

  const allCards = data?.pages.flatMap((page) => page.items) ?? [];

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

  return (
    <div className='flex flex-col max-w-[744px] md:max-w-[1480px] mx-auto p-[15px] md:p-5 h-[1500px]'>
      <Header
        nickname={user?.nickname || ''}
        cards={gradeCount && formattedGradeCount}
      />
      <SearchSection
        onSubmitFilter={(query) => router.push(`${pathname}?${query}`)}
        optionCounts={
          isFetched && cardsCount ? Object.values(cardsCount) : [0, 0, 0, 0]
        }
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
