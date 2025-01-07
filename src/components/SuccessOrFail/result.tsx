export type ResultsProps = {
  variant: "판매" | "구매" | "교환 제시" | "포토카드 생성";
  isSuccess: boolean;
  text: string;
  backPathUrl: string;
}

export type ResultsLayoutProps = {
  result: ResultsProps;
}