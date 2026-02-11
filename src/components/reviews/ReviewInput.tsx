"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";

interface ReviewInputProps {
  reviewType: "meaning" | "reading";
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export function ReviewInput({ reviewType, onSubmit, disabled }: ReviewInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setValue("");
    inputRef.current?.focus();
  }, [reviewType]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim() && !disabled) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          reviewType === "meaning"
            ? "Entrez la signification..."
            : "Entrez la lecture (hiragana ou romaji)..."
        }
        disabled={disabled}
        className="text-lg py-4"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        Appuyez sur Entree
      </div>
    </div>
  );
}
