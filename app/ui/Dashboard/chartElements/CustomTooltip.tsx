import { TooltipContentProps } from "recharts";

type CustomTooltipProps = TooltipContentProps<number, string>;

const CustomTooltip = (
  { active, payload }: CustomTooltipProps
) => {
  if (active && payload && payload.length) {
    const {customLabel, Km} = payload[0].payload
    return (
      <div
        style={{
          background: "black",
          opacity: 94,
          padding: "20px 10px",
          borderRadius: "10px",
          color: "#e7e7e7",
        }}
      >
        <p className="text-xs font-normal">{`${customLabel}`}</p>
        <p className="text-base font-medium">{`${Km} km`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
