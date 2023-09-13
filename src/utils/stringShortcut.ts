export const stringShortcut = (text: string) => (
  `${text.slice(
    0,
    3,
  )}...${text.slice(-3)}`
);

export const stringLongShortcut = (text: string, beginCount: number = 8, endCount: number = 4) => (
  `${text.slice(
    0,
    beginCount,
  )}...${text.slice(-1 * endCount)}`
);
