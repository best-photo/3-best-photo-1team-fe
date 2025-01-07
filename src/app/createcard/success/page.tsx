"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResultLayout from "@/src/components/SuccessOrFail/ResultsLayout";
import { ResultsProps } from "@/src/components/SuccessOrFail/result";
import { CommonBtn } from "@/src/components/common/CommonBtn/CommonBtn";

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
    text: `[${grade?.toUpperCase() || '-'} | ${name || '-'}] 포토카드 생성에 성공했습니다!`,
    backPathUrl: "/mygallery",
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black">
      <div>
        <ResultLayout result={result} />
      </div>
      <div className="mt-15 h-15 flex justify-center cursor-pointer z-20">
        <CommonBtn
          variant="secondary"
          heightPreset={2}
          width="custom"
          onClick={handleNavigation}
          className="mt-[150px] lg:w-[440px] md:w-[226px] sm:w-[226px] lg:text-[18px] md:text-[16px]"
        >
          마이갤러리에서 확인하기
        </CommonBtn>
      </div>
    </div>
  );
}
