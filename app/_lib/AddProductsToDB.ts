//// These are methods to get categories and products from fake store API and add them to our DB:

import categoriesModel from "../_mongodb/models/categoriesModel";
import productsModel from "../_mongodb/models/productsModel";
import { getCategories } from "./APIs/categoriesAPIs";
import { getAllProducts } from "./APIs/productsAPIs";

export async function fetchProductsFromAPI() {
  try {
    const response = await getAllProducts();
    const products = response.products.slice(100);
    for (let product of products) {
      const productsExistence = await productsModel.findOne({
        productId: product.id,
      });
      if (!productsExistence) {
        const newProduct = productsModel.create({
          productId: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          description: product.description,
          brand: product.brand || "Unknown", // Default if brand is missing
          model: product.model || "Unknown",
          color: product.color || null,
          category: product.category,
          discount: product.discount || 0,
          stock: Math.floor(Math.random() * 50) + 1, // Random stock value
        });
        if (!newProduct) {
          throw new Error(`Couldn't add product ${product.title} to DB`);
        }
      }
    }

    console.log("✅ Products successfully added to MongoDB");
  } catch (error) {
    console.log("Error fetching products from API: ", error);
  }
}

export async function fetchCategoriesFromAPI() {
  try {
    const response = await getCategories();
    const categories = response.categories;
    for (let category of categories) {
      const categoryExistence = await categoriesModel.findOne({
        title: category,
      });
      if (!categoryExistence) {
        const newCategory = categoriesModel.create({ title: category });
        if (!newCategory) {
          throw new Error(`Couldn't add category ${category} to DB`);
        }
      }
    }
    console.log("✅ Categories successfully added to MongoDB");
  } catch (error) {
    console.log("Error fetching categories from API: ", error);
  }
}
