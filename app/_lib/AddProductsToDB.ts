//// These are methods to get categories and products from fake store API and add them to our DB:

import categoriesModel from "../_mongodb/models/categoriesModel";
import productsModel from "../_mongodb/models/productsModel";
import { getCategories } from "./APIs/categoriesAPIs";
import { getAllProducts } from "./APIs/productsAPIs";
import { getRandomRating } from "./getRating";
import { faker } from "@faker-js/faker";

export async function fetchProductsFromAPI() {
  try {
    const response = await getAllProducts();
    const products = response.products;
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

const sizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

export async function addSizeToProducts() {
  try {
    const products = await productsModel.find();
    for (let product of products) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      product.size = size;
      await product.save();
    }
    console.log("✅ Sizes successfully added to MongoDB");
  } catch (error) {
    console.log("Error adding sizes to products: ", error);
  }
}

export async function addRatingToProducts() {
  try {
    const products = await productsModel.find();
    if (!products || !products.length) throw new Error("No products found");
    for (let product of products) {
      const rating = getRandomRating();
      product.rating = rating;
      await product.save();
    }

    console.log("✅ Ratings successfully added to MongoDB");
  } catch (error) {
    console.log("Error adding ratings to products: ", error);
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

export async function addReviewsToProducts() {
  //// Review consists of : Name ( if no name , make it anonymous ) , rating , title , review , likes , dislikes
  //// Review can be written by anonymous user or a registered user
  try {
    const products = await productsModel.find();
    if (!products || !products.length) throw new Error("No products found");

    for (let product of products) {
      for (let i = 0; i < 5; i++) {
        const review = {
          name: faker.person.firstName() + " " + faker.person.lastName(),
          rating: getRandomRating(),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          likes: Math.floor(Math.random() * 10),
          dislikes: Math.floor(Math.random() * 10),
        };
        product.reviews.push(review);
      }
      await product.save();
    }

    console.log("✅ Reviews successfully added to MongoDB");
  } catch (error) {
    console.log("Error adding reviews to products: ", error);
  }
}
