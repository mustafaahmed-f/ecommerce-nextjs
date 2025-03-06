import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productId: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, default: null },
    size: { type: String, default: null },
    category: { type: String, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 10 }, // Default stock value
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
