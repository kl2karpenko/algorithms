
const getSumOfArray = (arr) => {
  if (arr.length === 0) return 0;

  return arr.reduce((acc, next) => acc + next, 0);
}

var pivotIndex = function(nums) {
  let findIndex = -1;
  const len = nums.length;

  if (len <= 1) return findIndex;

  // first values
  let sumOnTheLeft = 0;
  let sumOnTheRight = getSumOfArray(nums.slice(1, len));

  console.log(sumOnTheLeft, sumOnTheRight, " sumOnTheLeft, sumOnTheRight");

  if (sumOnTheLeft === sumOnTheRight) {
    return 0;
  }

  for(let i = 1; i < len; i++) {
    sumOnTheLeft = sumOnTheLeft + nums[i - 1];
    sumOnTheRight = sumOnTheRight - nums[i];

    console.log(sumOnTheLeft, sumOnTheRight, i, " sumOnTheLeft, sumOnTheRight");
    if (sumOnTheLeft === sumOnTheRight) {
      findIndex = i;
      break;
    }
  }

  return findIndex;
};

describe("pivotIndex",  () => {
  it("should return index", () => {
    expect(pivotIndex([1,7,3,6,5,6])).toBe(3);
    // expect(pivotIndex([2, -1, 1])).toBe(3);
  });
});