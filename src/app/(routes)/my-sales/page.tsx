'use client';

import { Suspense } from 'react';
import MySalesPage from '@/src/components/mySales/page/mySalesPage';

export default function Page() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MySalesPage />
    </Suspense>
  );
}
