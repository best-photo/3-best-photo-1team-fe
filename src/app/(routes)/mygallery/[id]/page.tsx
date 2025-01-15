"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
// import PhotoCardDetail from "@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail";

function PhotoCardDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the ID from the search parameters

  const [photoCardData, setPhotoCardData] = useState({
    cardName: "",
    description: "",
    image: null,
    grade: "",
    genre: "",
    nickname: "",
    price: "",
  });

  // Fetch data from API
  useEffect(() => {
    if (!id) return; // Ensure the ID is available

    const fetchPhotoCardData = async () => {
      try {
        const response = await fetch(`/cards/mygallery/${id}`); // Replace with your API endpoint
        const data = await response.json();

        // Update state with API data
        setPhotoCardData({
          cardName: data.cardName,
          description: data.description,
          image: data.image,
          grade: data.grade,
          genre: data.genre,
          nickname: data.nickname,
          price: data.price,
        });
      } catch (error) {
        console.error("Failed to fetch photo card data:", error);
      }
    };

    fetchPhotoCardData();
  }, [id]);

  return (
    <div className="w-[1480px] mx-[240px]">
      {/* <PhotoCardDetail
        variant="myHoldingCard"
        cardName={photoCardData.cardName}
        description={photoCardData.description}
        image={photoCardData.image}
        grade={photoCardData.grade}
        genre={photoCardData.genre}
        nickname={photoCardData.nickname}
        price={photoCardData.price}
        onSale={() => alert("판매버튼 클릭")}
      /> */}
    </div>
  );
}

export default function PhotoCardDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoCardDetailContent />
    </Suspense>
  );
}
