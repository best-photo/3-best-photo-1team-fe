'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
// import { authAPI } from '../../services/경로는나중에';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailAlert, setEmailAlert] = useState<string>('');
  const [nicknameAlert, setNicknameAlert] = useState<string>('');
  const [passwordAlert, setPasswordAlert] = useState<string>('');
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState<string>('');
  const [isSignupActive, setIsSignupActive] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    const isEmailValid = validateEmail(email);
    const isNicknameValid = nickname.length > 0;
    const isPasswordValid = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;

    setIsSignupActive(
      isEmailValid && isNicknameValid && isPasswordValid && doPasswordsMatch,
    );
  }, [email, nickname, password, confirmPassword]);

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

  const handlePasswordChange = (
    value: string,
    field: 'password' | 'confirmPassword',
  ) => {
    if (field === 'password') {
      setPassword(value);

      if (passwordAlert === '비밀번호를 입력해주세요.' && value !== '') {
        setPasswordAlert('');
      }
      if (
        passwordAlert === '비밀번호를 8자 이상 입력해주세요.' &&
        validatePassword(value)
      ) {
        setPasswordAlert('');
      }
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);

      if (confirmPasswordAlert === '비밀번호를 입력해주세요.' && value !== '') {
        setConfirmPasswordAlert('');
      }
      if (
        confirmPasswordAlert === '비밀번호가 일치하지 않습니다.' &&
        value === password
      ) {
        setConfirmPasswordAlert('');
      }
    }
  };

  const handlePasswordBlur = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      if (password === '') {
        setPasswordAlert('비밀번호를 입력해주세요.');
      } else if (!validatePassword(password)) {
        setPasswordAlert('비밀번호를 8자 이상 입력해주세요.');
      } else {
        setPasswordAlert('');
      }
    } else if (field === 'confirmPassword') {
      if (confirmPassword === '') {
        setConfirmPasswordAlert('비밀번호를 입력해주세요.');
      } else if (confirmPassword !== password) {
        setConfirmPasswordAlert('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmPasswordAlert('');
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const signupSuccessMessage = '회원가입 성공!\n마켓 플레이스로 이동합니다.';

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignupActive) {
      // const signupData = {
      //   email,
      //   nickname,
      //   password,
      //   passwordConfirmation: confirmPassword,
      // };

      try {
        // const response = await authAPI.signUp<SignupResponse>(signupData);
        const response = { status: 201 }; // 임시
        if (response.status === 201) {
          setModalMessage(signupSuccessMessage);
          setIsModalOpen(true);
        }
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response || {};

          // 서버 메시지 활용
          const errorMessage =
            data?.message || '알 수 없는 오류가 발생했습니다.';
          setModalMessage(errorMessage);

          console.log(`Error ${status}: ${errorMessage}`);
        } else {
          setModalMessage('네트워크 오류가 발생했습니다.\n다시 시도해주세요.');
        }
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => setIsModalOpen(false);

  // 모달이 닫힐 때 특정 페이지로 이동
  useEffect(() => {
    if (!isModalOpen && modalMessage === signupSuccessMessage) {
      router.push('/');
    }
  }, [isModalOpen, modalMessage, router]);

  return (
    <div className='bg-black text-white min-h-screen pt-[100px] pb-[50px]'>
      <header className='signupHeader mb-[40px]'>
        <div className='headerInner w-[396px] mx-auto text-center'>
          <Link href='/'>
            <h1 className='font-baskin text-[75px]'>
              최애<span className='text-main'>의</span>포토
            </h1>
          </Link>
        </div>
      </header>
      <div className='signupWrap max-w-[520px] min-w-[350px] mx-auto mb-[50px] w-[60%]'>
        <form onSubmit={handleSignupSubmit}>
          <div className='signupBox h-[602px] flex flex-col justify-between'>
            {/* 이메일 */}
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

            {/* 닉네임 */}
            <div className='inputItem h-[98px] relative'>
              <label className='textLabel font-bold text-[18px] text-white'>
                닉네임
              </label>
              <input
                type='text'
                value={nickname}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNickname(e.target.value)
                }
                onBlur={() =>
                  setNicknameAlert(nickname ? '' : '닉네임을 입력해주세요.')
                }
                placeholder='닉네임을 입력해주세요'
                className='inputId px-[16px] py-[16px] w-full text-[16px] my-[16px] mb-[24px] bg-black h-[60px] border border-gray-200 focus:outline-none focus:border-2 focus:border-white'
                tabIndex={2}
              />
              {nickname && (
                <button
                  type='button'
                  onClick={() => setNickname('')}
                  className='clearBtn absolute bottom-[17px] right-[18px] w-[22px] h-[22px] rounded-full text-white bg-black border-none font-semibold bg-[url(/icons/close.svg)] bg-no-repeat bg-[center_top_1px]'
                ></button>
              )}
              {nicknameAlert && (
                <span className='labelAlert text-main text-[15px] leading-[17.9px] font-semibold absolute bottom-[-27px] left-[16px]'>
                  {nicknameAlert}
                </span>
              )}
            </div>

            {/* 비밀번호 */}
            <div className='inputItem h-[98px] relative'>
              <label className='textLabel font-bold text-[18px] text-white'>
                비밀번호
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePasswordChange(e.target.value, 'password')
                }
                onBlur={() => handlePasswordBlur('password')}
                placeholder='비밀번호를 입력해주세요'
                className='inputPw px-[16px] py-[16px] w-full text-[16px] mt-[16px] bg-black h-[60px] border border-gray-200 focus:outline-none focus:border-2 focus:border-white'
                tabIndex={3}
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

            {/* 비밀번호 확인 */}
            <div className='inputItem h-[98px] relative'>
              <label className='textLabel font-bold text-[18px] text-white'>
                비밀번호 확인
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePasswordChange(e.target.value, 'confirmPassword')
                }
                onBlur={() => handlePasswordBlur('confirmPassword')}
                placeholder='비밀번호를 다시 입력해주세요'
                className='inputPw px-[16px] py-[16px] w-full text-[16px] mt-[16px] bg-black h-[60px] border border-gray-200 focus:outline-none focus:border-2 focus:border-white'
                tabIndex={4}
              />
              {confirmPassword && (
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
                    onClick={() => setConfirmPassword('')}
                    className='clearBtn absolute bottom-[17px] right-[18px] w-[22px] h-[22px] rounded-full text-white bg-gary-100 border-none font-semibold bg-[url(/icons/close.svg)] bg-no-repeat bg-[center_top_1px]'
                  ></button>
                </>
              )}
              {confirmPasswordAlert && (
                <span className='labelAlert text-main text-[15px] leading-[17.9px] font-semibold absolute bottom-[-27px] left-[16px]'>
                  {confirmPasswordAlert}
                </span>
              )}
            </div>

            <button
              type='submit'
              className={`$'btnSignup w-full h-[60px] font-semibold text-[20px] border-none ${
                isSignupActive
                  ? 'cursor-pointer bg-main text-black'
                  : 'cursor-default bg-gray-300 text-white'
              }`}
              disabled={!isSignupActive}
              tabIndex={5}
            >
              가입하기
            </button>
          </div>
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

      {/* 모달 */}
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
              className='modalButton text-[16px] bg-main text-black absolute bottom-[28px] right-[28px] w-[120px] h-[48px] leading-[44px] text-center rounded-[8px] border-[2px] border-black cursor-pointer'
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

export default Signup;
