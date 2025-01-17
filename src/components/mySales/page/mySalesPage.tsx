'use client';

import Header from '@/src/components/mySales/header/header';
import SearchSection from '@/src/components/common/searchSection/searchSection';
import CardContainer from '@/src/components/mySales/cardContainer/cardContainer';
import FilterModal from '@/src/components/common/filterModal/templates/filterModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMySalesCard } from '@/src/services/mySales';
import useAuthStore from '@/src/store/useAuthStore';

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

  const { data: total } = useQuery({
    queryKey: ['mySales', 'total'],
    queryFn: () => getMySalesCard({ page: 1, limit: 30 }),
  });

  const { data } = useQuery({
    queryKey: ['mySales', query],
    queryFn: () => getMySalesCard(query),
  });

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
        cards={data?.items}
        onClick={(id) => router.push(`marketplace/${id}`)}
      />
      <FilterModal />
    </div>
  );
}
