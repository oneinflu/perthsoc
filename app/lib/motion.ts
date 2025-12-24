export const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export const MICRO = 0.16; // 160ms
export const SECTION = 0.5; // 500ms

export const microTransition = { ease: EASE_LUX, duration: MICRO };
export const sectionTransition = { ease: EASE_LUX, duration: SECTION };

