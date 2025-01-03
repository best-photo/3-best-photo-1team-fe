"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResultLayout from "@/src/components/SuccessOrFail/ResultsLayout";
import { ResultsProps } from "@/src/components/SuccessOrFail/result";

export default function CreatePhotoSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const grade = searchParams.get("grade");

  const handleNavigation = () => {
    router.push("/mygallery");
  };

  const result: ResultsProps = {
    variant: "포토카드 생성",
    isSuccess: true,
    text: `[${grade?.toUpperCase()} | ${name}] 포토카드 생성에 성공했습니다!`,
    backPathUrl: "/mygallery",
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black">
      <div>
        <ResultLayout result={result} />
      </div>
      <div className="mt-15 h-15 flex justify-center cursor-pointer z-20">
        <button
          className="border border-white rounded-sm w-[226px] h-[55px] mt-[150px] text-white text-[16px] font-medium leading-6 
          md:w-[440px] md:h-[60px] md:text-[18px]"
          onClick={handleNavigation}
        >
          <div>마이갤러리에서 확인하기</div>
        </button>
      </div>
    </div>
  );
}
