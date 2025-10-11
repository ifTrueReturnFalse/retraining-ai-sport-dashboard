import { TooltipContentProps } from "recharts";

/**
 * Type definition for the props of the `CustomTooltip` component,
 * extending Recharts' `TooltipContentProps`.
 * @template TValue The type of the value in the payload (e.g., `number`).
 * @template TName The type of the name in the payload (e.g., `string`).
 */
type CustomTooltipProps = TooltipContentProps<number, string>;

/**
 * `CustomTooltip` is a functional React component designed to render a custom tooltip
 * for Recharts graphs. It displays specific data (`customLabel` and `Km`)
 * from the active payload when the tooltip is visible.
 *
 * @component
 * @param {CustomTooltipProps} { active, payload } - The properties for the component, provided by Recharts.
 * @param {boolean} active - Indicates if the tooltip is currently active (hovered).
 * @param {Array<Object>} payload - An array of payload objects, each containing data for a displayed item.
 * @returns {JSX.Element | null} A `<div>` element containing the formatted tooltip content, or `null` if the tooltip is not active or has no payload.
 */
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  // Only render the tooltip if it's active and there's data in the payload.
  if (active && payload && payload.length) {
    // Extract `customLabel` and `Km` from the first item in the payload.
    const { customLabel, Km } = payload[0].payload;
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
        {/* Display the custom label */}
        <p className="text-xs font-normal">{`${customLabel}`}</p>
        {/* Display the distance in kilometers */}
        <p className="text-base font-medium">{`${Km} km`}</p>
      </div>
    );
  }
  // If the tooltip is not active or there's no payload, render nothing.
  return null;
};

export default CustomTooltip;
