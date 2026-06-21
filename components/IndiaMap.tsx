"use client";

import React, { useState, useEffect } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // A sleek dark theme color scale. 
  // Base state color: matched to the new OLED card background (#171717)
  const colorScale = scaleLinear<string>()
    .domain([0, maxCount])
    .range(["#171717", "#ef4444"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full relative bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 flex flex-col p-4 shadow-sm group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-foreground/90">India Heatmap</h3>
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
                    className="cursor-pointer transition-all outline-none focus:outline-none"
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
                        outline: "none",
                        transition: "all 200ms"
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

      {/* Floating Dynamic Tooltip */}
      {tooltipContent && (
        <div 
          className="fixed z-50 pointer-events-none bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-xl border border-white/10"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y + 15,
          }}
        >
          {tooltipContent}
        </div>
      )}

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
