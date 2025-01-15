import axiosInstance from '@/src/lib/axios/axiosInstance';
import {Genres} from '@/src/components/common/photoCard/types'

export interface CreateCardData {
  photo: File | undefined; // null 대신 undefined 사용
  price: number;
  totalQuantity: number;
  cardname: string;
  grade: string;
  genre: string;
  description: string;
}

export interface PhotoCard {
  id: string;
  name: string;
  image: string;
  grade: 'COMMON' | 'RARE' | 'SUPER RARE' | 'LEGENDARY'; 
  genre: Genres; 
  price: number;
  totalQuantity: number;
  description: string;
  nickname: string;
}


const genreTranslation: { [key: string]: string } = {
  '여행': 'TRAVEL',
  '풍경': 'LANDSCAPE',
  '인물': 'PORTRAIT',
  '사물': 'OBJECT',
};

// 포토카드 생성 함수
export const createPhotoCard = async (data: CreateCardData) => {
  try {
    const formData = new FormData();

    // 데이터 추가
    formData.append("cardname", data.cardname);
    formData.append("grade", data.grade);
    
    // 장르 변환
    const genreInEnglish = genreTranslation[data.genre] || data.genre; // 한국어 장르 -> 영어로 변환
    formData.append("genre", genreInEnglish);
    
    formData.append("price", data.price.toString());
    formData.append("totalQuantity", data.totalQuantity.toString());
    formData.append("description", data.description);

    // 사진이 있을 경우 추가
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    // 로그인한 사용자의 ID 추가
    const ownerId = localStorage.getItem("userId");
    if (ownerId) {
      formData.append("ownerId", ownerId);
    } else {
      throw new Error("사용자 ID를 가져오지 못했습니다.");
    }

    // 요청 보내기
    const response = await axiosInstance.post('/users/my-cards', formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const myGalleryPhotoCard = async (): Promise<PhotoCard[]> => {
  try {
    // 로그인한 사용자의 ID를 localStorage에서 불러옴
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId); // userId 확인
    if (!userId) {
      throw new Error('사용자가 로그인되지 않았습니다.');
    }

    // API 호출하여 로그인한 사용자의 포토카드 목록 조회
    const response = await axiosInstance.get(`/users/my-cards`, {
      params: { userId }, // 쿼리 파라미터로 userId 전달
    });
    
    // 응답 데이터를 PhotoCard 타입의 배열로 반환
    return response.data.cards; // cards만 반환
  } catch (error) {
    console.error('포토카드 조회 중 오류:', error);
    throw error; // 오류를 호출한 곳으로 전달
  }
};