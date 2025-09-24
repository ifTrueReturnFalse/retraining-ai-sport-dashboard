import React from "react";
import type { LegendPayload } from "recharts";

interface CustomLegendProps {
  payload?: LegendPayload[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <ul style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0, color: "#707070", fontSize: 12, fontWeight: 400 }}>
      {payload.map((entry, index) => {
        // TS-safe cast pour accéder à type runtime
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
                {/* Ligne */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "100%",
                    height: 2,
                    backgroundColor: e.color,
                    transform: "translateY(-50%)", // centre verticalement
                  }}
                />
                {/* Point */}
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
                    transform: "translate(-50%, -50%)", // centre sur la ligne
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
                  width: 8,
                  height: 8,
                  backgroundColor: e.color,
                  borderRadius: "50%",
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
