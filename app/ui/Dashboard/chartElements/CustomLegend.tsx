import React from "react";
import type { LegendPayload } from "recharts";

/**
 * Props for the `CustomLegend` component.
 */
interface CustomLegendProps {
  /**
   * An array of legend payload objects provided by Recharts.
   * Each object contains information about a legend item, such as its value, color, and type.
   */
  payload?: LegendPayload[];
}

/**
 * `CustomLegend` is a functional React component designed to render a custom legend
 * for Recharts graphs. It differentiates between line chart items and other chart types
 * (e.g., bar, area) to display appropriate symbols.
 *
 * @component
 * @param {CustomLegendProps} props - The properties for the component.
 * @returns {JSX.Element | null} A `<ul>` element containing the legend items, or `null` if no payload is provided.
 */
const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  // If no payload is provided, render nothing.
  if (!payload) return null;

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        gap: "1rem",
        padding: 0,
        color: "#707070",
        fontSize: 12,
        fontWeight: 400,
      }}
    >
      {payload.map((entry, index) => {
        // Type assertion to safely access `type` property which might not be explicitly in `LegendPayload`.
        const e = entry as LegendPayload & { type?: string };

        if (e.type === "line") {
          return (
            <li
              key={index}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              {/* Symbole overlay */}
              <div
                style={{
                  position: "relative",
                  width: 20,
                  height: 10, // ajustable selon la taille du point
                }}
              >
                {/* Line symbol for line charts */}
                <div
                  // The line is centered vertically within its container.
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "100%",
                    height: 2,
                    backgroundColor: e.color,
                    transform: "translateY(-50%)",
                  }}
                />
                {/* Point symbol for line charts */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "solid 1px white",
                    backgroundColor: "blue",
                    transform: "translate(-50%, -50%)", // Centered on the line.
                  }}
                />
              </div>
              <span>{e.value}</span>
            </li>
          );
        } else {
          return (
            <li
              key={index}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <div
                style={{
                  width: 8, // Fixed width for the color swatch.
                  height: 8, // Fixed height for the color swatch.
                  backgroundColor: e.color,
                  borderRadius: "50%", // Makes the swatch circular.
                }}
              />
              <span>{e.value}</span>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default CustomLegend;
