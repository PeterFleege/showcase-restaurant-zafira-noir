// src/types/restaurant.ts

import type { ReactNode } from "react";

export interface Slide {
  tag: string;
  title: string;
  image: string;
}

export interface RevealProps {
  children: ReactNode;
  className?: string;
}
