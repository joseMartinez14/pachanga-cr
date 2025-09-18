"use client";

import { motion } from "framer-motion";
import { pickIndex } from "@/lib/rng";
import { useState, useEffect } from "react";

interface SpinnerWheelProps {
  items: string[];
  seed: number;
  onSpinComplete?: (selectedItem: string, selectedIndex: number) => void;
  spinning?: boolean;
}

export function SpinnerWheel({ items, seed, onSpinComplete, spinning = false }: SpinnerWheelProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (spinning && !isSpinning) {
      startSpin();
    }
  }, [spinning]);

  const startSpin = () => {
    setIsSpinning(true);
    const targetIndex = pickIndex(items.length, seed);
    setSelectedIndex(targetIndex);

    const degreesPerSegment = 360 / items.length;
    const targetDegree = targetIndex * degreesPerSegment;
    const spinDegrees = 360 * 3 + targetDegree;

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete?.(items[targetIndex], targetIndex);
    }, 3000);
  };

  const degreesPerSegment = 360 / items.length;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80">
        <motion.div
          className="w-full h-full rounded-full border-4 border-white shadow-2xl relative overflow-hidden"
          animate={
            isSpinning
              ? {
                  rotate: selectedIndex !== null
                    ? 360 * 3 + (selectedIndex * degreesPerSegment)
                    : 360 * 3
                }
              : { rotate: 0 }
          }
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        >
          {items.map((item, index) => {
            const rotation = index * degreesPerSegment;
            const hue = (index * (360 / items.length)) % 360;

            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `hsl(${hue}, 70%, 60%)`,
                  clipPath: `polygon(50% 50%, ${
                    50 + 50 * Math.cos((rotation - degreesPerSegment/2) * Math.PI / 180)
                  }% ${
                    50 + 50 * Math.sin((rotation - degreesPerSegment/2) * Math.PI / 180)
                  }%, ${
                    50 + 50 * Math.cos((rotation + degreesPerSegment/2) * Math.PI / 180)
                  }% ${
                    50 + 50 * Math.sin((rotation + degreesPerSegment/2) * Math.PI / 180)
                  }%)`,
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <span
                  className="text-white font-bold text-sm"
                  style={{
                    transform: `rotate(-${rotation}deg) translateY(-60px)`,
                    transformOrigin: "center"
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </motion.div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
        </div>
      </div>

      {selectedIndex !== null && !isSpinning && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-bold text-gray-800">
            Selected: {items[selectedIndex]}
          </p>
        </div>
      )}
    </div>
  );
}