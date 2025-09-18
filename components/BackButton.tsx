"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackButton({ href, label = "Back", className }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 text-secondary hover:text-primary",
          "transition-colors duration-200 text-sm font-medium focus-outline",
          "group"
        )}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="flex-shrink-0"
          whileHover={{ x: -2 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <span className="group-hover:underline">{label}</span>
      </Link>
    </motion.div>
  );
}