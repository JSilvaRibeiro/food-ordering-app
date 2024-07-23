const { model, models, Schema } = require("mongoose");

const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);