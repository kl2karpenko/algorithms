const numTilePossibilitiesTest = function(tiles: string) {
  let slidingWSize = 1, len = tiles.length;
  const allPossibleStringsWithSizes: { [key: number]: string[] } = {};

  for (; slidingWSize < len + 1; slidingWSize++) {
    const substringWithAdditionalSymbols = tiles + tiles.substring(0, slidingWSize);
    allPossibleStringsWithSizes[slidingWSize] = [];

    for (let strIndex = 0; strIndex < len; strIndex++) {
      const subStrWithSwSize = substringWithAdditionalSymbols.substring(strIndex, strIndex + slidingWSize);

      allPossibleStringsWithSizes[slidingWSize].push(subStrWithSwSize);
    }
  }

  const flattened = Object.values(allPossibleStringsWithSizes).map(values => [...values]).flatMap(x => x);
  return Array.from(new Set([...flattened]));
}

let findPermutations = (string: string) => {
  if (!string || typeof string !== "string"){
    return "Please enter a string"
  } else if (string.length < 2 ){
    return string;
  }
  let permutationsArray = [];

  for (let i = 0; i < string.length; i++){
    let char = string[i];
    let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length);

    const permutations = findPermutations(remainingChars);
    for (let i = 0; i < permutations.length; i++) {
      const permutation = permutations[i];
      permutationsArray.push(char + permutation);
    }
  }
  return permutationsArray
}

// finds permutations all symbols in string, for length from 1 to len of string
const allCombinationsWithAllLength = function(tiles: string, res = []) {
  const len = tiles.length;
  const permutationsForLen = {};

  for (let strLen = len; strLen > 0; strLen--) {
    for (let i = 0; i < len; i++) {
      const stringToGetChars = i + strLen > len ? `${tiles}${tiles.substring(0, i)}` : tiles;
      const substr = stringToGetChars.substring(i, strLen + i);

      if (!permutationsForLen[strLen]) {
        permutationsForLen[strLen] = [];
      }

      permutationsForLen[strLen].push(...findPermutations(substr));
    }
  }

  return Array.from(new Set([...Object.values(permutationsForLen).map(values => values).flatMap(x => x)]));
}

describe("numTilePossibilitiesTest", function () {
  it("num tiles", () => {
    // expect(numTilePossibilitiesTest("ABCD").sort()).toMatchObject(["D"].sort());
    expect(numTilePossibilitiesTest("AAB").sort()).toMatchObject(["A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"].sort());
  });

  it("getAllPermutationsOfString", () => {
    expect(allCombinationsWithAllLength("abc").sort()).toMatchObject(["a", "b", "c", "ab", "ba", "bc", "cb", "ac", "ca", "abc", "acb", "bac", "bca", "cab", "cba"].sort());
    expect(allCombinationsWithAllLength("AAB").sort()).toMatchObject(["A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"].sort());
  });
});

describe("getAllComb function", function () {
  test("getAllComb", () => {
    expect(findPermutations("abc").sort()).toMatchObject(["abc", "acb", "bac", "bca", "cab", "cba"].sort());
    expect(findPermutations("aac").sort()).toMatchObject(["aac", "aca", "caa"].sort());
  });
});