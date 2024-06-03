import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
