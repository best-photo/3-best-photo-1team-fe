import Link from 'next/link';

interface HeaderProps {
  title: string; // 제목 텍스트
  highlight?: string; // 강조할 단어 (기본값은 빈 문자열)
}

export default function AuthHeaderLogo({ title, highlight = '' }: HeaderProps) {
  return (
    <header className='loginHeader mb-[40px]'>
      <div className='headerInner w-[396px] mx-auto text-center'>
        <Link href='/'>
          <h1 className='font-baskin text-[60px] md:text-[75px]'>
            {title.split(highlight).map((part, index) => (
              <span key={index}>
                {part}
                {index < title.split(highlight).length - 1 && (
                  <span className='text-main'>{highlight}</span>
                )}
              </span>
            ))}
          </h1>
        </Link>
      </div>
    </header>
  );
}
