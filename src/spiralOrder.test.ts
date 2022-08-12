const Directions = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3
};

const DirectionsToName = {
  0: 'top',
  1: 'right',
  2: 'bottom',
  3: 'left'
}

function spiralOrder(matrix: number[][]): number[] {
  let i = 0;
  let j = 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const output: number[] = [];
  const totalElementsCount = m * n;
  let elementsCount = 0;
  let direction = Directions.right;
  let minI = -1;
  let minJ = 0;
  let maxI = n;
  let maxJ = m;
  let nextI: number = 0;
  let nextJ: number = 0;

  while (elementsCount < totalElementsCount) {
    elementsCount++;
    const el = matrix[j][i];
    output.push(el);

    console.log('i:', i, 'j:', j, 'el:', el, 'minI:', minI, 'minJ:', minJ, 'maxJ:', maxJ, 'maxI:', maxI);

    switch (direction) {
      case Directions.right:
        // go to the right
        nextI = i + 1;
        // console.log(nextI, maxI, ' next maxI');

        // if we are out of matrix, go to the bottom
        if (nextI >= maxI) {
          if (nextI === maxI) {
            maxI--;
          }
          nextI = i;
          nextJ = j + 1;
          direction = Directions.bottom;
        }
        break;
      case Directions.bottom:
        // go to the bottom
        nextJ = j + 1;

        // if we are out of matrix, go to the left
        if (nextJ >= maxJ) {
          if (nextJ === maxJ) {
            maxJ--;
          }
          nextJ = j;
          nextI = i - 1;
          direction = Directions.left;
        }
        break;
      case Directions.left:
        // go to the bottom
        nextI = i - 1;

        // if we are out of matrix, go to the top
        if (nextI <= minI) {
          if (nextI === minI) {
            minI++;
          }
          nextI = i;
          nextJ = j - 1;
          direction = Directions.top;
        }
        break;
      default:
        // go to the top
        nextJ = j - 1;

        // if we are out of matrix, go to the right
        if (nextJ <= minJ) {
          if (nextJ === minJ) {
            minJ++;
          }
          nextJ = j;
          nextI = i + 1;
          direction = Directions.right;
        }
        break;
    }

    i = nextI;
    j = nextJ;
  }

  console.log(output, 'output');
  return output;
}


describe('spiralOrder', () => {
  test('it should return the spiral elements in order', () => {
    expect(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])).toMatchObject([1,2,3,6,9,8,7,4,5]);
    expect(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])).toMatchObject([1,2,3,4,8,12,11,10,9,5,6,7]);
    expect(spiralOrder([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]])).toMatchObject([1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13]);
  });
});
