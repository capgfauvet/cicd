import ComputeUtil from "../../src/util/compute.util";

describe("ComputeUtil", () => {
  test("adds two numbers correctly", () => {
    expect(ComputeUtil.add(1, 2)).toBe(3);
    expect(ComputeUtil.add(-1, 2)).toBe(1);
    expect(ComputeUtil.add(1.5, 2.5)).toBe(4);
  });

  test("subtracts two numbers correctly", () => {
    expect(ComputeUtil.minus(2, 1)).toBe(1);
    expect(ComputeUtil.minus(2, -1)).toBe(3);
    expect(ComputeUtil.minus(2.5, 1.5)).toBe(1);
  });

  test("multiplies two numbers correctly", () => {
    expect(ComputeUtil.multiply(2, 3)).toBe(6);
    expect(ComputeUtil.multiply(-2, 3)).toBe(-6);
    expect(ComputeUtil.multiply(2.5, 2)).toBe(5);
  });

  test("divides two numbers correctly", () => {
    expect(ComputeUtil.divide(6, 3)).toBe(2);
    expect(ComputeUtil.divide(-6, 3)).toBe(-2);
    expect(ComputeUtil.divide(2.5, 2.5)).toBe(1);
  });

  test("divides by zero", () => {
    expect(ComputeUtil.divide(1, 0)).toBe(Infinity);
    expect(ComputeUtil.divide(-1, 0)).toBe(-Infinity);
    expect(ComputeUtil.divide(0, 0)).toBeNaN();
  });
});
