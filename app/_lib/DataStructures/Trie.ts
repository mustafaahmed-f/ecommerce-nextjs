/**
 * We are using trie for autocomplete while searching products and that works because we
 * have just 149 products in our database. If we had a lot of products, we would have
 * to query the database for each character of the prefix and we will use debounce to
 * reduce the number of queries.
 */

//=========================================================

class TrieNode {
  value: string;
  wordEnd: boolean;
  children: Map<string, null | TrieNode>;
  originalWord: string;
  productId: number | null;

  constructor(value: string) {
    this.value = value;
    this.children = new Map();
    this.wordEnd = false;
    this.originalWord = "";
    this.productId = null;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  addProduct(word: string, id: number): void {
    let currentNode: TrieNode = this.root;
    let lowerCasedWord = word.toLowerCase();
    for (let char of lowerCasedWord) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode(char));
      }
      currentNode = currentNode.children.get(char)!;
    }
    currentNode.originalWord = word;
    currentNode.wordEnd = true;
    currentNode.productId = id;
  }

  search(prefix: string): { prodName: string; prodId: number }[] {
    if (!prefix) return [];
    const result: { prodName: string; prodId: number }[] = [];
    let currentNode: TrieNode | null = this.root;
    let lowerCasedPrefix = prefix.toLowerCase();

    //// Getting last node of prefix:
    for (let char of lowerCasedPrefix) {
      currentNode = currentNode?.children.get(char) ?? null;
      if (!currentNode) {
        return result;
      }
    }

    if (currentNode.children.size) {
      this.getWords(currentNode, result);
    }

    return result;
  }

  private getWords(
    node: TrieNode | null,
    result: { prodName: string; prodId: number }[]
  ): void {
    if (node && node?.originalWord && node.wordEnd) {
      result.push({ prodName: node.originalWord, prodId: node.productId! });
    }

    if (node) {
      for (let childNode of Array.from(node?.children?.values())) {
        this.getWords(childNode, result);
      }
    }
  }
}
