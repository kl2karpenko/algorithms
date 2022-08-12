// stack

// pop, push, getMaxValue - 3 methods

// pop - remove at the end
// push - add to the end
// getMaxValue -


class CustomStack {
  list: number[] = [];
  sortedList: number[] = [];
  currentMaxValue: number = -Infinity;

  constructor() {
    this.list = [];
  }

  pop = () => {
    // undefined if empty
    if (this.list.length === 0) return undefined;

    // O (1)
    const deletedNumber: number = this.list.pop();
    const sortedListLen = this.sortedList.length;

    if (this.sortedList[sortedListLen - 1] === deletedNumber) {
      this.sortedList.length = sortedListLen - 1;
    }

    return deletedNumber;
  };

  push = (num: number) => {
    this.list.push(num);

    const sortedListLen = this.sortedList.length;

    if (sortedListLen && this.sortedList[sortedListLen - 1] <= num) {
      // add number when equal or less
      this.sortedList.push(num);
    } else if (!sortedListLen) {
      this.sortedList.push(num);
    }
    // O (1)
  };

  getMaxValue = () => {
    const len = this.list.length;

    if (len === 0) return undefined;
    if (len === 1) return this.list[0];

    const sortedListLen = this.sortedList.length;
    // O (1)
    return this.sortedList[sortedListLen - 1];
  };

}


// [1, 5, 5] - plain
// [1, 5, 5] - sorted

// if 3 < maxValue => dont add sorted
// {  }
//