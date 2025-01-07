"use client";

import React from "react";
import { useRouter } from "next/navigation";

// 타입 정의
export type ResultsProps = {
  variant: "판매" | "구매" | "교환 제시" | "포토카드 생성";
  isSuccess: boolean;
  text: string;
  backPathUrl: string;
};

export type ResultsLayoutProps = {
  result: ResultsProps;
};

// 컴포넌트 정의
export default function ResultSection({ result }: ResultsLayoutProps) {
  const { variant, isSuccess, text } = result;
  const router = useRouter();

  const handleNavigation = () => {
    router.push(result.backPathUrl);
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black">
      <div className="mb-44 relative">
        {/* Close Icon for Desktop and Tablet */}
        <img
          src="/icons/close.svg"
          alt="닫기"
          className="absolute right-[-120px] hover:cursor-pointer hidden md:block"
          onClick={handleNavigation}
        />
        {/* Back Icon for Mobile */}
        <img
          src="/icons/direction/back.svg"
          alt="뒤로 가기"
          className="absolute left-[20px] md:hidden cursor-pointer"
          onClick={handleNavigation}
        />
        <header className="mt-24 flex justify-center gap-2.5">
          <p className="font-baskin text-3xl font-normal text-white">
            {variant}
          </p>
          <p
            className={`font-baskin text-3xl font-normal ${
              isSuccess ? "text-main" : "text-gray-300"
            }`}
          >
            {isSuccess ? "성공" : "실패"}
          </p>
        </header>
        <div className="mt-10 text-[16px] font-bold text-white text-center">
          {text}
        </div>
      </div>
    </div>
  );
}


