import { makeMatch } from "./index";

describe("makeMatch", () => {
  test("exhaustive matching", () => {
    const foobar = makeMatch({
      FOO: null,
      BAR: null,
      BAZ: () => 6,
    });

    expect(foobar.FOO).toBeDefined();
    expect(foobar.BAR).toBeDefined();

    const value = foobar.FOO;
    const callMe = jest.fn().mockReturnValue(4);
    const dontCallMe = jest.fn().mockReturnValue(5);
    const dontCallMeEither = jest.fn().mockReturnValue(6);
    const ret = value.match({
      FOO: callMe,
      BAR: dontCallMe,
      BAZ: dontCallMeEither,
    });

    expect(callMe).toHaveBeenCalledTimes(1);
    expect(dontCallMe).not.toHaveBeenCalled();
    expect(ret).toBe(4);
  });

  test("non-exhaustive matching", () => {
    const foobar = makeMatch({
      FOO: null,
      BAR: null,
      BAZ: () => 6,
    });

    expect(foobar.FOO).toBeDefined();
    expect(foobar.BAR).toBeDefined();

    const value = foobar.BAZ();
    const callMe = jest.fn().mockImplementation((data) => data);
    const dontCallMe = jest.fn().mockReturnValue(5);
    const dontCallMeEither = jest.fn().mockReturnValue(6);
    const ret = value.match({
      FOO: dontCallMe,
      BAR: dontCallMeEither,
      _: callMe,
    });

    expect(callMe).toHaveBeenCalledTimes(1);
    expect(dontCallMe).not.toHaveBeenCalled();
    expect(ret).toBe(6);
  });
});