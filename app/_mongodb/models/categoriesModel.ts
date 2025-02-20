import mongoose, { Schema, Types } from "mongoose";

const categoriesSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categoriesSchema);
