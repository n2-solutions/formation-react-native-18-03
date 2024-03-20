import { closestMultipleOfFive } from "./utils";

describe("closestMultipleOfFive", () => {
  it("should handle simples cases", () => {
    expect(closestMultipleOfFive(22, "up")).toBe(25);
    expect(closestMultipleOfFive(22, "down")).toBe(20);
  });
});
