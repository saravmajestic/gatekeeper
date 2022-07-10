import mongoose from "mongoose";
import { LICENSE_STATUS } from "../api/_constants";

const LicenseSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    accountId: { type: String, required: true },
    productId: { type: String, required: true },
    token: { type: String },
    status: { required: true, type: String, enum: LICENSE_STATUS },
  },
  { timestamps: true }
);

LicenseSchema.index(
  { deviceId: 1 },
  {
    unique: true,
  }
);
export default mongoose.models.License ||
  mongoose.model("License", LicenseSchema);
