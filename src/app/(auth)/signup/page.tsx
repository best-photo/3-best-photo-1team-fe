'use client';

import CommonInputSection from '@/src/components/common/commonInputSection/commonInputSection';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/src/services/authService';
import AuthHeaderLogo from '@/src/components/Auth/AuthHeaderLogo';

interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    // errors : 폼의 에러 상태를 담고 있는 객체
    // isValid : 폼의 유효성 여부
    formState: { errors, isValid },
    // <> 안에 form data의 타입을 입력해주세요.
  } = useForm<SignUpData>({
    // validation이 일어나는 조건을 설정합니다. onChange:값이 바뀔 때, onBlur:입력창을 벗어날 때,onSubmit:submit할 때
    mode: 'onChange',
  });

  // form에서 name이 email인 필드의 값을 감시합니다.
  const email = watch('email');
  const nickname = watch('nickname');
  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');
  // email과 password의 입력 여부와 모두 유효한 값인지 확인합니다.
  const buttonActive =
    email && nickname && password && passwordConfirmation && isValid;

  // form을 submit할 때 실행할 함수입니다. react-hook-form의 handleSubmit함수 안에 입력해주세요. 파라미터로는 form data를 받습니다.
  // 만약 form data를 그대로 받아서 실행하는 함수가 있다면 onSubmit함수는 생략하고 바로 handleSubmit에 입력해도 됩니다.
  const onSubmit = async (data: SignUpData) => {
    try {
      const { email, nickname, password } = data;

      // 회원가입 API 호출
      const response = await signup({ email, nickname, password });

      if (response.status === 201) {
        setModalMessage(signupSuccessMessage);
        setIsModalOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  const signupSuccessMessage = '회원가입 성공!\n로그인 페이지로 이동합니다.';

  const closeModal = () => setIsModalOpen(false);

  // 모달이 닫힐 때 특정 페이지로 이동
  useEffect(() => {
    if (!isModalOpen && modalMessage === signupSuccessMessage) {
      router.push('/login');
    }
  }, [isModalOpen, modalMessage, router]);

  return (
    <div className='bg-black text-white min-h-screen pt-[100px] pb-[50px]'>
      <AuthHeaderLogo
        title='최애의포토'
        highlight='의'
      />
      <div className='loginWrap max-w-[520px] min-w-[350px] mx-auto mb-[50px] w-[60%]'>
        <form
          className='max-w-[500px] flex flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <CommonInputSection<SignUpData>
            register={register}
            errors={errors}
            // 인풋창 위에 있는 label에 표시될 텍스트를 입력합니다.
            label='이메일'
            // input type을 입력합니다. (text,number,password 등)
            type='email'
            // input name을 입력합니다. react-hook-form에서 필드를 구분할 때 사용됩니다.
            name='email'
            // 인풋의 placeholder를 입력합니다.
            placeholder='이메일을 입력해주세요'
            // 입력된 값에 대한 유효성 검사를 입력합니다.
            // required의 경우 해당 필드를 필수 값으로 설정하고 입력되지 않으면 보여줄 에러메시지를 설정합니다.
            // 그 외 validation에 대해선 공식문서를 통해 확인할 수 있습니다. https://react-hook-form.com/docs/useform/register
            validation={{
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '잘못된 이메일입니다',
              },
            }}
          />
          <CommonInputSection<SignUpData>
            register={register}
            errors={errors}
            // 인풋창 위에 있는 label에 표시될 텍스트를 입력합니다.
            label='닉네임'
            // input type을 입력합니다. (text,number,password 등)
            type='text'
            // input name을 입력합니다. react-hook-form에서 필드를 구분할 때 사용됩니다.
            name='nickname'
            // 인풋의 placeholder를 입력합니다.
            placeholder='닉네임을 입력해주세요'
            // 입력된 값에 대한 유효성 검사를 입력합니다.
            // required의 경우 해당 필드를 필수 값으로 설정하고 입력되지 않으면 보여줄 에러메시지를 설정합니다.
            // 그 외 validation에 대해선 공식문서를 통해 확인할 수 있습니다. https://react-hook-form.com/docs/useform/register
            validation={{
              required: '닉네임을 입력해주세요',
              pattern: {
                value: /^[a-zA-Z0-9가-힣]+$/,
                message: '닉네임은 영어, 숫자, 완성된 한글만 입력 가능합니다.',
              },
              minLength: {
                value: 2,
                message: '닉네임은 최소 2자 이상 입력해주세요',
              },
              maxLength: {
                value: 50,
                message: '닉네임은 최대 50자까지 입력 가능합니다',
              },
            }}
          />
          <CommonInputSection<SignUpData>
            register={register}
            errors={errors}
            label='비밀번호'
            type='password'
            name='password'
            placeholder='비밀번호를 입력해주세요'
            validation={{
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호를 8자 이상 입력해주세요',
              },
              maxLength: {
                value: 128,
                message: '비밀번호는 최대 128까지 입력 가능합니다.',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
              },
            }}
          />
          <CommonInputSection<SignUpData>
            register={register}
            errors={errors}
            label='비밀번호 확인'
            type='password'
            name='passwordConfirmation'
            placeholder='비밀번호를 다시 한 번 입력해주세요'
            validation={{
              required: '비밀번호를 다시 한 번 입력해주세요',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다',
            }}
          />
          <button
            disabled={!buttonActive}
            className='w-full h-[60px] cursor-pointer bg-main text-black font-semibold text-[16px] lg:text-[18px] disabled:bg-gray-300 disabled:text-white'
          >
            가입하기
          </button>
        </form>
        <div className='login text-center font-medium text-[16px] mt-[24px]'>
          이미 최애의포토 회원이신가요?{' '}
          <Link
            href='/login'
            className='text-main underline'
          >
            로그인하기
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <div
          className='modalBackdrop fixed top-0 left-0 w-full h-full backdrop-blur z-10'
          onClick={closeModal}
        >
          <dialog
            className='modalContent w-[300px] md:w-[450px] h-[250px] bg-white rounded-[8px] fixed top-1/2 transform -translate-y-1/2 border-[2px] border-black z-20'
            open
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className='absolute w-[250px] text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full text-[16px]'
              style={{ whiteSpace: 'pre-line' }}
            >
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className='text-[16px] bg-main text-black absolute bottom-[28px] right-[28px] w-[80px] md:w-[120px] h-[48px] leading-[44px] text-center rounded-[8px] border-[2px] border-black cursor-pointer'
              autoFocus
            >
              확인
            </button>
          </dialog>
        </div>
      )}
    </div>
  );
}
