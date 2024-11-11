export const useSetDifficultyColor = (difficulty: 1 | 2 | 3 | 4 | 5) => {
  let color = "";
  if (difficulty === 1) {
    color = "text-blue";
  } else if (difficulty === 2) {
    color = "text-green";
  } else if (difficulty === 3) {
    color = "text-yellow";
  } else if (difficulty === 4) {
    color = "text-orange";
  } else if (difficulty === 5) {
    color = "text-red";
  }

  return color;
};
