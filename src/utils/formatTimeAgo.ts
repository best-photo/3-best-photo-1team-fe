export function formatTimeAgo(updatedAt: string) {
  const MS_IN_MINUTE = 60000; // 1분의 밀리초
  const MINUTES_IN_HOUR = 60; // 1시간의 분
  const HOURS_IN_DAY = 24; // 1일의 시간
  const DAYS_IN_WEEK = 7; // 1주의 일수
  const WEEKS_IN_MONTH = 4; // 1개월의 주 수 (대략적인 값)
  const DAYS_IN_MONTH = 30; // 1개월의 일수 (대략적인 값)
  const MONTHS_IN_YEAR = 12; // 1년의 개월 수

  const now = new Date();
  const updatedDate = new Date(updatedAt);
  const diffInMs = Math.abs(now.getTime() - updatedDate.getTime());
  const diffInMinutes = Math.floor(diffInMs / MS_IN_MINUTE);

  if (diffInMinutes < MINUTES_IN_HOUR) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / MINUTES_IN_HOUR);
  if (diffInHours < HOURS_IN_DAY) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / HOURS_IN_DAY);
  if (diffInDays < DAYS_IN_WEEK) {
    return `${diffInDays}일 전`;
  }

  const diffInWeeks = Math.floor(diffInDays / DAYS_IN_WEEK);
  if (diffInWeeks < WEEKS_IN_MONTH) {
    return `${diffInWeeks}주 전`;
  }

  const diffInMonths = Math.floor(diffInDays / DAYS_IN_MONTH);
  if (diffInMonths < MONTHS_IN_YEAR) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInMonths / MONTHS_IN_YEAR);
  return `${diffInYears}년 전`;
}
