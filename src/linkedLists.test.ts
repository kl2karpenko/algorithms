class ListNode {
  val: any;
  next: any | null;

  constructor(val: any, next?: ListNode | null) {
    this.val = val;
    this.next = next || null;
  }
}

// ---- Generate our linked list ----
// @ts-ignore
const linkedList: ListNode = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].reduce((acc: null, val: any) => new ListNode(val, acc), null);
// @ts-ignore
const linkedListReversed: ListNode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc: null, val: any) => new ListNode(val, acc), null);

const reversedLinkedList = (head: ListNode): ListNode => {
  let currentNode = head;
  let tailListNode: ListNode = new ListNode(head.val);
  let reversedListNode: ListNode | null;

  while (currentNode) {
    currentNode = currentNode.next;
    if (currentNode) {
      // @ts-ignore
      reversedListNode = new ListNode(currentNode.val, tailListNode);
      tailListNode = reversedListNode;
    }
  }

  return reversedListNode!;
}

describe("reversedLinkedList", function () {
  it("should return reversedLinkedList", () => {
    expect(reversedLinkedList(linkedList)).toMatchObject(linkedListReversed);
  });
});


const reversedLinkedListAgain = (head: ListNode): ListNode => {
  let currentNode = head;
  let reversedList = new ListNode(currentNode.val);

  while(currentNode) {
    currentNode = currentNode.next;
    if (currentNode) {
      let tail = reversedList;
      // @ts-ignore
      reversedList = new ListNode(currentNode.val, tail);
    }
  }

  console.log(reversedList);
  return reversedList;
}

describe("reversedLinkedList", function () {
  it("should return reversedLinkedList", () => {
    expect(reversedLinkedListAgain(linkedList)).toMatchObject(linkedListReversed);
  });
});

















const createLinkedListCopy = (list: ListNode | null, end?: number) => {
  if (list === null) return list;

  let pointer = list;
  let result = new ListNode(list.val);
  let resultPointer = result;
  let i = 0;

  while (end ? i !== end : pointer.next !== null) {
    // this is only to track the list, do not change!!!
    pointer = pointer.next;
    // put everything to the result
    resultPointer.next = new ListNode(pointer.val);
    resultPointer = resultPointer.next;
    i++;
  }

  return {
    result,
    pointer,
    resultPointer,
    counter: i
  };
}

const reversedLinkedListWithNumbers = (head: ListNode | null, left: number, right?: number): ListNode | null => {
  if (head === null) return head;
  if (right && right < left) return head;

  let result: ListNode | null = head;
  let resultPointer: ListNode | null = head;
  let pointer: ListNode | null = head;
  let i = 0;
  if (left !== 0) {
    const copyOfLinkedList = createLinkedListCopy(head, left - 1);
    // @ts-ignore
    ({ result = null, resultPointer = null, pointer } = copyOfLinkedList || {});
    let { counter } = copyOfLinkedList || {};
    if (counter) {
      i = counter;
    }
  }

  i++;

  let nextPointer = pointer ? pointer.next : head.next;
  let reversedList = new ListNode(nextPointer!.val);
  let pointerToLastReversedNode = reversedList;

  // now we need to reverse till the right, let's check if right is still have next
  if (nextPointer.next) {
    while (i !== right) {
      if (nextPointer.next) {
        let tail: any = reversedList;
        nextPointer = nextPointer.next;
        reversedList = new ListNode(nextPointer.val, tail);
      }
      i++;
    }
  }

  // update results
  resultPointer!.next = reversedList;
  nextPointer = nextPointer.next;

  const lastLinkedListCopy = createLinkedListCopy(nextPointer);
  let { result: newResult } = lastLinkedListCopy || {};

  // update the result with the last not reversed nodes
  pointerToLastReversedNode.next = newResult;

  console.log(result, ' result');
  return result!;
}

describe("reversedLinkedListWithNumbers", function () {
  it("should return reversedLinkedListWithNumbers", () => {
    // @ts-ignore
    // const linkedListReversedInTheMiddle: ListNode = [10, 9, 5, 6, 7, 8, 4, 3, 2, 1].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    // expect(reversedLinkedListWithNumbers(linkedList, 4, 7)).toMatchObject(linkedListReversedInTheMiddle);
    // expect(reversedLinkedListWithNumbers(linkedList, 10, 3)).toMatchObject(linkedList);

    // @ts-ignore
    const linkedListReversedAll: ListNode = [8, 9, 10].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    // @ts-ignore
    const linkedListAllToReverse: ListNode = [10,9,8].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    console.log(linkedListReversedAll);
    console.log(linkedListAllToReverse);
    expect(reversedLinkedListWithNumbers(linkedListAllToReverse, 1, 3)).toMatchObject(linkedListReversedAll);
  });
});


const reversedLinkedListWithNumbersNext =  (head: ListNode | null, left: number, right: number): ListNode | null => {
  if (head === null) return head;
  if (right && right < left) return head;
  if (right === left) return head;

  let position = 1;
  let newList = head;
  let currentNode = head;
  let tail: ListNode | null = null;
  let pointerBeforeReverse: ListNode | null = null;
  let pointerToLastValTail: ListNode | null = null;

  while (position <= right) {
    // reverse between left and right
    if (position >= left) {
      let oldTail: ListNode | null = tail;
      tail = !tail ? new ListNode(currentNode.val) : new ListNode(currentNode.val, oldTail);

      if (!pointerToLastValTail) {
        pointerToLastValTail = tail;
      }
    }

    if (position < left) {
      newList = currentNode;
    }

    if (position === left - 1) {
      pointerBeforeReverse = currentNode;
    }

    position++;
    currentNode = currentNode.next;
  }

  if (pointerBeforeReverse) {
    pointerBeforeReverse!.next = tail;
  }
  pointerToLastValTail!.next = currentNode;

  return pointerBeforeReverse ? newList : tail;
}


  describe("reversedLinkedListWithNumbersNext", function () {
  it("should return reversedLinkedListWithNumbersNext", () => {
    // @ts-ignore
    const linkedList3: ListNode = [5, 4, 3, 2, 1].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    // @ts-ignore
    const linkedListReverted3: ListNode = [5, 3, 4, 2, 1].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    expect(reversedLinkedListWithNumbersNext(linkedList3, 1, 2)).toMatchObject(linkedListReverted3);

    // // @ts-ignore
    // const linkedList1: ListNode = [5, 3].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    // // @ts-ignore
    // const linkedListReverted1: ListNode = [3, 5].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    // expect(reversedLinkedListWithNumbersNext(linkedList1, 1, 2)).toMatchObject(linkedListReverted1);
    //
    // // @ts-ignore
    // const linkedList2: ListNode = [3, 2, 1].reduce((acc: null, val: any) => new ListNode(val, acc), null);
    // expect(reversedLinkedListWithNumbersNext(linkedList2, 3, 3)).toMatchObject(linkedList2);
  });
});