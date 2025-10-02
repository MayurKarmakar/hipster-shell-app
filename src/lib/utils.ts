import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// const tw = (...classes: string[]) =>
//   classes
//     .map((cls) =>
//       cls
//         .split(' ')
//         .map((className) => `shell-${className}`)
//         .join(' ')
//     )
//     .join(' ');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
