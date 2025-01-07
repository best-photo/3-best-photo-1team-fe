"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CommonBtn } from "@/src/components/common/CommonBtn/CommonBtn";
import Image from "next/image";

export default function CreatePhotoCard() {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    genre: "",
    price: "",
    totalIssued: "",
    photo: null as File | null,
    photoName: "사진 업로드",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    totalIssued: "",
    description: "",
  });

  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  const gradeDropdownRef = useRef<HTMLDivElement>(null);
  const genreDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/mygallery");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      setErrors({
        ...errors,
        name: value.length > 30 ? "포토카드 이름은 최대 30자까지 입력 가능합니다." : "",
      });
    }

    if (name === "price" || name === "totalIssued") {
      setErrors({
        ...errors,
        [name]: /^[0-9]*$/.test(value) ? "" : "숫자로 입력해주세요.",
      });
    }

    if (name === "description") {
      setErrors({
        ...errors,
        description: value.length < 10 ? "10자 이상 입력해주세요." : "",
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file, photoName: file.name });
    }
  };

  const handleDropdownClick = (dropdownType: string) => {
    if (dropdownType === "grade") {
      setIsGradeDropdownOpen(!isGradeDropdownOpen);
      setIsGenreDropdownOpen(false);
    } else if (dropdownType === "genre") {
      setIsGenreDropdownOpen(!isGenreDropdownOpen);
      setIsGradeDropdownOpen(false);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      gradeDropdownRef.current &&
      !gradeDropdownRef.current.contains(event.target as Node)
    ) {
      setIsGradeDropdownOpen(false);
    }
    if (
      genreDropdownRef.current &&
      !genreDropdownRef.current.contains(event.target as Node)
    ) {
      setIsGenreDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.grade || !formData.genre || errors.name || errors.price || errors.totalIssued || errors.description) {
      setShowModal(true); // 모달 표시
      return;
    }

    // POST 요청
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photo" && value) {
        body.append(key, value);
      } else {
        body.append(key, value as string);
      }
    });

    try {
      const response = await fetch("/api/createcard", {
        method: "POST",
        body,
      });

      if (response.ok) {
        router.push(
          `/createcard/success?grade=${formData.grade}&name=${formData.name}`
        );
      } else {
        router.push(
          `/createcard/fail?grade=${formData.grade}&name=${formData.name}`
        );
      }
    } catch (error) {
      console.error("Error creating photocard:", error);
      router.push(
        `/createcard/fail?grade=${formData.grade}&name=${formData.name}`
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-[15px] lg:p-[40px] md:p-[20px]">
      <div className="w-full max-w-[1480px]">
        {/* 헤더 */}
        <header className="text-center md:text-left mb-[20px]">
          <div
            onClick={handleNavigation}
            className="cursor-pointer block md:hidden" // block: 모바일에서 보이도록 설정, md:hidden: md(768px 이상)에서는 숨김
          >
            <Image
              src="/icons/direction/back.svg"
              width={22}
              height={22}
              alt="Back Icon"
            />
          </div>
          <h1 className="font-baskin text-white lg:text-[62px] md:text-[48px] sm:text-[32px]">
            포토카드 생성
          </h1>
          <div className="border-2 border-gray-100 w-full lg:w-[1480px] my-[20px]"></div>
        </header>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center md:items-start justify-center w-full max-w-[520px] gap-[20px] mx-auto"
        >
          {/* 포토카드 이름 입력 */}
          <div className="w-full">
            <label className="text-white text-[16px] md:text-[20px]">포토카드 이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="포토카드 이름을 입력해 주세요"
              className={`inputId px-[16px] py-[14px] w-full text-[14px] md:text-[16px] my-[10px] bg-black border ${
                errors.name ? "border-red" : "border-gray-200"
              } text-white h-[50px] md:h-[60px] focus:outline-none focus:border-gray-200`}
              required
            />
            {errors.name && (
              <span className="text-red text-[12px] md:text-[14px]">{errors.name}</span>
            )}
          </div>

          {/* 등급 선택 */}
          <div className="relative w-full" ref={gradeDropdownRef}>
            <label className="text-white text-[16px] md:text-[20px]">등급</label>
            <div className="relative">
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                onClick={() => handleDropdownClick("grade")}
                className="appearance-none px-[16px] py-[14px] w-full text-[14px] md:text-[16px] bg-black border border-gray-200 text-gray-200 h-[50px] md:h-[60px] rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              >
                <option value="">등급을 선택해 주세요</option>
                <option value="COMMON">COMMON</option>
                <option value="RARE">RARE</option>
                <option value="SUPER RARE">SUPER RARE</option>
                <option value="LEGENDARY">LEGENDARY</option>
              </select>
              <div className="absolute top-1/2 right-[16px] transform -translate-y-1/2 pointer-events-none">
                <Image
                  width={28}
                  height={28}
                  src={
                    isGradeDropdownOpen
                      ? "/icons/direction/up.svg"
                      : "/icons/direction/down.svg"
                  }
                  alt="Dropdown"
                />
              </div>
            </div>
          </div>

          {/* 장르 선택 */}
          <div className="relative w-full" ref={genreDropdownRef}>
            <label className="text-white text-[16px] md:text-[20px]">장르</label>
            <div className="relative">
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                onClick={() => handleDropdownClick("genre")}
                className="appearance-none px-[16px] py-[14px] pr-[40px] w-full text-[14px] md:text-[16px] bg-black border border-gray-200 text-gray-200 h-[50px] md:h-[60px] rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              >
                <option value="">장르를 선택해주세요</option>
                <option value="TRAVEL">여행</option>
                <option value="VIEW">풍경</option>
                <option value="PERSON">인물</option>
                <option value="OBJECT">사물</option>
              </select>
              <div className="absolute top-1/2 right-[16px] transform -translate-y-1/2 pointer-events-none">
                <Image
                  width={28}
                  height={28}
                  src={
                    isGenreDropdownOpen
                      ? "/icons/direction/up.svg"
                      : "/icons/direction/down.svg"
                  }
                  alt="Dropdown"
                />
              </div>
            </div>
          </div>

          {/* 가격 입력 */}
          <div className="w-full">
            <label className="text-white text-[16px] md:text-[20px]">가격</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="가격을 입력해 주세요"
              className={`inputId px-[16px] py-[14px] w-full text-[14px] md:text-[16px] my-[10px] bg-black border ${
                errors.price ? "border-red" : "border-gray-200"
              } text-white h-[50px] md:h-[60px] focus:outline-none focus:border-gray-200`}
              required
            />
            {errors.price && (
              <span className="text-red text-[12px] md:text-[14px]">{errors.price}</span>
            )}
          </div>

          {/* 총 발행량 입력 */}
          <div className="w-full">
            <label className="text-white text-[16px] md:text-[20px]">총 발행량</label>
            <input
              type="text"
              name="totalIssued"
              value={formData.totalIssued}
              onChange={handleChange}
              placeholder="총 발행량을 입력해 주세요"
              className={`inputId px-[16px] py-[14px] w-full text-[14px] md:text-[16px] my-[10px] bg-black border ${
                errors.totalIssued ? "border-red" : "border-gray-200"
              } text-white h-[50px] md:h-[60px] focus:outline-none focus:border-gray-200`}
              required
            />
            {errors.totalIssued && (
              <span className="text-red text-[12px] md:text-[14px]">{errors.totalIssued}</span>
            )}
          </div>

          {/* 사진 업로드 */}
          <div className="w-full">
            <label className="text-gray-200 text-[16px] md:text-[20px]">사진 업로드</label>
            <div className="flex items-center gap-4">
              <span className="flex-grow bg-black border border-gray-200 px-[16px] py-[14px] text-[14px] md:text-[16px] rounded text-gray-200 font-light truncate">
                {formData.photoName || "사진 업로드"}
              </span>
              <label
                htmlFor="fileUpload"
                className="w-[120px] md:w-[150px] h-[50px] md:h-[60px] bg-black text-main rounded text-center flex items-center justify-center cursor-pointer border border-main"
              >
                파일 선택
              </label>
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* 설명 입력 */}
          <div className="w-full">
            <label className="text-white text-[16px] md:text-[20px]">설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="포토카드에 대한 설명을 입력해주세요"
              rows={5}
              className={`resize-none px-[16px] py-[14px] w-full text-[14px] md:text-[16px] bg-black border ${
                errors.description ? "border-red" : "border-gray-200"
              } text-gray-200 rounded focus:outline-none focus:border-gray-200`}
              required
            />
            {errors.description && (
              <span className="text-red text-[12px] md:text-[14px]">{errors.description}</span>
            )}
          </div>

          {/* 생성 버튼 */}
          <CommonBtn
            variant="primary"
            width="custom"
            heightPreset={2}
            type="submit"
            className="w-full h-[50px] md:h-[60px] bg-main text-black font-bold rounded mt-[20px] text-[14px] md:text-[16px]"
          >
            생성하기
          </CommonBtn>

        </form>

        {/* 모달 */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="bg-black p-6 rounded-md shadow-lg w-[90%] md:w-[400px] flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-4 text-white text-center">입력 오류</h2>
              <p className="text-gray-300 mb-4 text-center">입력한 내용을 다시 확인해주세요.</p>
              <button
                onClick={closeModal}
                className="w-[120px] md:w-[170px] h-[50px] md:h-[60px] bg-main text-black font-bold rounded"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

