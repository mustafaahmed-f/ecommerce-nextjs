import mongoose, { Schema } from "mongoose";

const modelsSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Model || mongoose.model("Model", modelsSchema);
