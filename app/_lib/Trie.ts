class TrieNode {
  value: string;
  wordEnd: boolean;
  children: Map<string, null | TrieNode>;

  constructor(value: string) {
    this.value = value;
    this.children = new Map();
    this.wordEnd = false;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }
}
