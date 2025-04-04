//// These are methods to get categories and products from fake store API and add them to our DB:

import categoriesModel from "../_mongodb/models/categoriesModel";
import productsModel from "../_mongodb/models/productsModel";
import { getCategories } from "./APIs/categoriesAPIs";
import { getAllProducts } from "./APIs/productsAPIs";
import { getRandomRating } from "./getRating";
// import { faker } from "@faker-js/faker";

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

export async function addDifferentPropertiesToProducts() {
  try {
    const categories = await categoriesModel.find();
    const updatedPromises = categories.map(async (category) => {
      const products = await productsModel.find({ category: category.title });
      for (let product of products) {
        switch (category.title) {
          case "tv":
            product.screenSize = Math.floor(Math.random() * 45) + 30;
            break;

          case "gaming":
            product.fps = Math.floor(Math.random() * 300) + 30;
            break;

          case "audio":
            product.soundOutput = Math.floor(Math.random() * 50) + 1;
            break;

          case "appliances":
            product.power = Math.floor(Math.random() * 1000) + 100;
            break;

          case "laptop":
            product.ram = Math.floor(Math.random() * 28) + 4;
            break;

          case "mobile":
            product.ram = Math.floor(Math.random() * 16) + 4;
            break;

          default:
            break;
        }
        await product.save(); // Save each product after updating
      }
    });

    await Promise.all(updatedPromises); // Wait for all saves to complete

    console.log("✅ Properties successfully added to MongoDB");
  } catch (error) {
    console.log("Error adding different properties to products: ", error);
  }
}

// export async function addReviewsToProducts() {
//   //// Review consists of : Name ( if no name , make it anonymous ) , rating , title , review , likes , dislikes
//   //// Review can be written by anonymous user or a registered user
//   try {
//     const products = await productsModel.find();
//     if (!products || !products.length) throw new Error("No products found");

//     const updatePromises = products.map(async (product) => {
//       const reviewsArr = Array.from({ length: 3 }, () => ({
//         name: faker.person.firstName() + " " + faker.person.lastName(),
//         rating: getRandomRating(),
//         title: faker.lorem.sentence(),
//         content: faker.lorem.paragraph(),
//         likes: Math.floor(Math.random() * 10),
//         dislikes: Math.floor(Math.random() * 10),
//       }));

//       // console.log(`📝 Adding reviews to product: ${product.title}`); // ✅ Debug log

//       product.reviews = reviewsArr;
//       // product.markModified("reviews"); // Ensure MongoDB detects change

//       return product.save();
//       // console.log(`✅ Successfully updated: ${product.title}`); // ✅ Check if save() runs
//     });

//     await Promise.all(updatePromises); // Wait for all saves to complete

//     console.log("✅ Reviews successfully added to MongoDB");
//   } catch (error) {
//     console.log("Error adding reviews to products: ", error);
//   }
// }
