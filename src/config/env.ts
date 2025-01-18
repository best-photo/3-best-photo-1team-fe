const EnvVars = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
} as const;

// 환경 변수 존재 여부 검증
Object.entries(EnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key}가 설정되지 않았습니다.`);
  }
});

// 타입 안전성을 위해 검증된 값을 별도 객체로 생성
const ValidatedEnvVars = {
  JWT_SECRET: EnvVars.JWT_SECRET!,
  JWT_REFRESH_SECRET: EnvVars.JWT_REFRESH_SECRET!,
} as const;

export default ValidatedEnvVars;
