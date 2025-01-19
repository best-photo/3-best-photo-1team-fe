import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. 액세스 토큰 가져오기
  const accessToken = request.cookies.get('accessToken');

  // 2. 액세스 토큰 존재 여부 확인
  if (!accessToken) {
    console.log('액세스 토큰이 없으므로 로그인 페이지로 리다이렉트 합니다.');

    // 3. 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. 토큰이 있는 경우 처리
  console.log('액세스토큰 존재함');

  return response;
}

export const config = {
  matcher: [
    '/exchange-failure',
    '/exchange-success',
    '/my-gallery/:path*',
    '/my-sales/:path*',
    '/photo-card/:path*',
    '/purchase-failure',
    '/purchase-success',
  ], // 해당 경로에만 미들웨어 적용
};
