/**
 * @param {number[]} height
 * @return {number}
 */
// export const maxArea = function(height) {
//   const len = height.length;
//   if (len <= 1) return null;
//
//   const areas = {};
//   let i = 0;
//   for (; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       const minH = Math.min(height[i], height[j]);
//       // coordinates does not start from 0, we should add +1 to them
//       // [lb, lt, rt, rb]
//       const rectangleCoordinates = [
//         [i + 1, 0],
//         [i + 1, minH],
//         [j + 1, minH],
//         [j + 1, 0]
//       ];
//
//       // what if it is the same area???? create an array than
//       const areaWeHave = getArea(rectangleCoordinates);
//
//       areas[areaWeHave] = { x: i + 1, y: j + 1 };
//     }
//   }
//
//   // sort so that the biggest area will be the first
//   const results = Object.entries(areas).sort((a, b) => b[0] - a[0]);
//
//   console.log(areas, " areas")
//   console.log(results, " results")
//
//   return Number(results[0][0]);
// };

/**
 * @param {number[]} height
 * @return {number}
 */
export const maxArea = (height: number[]) => {
  const len = height.length;
  if (len <= 1) return null;

  let maxArea = 0;
  let i = 0;
  for (; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const minH = Math.min(height[i], height[j]);
      maxArea = Math.max((j - i) * minH, maxArea);
    }
  }

  return maxArea;
};

/**
 * @param {number[]} height
 * @return {number}
 */
export const maxArea1 = (height: number[]) => {
  const len = height.length;
  if (len <= 1) return null;

  const sortedHeight = height.sort((a, b) => b - a);
  const indexesOfArrayValues: { [key: number]: number[] } = {};
  height.forEach((heightVal, index) => {
    if (!indexesOfArrayValues[heightVal]) {
      indexesOfArrayValues[heightVal] = [index];
    }

    indexesOfArrayValues[heightVal].push(index + 1);
  });
  let biggestArea = 0;

  for (let i = 0; i < len; i ++) {
    // take the first biggest val
    const val1 = sortedHeight[i];
    // take the second biggest val
    const val2 = sortedHeight[i + 1];

    let val1Indx = indexesOfArrayValues[val1];
    let val2Indx = indexesOfArrayValues[val2];

    if (val1Indx.length > 1) {
      val1Indx = val1Indx.sort((a, b) => b - a);
    }

    if (val2Indx.length > 1) {
      val2Indx = val2Indx.sort((a, b) => b - a);
    }

    if (val1Indx.length > 1 || val2Indx.length > 1) {
      const area = Math.min(val1, val2) * (Math.max(val1Indx, val2Indx) - Math.min(val1Indx, val2Indx));

      console.log(area, val1, val2, Math.min(val1, val2), Math.max(val1Indx, val2Indx), Math.min(val1Indx, val2Indx), " area result");
      if (area > biggestArea) {
        biggestArea = area;
      }
    }

  }

  return biggestArea;
};

export const twoSumToTarget: number[] = (nums: number[], target: number) => {
  const len = nums.length;
  if (len <= 1) return [];

  let p1 = 0;
  let p2 = p1 + 1;
  let result: number[] | null = null;

  while (p1 < len - 1) {
    if (nums[p1] + nums[p2] === target) {
      result = [p1, p2];
      break;
    } else {
      if (p2 === len - 1) {
        p1++;
        p2 = p1 + 1;
      } else {
        p2++;
      }
    }
  }

  return result;
}

export const trap = (height: number[]) => {
  let numberOfWaterTrapped = 0;
  let p1 = 2;
  const len = height.length;
  let maxRIndx = len - 1;
  let maxLIndx = 0;
  let maxL = 0;
  let maxR = 0;

  while (p1 < len - 1) {
    if (maxLIndx < p1) {
      maxL = Math.max(maxL, height[maxLIndx]);
      maxLIndx++;
      continue;
    }
    if (maxRIndx > p1) {
      maxR = Math.max(maxR, height[maxRIndx]);
      maxRIndx--;
      continue;
    }

    const minWallHeight = Math.min(maxL, maxR);
    if (minWallHeight !== 0) {
      const filledWater = minWallHeight - height[p1];

      if (filledWater > 0) {
        numberOfWaterTrapped += filledWater;
      }
    }

    p1++;
    maxRIndx = len - 1;
    maxLIndx = 0;
    maxL = 0;
    maxR = 0;
  }

  return numberOfWaterTrapped;
};

const backspaceCompare = function(s, t) {
  const resultSStr = s.split("");
  const resultTStr = t.split("");


  let i = 1;
  const sLen = s.length;
  const tLen = t.length;

  while (i <= sLen - 1 && s.substring(i).match("#") && s.substring(i).match("#").length > 0) {
    const letter = s[i];
    if (letter !== "#") {
      resultSStr.push(letter);
    } else {
      if (resultSStr.length > 0) {
        resultSStr.pop();
      }
    }
    i++;
  }
  i = 1;
  while (i <= tLen - 1 && t.substring(i).match("#") && t.substring(i).match("#").length > 0) {
    const letter = t[i];
    if (letter !== "#") {
      resultTStr.push(letter);
    } else {
      if (resultTStr.length > 0) {
        resultTStr.pop();
      }
    }
    i++;
  }

  console.log(resultSStr, resultTStr, "results")


  return resultSStr.join("") === resultTStr.join("");
};


/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestSubstring = function(s) {
  if (s.length === 0) return 0;
  if (s.length <= 1) return 1;

  let
    left = 0,
    right = 0,
    maxLen = 0;
  const
    seenChars = {};

  for (; right < s.length; right++) {
    const currentChar = s[right];
    const index = seenChars[currentChar];

    if (index === undefined || index < left) {
      seenChars[currentChar] = right;
    } else {
      if (index === left) {
        seenChars[currentChar] = right;
      }
      left = index + 1;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};

export const runTasksSequentially = tasks => {
  const resolvedPromise = new Promise((res, rej) => {
    setTimeout(() => res(1), 0);
  });

  return Promise.all(tasks.map((nextPromiseCb) => {
    return nextPromiseCb().then(resultStr => resultStr);
  }, resolvedPromise)).then(res => res);
};

export const isPalindrome = function(s) {
  const resultedStr = s.toLowerCase().replace(/[^A-Za-z0-9]/g, "");

  return resultedStr === resultedStr.split("").reverse().join("");
};

export const isPalindromeAnother = function(s) {
  const resultedStr = s.toLowerCase().replace(/[^A-Za-z0-9]/g, "");
  let len = resultedStr.length;
  if (len <= 1) return true;

  const isOdd = len % 2 === 1;
  const middle = Math.floor(len / 2) + (isOdd ? 1 : 0) - 1;
  let
    left = middle, right = !isOdd ? middle + 1 : middle, isPalindrome = true;

  while (left >= 0 && right <= len) {
    if (resultedStr[left] === resultedStr[right]) {
      left--;
      right++;
    } else {
      isPalindrome = false;
      break;
    }
  }

  return isPalindrome;
};

export const validPalindromeOther = function(s) {
  const resultedStr = s.toLowerCase().replace(/[^A-Za-z0-9]/g, "");
  let len = resultedStr.length;
  if (len <= 2) return true;

  const maybeAPAllindrome = isPalindrome(resultedStr);

  if (maybeAPAllindrome) return true;

  let
    left = 0,
    right = len - 1,
    checkingOptionToSkipLeft = false,
    checkingOptionToSkipRight = false,
    skipCharIndexes = [],
    skipCharTimes = 0;

  while(skipCharTimes <= 1 && left >= 0 && right <= len && left <= right) {
    console.log(left, right, resultedStr[left], resultedStr[right], resultedStr[left] === resultedStr[right], checkingOptionToSkipRight, checkingOptionToSkipLeft, skipCharTimes, " l r");
    if (resultedStr[left] === resultedStr[right]) {
      left++;
      right--;
      if (checkingOptionToSkipRight || checkingOptionToSkipLeft) {
        skipCharTimes++;
        checkingOptionToSkipRight = false;
        checkingOptionToSkipLeft = false;
      }
    } else {
      if (!checkingOptionToSkipLeft) {
        // try to go left 1 more time
        left++;
        checkingOptionToSkipLeft = true;
      } else if (!checkingOptionToSkipRight) {
        // try to go right + 1, and left 1 step back
        left--;
        right--;
        checkingOptionToSkipRight = true;
      }

      console.log(checkingOptionToSkipRight, checkingOptionToSkipLeft, skipCharTimes, resultedStr[left], resultedStr[right], " === ");

      if (checkingOptionToSkipRight && checkingOptionToSkipLeft) {
        skipCharTimes++;
        checkingOptionToSkipRight = false;
        checkingOptionToSkipLeft = false;
      }
    }
  }

  console.log(skipCharTimes, " skipCharTimes");

  return skipCharTimes <= 1;
};

export const validPalindrome = function(str) {
  const resultedStr = str.toLowerCase().replace(/[^A-Za-z0-9]/g, "");
  let len = resultedStr.length;
  if (len <= 2) return true;

  if (isPalindrome(resultedStr)) return true;

  let
    left = 0,
    right = len - 1;

  while(left < right) {
    if (resultedStr[left] !== resultedStr[right]) {
      // try to check 2 substrings
      const leftSubStr = resultedStr.substring(left + 1, right + 1);
      const rightSubStr = resultedStr.substring(left, right);
      const isPalindromeLeftSubstr = isPalindrome(leftSubStr);
      const isPalindromeRightSubstr = isPalindrome(rightSubStr);

      return isPalindromeLeftSubstr || isPalindromeRightSubstr;

      // aabdbaac
    }
    left++;
    right--;
  }

  return true;
};

export const getCombinationsOfSymbols = (arr) => {
  const len = arr.length;
  const results = [];

  if (len === 0) return [];
  if (len === 1) return arr;

  for (let i = 0; i < len; i++) {
    let char = arr[i]; // a
    let copy = [...arr];
    copy.splice(i, 1); // bc

    for (let j = 0; j < copy.length; j++) {
      let newCopy = [...copy];
      newCopy.splice(j,0, char);

      results.push(newCopy.join(""));
    }
  }

  return Array.from(new Set(results));
};

// export const numTilePossibilitiesTest = function(tiles) {
//   const resultedList = new Set();
//   const len = tiles.length;
//   const tilesArr = tiles.split("");
//
//   console.log(tilesArr, " tilesArr");
//
//   for (let i = 0; i < len; i++) {
//     const copy = [...tilesArr];
//
//     copy.splice(i,i+1);
//     const allCombinationsWithoutSymbol = getCombinationsOfSymbols(copy);
//
//     console.log(allCombinationsWithoutSymbol, " allCombinationsWithoutSymbol");
//     resultedList.add(allCombinationsWithoutSymbol)
//
//     // for (let j = 0; j <= len; j ++) {
//     //
//     // }
//   }
//
//   console.log(resultedList);
//
//   return Array.from(resultedList);
// };

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {
  const arr1Len = arr1.length;
  const arr2Len = arr2.length;
  const resultArr = [];
  const data = {};
  let numbersNotInArray2 = [];

  for (let i = 0; i < arr1Len; i++) {
    const number = arr1[i];
    const indexOfNumberIfExist = arr2.indexOf(number);

    if (indexOfNumberIfExist !== -1) {
      if (!data[number]) {
        data[number] = {
          index: indexOfNumberIfExist,
          count: 1,
          number
        };
      } else {
        data[number].count++;
      }
    } else {
      numbersNotInArray2.push(number);
    }
  }

  numbersNotInArray2 = numbersNotInArray2.sort((a, b) => a - b);

  // sort by index
  const res = Object.values(data).sort((valueA, valueB) => valueA.index - valueB.index);

  // create a result aray
  res.forEach(({ index, count, number }) => {
    resultArr.push(...new Array(count).fill(number))
  });

  resultArr.push(...numbersNotInArray2);

  console.log(resultArr, "resultArr");

  return resultArr;
};

// Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// Output: [2,2,2,1,4,3,3,9,6,7,19]

// Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
// Output: [22,28,8,6,17,44]