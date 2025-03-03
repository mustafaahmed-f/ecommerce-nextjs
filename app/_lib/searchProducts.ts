import { getAllProducts } from "./APIs/productsAPIs";
import { Trie } from "./DataStructures/Trie";

const trie = new Trie();

(async function loadTrie() {
  const products = await getAllProducts(); // Load all products once
  for (let product of products) {
    trie.addProduct(product.title, product.productId);
  }
  console.log("Products added to trie");
})();

// loadTrie();
