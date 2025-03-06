import brandsModel from "../_mongodb/models/brandsModel";
import modelsModel from "../_mongodb/models/modelsModel";
import { getAllProducts } from "./APIs/productsAPIs";

//// This method is used to exclude brands and models from products and add them separetely to DB

export async function addBrandsAndModelsToDB() {
  try {
    const products = await getAllProducts();
    if (!products.success || !products.products.length)
      throw new Error("No products found or failed to fetch products !!");
    const brands = products.products.map((product: any) => product.brand);
    const models = products.products.map((product: any) => product.model);

    //// adding brands :
    const nonDublicatedBrands = new Set<string>(brands);
    const uniqueBrands = [...nonDublicatedBrands];
    for (let brand of uniqueBrands) {
      const newBrand = brandsModel.create({ title: brand });
      if (!newBrand) {
        throw new Error(`Error adding brand ${brand} to DB`);
      }
    }

    //// adding models :
    const nonDublicatedModels = new Set<string>(models);
    const uniqueModels = [...nonDublicatedModels];
    for (let model of uniqueModels) {
      const newModel = modelsModel.create({ title: model });
      if (!newModel) {
        throw new Error(`Error adding model ${model} to DB`);
      }
    }
    console.log("✅ Brands and models successfully added to MongoDB");
  } catch (error) {
    console.log("Error excluding brands or models : ", error);
  }
}
