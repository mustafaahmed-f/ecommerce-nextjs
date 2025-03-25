import mongoose from "mongoose";
import {
  addRatingToProducts,
  // addReviewsToProducts,
  addSizeToProducts,
  fetchCategoriesFromAPI,
  fetchProductsFromAPI,
} from "../_lib/AddProductsToDB";
import { addBrandsAndModelsToDB } from "../_lib/AddModels&BrandsToDB";
//TODO : Change the uri to Atlas uri
//TODO : add same data on local to the atlas
// const uri = process.env.MONGODB_URI_ATLAS as string;
const uri = process.env.MONGODB_URI as string;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB Already connected");
    // await fetchProductsFromAPI();
    // await fetchCategoriesFromAPI();
    // await addSizeToProducts();
    // await addBrandsAndModelsToDB();
    // await addRatingToProducts();
    // await addReviewsToProducts();
    return true;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default connectDB;
