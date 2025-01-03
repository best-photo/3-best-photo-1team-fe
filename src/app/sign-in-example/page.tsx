'use client';

import CommonInputSection from '@/src/components/common/commonInputSection/commonInputSection';
import { useForm } from 'react-hook-form';

interface SignInData {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    // errors : 폼의 에러 상태를 담고 있는 객체
    // isValid : 폼의 유효성 여부
    formState: { errors, isValid },
    // <> 안에 form data의 타입을 입력해주세요.
  } = useForm<SignInData>({
    // validation이 일어나는 조건을 설정합니다. onChange:값이 바뀔 때, onBlur:입력창을 벗어날 때,onSubmit:submit할 때
    mode: 'onChange',
  });

  // form에서 name이 email인 필드의 값을 감시합니다.
  const email = watch('email');
  const password = watch('password');
  // email과 password의 입력 여부와 모두 유효한 값인지 확인합니다.
  const buttonActive = email && password && isValid;

  // form을 submit할 때 실행할 함수입니다. react-hook-form의 handleSubmit함수 안에 입력해주세요. 파라미터로는 form data를 받습니다.
  // 만약 form data를 그대로 받아서 실행하는 함수가 있다면 onSubmit함수는 생략하고 바로 handleSubmit에 입력해도 됩니다.
  const onSubmit = (data: SignInData) => {
    console.log(data);
  };

  return (
    <div className='flex justify-center items-center'>
      <form
        className='w-[500px] flex flex-col items-center mt-[56px] md:mt-[158px] xl:mt-[170px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <CommonInputSection<SignInData>
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
              value: /^\S+@\S+$/i,
              message: '잘못된 이메일입니다',
            },
          }}
        />
        <CommonInputSection<SignInData>
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
          }}
        />
        <button
          disabled={!buttonActive}
          className='w-full h-[60px] cursor-pointer bg-main text-black disabled:bg-gray-300'
        >
          로그인
        </button>
      </form>
    </div>
  );
}
