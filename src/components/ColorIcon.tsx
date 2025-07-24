interface ColorIconProps {
  color: string;
}

const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    // Basic colors
    white: "#ffffff",
    black: "#000000",
    gray: "#6b7280",
    grey: "#6b7280",
    navy: "#1e3a8a",
    brown: "#92400e",
    green: "#059669",
    blue: "#2563eb",
    red: "#dc2626",
    orange: "#ea580c",
    yellow: "#eab308",
    purple: "#9333ea",
    pink: "#ec4899",
    indigo: "#4f46e5",
    teal: "#0d9488",
    cyan: "#0891b2",
    lime: "#65a30d",
    emerald: "#059669",
    violet: "#8b5cf6",
    fuchsia: "#d946ef",
    rose: "#f43f5e",
    slate: "#64748b",
    zinc: "#71717a",
    neutral: "#737373",
    stone: "#78716c",
    amber: "#f59e0b",

    // Specific color variations
    "all black": "#000000",
    burgundy: "#7c2d12",
    charcoal: "#374151",
    cognac: "#92400e",
    cream: "#fef3c7",
    "forest green": "#166534",
    gold: "#eab308",
    khaki: "#a3a3a3",
    "light wash": "#ddd6fe",
    natural: "#f5f5dc",
    olive: "#84cc16",
  };

  return colorMap[colorName.toLowerCase()] || "#6b7280";
};

export default function ColorIcon({ color }: ColorIconProps) {
  // Handle multi-color combinations (e.g., "Black/Red", "Gray/Blue")
  if (color.includes("/")) {
    const colors = color.split("/").map((c) => c.trim());

    if (colors.length === 2) {
      const color1 = getColorValue(colors[0]);
      const color2 = getColorValue(colors[1]);

      return (
        <div className="w-4 h-4 rounded-full border border-border overflow-hidden">
          <div className="w-full h-full flex">
            <div className="w-1/2 h-full" style={{ backgroundColor: color1 }} />
            <div className="w-1/2 h-full" style={{ backgroundColor: color2 }} />
          </div>
        </div>
      );
    }
  }

  // Handle single colors
  const backgroundColor = getColorValue(color);

  return (
    <div
      className="w-4 h-4 rounded-full border border-border"
      style={{ backgroundColor }}
    />
  );
}
