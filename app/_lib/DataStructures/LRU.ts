//// Least Recently Used (LRU) Cache will be used to store recently viewed products

class ListNode {
  key: number | null;
  val: number | null;
  prev: ListNode | null;
  next: ListNode | null;

  constructor(key: number | null, val: number | null) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {
  head: ListNode | null;
  tail: ListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(ListNode: ListNode): void {
    if (this.head === null && this.tail === null) {
      this.head = ListNode;
      this.tail = ListNode;
    } else {
      ListNode.next = this.head;
      this.head!.prev = ListNode;
      this.head = ListNode;
    }
  }

  delete(ListNode: ListNode): void {
    if (ListNode.prev) {
      ListNode.prev.next = ListNode.next;
    } else {
      // ListNode is the head
      this.head = ListNode.next;
    }
    if (ListNode.next) {
      ListNode.next.prev = ListNode.prev;
    } else {
      // ListNode is the tail
      this.tail = ListNode.prev;
    }
  }

  moveToHead(ListNode: ListNode): void {
    if (ListNode === this.head) return;

    this.delete(ListNode);
    this.insert(ListNode);
  }

  removeTail(): ListNode | null {
    if (this.tail === null) return null;
    const ListNodeToRemove = this.tail;
    this.delete(ListNodeToRemove);
    return ListNodeToRemove;
  }
}

export class LRUCache {
  maxSize: number;
  doubleLinkedList: DoubleLinkedList;
  map: Map<number, ListNode>;

  constructor(capacity: number) {
    this.maxSize = capacity;
    this.doubleLinkedList = new DoubleLinkedList();
    this.map = new Map();
  }

  get(key: number): number {
    const ListNode = this.map.get(key);
    if (!ListNode) return -1;

    this.doubleLinkedList.moveToHead(ListNode);
    return ListNode.val!;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      const existingListNode = this.map.get(key)!;
      existingListNode.val = value;
      this.doubleLinkedList.moveToHead(existingListNode);
      return;
    }

    if (this.map.size === this.maxSize) {
      const tailListNode = this.doubleLinkedList.removeTail();
      if (tailListNode) {
        this.map.delete(tailListNode.key!);
      }
    }

    const newListNode = new ListNode(key, value);
    this.map.set(key, newListNode);
    this.doubleLinkedList.insert(newListNode);
  }
}
