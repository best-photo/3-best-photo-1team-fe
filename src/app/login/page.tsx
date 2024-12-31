'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
// import { authAPI } from '../../services/경로는나중에';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailAlert, setEmailAlert] = useState<string>('');
  const [passwordAlert, setPasswordAlert] = useState<string>('');
  const [isLoginActive, setIsLoginActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const router = useRouter();

  // 페이지 접근 시 유저 조건 확인
  // useEffect(() => {
  //   const 조건 = 유저 정보 조건
  //   if (조건) {
  //     router.push('/'); // 유저가 있으면 특정 페이지로 이동
  //   }
  // }, [router]);

  const validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  useEffect(() => {
    setIsLoginActive(validateEmail(email) && validatePassword(password));
  }, [email, password]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (emailAlert === '이메일을 입력해주세요.' && newEmail !== '') {
      setEmailAlert('');
    }
    if (emailAlert === '잘못된 이메일 형식입니다.' && validateEmail(newEmail)) {
      setEmailAlert('');
    }
  };

  const handleEmailBlur = () => {
    if (email === '') {
      setEmailAlert('이메일을 입력해주세요.');
    } else if (!validateEmail(email)) {
      setEmailAlert('잘못된 이메일 형식입니다.');
    } else {
      setEmailAlert('');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (passwordAlert === '비밀번호를 입력해주세요.' && newPassword !== '') {
      setPasswordAlert('');
    }
    if (
      passwordAlert === '비밀번호를 8자 이상 입력해주세요.' &&
      validatePassword(newPassword)
    ) {
      setPasswordAlert('');
    }
  };

  const handlePasswordBlur = () => {
    if (password === '') {
      setPasswordAlert('비밀번호를 입력해주세요.');
    } else if (!validatePassword(password)) {
      setPasswordAlert('비밀번호를 8자 이상 입력해주세요.');
    } else {
      setPasswordAlert('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginSuccessMessage = '로그인 성공!\n마켓 플레이스로 이동합니다.';

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoginActive) return;

    try {
      // const response = await authAPI.signIn({ email, password });
      const response = { status: 200 }; // 임시 코드
      if (response.status === 200) {
        setModalMessage(loginSuccessMessage); // 성공 메시지 설정
        setIsModalOpen(true); // 모달 열기
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        // 서버 메시지 활용
        const errorMessage = data?.message || '알 수 없는 오류가 발생했습니다.';
        setModalMessage(errorMessage);

        // 상태 코드 로깅 (디버깅 용도)
        console.log(`Error ${status}: ${errorMessage}`);
      } else {
        setModalMessage('네트워크 오류가 발생했습니다.\n다시 시도해주세요.');
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 모달이 닫힐 때 성공 메시지에 따라 페이지 이동
  useEffect(() => {
    if (!isModalOpen && modalMessage === loginSuccessMessage) {
      router.push('/'); // 추후 마켓 플레이스 경로로 수정 예정
    }
  }, [isModalOpen, modalMessage, router]);

  return (
    <div className='bg-black text-white min-h-screen pt-[100px] pb-[50px]'>
      <header className='loginHeader mb-[40px]'>
        <div className='headerInner w-[396px] mx-auto text-center'>
          <Link href='/'>
            <h1 className='font-baskin text-[75px]'>
              최애<span className='text-main'>의</span>포토
            </h1>
          </Link>
        </div>
      </header>
      <div className='loginWrap max-w-[520px] min-w-[350px] mx-auto mb-[50px] w-[60%]'>
        <form onSubmit={handleLoginSubmit}>
          <div className='loginBox h-[342px] flex flex-col justify-between'>
            <div className='inputItem h-[98px] relative'>
              <label className='textLabel font-bold text-[18px] text-white'>
                이메일
              </label>
              <input
                type='text'
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder='이메일을 입력해주세요'
                className='inputId px-[16px] py-[16px] w-full text-[16px] my-[16px] mb-[24px] bg-black h-[60px] border border-gray-200 focus:outline-none focus:border-2 focus:border-white'
                tabIndex={1}
              />
              {email && (
                <button
                  type='button'
                  onClick={() => setEmail('')}
                  className='clearBtn absolute bottom-[17px] right-[18px] w-[22px] h-[22px] rounded-full text-white bg-black border-none font-semibold bg-[url(/icons/close.svg)] bg-no-repeat bg-[center_top_1px]'
                ></button>
              )}
              {emailAlert && (
                <span className='labelAlert text-main text-[15px] leading-[17.9px] font-semibold absolute bottom-[-27px] left-[16px]'>
                  {emailAlert}
                </span>
              )}
            </div>

            <div className='inputItem h-[98px] relative'>
              <label className='textLabel font-bold text-[18px] text-white'>
                비밀번호
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder='비밀번호를 입력해주세요'
                className='inputPw px-[16px] py-[16px] w-full text-[16px] mt-[16px] bg-black h-[60px] border border-gray-200 focus:outline-none focus:border-2 focus:border-white'
                tabIndex={2}
              />
              {password && (
                <>
                  <button
                    type='button'
                    onClick={toggleShowPassword}
                    className={`showPw absolute bottom-[15px] right-[53px] w-[22px] h-[22px] bg-no-repeat bg-center ${
                      showPassword
                        ? "bg-[url('/icons/visibility/visible.svg')]"
                        : "bg-[url('/icons/visibility/invisible.svg')]"
                    }`}
                  ></button>
                  <button
                    type='button'
                    onClick={() => setPassword('')}
                    className='clearBtn absolute bottom-[17px] right-[18px] w-[22px] h-[22px] rounded-full text-white bg-gary-100 border-none font-semibold bg-[url(/icons/close.svg)] bg-no-repeat bg-[center_top_1px]'
                  ></button>
                </>
              )}
              {passwordAlert && (
                <span className='labelAlert text-main text-[15px] leading-[17.9px] font-semibold absolute bottom-[-27px] left-[16px]'>
                  {passwordAlert}
                </span>
              )}
            </div>

            <button
              type='submit'
              className={`btnLogin w-full h-[60px] font-semibold text-[20px] border-none ${
                isLoginActive
                  ? 'cursor-pointer bg-main text-black'
                  : 'cursor-default bg-gray-300 text-white'
              }`}
              disabled={!isLoginActive}
              tabIndex={3}
            >
              로그인
            </button>
          </div>
        </form>

        <div className='signup text-center font-medium text-[16px] mt-[24px]'>
          최애의포토가 처음이신가요?{' '}
          <Link
            href='/signup'
            className='text-main underline'
          >
            회원가입하기
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div
          className='modalBackdrop fixed top-0 left-0 w-full h-full backdrop-blur z-10'
          onClick={closeModal}
        >
          <dialog
            className='modalContent w-[450px] h-[250px] bg-white rounded-[8px] fixed top-1/2 transform -translate-y-1/2 border-[2px] border-black z-20'
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
              className='text-[16px] bg-main text-black absolute bottom-[28px] right-[28px] w-[120px] h-[48px] leading-[44px] text-center rounded-[8px] border-[2px] border-black cursor-pointer'
              autoFocus
            >
              확인
            </button>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Login;
