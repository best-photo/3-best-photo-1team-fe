export default function PurchasePointLabel({ point }: { point: number }) {
  return (
    <span>
      <span className='text-white'>{point}P</span> 에 구매
    </span>
  );
}
