/**
 * Props for the `PerformanceHint` component.
 */
interface PerformanceHintProps {
  /**
   * The descriptive text or label for the performance metric.
   */
  legend: string;
  /**
   * The numerical or string value of the performance metric.
   */
  value: number | string;
  /**
   * The unit of measurement for the performance metric (e.g., "minutes", "kilomètres").
   */
  unit: string;
  /**
   * The primary color used for the main value display.
   */
  primaryColor: string;
  /**
   * The secondary color used for the unit display.
   */
  secondaryColor: string;
}

/**
 * `PerformanceHint` is a React functional component that displays a single performance metric
 * with a legend, value, and unit, styled with distinct primary and secondary colors.
 *
 * @component
 * @param {PerformanceHintProps} props - The properties for the component.
 * @param {string} props.legend - The descriptive text for the metric.
 * @param {number | string} props.value - The value of the metric.
 * @param {string} props.unit - The unit of measurement for the metric.
 * @param {string} props.primaryColor - The color for the main value.
 * @param {string} props.secondaryColor - The color for the unit.
 * @returns {JSX.Element} A div element displaying the performance hint.
 */
export default function PerformanceHint({
  legend,
  value,
  unit,
  primaryColor,
  secondaryColor,
}: PerformanceHintProps) {
  return (
    <div className="bg-white w-full px-8 py-4 rounded-[10] max-w-[570]">
      {/* Container for the performance hint, styled with Tailwind CSS classes. */}
      <p className="text-[#707070] text-sm font-normal">{legend}</p>
      <p>
        {/* Displays the value of the metric with the specified primary color. */}
        <span
          className="font-medium text-[22px]"
          style={{ color: primaryColor }}
        >{`${value}`}</span>
        &nbsp; {/* Non-breaking space for separation. */}
        {/* Displays the unit of measurement with the specified secondary color. */}
        <span
          className="text-base font-medium"
          style={{ color: secondaryColor }}
        >{`${unit}`}</span>
      </p>
    </div>
  );
}
