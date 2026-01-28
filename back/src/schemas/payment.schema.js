import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true, // un pago principal por pedido
    },

    provider: {
      type: String,
      required: true,
      enum: ["STRIPE"], // extensible en el futuro
    },

    providerPaymentId: {
      type: String, // id devuelto por el proveedor (Stripe)
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "PEN",
      uppercase: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
