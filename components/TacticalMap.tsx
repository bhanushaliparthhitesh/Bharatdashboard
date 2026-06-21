"use client";

import { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Simulate high alert zones like the screenshot
const HIGH_ALERT_ZONES = ["Iran", "Sudan", "Myanmar", "Yemen"];

// Simulate active incidents (yellow/orange/red dots)
const INCIDENTS = [
  { coordinates: [51.3890, 35.6892], severity: "red", label: "Tehran" },
  { coordinates: [67.0011, 24.8607], severity: "orange", label: "Karachi" },
  { coordinates: [72.8777, 19.0760], severity: "yellow", label: "Mumbai" },
  { coordinates: [77.2090, 28.6139], severity: "yellow", label: "New Delhi" },
  { coordinates: [114.1694, 22.3193], severity: "yellow", label: "Hong Kong" },
  { coordinates: [121.5654, 25.0330], severity: "red", label: "Taipei" },
  { coordinates: [31.2357, 30.0444], severity: "orange", label: "Cairo" },
  { coordinates: [34.7818, 32.0853], severity: "red", label: "Tel Aviv" },
  { coordinates: [32.5323, 15.5007], severity: "red", label: "Khartoum" },
  { coordinates: [96.1951, 16.8661], severity: "red", label: "Yangon" },
];

const getFillColor = (countryName: string) => {
  if (HIGH_ALERT_ZONES.includes(countryName)) {
    return "rgba(220, 38, 38, 0.4)"; // translucent red
  }
  return "#111111"; // dark grey/black
};

const MapChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-black overflow-hidden flex items-center justify-center">
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 140 }}
        width={800}
        height={600}
        className="w-full h-full object-cover opacity-80"
      >
        <ZoomableGroup center={[60, 20]} zoom={1.5} maxZoom={5}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getFillColor(countryName)}
                    stroke="#333333"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#222222", outline: "none", stroke: "#00ff41", strokeWidth: 1 },
                      pressed: { fill: "#333333", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {INCIDENTS.map((incident, i) => (
            <Marker key={i} coordinates={incident.coordinates as [number, number]}>
              <circle
                r={incident.severity === "red" ? 4 : incident.severity === "orange" ? 3 : 2}
                fill={incident.severity === "red" ? "#ff003c" : incident.severity === "orange" ? "#ff9900" : "#ffcc00"}
                className={`animate-pulse ${incident.severity === "red" ? "drop-shadow-[0_0_5px_rgba(255,0,60,0.8)]" : ""}`}
              />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "monospace", fontSize: "4px", fill: "#888888" }}
              >
                {incident.label}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Scanline overlay for tactical effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 opacity-50"></div>
    </div>
  );
};

export const TacticalMap = memo(MapChart);
