let findPermutations = (string) => {
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
  return permutationsArray;
}

// find permutations for arrays
const findPermutationsOfStringWithSeveralChars = (charsList: string) => {
  console.log(charsList, "charsList given");
  console.log(charsList, charsList.length, charsList.length <= 2, "arr");
  if ( charsList.length < 2 ){
    return charsList;
  }
  let permutationsArray = [];

  for (let i = 0; i < charsList.length - 1; i++){
    let char = charsList[i];
    let remainingChars = charsList.slice(i + 1, charsList.length);

    console.log(char, remainingChars, " char and remainingChars ");

    const permutations = findPermutationsOfStringWithSeveralChars(remainingChars);
    console.log(permutations, " permutations result");

    // if (permutations.length === 1) {
    //   permutations.unshift(char);
    //   permutationsArray.push(...permutations);
    // } else {
    permutations.unshift(char);
    permutationsArray.push(...permutations);
    // for (let i = 0; i < permutations.length; i++) {
    //   const permutation = permutations[i];
    //   console.log(permutation, " permutation before unshift");
    //
    //   console.log(permutation, " permutation as a result");
    // }
    // }
  }

  return permutationsArray;
}

const combinations = ( collection, combinationLength ) => {
  let head, tail, result = [];
  if ( combinationLength > collection.length || combinationLength < 1 ) { return []; }
  // if ( combinationLength === collection.length ) { return [ collection ]; }
  if ( combinationLength === 1 ) { return collection.map( element => [ element ] ); }

  for ( let i = 0; i < collection.length - combinationLength + 1; i++ ) {
    head = collection.slice( i, i + 1 );
    tail = combinations( collection.slice( i + 1 ), combinationLength - 1 );
    for ( let j = 0; j < tail.length; j++ ) { result.push( head.concat( tail[ j ] ) ); }
  }

  return result.map(res => res.join(""));
}

function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  // Assert {1 < k < set.length}

  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration:
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function(n, k, target) {
  let canBeUsedNumbersK = k;

  if (target < k) {
    canBeUsedNumbersK = target;
  }

  // all k numbers
  const allNumbers = Array.from(Array(canBeUsedNumbersK)).map((el, index) => index + 1);
  const allCombs = combinations(allNumbers, n);

  const resCombsThatMatchTarget = allCombs.filter(str => {
    const numbers = str.split("");

    return numbers.reduce((acc, next) => acc + Number(next), 0) === target;
  });

  return resCombsThatMatchTarget.length * n;
};

describe("should", function () {
  it("numRollsToTarget", () => {
    // expect(numRollsToTarget(1, 6, 3)).toBe(1)
    // expect(numRollsToTarget(2, 6, 7)).toBe(6)
    expect(numRollsToTarget(30, 30, 500)).toBe(222616187)
  });

  it("findPermutationsOfArray", () => {
    const allNumbersStr = Array.from(Array(30)).map((el, index) => index + 1);

    console.log(allNumbersStr, "allNumbersStr");
    expect(findPermutationsOfStringWithSeveralChars(allNumbersStr).sort()).toMatchObject(["ab", "ac", "bc"].sort());
  })

  it("combinations", () => {
    const allNumbers = Array.from(Array(30)).map((el, index) => index + 1);
    // expect(combinations(["a", "b", "c"], 2).sort()).toMatchObject(["ab", "ac", "bc"].sort());
    expect(k_combinations(allNumbers, 30).sort()).toMatchObject(["ab", "ac", "bc"].sort());
    // expect(combinationsFor("abc", 3).sort()).toMatchObject(["abc"].sort());
  })
});