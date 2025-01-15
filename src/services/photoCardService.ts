import axiosInstance from '@/src/lib/axios/axiosInstance';
import { CreateCardData} from '../lib/axios/types/api/axiosInstance';


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