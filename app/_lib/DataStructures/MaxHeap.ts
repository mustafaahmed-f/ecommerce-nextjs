export class MaxHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  private getParent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChild(index: number): number {
    return index * 2 + 1;
  }

  private getRightChild(index: number): number {
    return index * 2 + 2;
  }

  private swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  insert(value: number): void {
    this.heap.push(value);
    if (this.heap.length === 1) return;
    this.heapifyUp();
  }

  private heapifyUp() {
    let index: number = this.heap.length - 1;
    while (index > 0) {
      let parentIndex: number = this.getParent(index);
      if (this.heap[parentIndex] >= this.heap[index]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  getMaxVal(): number | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;
    let maxVal: number = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return maxVal;
  }

  private heapifyDown() {
    let index: number = 0;
    while (this.getLeftChild(index) < this.heap.length) {
      let biggerIndex = this.getLeftChild(index);
      let rightIndex = this.getRightChild(index);
      if (this.heap[rightIndex] > this.heap[biggerIndex]) {
        biggerIndex = rightIndex;
      }
      if (this.heap[biggerIndex] <= this.heap[index]) break;
      this.swap(biggerIndex, index);
      index = biggerIndex;
    }
  }
}
