function findDiagonalOrder(mat: number[][]): number[] {
  let i = 0;
  let j = 0;
  const m = mat.length;
  const n = mat[0].length;
  const output: number[] = [];
  // true - go to the top, i--, j++
  // false - go to the bottom, i++, j--
  let direction: boolean = true;

  do {
    const element = mat[j][i];
    output.push(element);

    let nextI = direction ? i + 1 : i - 1;
    let nextJ = direction ? j - 1 : j + 1;

    // meaning we are out of the matrix
    if (nextI < 0 || nextJ < 0 || nextI >= n || nextJ >= m) {
      // change direction
      direction = !direction;

      if (!direction) {
        // if go to the bottom now, go right
        nextI = i + 1;
        nextJ = j;

        // if we still out of the martix, then just go down
        if (nextI < 0 || nextI >= n) {
          nextI = i;
          nextJ = j + 1;
        }
      } else {
        // if go to the top, now try bottom
        nextI = i;
        nextJ = j + 1;

        // if we still out of the martix, then just go to the right
        if (nextJ < 0 || nextJ >= m) {
          nextI = i + 1;
          nextJ = j;
        }
      }
    }

    i = nextI;
    j = nextJ;

  } while (i < n && j < m)

  return output;
}

describe('diagonal', () => {
  test('it should return the diagonal elements', () => {
    // expect(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]])).toMatchObject([1,2,4,7,5,3,6,8,9]);
    expect(findDiagonalOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])).toMatchObject([1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16]);
  });
});
