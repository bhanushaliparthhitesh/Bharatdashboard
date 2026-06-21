"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl = "/india.topo.json";

interface IndiaMapProps {
  stateCounts: Record<string, number>;
  activeState: string | null;
  onStateSelect: (state: string | null) => void;
}

export function IndiaMap({ stateCounts, activeState, onStateSelect }: IndiaMapProps) {
  const maxCount = Math.max(...Object.values(stateCounts), 1);
  const [tooltipContent, setTooltipContent] = useState("");
  
  // A sleek dark theme color scale. 
  // Base state color: slate-800 (#1e293b), Heat max: Red-500 (#ef4444)
  const colorScale = scaleLinear<string>()
    .domain([0, maxCount])
    .range(["#1e293b", "#ef4444"]);

  return (
    <div className="w-full relative bg-card/30 backdrop-blur-sm rounded-xl border border-muted/50 flex flex-col p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-foreground/90">India Heatmap</h3>
        <div className="text-sm font-medium text-muted-foreground h-5">
          {tooltipContent}
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center min-h-[300px] md:min-h-[500px]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [80, 22] // Centered on India roughly
          }}
          className="w-full h-full drop-shadow-md"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.shapeName;
                const count = stateCounts[stateName] || 0;
                const isActive = activeState === stateName;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(`${stateName}: ${count} article${count === 1 ? '' : 's'}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => onStateSelect(isActive ? null : stateName)}
                    className="cursor-pointer transition-colors outline-none focus:outline-none"
                    style={{
                      default: {
                        fill: isActive ? "#3b82f6" : colorScale(count),
                        stroke: "#334155",
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      hover: {
                        fill: "#60a5fa", // lighter blue on hover
                        stroke: "#f8fafc",
                        strokeWidth: 1.5,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#2563eb",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {activeState && (
        <button 
          onClick={() => onStateSelect(null)}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-primary/90 transition-all"
        >
          Clear Map Filter
        </button>
      )}
    </div>
  );
}
