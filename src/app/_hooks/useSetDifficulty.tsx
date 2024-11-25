export const useSetDifficulty = (
  difficulty: "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4" | "LEVEL5"
) => {
  let [level, color] = [0, ""];
  if (difficulty === "LEVEL1") {
    level = 1;
    color = "text-blue";
  } else if (difficulty === "LEVEL2") {
    level = 2;
    color = "text-green";
  } else if (difficulty === "LEVEL3") {
    level = 3;
    color = "text-yellow";
  } else if (difficulty === "LEVEL4") {
    level = 4;
    color = "text-orange";
  } else if (difficulty === "LEVEL5") {
    level = 5;
    color = "text-red";
  }

  return [level, color];
};
