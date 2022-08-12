const plusOne = function(digits: number[]) {
  const result = [];

  let i = digits.length - 1;
  let addToNumber = 0;
  while(i >= 0) {
    const tailNumber = digits[i];
    const tailNumberPlusOne = tailNumber + (i === digits.length - 1 ? 1 : addToNumber);

    if (tailNumberPlusOne === 10) {
      addToNumber = 1;
      result.unshift(0);
    } else {
      result.unshift(tailNumberPlusOne);
      addToNumber = 0;
    }
    i--;
  }

  if (addToNumber === 1) {
    result.unshift(addToNumber);
  }

  return result;
};

describe("plusOne", function () {
  it("should add +1", () => {
    expect(plusOne([9])).toMatchObject([1,0]);
    expect(plusOne([1,2,3])).toMatchObject([1,2,4]);
    expect(plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3])).toMatchObject([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]);
  });
});