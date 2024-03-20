export function closestMultipleOfFive(num: number, direction: string): number {
  if (num % 5 === 0) {
    // Check if num is already a multiple of five
    if (direction === "up") {
      return num + 5;
    } else {
      // direction === "down"
      // Ensure result does not go below zero when decrementing
      return Math.max(0, num - 5);
    }
  } else if (direction === "up") {
    // Round up to the next multiple of 5
    return Math.ceil(num / 5) * 5;
  } else if (direction === "down") {
    // Round down to the previous multiple of 5 and ensure it's not below zero
    return Math.max(0, Math.floor(num / 5) * 5);
  } else {
    // If direction is not recognized, throw an error
    throw new Error("Direction must be 'up' or 'down'.");
  }
}
``;
