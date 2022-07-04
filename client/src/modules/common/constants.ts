import { License } from "./types";

export const transformLicenseData = (licenseData: License) => {
  return {
    productID: licenseData.productID,
    productLicenseKey: licenseData.productLicenseKey,
    meta: licenseData.meta,
  };
};
