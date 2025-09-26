interface PerformanceHintProps {
  legend: string;
  value: number | string;
  unit: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function PerformanceHint({
  legend,
  value,
  unit,
  primaryColor,
  secondaryColor,
}: PerformanceHintProps) {
  return (
    <div className="bg-white w-full px-8 py-4 rounded-[10] max-w-[570]">
      <p className="text-[#707070] text-sm font-normal">{legend}</p>
      <p>
        <span className="font-medium text-[22px]" style={{ color: primaryColor }}>{`${value}`}</span>&nbsp;
        <span className="text-base font-medium" style={{ color: secondaryColor }}>{`${unit}`}</span>
      </p>
    </div>
  );
}
