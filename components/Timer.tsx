"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  duration: number; // seconds
  onTimeUp?: () => void;
  isRunning?: boolean;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Timer({
  duration,
  onTimeUp,
  isRunning = true,
  showProgress = true,
  size = "md",
  className
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const progress = duration > 0 ? (timeLeft / duration) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const sizeClasses = {
    sm: "w-16 h-16 text-lg",
    md: "w-24 h-24 text-2xl",
    lg: "w-32 h-32 text-3xl"
  };

  const getTimerColor = () => {
    if (progress > 50) return "text-green-600";
    if (progress > 25) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {showProgress && (
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={cn("transition-all duration-1000", getTimerColor())}
              strokeLinecap="round"
            />
          </svg>
        )}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center font-bold",
          getTimerColor()
        )}>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          {timeLeft === 0 ? "Time's up!" : "Time remaining"}
        </p>
      </div>
    </div>
  );
}